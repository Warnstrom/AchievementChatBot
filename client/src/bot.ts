import apiManager from "./ApiManager";
import { SimpleTwitchChannel } from "./models/Channel/twitchchannel";
import TwitchEventSubListener from "./TwitchEventManager";
import { TwitchHelix } from "./HelixManager";
import achievementManager from "./AchievementManager";
import { None, Option, Some } from "./models/Experimental/experimentaltypes";
import { ENV } from "./config";

const helixManager = new TwitchHelix(ENV.CLIENT_ID, ENV.CLIENT_SECRET);
const twitchListener = new TwitchEventSubListener(
  ENV.CLIENT_ID,
  ENV.USER_ACCESS_TOKEN
);

async function main() {
    const result: Option<SimpleTwitchChannel[]> = await apiManager.get(
      "/channels"
    );
    if (result instanceof Some) {
    for (const channel of result.getValue()) {
      try {
        const user = await helixManager.getUserByUsername(channel.channel_name);
        await achievementManager.loadAchievements(channel.channel_id)
        await twitchListener.subscribeToEventSub([
          { type: 'stream.online', broadcaster_user_id: user.id },
          { type: 'stream.offline', broadcaster_user_id: user.id },
        ]);
      } catch (error) {
        console.error(`Error subscribing to events for ${channel.channel_name}:`, error);
      }
    }
  } else if (result instanceof None) {
    throw new Error('Request failed or data is empty.');
  }

}

main()
