package middleware

import (
	"context"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/supabase-community/auth-go"
)

func AuthMiddleware(next http.Handler) http.Handler {

	projectRef := os.Getenv("SUPABASE_PROJECT_REF")
	apiKey := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")

	authClient := auth.New(projectRef, apiKey)

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			http.Error(w, "Authorization header required", http.StatusUnauthorized)
			return
		}

		token := strings.TrimPrefix(authHeader, "Bearer ")
		log.Println("Token received:", token)

		// Validate JWT and get user
		user, err := authClient.WithToken(token).GetUser()
		if err != nil {
			log.Println("GetUser error:", err)
		}
		if user != nil {
			log.Println("Authenticated user ID:", user.ID)
		}

		// Add user ID to context
		ctx := context.WithValue(r.Context(), "userID", user.ID.String())
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
