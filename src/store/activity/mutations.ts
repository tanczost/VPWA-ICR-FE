import { MutationTree } from 'vuex';
import { ActivityStateInterface } from './state';

const mutation: MutationTree<ActivityStateInterface> = {
  addUserActivity(state: ActivityStateInterface, userNick: string) {
    // your code
    let isInUsers = false;
    state.users.forEach((user) => {
      if (user.username === userNick && user.state === 1) {
        isInUsers = true;
        return;
      }
      if (user.username === userNick && user.state === 3) {
        user.state = 1;
        isInUsers = true;
        return;
      }
    });

    if (!isInUsers) {
      state.users.push({ username: userNick, state: 1 });
    }
  },
  removeUserActivity(state: ActivityStateInterface, userNick: string) {
    // your code
    let isInUsers = false;
    state.users.forEach((user) => {
      if (user.username === userNick && user.state === 3) {
        isInUsers = true;
        return;
      }
      if (user.username === userNick && user.state === 1) {
        user.state = 3;
        isInUsers = true;
        return;
      }
    });

    if (!isInUsers) {
      state.users.push({ username: userNick, state: 3 });
    }
  },
  addAllOnlineUsers(
    state: ActivityStateInterface,
    userData: { nickName: string; notify: number }
  ) {
    let isInUsers = false;
    state.users.forEach((user) => {
      if (user.username === userData.nickName) {
        isInUsers = true;
        if (userData.notify) {
          user.state = 1;
        } else {
          user.state = 3;
        }
        return;
      }
    });

    if (!isInUsers) {
      state.users.push({
        username: userData.nickName,
        state: userData.notify,
      });
    }
  },
  changeStatus(
    state: ActivityStateInterface,
    userData: { username: string; state: number }
  ) {
    state.users.forEach((user) => {
      if (user.username === userData.username) {
        user.state = userData.state;
      }
    });
  },
};

export default mutation;
