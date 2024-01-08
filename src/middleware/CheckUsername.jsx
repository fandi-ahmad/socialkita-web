import { useEffect } from 'react'
import { useNavigate, useLocation, matchPath } from 'react-router-dom'
import { GetUserByUsername, GetUserLogin } from '../api/userApi'
import { useParams } from 'react-router-dom'
import { useGlobalState } from '../state/state'
import { GetAllDataUserByUsername } from '../api/projectApi'
import PageNotFound from '../views/PageNotFound'
const urlServer = process.env.KARYAKU_SERVER


const CheckUsername = (props) => {
  const { user } = useParams()    // <= parameter dari url
  const [dataUser, setDataUser] = useGlobalState('dataUser')
  const [dataProjectUser, setDataProjectUser] = useGlobalState('dataProjectUser')
  const [username, setUsername] = useGlobalState('username')
  const [isUsername, setIsUsername] = useGlobalState('isUsername')
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')
  const [profilePicture, setProfilePicture] = useGlobalState('profile_picture')
  const [isUsernameSame, setIsUsernameSame] = useGlobalState('isUsernameSame')
  const [uuidUser, setUuidUser] = useGlobalState('uuidUser')


  {/*
    ===== langkah-langkah =====
    cek apakah username dari parameter ini tersedia di database
      ? (username tersedia) cek apakah ada user yang login
        ? cek apakah user yang login usernamenya sama dengan parameter
          ? tampilkan data username di parameter dan button edit data
          : tampilkan data username di parameter
        : tampilkan data username di parameter
      : tampilkan halaman user not found

    # kondisi yg harus diperiksa:
    - apakah username tersedia di database
    - apakah ada user yg login
    - apakah username yg tersedia di database sama dengan user yg login
  */}


  const checkUsernameStatus = async () => {
    try {
      const data = await GetAllDataUserByUsername(user)
      
      if (data.status === 200) {
        setIsUsername(true)
        setDataUser(data.data)
        setDataProjectUser(data.data.projects)
        const userLogin = await GetUserLogin()
        
        if (userLogin.status === 200) {
          setIsLoggedIn(true)
          setProfilePicture(urlServer+'/'+userLogin.data.profile_picture)
          setUsername(userLogin.data.username)
          setUuidUser(userLogin.data.uuid)

          user === userLogin.data.username ? setIsUsernameSame(true) : setIsUsernameSame(false)
        } 
        else {
          setIsLoggedIn(false)
        }

      } else {
        setIsUsername(false)
      }

    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    checkUsernameStatus()
  }, [])

  return isUsername ? props.page : <PageNotFound/>
}

export default CheckUsername