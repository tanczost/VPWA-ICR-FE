export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface User {
  nickName: string;
  lastName: string;
  firstName: string;
  email: string;
  status: number;
  notify: boolean;
}

export interface Message {
  text: string;
  mentions: null;
}

export interface ChannelUsers {
  username: string;
  state: number;
}

export interface Channel {
  id: number | undefined;
  private: boolean;
  name: string;
  lastActivity: string | undefined;
  ownerUsername: string;
  users: ChannelUsers[];
  messages: Message[];
}

export enum UserState {
  'Online',
  'Do Not Disturb',
  'Offline',
}
