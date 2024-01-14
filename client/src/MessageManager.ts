import tmi from 'tmi.js';
import { User } from './models/User/user';
import { Emote } from './models/Emote/emote';


class MessageManager {
  private channels: Map<string, Map<string, User>> = new Map();
  private messageQueue: { channel: string; tags: tmi.ChatUserstate; message: string }[] = [];
  constructor() {
  }

  enqueueMessage(channel: string, tags: tmi.ChatUserstate, message: string) {
    this.messageQueue.push({ channel, tags, message });
    setImmediate(this.processMessages.bind(this));
  }

  processMessages() {
    while (this.messageQueue.length > 0) {
      const { channel, tags, message } = this.messageQueue.shift()!;
      this.processMessage(channel, tags, message);
    }
  }

  processMessage(channelName: string, tags: tmi.ChatUserstate, message: string) {
    if (tags) {
      const { 'user-id': userId, 'display-name': username, 'room-id': channelId, emotes } = tags;
      const userEmotes: Emote[] = this.processEmotes(emotes, message);
      const channel: Map<string, User> = this.channels.get(channelId)
      if (!channel) {
        this.addNewChannel(channelId)
      }
      const user = this.channels.get(channelId).get(userId)
      if (!user) {
        this.addNewUser(channelId, userId, username, userEmotes.length)
      } else {

        this.updateUserProperties(user, userEmotes)
      }
    console.log(Array.from(this.channels.get(channelId)))
    }
  }

  private processEmotes(emotesObject: { [id: string]: string[] } | undefined, message: string): Emote[] {
    return emotesObject
      ? Object.entries(emotesObject).flatMap(([id, positions]) =>
          positions.map((position) => {
            const [start, end] = position.split('-');
            const name = message.substring(parseInt(start, 10), parseInt(end, 10) + 1);
            return { id, name };
          })
        )
      : [];
  }
  
  private addNewChannel(channelId: string) {
    this.channels.set(channelId, new Map<string, User>())
  }

  private addNewUser(channelId: string, userId: string, username: string, emoteCount: number) {
    const user = {
      userId,
      username,
      totalMessages: 1,
      badges: new Set<string>(),
      uniqueEmotesUsed: new Set<string>(),
      uniqueEmoteCount: new Map<string, number>(),
      totalEmotes: emoteCount,
      achievements: [],
    };
      this.channels.get(channelId).set(userId, user)
  }

  private updateUserProperties(user: User, emotes: Emote[]) {
    user.totalMessages++;

    const userEmotes = user.uniqueEmotesUsed;
    emotes.forEach((emote) => {
      user.totalEmotes++;
      userEmotes.add(emote.name);

      const emoteCounts = user.uniqueEmoteCount;
      emoteCounts.set(emote.name, (emoteCounts.get(emote.name) || 0) + 1);
    });
  }
}

const messageManager = new MessageManager();

export default messageManager;