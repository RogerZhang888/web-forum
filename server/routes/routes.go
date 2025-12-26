package routes

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rogerzhang888/web-forum/server/handlers"
	"github.com/rogerzhang888/web-forum/server/middleware"
)

func RegisterRoutes(r chi.Router) {
	r.Group(func(r chi.Router) {
		r.Use(middleware.AuthMiddleware)
		r.Get("/me", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("SUCCESS!!! welcome to a private route"))
		})
		r.Post("/topics", handlers.CreateTopic)
		r.Delete("/topics/{topic_id}", handlers.DeleteTopic)
		r.Post("/topics/{topic_id}/posts", handlers.CreatePost)
		r.Post("/topics/{topic_id}/posts/{post_id}", handlers.DeletePost)
		r.Post("/posts/{post_id}/comments", handlers.CreateComment)
		r.Post("/posts/{post_id}/comments/{comment_id}", handlers.DeleteComment)

	})

	//Public routes
	r.Group(func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("welcome anonymous"))
		})
		r.Get("/topics", handlers.GetTopics)
		r.Get("/topics/{topic_id}/posts", handlers.GetPostsByTopic)
		r.Get("/topics/{topic_id}/posts/{post_id}", handlers.GetPost)
		r.Get("/posts/{post_id}/comments", handlers.GetCommentsbyPost)
	})
}
