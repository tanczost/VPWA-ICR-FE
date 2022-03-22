import { Channel } from 'src/components/models';

export interface ChannelStateInterface {
  channels: Channel[];
}

function state(): ChannelStateInterface {
  return {
    channels: [],
  };
}

export default state;
