package main

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"

	"github.com/go-chi/chi/v5"
	"github.com/rogerzhang888/web-forum/server/db"
	"github.com/rogerzhang888/web-forum/server/routes"
)

func main() {
	addr := ":3000"
	fmt.Printf("Starting server on %v\n", addr)

	if err := db.Init(); err != nil {
		log.Fatal(err)
	}

	http.ListenAndServe(addr, router())
}

func router() http.Handler {

	r := chi.NewRouter()
	routes.RegisterRoutes(r)

	req := httptest.NewRequest("GET", "/test", nil)
	rr := httptest.NewRecorder()

	r.ServeHTTP(rr, req)

	assert.Equal(t, 200, rr.Code)
	assert.Equal(t, "expected", rr.Body.String())
	return r
}
