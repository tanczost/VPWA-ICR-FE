export interface ActivityStateInterface {
  users: UserActivityInterface[];
}

export interface UserActivityInterface {
  username: string;
  state: number;
}

function state(): ActivityStateInterface {
  return {
    users: [],
  };
}

export default state;
