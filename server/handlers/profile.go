package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/rogerzhang888/web-forum/server/db"
)

func CreateProfile(w http.ResponseWriter, r *http.Request) {
	type Profile struct {
		UserID   string `json:"user_id"`
		Username string `json:"username"`
		Email    string `json:"email"`
	}

	var data Profile

	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "invalid body", http.StatusBadRequest)
		return
	}

	var id string

	err := db.DB.QueryRow(`
		INSERT INTO profiles (id, username, email)
		VALUES ($1, $2, $3)
		RETURNING id
	`, data.UserID, data.Username, data.Email).Scan(&id)

	if err != nil {
		log.Println("failed to insert new profile into database:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"id": id})
}
