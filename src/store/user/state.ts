import { User } from '../../components/models';

export interface TokenState {
  token: string;
  type: string;
}

export interface UserStateInterface {
  token: TokenState | null;
  user: User | null;
}

function state(): UserStateInterface {
  return {
    token: null,
    user: null,
  };
}

export default state;
