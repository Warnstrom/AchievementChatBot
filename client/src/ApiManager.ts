import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Option, Some, None } from './models/Experimental/experimentaltypes';
import { ENV } from './config';

class ApiManager {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        Authorization: 'test',
      },
    });
  }

  private async handleRequest<T>(request: () => Promise<AxiosResponse<T>>): Promise<Option<T>> {
    try {
      const response: AxiosResponse<T> = await request();
      return new Some(response.data);
    } catch (error) {
      console.error("Error in request:", error);
      return new None();
    }
  }
  
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<Option<T>> {
    return this.handleRequest(() => this.api.get(url, config));
  }
  
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Option<T>> {
    return this.handleRequest(() => this.api.post(url, data, config));
  }
}

const apiManager: ApiManager = new ApiManager(ENV.API_URL);

export default apiManager;
