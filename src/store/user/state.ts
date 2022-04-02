import { User } from '../../components/models';

export interface TokenState {
  token: string;
  type: string;
}

export interface UserStateInterface {
  user: User | null;
  status: 'pending' | 'success' | 'error';
  errors: { message: string; field?: string }[];
}

function state(): UserStateInterface {
  return {
    user: null,
    status: 'pending',
    errors: [],
  };
}

export default state;
