package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rogerzhang888/web-forum/server/db"
)

// get all posts under a topic
func getPostsByTopic(w http.ResponseWriter, r *http.Request) {
	topicID := chi.URLParam(r, "topicID")

	posts, err := db.DB.Query(`
		SELECT 
			posts.id, 
			posts.title,
			posts.content, 
			profiles.username
		FROM posts
		JOIN profiles ON posts.created_by = profiles.id
		WHERE posts.topic_id = $1
	`, topicID)

	if err != nil {
		w.WriteHeader(422)
		w.Write([]byte(fmt.Sprintf("Error getting posts", err)))
		return
	}

	defer posts.Close()

	type Post struct {
		ID int `json:"id"`
		Title string `json:"title"`
		Content string `json:"content"`
		Username string `json:"username"`
	}

	var posts [Post]

}

// get one post
func getPost(w http.ResponseWriter, r *http.Request) {

	topics, err := db.DB.Query(`
		SELECT id, title, content, topic_id
		FROM posts
		WHERE topic_id = $1
	`)

	if err != nil {
		w.WriteHeader(422)
		w.Write([]byte(fmt.Sprintf("Error getting posts", err)))
		return
	}

	if topics == nil {
		w.Write([]byte("No topics found"))
		return
	}
}

func createPost(w http.ResponseWriter, r *http.Request) {
	type PostData struct {
		Title   string `json:"title"`
		Content string `json:"content"`
		CreatedBy
	}
	var data PostData

	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "invalid body", http.StatusBadRequest)
		return
	}

	var id int

	err := db.DB.QueryRow(`
		INSERT INTO posts (title, content, )
		VALUES ($1, $2)
		RETURNING id
	`, data.Title, data.Content).Scan(&id)

	if err != nil {
		log.Println("failed to insert new post into database:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]int{"id": id})

}

func deletePost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	result, err := db.DB.Exec(`
		DELETE FROM posts
		WHERE id = $1
	`, id)

	if err != nil {
		log.Println("failed to delete post from database:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, "no rows were affected", http.StatusNotFound)
		return
	}

}
