package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rogerzhang888/web-forum/server/db"
)

func GetTopics(w http.ResponseWriter, r *http.Request) {
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

func CreateTopic(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id").(string)

	type Topic struct {
		Name string `json:"name"`
	}
	var data Topic

	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "invalid body", http.StatusBadRequest)
		return
	}

	var id int

	err := db.DB.QueryRow(`
		INSERT INTO topics (name, created_by)
		VALUES ($1, $2)
		RETURNING id
	`, data.Name, userID).Scan(&id)

	if err != nil {
		log.Println("failed to insert new topic into database:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]int{"id": id})

}

func DeleteTopic(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id").(string)
	id := chi.URLParam(r, "topic_id")

	result, err := db.DB.Exec(`
		DELETE FROM topics
		WHERE id = $1
		AND created_by = $2
	`, id, userID)

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
