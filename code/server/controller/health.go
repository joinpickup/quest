package controller

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/joinpickup/middleware-go/database"
	"github.com/joinpickup/middleware-go/models"
	"github.com/joinpickup/middleware-go/support"
)

func GetHealth(w http.ResponseWriter, r *http.Request) {
	health := models.Health{
		Status:  "online",
		Version: support.TrimQuotes(os.Getenv("KEEPER_VERSION")),
		Tests:   []models.HealthTest{},
	}

	// setup health tests
	// check database connection
	var databaseTest models.HealthTest

	// try to connect
	err := database.DB.Ping()

	if err != nil {
		databaseTest = models.HealthTest{
			Name:    "Failed to connect to the database",
			Status:  "failed",
			Message: err.Error(),
		}
		health.Status = "failed"
	} else {
		databaseTest = models.HealthTest{
			Name:    "Can connect to database",
			Status:  "success",
			Message: "",
		}
	}

	health.Tests = append(health.Tests, databaseTest)

	heatlhJS, _ := json.Marshal(health)

	// set header and return
	w.Header().Add("Content-Type", "application/json")
	w.Write(heatlhJS)
}

func GetPing(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("pong"))
}
