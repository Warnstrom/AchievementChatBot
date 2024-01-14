CREATE TABLE Users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE TwitchViewers (
  viewer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  channel_id INTEGER,
  viewer_name TEXT NOT NULL UNIQUE,
  is_subscriber BOOLEAN DEFAULT 0,
  is_mod BOOLEAN DEFAULT 0,
  FOREIGN KEY (channel_id) REFERENCES TwitchChannel(channel_id)
);

CREATE TABLE TwitchChannel (
  channel_id INTEGER PRIMARY KEY AUTOINCREMENT,
  channel_name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE Achievements (
  achievement_id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  level INTEGER,
  name TEXT NOT NULL,
  description TEXT,
  goal INTEGER,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE UserAchievements (
  user_id INTEGER,
  achievement_id INTEGER,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, achievement_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (achievement_id) REFERENCES Achievements(achievement_id)
);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 1, 'Emote Novice', 'Unlocked the Emote Novice achievement - Level 1 for sending 100 emotes', 100);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 2, 'Emote Adept', 'Reached the Emote Adept achievement - Level 2 for sending 200 emotes', 200);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 3, 'Emote Prodigy', 'Achieved the Emote Prodigy achievement - Level 3 for sending 350 emotes', 350);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 4, 'Emote Master', 'Achieved Emote Master - Level 4 for sending 500 emotes', 500);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 5, 'Emote Virtuoso I', 'Earned the Emote Virtuoso I - Level 5 for sending 750 emotes', 750);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 6, 'Emote Virtuoso II', 'Reached the Emote Virtuoso II - Level 6 for sending 1000 emotes', 1000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 7, 'Emote Supreme', 'Achieved the Emote Supreme - Level 7 for sending 1500 emotes', 1500);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 8, 'Emote Luminary', 'Achieved Emote Luminary - Level 8 for sending 2000 emotes', 2000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 9, 'Emote Maestro', 'Earned the Emote Maestro - Level 9 for sending 4000 emotes', 4000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 10, 'Emote Virtuoso III', 'Achieved the Emote Virtuoso III - Level 10 for sending 5000 emotes', 5000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 11, 'Emote Savant', 'Reached the Emote Savant - Level 11 for sending 6000 emotes', 6000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 12, 'Emote Legend I', 'Achieved the Emote Legend I - Level 12 for sending 7000 emotes', 7000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 13, 'Emote Legend II', 'Achieved the Emote Legend II - Level 13 for sending 8000 emotes', 8000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 14, 'Emote Legend III', 'Earned the Emote Legend III - Level 14 for sending 9000 emotes', 9000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 15, 'Emote Overlord', 'Achieved the Emote Overlord - Level 15 for sending 10000 emotes', 10000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 16, 'Emote Overlord II', 'Achieved the Emote Overlord II - Level 16 for sending 15000 emotes', 15000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 17, 'Emote Supreme II', 'Earned the Emote Supreme II - Level 17 for sending 20000 emotes', 20000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 18, 'Emote Immortal', 'Achieved the Emote Immortal - Level 18 for sending 21000 emotes', 21000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 19, 'Emote Immortal II', 'Achieved the Emote Immortal - Level 19 for sending 25000 emotes', 25000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (1, 20, 'Emote GrandMaster', 'Reached the Emote Immortal - Level 20 for sending 30000 emotes', 30000);


INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 1, 'Messenger Novice', 'Unlocked the Messenger Novice achievement - Level 1 for sending 100 messages', 100);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 2, 'Messenger Adept', 'Reached the Messenger Adept achievement - Level 2 for sending 500 messages', 500);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 3, 'Chat Explorer', 'Achieved the Chat Explorer achievement - Level 3 for sending 1,000 messages', 1000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 4, 'Message Expert I', 'Achieved the Message Expert I - Level 4 for sending 2,000 messages', 2000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 5, 'Message Expert II', 'Earned the Message Expert II - Level 5 for sending 3,000 messages', 3000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 6, 'Message Expert III', 'Reached the Expert III - Level 6 for sending 5,000 messages', 5000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 7, 'Message Expert IIII', 'Achieved the Message Expert IIII- Level 7 for sending 7,500 messages', 7500);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 8, 'Chat Legend I', 'Achieved Chat Legend I - Level 8 for sending 10,000 messages', 10000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 9, 'Chat Legend II', 'Earned the legendary Chat Legend II - Level 9 for sending 12,500 messages', 12500);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 10, 'Chat Legend III', 'Achieved the prestigious Chat Legend III - Level 10 for sending 15,000 messages', 15000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 11, 'Message Master', 'Reached the elite Message Master - Level 11 for sending 17,500 messages', 17500);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 12, 'Message Overlord I', 'Achieved the renowned Message Overlord I - Level 12 for sending 20,000 messages', 20000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 13, 'Message Overlord II', 'Earned the supreme Message Overlord II - Level 13 for sending 25,000 messages', 25000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 14, 'Chat Icon I', 'Achieved the iconic Chat Icon I - Level 14 for sending 30,000 messages', 30000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 15, 'Chat Icon II', 'Achieved the prestigious Chat Icon II - Level 15 for sending 35,000 messages', 35000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 16, 'Message Legend', 'Earned the legendary Message Legend - Level 16 for sending 40,000 messages', 40000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 17, 'Chat Supreme I', 'Achieved the supreme Chat Supreme I - Level 17 for sending 45,000 messages', 45000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 18, 'Chat Supreme II', 'Achieved the renowned Chat Supreme II - Level 18 for sending 50,000 messages', 50000);

INSERT INTO Achievements (category_id, level, name, description, goal) VALUES 
  (3, 19, 'Chat Immortal', 'Reached the immortal Chat Immortal - Level 19 for sending 75,000 messages', 75000);

