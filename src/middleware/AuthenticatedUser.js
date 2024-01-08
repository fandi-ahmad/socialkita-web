import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetUserLogin } from '../api/userApi'

const AuthenticatedUser = (props) => {
  const navigate = useNavigate()

  const checkUserStatus = async () => {
    try {
      const data = await GetUserLogin()
      if (data.status !== 200) {
        navigate('/login')
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

export default AuthenticatedUser