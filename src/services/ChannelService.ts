import { api } from 'src/boot/axios';
import { ChannelResponse, NewChannelState } from 'src/store/channel/actions';

class ChannelService {
  async addChannel(requestData: NewChannelState): Promise<void> {
    await api.post('/channel/', {
      ...requestData,
    });
  }

  async getChannels(): Promise<ChannelResponse> {
    const result = await api.get<ChannelResponse>('/user/my-channels/');
    return result.data;
  }
}

export default new ChannelService();
