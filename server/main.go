package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"github.com/rogerzhang888/web-forum/server/db"
	"github.com/rogerzhang888/web-forum/server/routes"
)

func main() {
	// fs := http.FileServer(http.Dir("../client/dist"))
	// http.Handle("/", fs)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filepath.Join("../client/dist", "index.html"))
	})
	godotenv.Load()
	addr := os.Getenv("ADDR")
	if addr == "" {
		addr = "3000"
	}
	fmt.Printf("Starting server on %v\n", addr)

	if err := db.Init(); err != nil {
		log.Fatal(err)
	}

	http.ListenAndServe(":"+addr, router())
}

func router() http.Handler {
	allowedOrigin := os.Getenv("FRONTEND_ORIGIN")

	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{allowedOrigin},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	routes.RegisterRoutes(r)

	return r
}
