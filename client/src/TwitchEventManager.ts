import WebSocket from 'ws';
import axios from 'axios';
import tmiManager from './TmiManager';
import achievementManager from './AchievementManager';

interface EventSubOptions {
  type: string;
  broadcaster_user_id: string;
}

export default class TwitchEventSubListener {
  private ws: WebSocket;
  private sessionId: string;
  private liveChannels: Set<string> = new Set()

  constructor(private clientId: string, private clientSecret: string) {
    this.ws = new WebSocket('wss://eventsub.wss.twitch.tv/ws');
    this.ws.on('message', (data: WebSocket.Data) => this.onMessage(data));
    this.ws.on('close', () => this.onClose());
  }

  private onMessage(data: WebSocket.Data): void {
    const message = JSON.parse(data.toString());
    console.log('Received WebSocket message:', message);
  
    const messageType = message['metadata']?.message_type;
  
    const messageHandlers: Record<string, (message: any) => void> = {
      'session_welcome': this.handleSessionWelcome.bind(this),
      'live': this.handleLiveEvent.bind(this),
    };
  
    if (messageType && messageHandlers[messageType]) {
      messageHandlers[messageType](message);
    }
  }
  
  private handleSessionWelcome(message: any): void {
    this.sessionId = message['payload']['session'].id;
  }
  
  private async handleLiveEvent(message: any): Promise<void> {
    const broadcasterLogin: string = message['payload']['event']['broadcaster_user_login'];
    const broadcasterId: string = message['payload']['event']['broadcaster_user_id'];
    const exists = this.liveChannels.has(broadcasterId)
    if (broadcasterLogin && !exists) {
      await achievementManager.loadAchievements(broadcasterId);
      this.liveChannels.add(broadcasterId)
      this.joinChannel(broadcasterLogin);
    }
  }
  
  private joinChannel(channel: string): void {
    tmiManager.joinChannel(channel);
  }
  

  private onClose() {
    console.log('WebSocket connection closed');
    this.ws.close();
  }

  public async subscribeToEventSub(eventSubOptions: EventSubOptions[]) {
    try {
      for (const options of eventSubOptions) {
        const subscription = {
          type: options.type,
          version: '1',
          condition: {
            broadcaster_user_id: options.broadcaster_user_id,
          },
          transport: {
            method: 'websocket',
            session_id: this.sessionId,
          },
        };
  
        const response = await axios.post(
          'https://api.twitch.tv/helix/eventsub/subscriptions',
          subscription,
          {
            headers: {
              'Client-ID': this.clientId,
              'Authorization': `Bearer ${this.clientSecret}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log('Subscription response:', response.data);
      }
    } catch (error) {
      console.error('Error subscribing to EventSub:', error.response?.data || error.message);
    }
  }
  
}
