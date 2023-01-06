package batch

import (
	"time"

	"github.com/go-co-op/gocron"
	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/quest-server/dal"
)

func BuildScheduler() *gocron.Scheduler {
	s := gocron.NewScheduler(time.UTC)

	// send messages
	s.Every(1).Day().At("01:00").Do(func() {
		err := SendMessages()
		if err != nil {
			logging.ErrorLogger.Println(err)
		}
		logging.InfoLogger.Println("Sent all messages.")

		err = dal.PurgeMessages()
		if err != nil {
			logging.ErrorLogger.Println(err)
		}
		logging.InfoLogger.Println("Purged all messages.")
	})

	// reset pool
	s.Every(1).Day().At("00:00").Do(func() {
		err := dal.ResetPool()
		if err != nil {
			logging.ErrorLogger.Println(err)
		}
		logging.InfoLogger.Println("Reset message pool.")
	})

	return s
}
