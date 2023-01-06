package batch

import (
	"time"

	"github.com/go-co-op/gocron"
	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/quest-server/dal"
)

var (
	Working bool
)

func BuildScheduler() *gocron.Scheduler {
	Working = false
	s := gocron.NewScheduler(time.UTC)

	// send messages
	s.Every(1).Day().At("01:00").Do(func() {
		Working = true
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
		Working = false
	})

	return s
}
