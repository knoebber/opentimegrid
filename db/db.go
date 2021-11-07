// Package db provides a postgresql connection pool.
package db

import (
	"context"
	_ "embed"
	"fmt"

	"github.com/jackc/pgx/v4/pgxpool"
)

//go:embed schema.sql
var schema []byte

// Conn is a global threadsafe postgresql database handle.
var Conn *pgxpool.Pool

// Start connects to a postgres database and schema when it doesn't exist.
func Start(connString string) (err error) {
	Conn, err = pgxpool.Connect(context.Background(), connString)
	if err != nil {
		return fmt.Errorf("failed to start to database: %w", err)
	}

	if _, err := Conn.Exec(context.Background(), string(schema)); err != nil {
		return fmt.Errorf("failed to create database schema: %w", err)
	}

	return nil
}

func NotFound(err error) bool {
	// TODO
	return false
}

// Close closes the database connection.
func Close() {
	Conn.Close()
}
