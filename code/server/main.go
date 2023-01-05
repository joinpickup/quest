package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joinpickup/middleware-go/database"
	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/middleware-go/support"
	"github.com/joinpickup/quest-server/app"
)

func main() {
	// setup env
	support.SetupEnv(false, nil)
	logging.SetupLogging()

	// setup variables
	port := 6053

	// init databse connection
	database.Init()

	r := app.NewRouter()

	support.RandomUniqueName()

	// listen on port
	fmt.Printf("Server running on port: %d\n", port)
	if support.SSL {
		fmt.Println("Production Server")
		log.Panic(http.ListenAndServe(fmt.Sprintf(":%d", port), r))
	} else {
		fmt.Println("Development Server")
		log.Panic(http.ListenAndServeTLS(fmt.Sprintf(":%d", port), "./ssl/joinpickup-dev.cer.pem", "./ssl/joinpickup-dev.key.pem", r))
	}
}
