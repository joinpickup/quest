package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/dongri/phonenumber"
	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/quest-server/dal"
	"github.com/joinpickup/quest-server/models"
	"github.com/twilio/twilio-go"
	twilioApi "github.com/twilio/twilio-go/rest/api/v2010"
)

func SendOTP(w http.ResponseWriter, r *http.Request) {
	accountSid := os.Getenv("TWILIO_SID")
	authToken := os.Getenv("TWILIO_AUTH")
	to := r.URL.Query().Get("phone")
	if phonenumber.Parse(to, "US") == "" {
		logging.ErrorLogger.Println("Please enter a valid phone number.")
		http.Error(w, "Please enter a valid phone number.", http.StatusBadRequest)
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
	params.SetTo(to)
	params.SetFrom(os.Getenv("TWILIO_PHONE"))
	params.SetBody(fmt.Sprintf("Here is your verification code from The Daily Quest: %s", code))

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

func VerifyOTP(w http.ResponseWriter, r *http.Request) {
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
