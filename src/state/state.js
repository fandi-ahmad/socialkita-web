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
  dataUser: null,         // menyimpan data object
  dataProjectUser: null,  // menyimpan data array object
  isUsername: false,      // untuk pencarian dari url by username
  isUsernameSame: false,  // untuk mengecek apakah username yang dicari valuenya sama dengan username yang login (jika login)
};
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }