package main

import (
	"log"
	"net/http"
	"time"

	"github.com/knoebber/opentimegrid/config"
)

func main() {
	if err := config.Set(); err != nil {
		panic(err)
	}

	timeout := time.Duration(config.Server.Timeout) * time.Second
	s := &http.Server{
		Addr:         config.Server.Addr,
		ReadTimeout:  timeout,
		WriteTimeout: timeout,
	}

	s.Handler = setupRouter()

	log.Printf("serving time at %s", config.Server.Addr)
	log.Fatal(s.ListenAndServe())
}
