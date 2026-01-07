package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	"github.com/rogerzhang888/web-forum/server/db"
	"github.com/rogerzhang888/web-forum/server/routes"
)

func main() {
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
	handler := WithCORS(router())

	http.ListenAndServe(":"+addr, handler)
}

func router() http.Handler {

	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	routes.RegisterRoutes(r)

	return r
}
