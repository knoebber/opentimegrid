package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func setupRouter() *chi.Mux {
	router := chi.NewRouter()

	router.Use(middleware.RequestID)
	router.Use(middleware.RealIP)
	router.Use(middleware.Logger)
	staticRoutes(router)

	router.Route("/api/v1", func(api chi.Router) {
		authRoutes(api)
	})

	return router
}

func staticRoutes(router *chi.Mux) {
	serveFile := func(path string) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			http.ServeFile(w, r, path)
		}
	}

	// TODO create makefile to copy files from client to server, and then embed them.
	router.Get("/style.css", serveFile("build/assets/style.css"))
	router.Get("/favicon.ico", serveFile("build/assets/favicon.ico"))
	router.Get("/robots.txt", serveFile("build/assets/robots.txt"))
}

func authRoutes(router chi.Router) {
	router.Route("/auth", func(auth chi.Router) {
		auth.Get("/login", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("logged in"))
		})
	})
}
