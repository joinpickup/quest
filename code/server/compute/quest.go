package compute

import (
	"fmt"
	"os"

	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/quest-server/dal"
	"github.com/joinpickup/quest-server/models"
	"github.com/twilio/twilio-go"
	twilioApi "github.com/twilio/twilio-go/rest/api/v2010"
)

func SendMessage(message models.QuestMessage) error {
	// setup vars
	accountSid := os.Getenv("TWILIO_SID")
	authToken := os.Getenv("TWILIO_AUTH")
	to := message.PhoneHash

	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: accountSid,
		Password: authToken,
	})

	params := &twilioApi.CreateMessageParams{}
	params.SetTo(to)
	params.SetFrom(os.Getenv("TWILIO_PHONE"))
	params.SetBody(fmt.Sprintf("Someone chose you for The Daily Quest today. \n\n%s\n\nGo to https://quest.joinpickup.com for information on how to participate tomorrow.", message.Quest))

	// before sending the message, do one more check to make sure that the message hasn't been completed by another process
	found, err := dal.GetMessage(message.PhoneHash)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		return err
	}

	if found != nil {
		logging.ErrorLogger.Println("Message was already sent to that person today.")
		return fmt.Errorf("message was already sent today")
	}

	// actually send the message
	_, err = client.Api.CreateMessage(params)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		err := dal.MarkMessageStatus("failed", message)
		if err != nil {
			logging.ErrorLogger.Println(err.Error())
		}
		return err
	}

	logging.InfoLogger.Println("Successfully sent message to " + message.PhoneHash)
	err = dal.MarkMessageStatus("sent", message)
	if err != nil {
		logging.ErrorLogger.Println(err.Error())
		err = dal.MarkMessageStatus("failed", message)
		if err != nil {
			logging.ErrorLogger.Println(err.Error())
		}
		return err
	}
	return nil
}
