import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
  count: 435,
  username: null,
  uuidUser: '',
  alertSuccessEdit: 'opacity-0 hidden',
  profile_picture: ''
};
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }