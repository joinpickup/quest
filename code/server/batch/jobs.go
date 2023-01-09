package batch

import (
	"time"

	"github.com/go-co-op/gocron"
	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/quest-server/dal"
)

func BuildScheduler() *gocron.Scheduler {
	s := gocron.NewScheduler(time.UTC)

	// reset pool
	s.Every(1).Day().At("05:00").Do(func() {
		err := dal.ResetPool()
		if err != nil {
			logging.ErrorLogger.Println(err)
		}
		logging.InfoLogger.Println("Reset message pool.")
	})

	return s
}
