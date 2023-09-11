import React, { useState, useEffect } from 'react'
import { GetUserLogin } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { useGlobalState } from '../state/state'

export const CheckLogged = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useGlobalState('username')
  const [uuidUser, setUuidUser] = useGlobalState('uuidUser')

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const data = await GetUserLogin()
        setUuidUser(data.data.uuid)
        setUsername(data.data.username)
        console.log(data.data);
        if (data.status === 401) {
          setIsLoggedIn(false);
          navigate('/login')
        }
        if (data.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        throw error
      }
    };

    checkLoginStatus();
  }, [isLoggedIn, username])

}
