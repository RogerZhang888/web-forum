package db

import (
	"database/sql"
	"os"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
	_ "github.com/jackc/pgx/v5/stdlib"
)

var DB *sql.DB

func Init() error {
	cfg, err := pgx.ParseConfig(os.Getenv("DATABASE_URL"))
	if err != nil {
		return err
	}

	cfg.DefaultQueryExecMode = pgx.QueryExecModeSimpleProtocol

	DB = stdlib.OpenDB(*cfg)

	DB.SetMaxOpenConns(10)                  // max concurrent DB connections
	DB.SetMaxIdleConns(5)                   // idle connections kept
	DB.SetConnMaxLifetime(time.Hour)        // recycle connections
	DB.SetConnMaxIdleTime(30 * time.Minute) // max connection idle time

	// verify connection
	if err := DB.Ping(); err != nil {
		return err
	}

	return nil
}
