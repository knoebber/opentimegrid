package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

type calendarResource struct{}

func (cr calendarResource) Routes() chi.Router {
	r := chi.NewRouter()
	r.Get("/", cr.events)
	return r
}

func (cr calendarResource) events(w http.ResponseWriter, r *http.Request) {
	values := r.URL.Query()

	result, err := parseCalendar(viewTypeMonth, getInt64(values, "start"))
	if err != nil {
		setError(w, err)
		return
	}

	setBody(w, body{Data: result})
}
