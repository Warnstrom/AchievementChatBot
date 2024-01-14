import tmi, { Client } from 'tmi.js';
import apiManager from './ApiManager';
import { None, Option, Some } from './models/Experimental/experimentaltypes';

type CommandHandler = (client: Client, channel: string, username: string, userId: string, args?: string[]) => void;

interface CommandDefinition {
  description: string;
  execute: CommandHandler;
}

type Commands = Record<string, CommandDefinition>;

class CommandManager {
  private commands: Commands = {};

  constructor(private client: Client) {

    this.registerCommand('achievements', 'Test Command', async (client, channel, username, userId, args) => {
        const result: Option<unknown> = await apiManager.get(`/achievements/user_id=${userId}`);
        if (result instanceof Some) {
            
        } else if (result instanceof None) {
            throw new Error('Request failed or data is empty.');
        }
      client.say(channel, `Hello, ${username}! This is a test command`);
    });
  }

  private registerCommand(name: string, description: string, execute: CommandHandler): void {
    this.commands[name] = { description, execute };
  }

  public handleCommand(channel: string, username: string, userId: string, command: string): void {
    this.commands[command].execute(this.client, channel, userId, username)
    }
   
}

export default CommandManager;
