import { Invitation, User } from 'src/components/models';
import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  AUTH_START(state) {
    state.status = 'pending';
    state.errors = [];
  },
  AUTH_SUCCESS(state, user: User | null) {
    state.status = 'success';
    state.user = user;
  },
  AUTH_ERROR(state, errors) {
    state.status = 'error';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    state.errors = errors;
  },
  setUserStatus(state, newStatus: number) {
    if (state.user) {
      state.user.status = newStatus;
    }
  },
  addInvitation(state, invitation: Invitation) {
    state.user?.invitations.push(invitation);
  },
  removeInvite(state, inviteId: number) {
    if (!state.user) return;

    state.user.invitations = state.user?.invitations.filter(
      (invite) => invite.id !== inviteId
    );
  },
};

export default mutation;
