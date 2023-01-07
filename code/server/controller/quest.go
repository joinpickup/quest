package controller

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/dongri/phonenumber"
	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/middleware-go/support"
	"github.com/joinpickup/quest-server/dal"
	"github.com/joinpickup/quest-server/models"
)

func GetStatus() *models.QuestStatus {
	var status models.QuestStatus
	remaining, err := dal.GetQuestPool()
	status.PaymentLink = support.TrimQuotes(os.Getenv("STRIPE_PAYMENT_LINK"))
	status.CanMessage = true
	status.Message = ""

	if err != nil {
		status.CanMessage = false
		status.Message = "Error connecting to the database. Blame Andrew."
		logging.ErrorLogger.Println(err.Error())
	} else if remaining.Remaining == 0 {
		status.CanMessage = false
		status.Message = "No more community messages."
		logging.ErrorLogger.Println("No more community messages.")
	}

	status.CanMessage = false
	status.Message = "Not done yet. Sorry :( - Andrew"
	status.Remaining = remaining.Remaining
	return &status
}

func QuestStatus(w http.ResponseWriter, r *http.Request) {
	status := GetStatus()
	statusStr, _ := json.Marshal(status)
	// set header and return
	w.Write(statusStr)
}

func AddMessage(w http.ResponseWriter, r *http.Request) {
	status := GetStatus()
	if !status.CanMessage {
		logging.ErrorLogger.Println(status.Message)
		http.Error(w, status.Message, http.StatusBadRequest)
		return
	}

	// get messeage
	var message models.QuestMessage
	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		logging.ErrorLogger.Println("Invalid body.")
		http.Error(w, "Invalid body.", http.StatusBadRequest)
		return
	}

	if phonenumber.Parse(message.Phone, "US") == "" {
		logging.ErrorLogger.Println("Please enter a valid phone number.")
		http.Error(w, "Please enter a valid phone number.", http.StatusBadRequest)
		return
	}

	if !models.IsMessageStatus(message.Status) {
		logging.ErrorLogger.Println("Invalid status.")
		http.Error(w, "Invalid status.", http.StatusBadRequest)
		return
	}

	// add message to db
	err = dal.AddMessage(message)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// subtract from remaining
	w.Header().Add("Content-Type", "application/json")
	w.Write([]byte{})
}
