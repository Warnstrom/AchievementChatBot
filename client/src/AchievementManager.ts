import apiManager from "./ApiManager";
import { CategoryAchievement } from "./models/Achievement/categoryachievement";
import { None, Option, Some } from "./models/Experimental/experimentaltypes";

class AchievementManager {
  private activeMap: Map<string, CategoryAchievement[]> = new Map();

  constructor() {}


  public async loadAchievements(channelId?: string): Promise<void> {
      const result: Option<CategoryAchievement> = await apiManager.get(`/achievements?channel_id=${channelId}`);
      if (result instanceof Some) {
        const data = result.getValue();
        this.mapAchievements(channelId, data);
      } else if (result instanceof None) {
        throw new Error('Request failed or data is empty.');
      }
  }

  private mapAchievements(channelId: string | undefined, data: CategoryAchievement): void {
    if (channelId && data) {
      const categoryAchievements: CategoryAchievement[] = Object.keys(data).map(categoryName => ({
        name: categoryName,
        achievements: data[categoryName],
      }));

      this.activeMap.set(channelId, categoryAchievements);
    }
    console.log(Array.from(this.activeMap), this.activeMap.get(channelId))
  }

  public checkUserAchievement(channelId: string, userId: string) {
    if (!this.activeMap.has(channelId)) return;
    const channel = this.activeMap.get(channelId)
  }
}

const achievementManager = new AchievementManager();

export default achievementManager;
