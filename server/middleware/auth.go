package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

type contextKey string

const claimsContextKey contextKey = "userClaims"

type SupabaseClaims struct {
	jwt.RegisteredClaims
}

var publicKeyPem = os.Getenv("SUPABASE_PUBLIC_KEY")

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" || len(authHeader) < 7 || authHeader[:6] != "Bearer " {
			http.Error(w, "Authorization header is required", http.StatusUnauthorized)
			return
		}
		rawToken := authHeader[7:]

		parsedToken, err := jwt.ParseWithClaims(
			rawToken,
			&SupabaseClaims{},
			func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
					return nil, fmt.Errorf("unexpected signing method %v", token.Method)
				}

				publicKey, err := jwt.ParseRSAPublicKeyFromPEM([]byte(publicKeyPem))
				if err != nil {
					return nil, fmt.Errorf("failed to parse public key: %w", err)
				}
				return publicKey, nil
			})

		if err != nil || !parsedToken.Valid {
			http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
			return
		}

		// add claims to the request context
		claims, ok := parsedToken.Claims.(*SupabaseClaims)
		if !ok {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), claimsContextKey, claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
