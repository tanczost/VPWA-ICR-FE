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
