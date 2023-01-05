package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/joinpickup/middleware-go/logging"
	"github.com/twilio/twilio-go"
	twilioApi "github.com/twilio/twilio-go/rest/api/v2010"
)

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
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: accountSid,
		Password: authToken,
	})

	params := &twilioApi.CreateMessageParams{}
	params.SetTo("+12034510069")
	params.SetFrom(os.Getenv("TWILIO_PHONE"))
	params.SetBody(fmt.Sprintf("Hi From Pickup"))

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
