package db

import (
	"database/sql"
	"os"
)

var DB *sql.DB

func Init() error {
	dsn := os.Getenv(SUPABASE_URL)
	var err error
	DB, err = sql.Open("pgx", dsn)
	return err
}
