package models

import (
	"time"
)

type TwitchViewer struct {
	ViewerID     uint      `json:"viewer_id"`
	ChannelID    uint      `json:"channel_id"`
	ViewerName   string    `json:"viewer_name" sqlite:"not null unique"`
	IsSubscriber bool      `json:"is_subscriber" sqlite:"default:false"`
	IsMod        bool      `json:"is_mod" sqlite:"default:false"`
	CreatedAt    time.Time `json:"created_at" sqlite:"autoCreateTime"`
}

type TwitchChannel struct {
	ChannelID   uint      `json:"channel_id"`
	ChannelName string    `json:"channel_name"`
	CreatedAt   time.Time `json:"created_at"`
	Active      uint      `json:"active"`
}

type SimpleTwitchChannel struct {
	ChannelID   uint   `json:"channel_id"`
	ChannelName string `json:"channel_name"`
}

type Category struct {
	CategoryID   uint `json:"category_id"`
	CategoryName uint `json:"category_name"`
	ChannelID    uint `json:"channel_id"`
}

type Achievement struct {
	AchievementID uint      `json:"achievement_id"`
	CategoryID    uint      `json:"category_id"`
	Level         uint      `json:"level"`
	Name          string    `json:"name" sqlite:"not null"`
	Description   string    `json:"description"`
	Goal          uint      `json:"goal"`
	CreatedAt     time.Time `json:"created_at" sqlite:"autoCreateTime"`
}

type ChatAchievement struct {
	AchievementID uint   `json:"achievement_id"`
	CategoryID    uint   `json:"category_id"`
	CategoryName  string `json:"category_name"`
	ChannelID     *uint  `json:"channel_id"`
	Level         uint   `json:"level"`
	Name          string `json:"name" sqlite:"not null"`
	Description   string `json:"description"`
	Goal          uint   `json:"goal"`
}

type UserAchievement struct {
	UserID        uint      `json:"user_id"`
	AchievementID uint      `json:"achievement_id"`
	EarnedAt      time.Time `json:"earned_at" sqlite:"autoCreateTime"`
}
