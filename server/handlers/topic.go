package handlers

import (
	"fmt"
	"net/http"

	"github.com/rogerzhang888/web-forum/server/db"
)

func getTopics(w http.ResponseWriter, r *http.Request) {
	topics, err := db.DB.Query(`
		SELECT *
		FROM topics
	`)

	if err != nil {
		w.WriteHeader(422)
		w.Write([]byte(fmt.Sprintf("error getting topics", err)))
		return
	}

	if topics == nil {
		w.Write([]byte("No topics found"))
		return
	}
}
