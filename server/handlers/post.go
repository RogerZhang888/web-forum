package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rogerzhang888/web-forum/server/db"
)

// get all posts under a topic
func GetPostsByTopic(w http.ResponseWriter, r *http.Request) {
	topicID := chi.URLParam(r, "topic_id")

	rows, err := db.DB.Query(`
		SELECT 
			posts.id, 
			posts.title,
			posts.content, 
			topics.name,
			profiles.username
		FROM posts
		JOIN topics ON posts.topic_id = topics.id
		JOIN profiles ON posts.created_by = profiles.id
		WHERE posts.topic_id = $1
	`, topicID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	type Post struct {
		ID       int    `json:"id"`
		Title    string `json:"title"`
		Content  string `json:"content"`
		Topic    string `json:"name"`
		Username string `json:"username"`
	}

	var posts []Post //declare variable posts as an array where each element is of type Post

	for rows.Next() {
		var p Post
		if err := rows.Scan(&p.ID, &p.Title, &p.Content, &p.Topic, &p.Username); err != nil {
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}

		posts = append(posts, p)
	}

	json.NewEncoder(w).Encode(posts)

}

// get one post
func GetPost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "post_id")

	row := db.DB.QueryRow(`
		SELECT 
			posts.id, 
			posts.title, 
			posts.content,
			profiles.username
		FROM posts
		JOIN profiles ON posts.created_by = profiles.id
		WHERE posts.id = $1

	`, id)

	type Post struct {
		ID       int    `json:"id"`
		Title    string `json:"title"`
		Content  string `json:"content"`
		Username string `json:"username"`
	}

	var post Post

	err := row.Scan(&post.ID, &post.Title, &post.Content, &post.Username)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "post not found", http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}

func CreatePost(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id").(string)
	type Post struct {
		Title   string `json:"title"`
		Content string `json:"content"`
	}

	var data Post

	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "invalid body", http.StatusBadRequest)
		return
	}

	var id int

	err := db.DB.QueryRow(`
		INSERT INTO posts (created_by, title, content)
		VALUES ($1, $2, $3)
		RETURNING id
	`, userID, data.Title, data.Content).Scan(&id)

	if err != nil {
		log.Println("failed to insert new post into database:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]int{"id": id})

}

func DeletePost(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id").(string)
	id := chi.URLParam(r, "post_id")

	result, err := db.DB.Exec(`
		DELETE FROM posts
		WHERE id = $1
		AND created_by = $2
	`, id, userID)

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
