import React, { useState, useEffect } from 'react'
import { GetUserLogin } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { useGlobalState } from '../state/state'
const urlServer = process.env.KARYAKU_SERVER

export const CheckLogged = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useGlobalState('username')
  const [uuidUser, setUuidUser] = useGlobalState('uuidUser')
  const [profilePicture, setProfilePicture] = useGlobalState('profile_picture')

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const data = await GetUserLogin()
        setUuidUser(data.data.uuid)
        setUsername(data.data.username)
        const picture = data.data.profile_picture
        picture === null || picture === undefined || picture === ''
        ? setProfilePicture('')
        : setProfilePicture(`http://${urlServer}/${data.data.profile_picture}`)


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
  }, [isLoggedIn, username, profilePicture])

}
