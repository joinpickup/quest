package controller

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/dongri/phonenumber"
	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/middleware-go/support"
	"github.com/joinpickup/quest-server/compute"
	"github.com/joinpickup/quest-server/dal"
	"github.com/joinpickup/quest-server/middleware"
	"github.com/joinpickup/quest-server/models"
	"golang.org/x/crypto/bcrypt"
)

func GetStatus() *models.QuestStatus {
	var status models.QuestStatus
	remaining, _ := dal.GetQuestPool()
	total, err := dal.GetMemberTotal()
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

	status.Remaining = remaining.Remaining
	status.MemberTotal = total
	return &status
}

func QuestStatus(w http.ResponseWriter, r *http.Request) {
	status := GetStatus()
	statusStr, _ := json.Marshal(status)
	// set header and return
	w.Write(statusStr)
}

func SendMessage(w http.ResponseWriter, r *http.Request) {
	_, err := middleware.ValidateToken(r)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// check app status
	status := GetStatus()
	if !status.CanMessage {
		logging.ErrorLogger.Println(status.Message)
		http.Error(w, status.Message, http.StatusBadRequest)
		return
	}

	to := r.URL.Query().Get("phone")
	if phonenumber.Parse(to, "US") == "" {
		logging.ErrorLogger.Println("Please enter a valid phone number.")
		http.Error(w, "Please enter a valid phone number.", http.StatusBadRequest)
		return
	}

	// check if member
	found, err := compute.CheckIfMember(to)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if found == nil {
		logging.ErrorLogger.Println("Not a member.")
		http.Error(w, "Not a member.", http.StatusBadRequest)
		return
	}

	// craft message
	message := models.QuestMessage{
		Phone:     to,
		PhoneHash: found.PhoneHash,
		Status:    "queued",
		MemberID:  found.ID,
	}

	// add message to db
	err = compute.SendMessage(message)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// subtract from remaining
	w.Header().Add("Content-Type", "application/json")
	w.Write([]byte{})
}

func Join(w http.ResponseWriter, r *http.Request) {
	_, err := middleware.ValidateToken(r)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	to := r.URL.Query().Get("phone")
	if phonenumber.Parse(to, "US") == "" {
		logging.ErrorLogger.Println("Please enter a valid phone number.")
		http.Error(w, "Please enter a valid phone number.", http.StatusBadRequest)
		return
	}

	// code
	found, err := compute.CheckIfMember(to)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if found != nil {
		logging.ErrorLogger.Println("Already a member.")
		http.Error(w, "Already a member.", http.StatusBadRequest)
		return
	}

	// create hash
	hashedTo, err := bcrypt.GenerateFromPassword([]byte(to), bcrypt.DefaultCost)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = dal.AddMember(string(hashedTo))
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.Write([]byte{})
}

func Leave(w http.ResponseWriter, r *http.Request) {
	_, err := middleware.ValidateToken(r)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	to := r.URL.Query().Get("phone")
	if phonenumber.Parse(to, "US") == "" {
		logging.ErrorLogger.Println("Please enter a valid phone number.")
		http.Error(w, "Please enter a valid phone number.", http.StatusBadRequest)
		return
	}

	// code
	found, err := compute.CheckIfMember(to)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if found == nil {
		logging.ErrorLogger.Println("Not a member.")
		http.Error(w, "Not a member.", http.StatusBadRequest)
		return
	}

	// code
	err = dal.RemoveMember(found.ID)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.Write([]byte{})
}
