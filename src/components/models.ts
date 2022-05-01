import { DateTime } from 'luxon';

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface User {
  id: number;
  nickName: string;
  lastName: string;
  firstName: string;
  email: string;
  status: number;
  invitations: Invitation[];
}

export interface Message {
  content: { text: string; mentions: string[] };
  createdAt: DateTime;
  updatedAt: DateTime;
  id: number;
  author: User;
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
  page: number;
  typers: Typer[];
}

export interface Typer {
  userNick: string;
  message: string;
  channelId: number;
}

export enum UserState {
  'Online',
  'Do Not Disturb',
  'Offline',
}

export type RawMessage = string;

export interface Invitation {
  channelName: string;
  invitedByNickName: string;
  id: number;
  channelId: number;
}
