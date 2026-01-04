package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)

var DB *sql.DB

func Init() error {
	dsn := os.Getenv("DATABASE_URL")
	log.Println("DATABASE_URL =", dsn)
	var err error
	DB, err = sql.Open("pgx", dsn)
	return err
}
