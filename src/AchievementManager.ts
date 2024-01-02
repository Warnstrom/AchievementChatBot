interface AchievementData {
  category: string;
  achievements: Achievement[];
}

interface Achievement {
  id: number;
  level: number;
  name: string;
  description: string;
  goal: number;
}

class AchievementManager {
  achievements: Achievement[] = [];

  constructor() {
    this.loadAchievements();
  }

  loadAchievements() {
    this.achievements = achievementsData
      .flatMap((data) => data.achievements.map((achievement) => ({
        id: achievement.id,
        level: achievement.level,
        name: achievement.name,
        description: achievement.description,
        goal: achievement.goal,
      })));
  }

  checkAchievement(category: string, user: any): string | null {
    const categoryAchievements = achievementsData.find((raccoon) => raccoon.category === category);

    if (categoryAchievements) {
      const userAchievements: Achievement[] = user.achievements || [];

      console.log(userAchievements);

      const matchingAchievement = categoryAchievements.achievements.find((achievement) => user.totalMessages === achievement.goal);

      if (matchingAchievement) {
        const message = `${user.username} ${matchingAchievement.description}`;
        return message;
      } else {
        return null;
      }
    } else {
      console.error(`Category ${category} not found`);
      return '';
    }
  }
}

const achievementsData: AchievementData[] = [
  {
    category: 'EmoteCount',
    achievements: [
      {
        id: 1,
        level: 1,
        name: 'EMOTECOUNT',
        description: 'received Emote Count achievement level 1 for sending 10 emotes',
        goal: 10,
      },
      {
        id: 2,
        level: 5,
        name: 'EMOTECOUNT',
        description: 'received Emote Count achievement level 5 for sending 50 emotes',
        goal: 50,
      },
    ],
  },
  {
    category: 'UniqueEmoteCount',
    achievements: [],
  },
  {
    category: 'TotalMessages',
    achievements: [
      {
        id: 1,
        level: 1,
        name: 'Total Message Count',
        description: 'received Total Message Count achievement level 1 for sending 10 messages',
        goal: 10,
      },
      {
        id: 2,
        level: 2,
        name: 'Total Message Count',
        description: 'received Total Message Count achievement level 2 for sending 50 messages',
        goal: 50,
      },
    ],
  },
];

class Achievement {
  id: number;
  level: number;
  name: string;
  description: string;
  goal: number;

  constructor(id: number, level: number, name: string, description: string, goal: number) {
    this.id = id;
    this.level = level;
    this.name = name;
    this.description = description;
    this.goal = goal;
  }
}

export { AchievementManager };
