package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rogerzhang888/web-forum/server/db"
)

type Topic struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description *string `json:"description"`
}

func GetTopics(w http.ResponseWriter, r *http.Request) {
	rows, err := db.DB.Query(`
		SELECT id, name, description
		FROM topics
	`)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if rows == nil {
		w.Write([]byte("No topics found"))
		return
	}

	defer rows.Close()

	topics := []Topic{}

	for rows.Next() {
		var t Topic
		err := rows.Scan(&t.ID, &t.Name, &t.Description)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnprocessableEntity)
			return
		}
		topics = append(topics, t)
	}

	json.NewEncoder(w).Encode(topics)
}

func CreateTopic(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(string)

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
