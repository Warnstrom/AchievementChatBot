package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/Warnstrom/TwitchChatAchievements/db"
	"github.com/Warnstrom/TwitchChatAchievements/models"
	"github.com/joho/godotenv"
)

func GetActiveChannelsHandler(w http.ResponseWriter, r *http.Request) {
	var channels []models.SimpleTwitchChannel

	rows, err := db.DB.Query("SELECT channel_id, channel_name FROM TwitchChannel WHERE active = 1;")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var channel models.SimpleTwitchChannel

		err := rows.Scan(&channel.ChannelID, &channel.ChannelName)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error scanning row: %v\n", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
		channels = append(channels, channel)
	}
	json.NewEncoder(w).Encode(channels)
}

func GetAchievements(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()
	channelID := queryParams.Get("channel_id")
	authorization := r.Header.Get("Authorization")
	if authorization == goDotEnvVariable("API_AUTH_KEY") {
		achievementList := make(map[string][]models.ChatAchievement)

		var query = "SELECT c.channel_id, c.category_name, a.level, a.name, a.goal, a.description, a.achievement_id FROM Categories c LEFT JOIN Achievements a ON c.category_id = a.category_id WHERE c.channel_id IS NULL OR c.channel_id = " + channelID + ";"

		rows, err := db.DB.Query(query)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error: %v\n", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		for rows.Next() {
			var achievement models.ChatAchievement

			err := rows.Scan(&achievement.ChannelID, &achievement.CategoryName, &achievement.Level, &achievement.Name, &achievement.Goal, &achievement.Description, &achievement.AchievementID)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error scanning row: %v\n", err)
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				return
			}

			value, exists := achievementList[achievement.CategoryName]
			if !exists {
				value = []models.ChatAchievement{}
			}

			value = append(value, achievement)
			achievementList[achievement.CategoryName] = value
		}
		json.NewEncoder(w).Encode(achievementList)
	} else {
		fmt.Printf("ASDASDASDASDASDASDASDASDASD")
	}
}

func goDotEnvVariable(key string) string {

	err := godotenv.Load(".env")

	if err != nil {
		fmt.Printf("Error loading .env file")
	}

	return os.Getenv(key)
}
