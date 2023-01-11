package batch

import (
	"os"
	"strconv"
	"time"

	"github.com/go-co-op/gocron"
	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/quest-server/dal"
)

func BuildScheduler() *gocron.Scheduler {
	s := gocron.NewScheduler(time.UTC)

	// reset pool
	s.Every(1).Day().At("05:00").Do(func() {
		total := os.Getenv("QUEST_POOL_TOTAL")
		totalInt, err := strconv.ParseInt(total, 10, 32)
		if err != nil {
			totalInt = 1000
			logging.ErrorLogger.Println(err)
		}

		err = dal.ResetPool(int32(totalInt))
		if err != nil {
			logging.ErrorLogger.Println(err)
		}
		logging.InfoLogger.Println("Reset message pool.")

		err = dal.PurgeMessages()
		if err != nil {
			logging.ErrorLogger.Println(err)
		}
		logging.InfoLogger.Println("Purge messages.")
	})

	return s
}
