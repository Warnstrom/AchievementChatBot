package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/Warnstrom/TwitchChatAchievements/db"
	"github.com/Warnstrom/TwitchChatAchievements/handlers"
)

func main() {

	db.InitDatabase()

	r := mux.NewRouter()
	r.HandleFunc("/channels", handlers.GetActiveChannelsHandler).Methods("GET")
	r.HandleFunc("/achievements", handlers.GetAchievements).Methods("GET")

	// Start the server
	log.Println("Server started on :8080")
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
