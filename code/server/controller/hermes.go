package controller

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/joinpickup/keeper/dal"
	"github.com/joinpickup/keeper/models"
	m_dal "github.com/joinpickup/middleware-go/dal"
	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/middleware-go/support"
	"github.com/twilio/twilio-go"
	twilioApi "github.com/twilio/twilio-go/rest/api/v2010"
	"gopkg.in/gomail.v2"
)

func SendEmail(w http.ResponseWriter, r *http.Request) {
	// Sender data.
	from := os.Getenv("SMTP_USER")
	password := os.Getenv("SMTP_PASS")
	to := r.URL.Query().Get("email")
	logging.InfoLogger.Println(to)
	if !support.EmailValid(to) {
		logging.ErrorLogger.Println("Please enter a valid email...")
		http.Error(w, "Please enter a valid email...", http.StatusBadRequest)
		return
	}

	user, err := m_dal.GetUserByEmail(to)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if user != nil {
		logging.ErrorLogger.Println("User already exists.")
		http.Error(w, "User already exists.", http.StatusBadRequest)
		return
	}

	// code
	code, err := dal.InsertEmailCode(to)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// smtp server configuration.
	smtpHost := "smtp.office365.com"
	smtpPort := 587

	msg := gomail.NewMessage()
	msg.SetHeader("From", from)
	msg.SetHeader("To", to)
	msg.SetHeader("Subject", "Please verify your email.")
	msg.SetBody("text/html", fmt.Sprintf("Here is your verification code for Pickup: %s.", code))

	// Sending email.
	d := gomail.NewDialer(smtpHost, smtpPort, from, password)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	// Send the email
	err = d.DialAndSend(msg)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Add("Content-Type", "application/json")
	w.Write([]byte{})
}

func SendPhone(w http.ResponseWriter, r *http.Request) {
	accountSid := os.Getenv("TWILIO_SID")
	authToken := os.Getenv("TWILIO_AUTH")
	to := r.URL.Query().Get("phone")
	if to == "" {
		logging.ErrorLogger.Println("Please enter a phone number...")
		http.Error(w, "Please enter a phone number...", http.StatusBadRequest)
		return
	}

	// code
	code, err := dal.InsertPhoneCode(to)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: accountSid,
		Password: authToken,
	})

	params := &twilioApi.CreateMessageParams{}
	params.SetTo("+12034510069")
	params.SetFrom(os.Getenv("TWILIO_PHONE"))
	params.SetBody(fmt.Sprintf("Here is your verification code from Pickup: %s", code))

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	} else {
		response, _ := json.Marshal(*resp)
		logging.InfoLogger.Println("Response: " + string(response))
	}

	w.Header().Add("Content-Type", "application/json")
	w.Write([]byte{})
}

func VerifyEmail(w http.ResponseWriter, r *http.Request) {
	// Sender data.
	to := r.URL.Query().Get("email")
	code := r.URL.Query().Get("code")
	logging.InfoLogger.Println(code)
	if code == "" {
		logging.ErrorLogger.Println("Please enter a valid code...")
		http.Error(w, "Please enter a valid code...", http.StatusBadRequest)
		return
	}
	if !support.EmailValid(to) {
		logging.ErrorLogger.Println("Please enter a valid email...")
		http.Error(w, "Please enter a valid email...", http.StatusBadRequest)
		return
	}

	// code
	valid, err := dal.VerifyEmailCode(to, code)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var body models.VerificationBody
	body.Valid = valid
	bodyStr, err := json.Marshal(body)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.Write(bodyStr)
}

func VerifyPhone(w http.ResponseWriter, r *http.Request) {
	to := r.URL.Query().Get("phone")
	code := r.URL.Query().Get("code")
	if code == "" {
		logging.ErrorLogger.Println("Please enter a valid code...")
		http.Error(w, "Please enter a valid code...", http.StatusBadRequest)
		return
	}

	if to == "" {
		logging.ErrorLogger.Println("Please enter a phone number...")
		http.Error(w, "Please enter a phone number...", http.StatusBadRequest)
		return
	}

	// code
	valid, err := dal.VerifyPhoneCode(to, code)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var body models.VerificationBody
	body.Valid = valid
	bodyStr, err := json.Marshal(body)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.Write(bodyStr)
}
