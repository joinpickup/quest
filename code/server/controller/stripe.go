package controller

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/quest-server/dal"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/webhook"
)

func CheckoutCallback(w http.ResponseWriter, r *http.Request) {
	const MaxBodyBytes = int64(65536)
	r.Body = http.MaxBytesReader(w, r.Body, MaxBodyBytes)

	body, err := io.ReadAll(r.Body)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Pass the request body and Stripe-Signature header to ConstructEvent, along with the webhook signing key
	// You can find your endpoint's secret in your webhook settings
	webhookKey := os.Getenv("STRIPE_WEBHOOK_KEY")
	fmt.Println(webhookKey)
	event, err := webhook.ConstructEvent(body, r.Header.Get("Stripe-Signature"), webhookKey)

	if err != nil {
		logging.ErrorLogger.Printf("Error verifying webhook signature: %v\n", err)
		http.Error(w, fmt.Sprintf("Error verifying webhook signature: %v", err), http.StatusBadRequest)
		return
	}

	if event.Type == "charge.succeeded" {
		var charge stripe.Charge
		err := json.Unmarshal(event.Data.Raw, &charge)
		if err != nil {
			logging.ErrorLogger.Println("Could no parse webhook " + err.Error())
			http.Error(w, "Could not parse webhook + "+err.Error(), http.StatusBadRequest)
			return
		}
		amount := charge.Amount / 10
		err = dal.AddMessagesToPool(int32(amount))
		if err != nil {
			logging.ErrorLogger.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte{})
	} else {
		w.WriteHeader(http.StatusNotModified)
		w.Write([]byte{})
	}
}
