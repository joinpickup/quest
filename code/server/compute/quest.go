package compute

import (
	"fmt"
	"os"

	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/quest-server/dal"
	"github.com/joinpickup/quest-server/models"
	"github.com/twilio/twilio-go"
	twilioApi "github.com/twilio/twilio-go/rest/api/v2010"
	"golang.org/x/crypto/bcrypt"
)

func SendMessage(message models.QuestMessage) error {
	// setup vars
	accountSid := os.Getenv("TWILIO_SID")
	authToken := os.Getenv("TWILIO_AUTH")
	to := message.Phone

	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: accountSid,
		Password: authToken,
	})

	params := &twilioApi.CreateMessageParams{}
	params.SetTo(to)
	params.SetFrom(os.Getenv("TWILIO_PHONE"))
	params.SetBody(fmt.Sprintln("You were chosen for today's Daily Quest. \n\nGo to https://quest.joinpickup.com to see the prompt."))

	// before sending the message, do one more check to make sure that the message hasn't been completed by another process
	found, err := dal.GetMessage(message.MemberID)
	if err != nil {
		return err
	}

	if found != nil {
		return fmt.Errorf("someone already sent a message to that member today")
	}

	// queue the message
	err = dal.AddMessage(message)
	if err != nil {
		return err
	}

	// actually send the message
	_, err = client.Api.CreateMessage(params)
	if err != nil {
		err := dal.MarkMessageStatus("failed", message)
		if err != nil {
			logging.Logger.Error().Err(err).Stack().Msg("")
		}
		return err
	}

	logging.Logger.Info().Msg("Successfully sent message to " + message.PhoneHash)
	err = dal.MarkMessageStatus("sent", message)
	if err != nil {
		err = dal.MarkMessageStatus("failed", message)
		if err != nil {
			logging.Logger.Error().Err(err).Stack().Msg("")
		}
		return err
	}
	return nil
}

func CheckIfMember(to string) (*models.QuestMember, error) {
	members, err := dal.GetAllMembers()
	if err != nil {
		return nil, err
	}

	for _, mem := range members {
		err := bcrypt.CompareHashAndPassword([]byte(mem.PhoneHash), []byte(to))
		if err == nil {
			return &mem, err
		}
	}

	return nil, nil
}
