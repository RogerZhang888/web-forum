package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/rogerzhang888/web-forum/server/db"
)

// get all posts under a topic
func GetCommentsbyPost(w http.ResponseWriter, r *http.Request) {
	postID := chi.URLParam(r, "post_id")

	rows, err := db.DB.Query(`
		SELECT 
			comments.id,
			comments.post_id,
			comments.created_by,
			comments.content, 
			profiles.username
		FROM comments
		JOIN profiles ON comments.created_by = profiles.id
		WHERE comments.post_id = $1
	`, postID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	type Comment struct {
		ID        int    `json:"id"`
		PostID    int    `json:"post_id"`
		CreatedBy string `json:"created_by"`
		Content   string `json:"content"`
		Username  string `json:"username"`
	}

	var comments []Comment

	for rows.Next() {
		var p Comment
		if err := rows.Scan(&p.ID, &p.PostID, &p.CreatedBy, &p.Content, &p.Username); err != nil {
			log.Println("failed to scan comment:", err)
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}

		comments = append(comments, p)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(comments)

}

func CreateComment(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(string)
	postIDStr := chi.URLParam(r, "post_id")
	postID, err := strconv.Atoi(postIDStr)

	if err != nil {
		http.Error(w, "invalid post id", http.StatusBadRequest)
		return
	}

	type Comment struct {
		Content string `json:"content"`
	}
	var data Comment

	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "invalid body", http.StatusBadRequest)
		return
	}

	var id int

	err = db.DB.QueryRow(`
		INSERT INTO comments (created_by, post_id, content)
		VALUES ($1, $2, $3)
		RETURNING id
	`, userID, postID, data.Content).Scan(&id)

	if err != nil {
		log.Println("failed to insert new post into database:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]int{"id": id})

}

func DeleteComment(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(string)
	id := chi.URLParam(r, "comment_id")

	result, err := db.DB.Exec(`
		DELETE FROM comments
		WHERE id = $1
		AND created_by = $2
	`, id, userID)

	if err != nil {
		log.Println("failed to delete comment from database:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, "no rows were affected", http.StatusNotFound)
		return
	}

}
