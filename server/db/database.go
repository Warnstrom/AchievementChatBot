// database.go
package db

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	"github.com/joho/godotenv"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

var DB *sql.DB

var (
	dbURL = "libsql://" + goDotEnvVariable("DB_NAME") + ".turso.io?authToken=" + goDotEnvVariable("DB_AUTH_TOKEN")
)

func goDotEnvVariable(key string) string {
	err := godotenv.Load(".env")

	if err != nil {
		fmt.Printf("Error loading .env file")
	}

	return os.Getenv(key)
}

func openDatabaseConnection() (*sql.DB, error) {
	db, err := sql.Open("libsql", dbURL)
	if err != nil {
		return nil, fmt.Errorf("failed to open db %s: %w", dbURL, err)
	}

	db.SetMaxIdleConns(10)

	go func() {
		ticker := time.NewTicker(1 * time.Hour)
		defer ticker.Stop()

		for range ticker.C {
			if err := db.Ping(); err != nil {
				fmt.Fprintf(os.Stderr, "Error pinging database: %v\n", err)
			}
		}
	}()

	return db, nil
}

func InitDatabase() {
	db, err := openDatabaseConnection()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}

	DB = db

}
