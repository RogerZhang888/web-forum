package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"github.com/rogerzhang888/web-forum/server/db"
	"github.com/rogerzhang888/web-forum/server/routes"
)

func main() {
	addr := ":3000"
	fmt.Printf("Starting server on %v\n", addr)

	godotenv.Load()
	if err := db.Init(); err != nil {
		log.Fatal(err)
	}

	http.ListenAndServe(addr, router())
}

func router() http.Handler {

	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	routes.RegisterRoutes(r)

	return r
}
