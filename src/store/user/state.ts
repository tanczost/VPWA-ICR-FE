import { User } from '../../components/models';

export interface UserStateInterface {
  token: string | null;
  user: User | null;
}

function state(): UserStateInterface {
  return {
    token: null,
    user: null,
  };
}

export default state;
