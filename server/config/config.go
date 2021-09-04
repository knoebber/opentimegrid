// Package config loads configuration for the opentimegrid server.
package config

import (
	"flag"
)

var (
	// Server stores the web server configuration.
	Server *ServerConfiguration

	// Database stores the database configuration.
	Database *DatabaseConfiguration
)

// Set sets global configuration variables.
func Set() error {
	configPath := *flag.String("config-path", "", "path to a json configuration file")

	Database = new(DatabaseConfiguration)
	Server = new(ServerConfiguration)
	Server.setFlags()

	flag.Parse()

	if err := Database.set(configPath); err != nil {
		return err
	}

	return nil
}
