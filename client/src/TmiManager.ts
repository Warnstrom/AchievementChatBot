import tmi, { Options, ChatUserstate } from 'tmi.js';
import messageManager from './MessageManager';
import CommandManager from './CommandManager';

export class TMIManager {
  private tmiClient: tmi.Client;
  private commandManager: CommandManager
  constructor(config: Options) {
    this.tmiClient = new tmi.client(config);
    this.commandManager = new CommandManager(this.tmiClient);
    this.tmiClient.connect();
    this.tmiClient.on("message", (channel, tags, message, self) => this.handleChatMessage(channel, tags, message, self));
  }

  private handleChatMessage(channel: string, tags: ChatUserstate, message: string, self: boolean): void {
    if (self) return;

    const command = this.extractCommand(message);

    if (command) {
      this.handleCommand(channel, tags.username, tags["user-id"], command);
    } else {
      this.enqueueMessage(channel, tags, message);
    }
  }

  public joinChannel(channel: string): void {
    this.tmiClient.join(channel)
  }

  private extractCommand(message: string): string {
    const commandPattern = /^!(\w+)/;
    const match = message.match(commandPattern);

    return match ? match[1].toLowerCase() : null;
  }

  private handleCommand(channel: string, username: string, userId: string, command: string): void {
    this.commandManager.handleCommand(channel, username, userId, command);
  }
  
  private enqueueMessage(channel: string, tags: tmi.ChatUserstate, message: string): void {
    messageManager.enqueueMessage(channel, tags, message);
  }
}

const config: Options = {
    options: { debug: true },
    connection: { reconnect: true },
    identity: {
      username: 'Noraschair',
      password: `oauth:${process.env.TWITCH_OAUTH}`,
    },
    channels: ['noraschair', 'asecrettoeverybody'], // Channels are defined for development purpose
  };

const tmiManager: TMIManager = new TMIManager(config);

export default tmiManager;
