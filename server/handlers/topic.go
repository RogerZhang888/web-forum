package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rogerzhang888/web-forum/server/db"
)

func getTopics(w http.ResponseWriter, r *http.Request) {
	topics, err := db.DB.Query(`
		SELECT *
		FROM topics
	`)

	if err != nil {
		w.WriteHeader(422)
		w.Write([]byte(fmt.Sprintf("Error getting topics", err)))
		return
	}

	if topics == nil {
		w.Write([]byte("No topics found"))
		return
	}
}

func createTopic(w http.ResponseWriter, r *http.Request) {
	type TopicData struct {
		Name string `json:"name"`
	}
	var data TopicData

	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "invalid body", http.StatusBadRequest)
		return
	}

	var id int

	err := db.DB.QueryRow(`
		INSERT INTO topics (name)
		VALUES ($1)
		RETURNING id
	`, data.Name).Scan(&id)

	if err != nil {
		log.Println("failed to insert new topic into database:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]int{"id": id})

}

func deleteTopic(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	result, err := db.DB.Exec(`
		DELETE FROM topics
		WHERE id = $1
	`, id)

	if err != nil {
		log.Println("failed to delete topic from database:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, "no rows were affected", http.StatusNotFound)
		return
	}

}
