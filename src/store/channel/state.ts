import { Channel } from 'src/components/models';

export interface ChannelStateInterface {
  channels: Channel[];
  loading: boolean;
  error: Error | null;
  active: number | null;
}

function state(): ChannelStateInterface {
  return {
    channels: [],
    loading: false,
    error: null,
    active: null,
  };
}

export default state;
