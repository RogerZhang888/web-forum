package db

import (
	"database/sql"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)

var DB *sql.DB

func Init() error {
	dsn := os.Getenv("DATABASE_URL")
	var err error
	DB, err = sql.Open("pgx", dsn)
	return err
}
