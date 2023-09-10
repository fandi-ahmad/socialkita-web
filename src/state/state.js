import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
  count: 435,
  username: 'user'
};
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }