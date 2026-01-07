package db

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
)

var DB *sql.DB

func Init() error {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		return fmt.Errorf("DATABASE_URL not set")
	}

	var err error
	DB, err = sql.Open("pgx", dsn)
	if err != nil {
		return err
	}

	DB.SetMaxOpenConns(10)           // max concurrent DB connections
	DB.SetMaxIdleConns(5)            // idle connections kept
	DB.SetConnMaxLifetime(time.Hour) // recycle connections

	// verify connection
	if err := DB.Ping(); err != nil {
		return err
	}

	return nil
}
