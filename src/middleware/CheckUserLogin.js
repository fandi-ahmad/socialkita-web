import { useEffect } from "react"
import { GetUserLogin } from "../api/userApi"
import { useGlobalState } from "../state/state"
const urlServer = import.meta.env.VITE_SOCIALKITA_SERVER

const CheckUserLogin = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')
  const [profilePicture, setProfilePicture] = useGlobalState('profile_picture')
  const [username, setUsername] = useGlobalState('username')
  const [uuidUser, setUuidUser] = useGlobalState('uuidUser')
  const [isUsernameSame, setIsUsernameSame] = useGlobalState('isUsernameSame')

  const checkUserStatus = async () => {
    try {
      setIsUsernameSame(false)
      const userLogin = await GetUserLogin()
      if (userLogin.status === 200) {
        setIsLoggedIn(true)
        setProfilePicture(urlServer+'/'+userLogin.data.profile_picture)
        setUsername(userLogin.data.username)
        setUuidUser(userLogin.data.uuid)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    checkUserStatus()
  }, [])

  return props.page
}

export default CheckUserLogin