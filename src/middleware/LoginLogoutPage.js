import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetUserLogin } from '../api/userApi'

const LoginLogoutPage = (props) => {
  const navigate = useNavigate()

  const checkUserStatus = async () => {
    try {
      const data = await GetUserLogin()
      if (data.status === 200) {
        navigate('/')
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    checkUserStatus()
  }, [])

  return props.page
}

export default LoginLogoutPage