import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
  username: null,
  uuidUser: '',
  alertSuccessEdit: 'opacity-0 hidden',
  alertClass: 'hidden',
  profile_picture: '',
  pagePrevious: '/',
  theme: 'light',
  isLoggedIn: false,
};
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }