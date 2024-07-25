import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { AuthService } from '@/api/services/auth.service.ts';
import { API_URL, IS_DEV } from '@/config.ts';
import sessionManager from './SessionManager.ts';

export class APIRequester {
  protected restInstance: AxiosInstance;
  public readonly authService: AuthService;

  constructor() {
    this.restInstance = this.createAxiosInstance();

    this.authService = new AuthService(this.restInstance);
  }

  private createAxiosInstance() {
    const axiosDefaults = {
      withCredentials: true,
      baseURL: API_URL,
    } as CreateAxiosDefaults;

    const axiosInstance = axios.create(axiosDefaults);

    axiosInstance.interceptors.request.use(
      async request => {
        const token = sessionManager.token;
        if (token) {
          request.headers['Authorization'] = `Bearer ${token}`;
        }
        return request;
      },
      (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        if (response.data?.token) {
          sessionManager.setToken(response.data.token);
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (IS_DEV) {
          console.log('Request error', error);
        }

        const authPath = (originalRequest.url as string)
          .split('/')
          .find((u) => ['login', 'request-access', 'logout'].includes(u));

        if (!authPath && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshUrl = `${originalRequest.baseURL}/auth/refresh`;
            const instance = axios.create({ withCredentials: true });
            await instance.post(refreshUrl);
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            sessionManager.removeTokens();
            //TODO: how to get router instance ?
            // router.push({path: "/login"})
            // window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }
}

export default new APIRequester();
