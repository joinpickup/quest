package app

import (
	"github.com/go-chi/chi/v5"
	chi_m "github.com/go-chi/chi/v5/middleware"
	"github.com/joinpickup/middleware-go/logging"
	"github.com/joinpickup/quest-server/controller"
)

func NewRouter() chi.Router {
	r := chi.NewRouter()

	// establish middleware
	r.Use(chi_m.Logger)
	r.Use(logging.LoggerMiddleware(&logging.Logger))

	r.Get("/", controller.GetHealth)

	// setup routes
	r.Route("/v1", func(r chi.Router) {
		// health routes
		r.Get("/healthping", controller.GetPing)
		r.Get("/health", controller.GetHealth)
		r.Get("/status", controller.QuestStatus)
		r.Post("/message", controller.SendMessage)
		r.Post("/join", controller.Join)
		r.Post("/leave", controller.Leave)
		r.Route("/otp", func(r chi.Router) {
			r.Post("/send", controller.SendOTP)
			r.Post("/verify", controller.VerifyOTP)
		})
		r.Post("/payment-callback", controller.CheckoutCallback)
	})

	return r
}
