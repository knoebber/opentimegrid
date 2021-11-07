package main

import (
	"log"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/knoebber/opentimegrid/config"
	"github.com/knoebber/opentimegrid/db"
)

const timeout = 120 * time.Second

func main() {
	serverConfig := config.Server()
	validate = validator.New()

	if err := setup(); err != nil {
		log.Fatalf("setting up server: %s", err)
	}

	s := &http.Server{
		Addr:         serverConfig.Addr,
		ReadTimeout:  timeout,
		WriteTimeout: timeout,
	}

	s.Handler = setupRouter(serverConfig)

	log.Printf("serving time at %s", serverConfig.Addr)
	log.Fatal(s.ListenAndServe())
}

func setup() error {
	if err := db.Start(config.DB()); err != nil {
		return err
	}

	return nil
}
