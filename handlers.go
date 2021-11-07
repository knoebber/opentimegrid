package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/knoebber/opentimegrid/db"
	"github.com/knoebber/usererror"
)

var validate *validator.Validate

type body struct {
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

func handleLoginError(w http.ResponseWriter, email string, err error) {
	log.Printf("failed login attempt for %q: %s", email, err)
	setError(w, usererror.New("email or password is incorrect"))
}

func setError(w http.ResponseWriter, err error) {
	var uError *usererror.Error

	if errors.As(err, &uError) {
		customMessage(w, uError.Message)
	} else if db.NotFound(err) {
		notFound(w, err)
	} else {
		internalError(w, err)
	}
}

func invalid(w http.ResponseWriter, err error) {
	log.Printf("request invalid: %s", err)
	setBody(w, body{Message: "request invalid"})
}

func notFound(w http.ResponseWriter, err error) {
	log.Printf("resource not found: %s", err)
	setBody(w, body{Message: "resource not found"})
}

func customMessage(w http.ResponseWriter, message string) {
	log.Printf("request invalid: %s", message)
	setBody(w, body{Message: message})
}

func setBody(w http.ResponseWriter, b body) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(b); err != nil {
		internalError(w, fmt.Errorf("encoding json body: %w", err))
	}
}

func unauthorized(w http.ResponseWriter, err error) {
	log.Printf("unauthorized: %s", err)
	http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)

}
func permissionDenied(w http.ResponseWriter, err error) {
	log.Printf("permission denied: %s", err)
	http.Error(w, http.StatusText(http.StatusForbidden), http.StatusForbidden)
}

func badRequest(w http.ResponseWriter, err error) {
	log.Printf("bad request: %s", err)
	http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
}

func internalError(w http.ResponseWriter, err error) {
	log.Printf("internal error: %s", err)
	http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
}
