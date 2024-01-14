import axios, { AxiosResponse } from 'axios';

interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
}

interface TwitchChannel {
  id: string;
  display_name: string;
}

export class TwitchHelix {
  private clientId: string;
  private clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  private async makeApiRequest(endpoint: string, params: Record<string, any> = {}): Promise<AxiosResponse<any>> {
    const response = await axios.get(`https://api.twitch.tv/helix/${endpoint}`, {
      headers: {
        'Client-ID': this.clientId,
        'Authorization': `Bearer ${this.clientSecret}`,
      },
      params: params,
    });

    return response;
  }

  async getUserByUsername(username: string): Promise<TwitchUser | null> {
    const response = await this.makeApiRequest('users', { login: username });

    if (response.data.data.length > 0) {
      const userData = response.data.data[0];
      const user: TwitchUser = {
        id: userData.id,
        login: userData.login,
        display_name: userData.display_name,
      };

      return user;
    } else {
      return null;
    }
  }

  async getChannelByUserId(userId: string): Promise<TwitchChannel | null> {
    const response = await this.makeApiRequest('channels', { broadcaster_id: userId });

    if (response.data.data.length > 0) {
      const channelData = response.data.data[0];
      const channel: TwitchChannel = {
        id: channelData.broadcaster_id,
        display_name: channelData.broadcaster_name,
      };

      return channel;
    } else {
      return null;
    }
  }
}
