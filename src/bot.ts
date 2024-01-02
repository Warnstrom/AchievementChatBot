import tmi from 'tmi.js';
import { AchievementManager } from './AchievementManager';

interface User {
  username: string;
  totalMessages: number;
  badges: Set<string>;
  uniqueEmotesUsed: Set<string>;
  uniqueEmoteCount: Map<string, number>;
  totalEmotes: number;
  achievements: string[];
}

const achievementManager = new AchievementManager();

const TWITCH_USERNAME = process.env.TWITCH_USERNAME;
const TWITCH_OAUTH_TOKEN = process.env.TWITCH_OAUTH;

const config: tmi.Options = {
  options: { debug: true },
  connection: { reconnect: true },
  identity: { username: '', password: 'oauth:' },
  channels: [''],
};

const channels = new Map<string, Map<string, User>>();
const messageQueue: { channel: string; tags: tmi.ChatUserstate; message: string }[] = [];

const client = new tmi.Client(config);
client.connect();

client.on('message', (channel, tags, message, self) => {
  if (self) return;
  enqueueMessage(channel, tags, message);
});

function enqueueMessage(channel: string, tags: tmi.ChatUserstate, message: string) {
  messageQueue.push({ channel, tags, message });
  setImmediate(processMessages);
}

function processMessages() {
  while (messageQueue.length > 0) {
    const { channel, tags, message } = messageQueue.shift()!;
    processMessage(channel, tags, message);
  }
}

config?.channels?.forEach((channel) => {
  if (!channels.has(channel)) {
    channels.set(channel, new Map());
  }
});

function processEmotes(emotesObject: { [id: string]: string[] } | undefined, message: string): { id: string; name: string }[] {
  if (emotesObject != null) {
    return Object.entries(emotesObject).flatMap(([id, positions]) =>
      positions.map((position) => {
        const [start, end] = position.split('-');
        const name = message.substring(parseInt(start, 10), parseInt(end, 10) + 1);
        return { id, name };
      })
    );
  }
  return [];
}

function updateUserMap(channel: string, userId: string | undefined, username: string | undefined, badges: string[], emotes: { id: string; name: string }[]) {
 if (userId && username) {
  if (!channels.get(channel)!.has(userId)) {
    channels.get(channel)!.set(userId, {
      username,
      totalMessages: 0,
      badges: new Set(),
      uniqueEmotesUsed: new Set(),
      uniqueEmoteCount: new Map(),
      totalEmotes: 0,
      achievements: [],
    });
  }

  const user = channels.get(channel)!.get(userId)!;
  user.totalMessages++;

  const achievementMessage = achievementManager.checkAchievement('TotalMessages', user);
  if (achievementMessage != null) {
    client.say(channel, achievementMessage);
  }

  badges.forEach((badgeName) => user.badges.add(badgeName));

  const userEmotes = user.uniqueEmotesUsed;
  emotes.forEach((emote) => {
    user.totalEmotes++;
    userEmotes.add(emote.name);
    const emoteCounts = user.uniqueEmoteCount;
    emoteCounts.set(emote.name, (emoteCounts.get(emote.name) || 0) + 1);
    const achievementMessage = achievementManager.checkAchievement('EmoteCount', user);
    if (achievementMessage != null) {
      client.say(channel, achievementMessage);
    }
  });
}
}
function processMessage(channel: string, tags: tmi.ChatUserstate, message: string) {
  if (tags) {
  const userId = tags['user-id'];
  const username = tags['display-name'];
  const emotes = processEmotes(tags.emotes, message);
  updateUserMap(channel, userId,  username, Object.keys(tags.badges || {}), emotes);
  console.log(channels);
}
}
