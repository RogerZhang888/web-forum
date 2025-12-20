package main

import (
	"fmt"
	"net/http"
)

func main() {
	addr := ":3000"
	fmt.Printf("Starting server on %v\n", addr)
	http.ListenAndServe(addr, router())
}
