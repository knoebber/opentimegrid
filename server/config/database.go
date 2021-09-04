package config

import (
	"encoding/json"
	"fmt"
	"os"
)

// DatabaseConfiguration configures the database connection.
type DatabaseConfiguration struct {
	Host     string `json:"db_host"`
	Port     int    `json:"db_port"`
	Name     string `json:"db_name"`
	Schema   string `json:"db_schema"`
	Username string `json:"db_username"`
	Password string `json:"db_password"`
}

func (db *DatabaseConfiguration) set(filename string) error {
	if filename != "" {
		content, err := os.ReadFile(filename)
		if err != nil {
			return err
		}

		if err := json.Unmarshal(content, db); err != nil {
			return fmt.Errorf("unmarshaling database configuration: %w", err)
		}
	}
	if db.Host == "" {
		db.Host = "localhost"
	}
	if db.Port == 0 {
		// Default postgres port.
		db.Port = 5432
	}
	if db.Name == "" {
		db.Name = "opentimegrid"
	}
	if db.Username == "" {
		db.Username = os.Getenv("USER")
	}

	return nil
}
