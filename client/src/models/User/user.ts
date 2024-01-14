import { UserAchievement } from "./userachievementcategory";

export type User = {
    userId: string;
    username: string;
    totalMessages: number;
    badges: Set<string>;
    uniqueEmotesUsed: Set<string>;
    uniqueEmoteCount: Map<string, number>;
    totalEmotes: number;
    achievements: UserAchievement[];
  }