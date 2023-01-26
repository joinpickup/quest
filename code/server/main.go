package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joinpickup/middleware-go/database"
	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/middleware-go/support"
	"github.com/joinpickup/quest-server/app"
	"github.com/joinpickup/quest-server/batch"
)

func main() {
	// setup env
	support.SetupEnv(false, nil)
	// env := ".env"
	// support.SetupEnv(true, &env)
	logging.SetupLogging()

	// setup variables
	port := 6053

	// init databse connection
	database.Init()
	r := app.NewRouter()

	// run cron jobs
	s := batch.BuildScheduler()
	s.StartAsync()

	// listen on port
	logging.Logger.Info().Msg(fmt.Sprintf("Server running on port: %d\n", port))
	if support.SSL {
		logging.Logger.Info().Msg("Production Server")
		log.Panic(http.ListenAndServe(fmt.Sprintf(":%d", port), r))
	} else {
		logging.Logger.Info().Msg("Development Server")
		log.Panic(http.ListenAndServeTLS(fmt.Sprintf(":%d", port), "./ssl/joinpickup-dev.cer.pem", "./ssl/joinpickup-dev.key.pem", r))
	}
}
