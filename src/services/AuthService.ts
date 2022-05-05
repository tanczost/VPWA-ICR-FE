import { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';
import { User } from 'src/components/models';
import { activityService } from '.';

export interface LoginData {
  nickName: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  message: string;
}

class AuthService {
  async me(dontTriggerLogout = false): Promise<User | null> {
    return api
      .get<User>('/me/', { dontTriggerLogout } as AxiosRequestConfig)
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          return null;
        }

        return Promise.reject(error);
      });
  }

  async register(data: User): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/registration/', data);
    return response.data;
  }

  async login(credentials: LoginData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/login/', credentials);
    activityService.join();
    const nickName = credentials.nickName;
    void activityService.getActivitySocket()?.changeActivity(nickName);
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/logout/');
  }
}

export default new AuthService();
