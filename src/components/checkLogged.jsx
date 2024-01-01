import React, { useState, useEffect } from 'react'
import { GetUserLogin } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { useGlobalState } from '../state/state'
import { themeOfPage } from '../function/baseFunction'
const urlServer = process.env.KARYAKU_SERVER

export const CheckLogged = ({children}) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')
  const [username, setUsername] = useGlobalState('username')
  const [uuidUser, setUuidUser] = useGlobalState('uuidUser')
  const [profilePicture, setProfilePicture] = useGlobalState('profile_picture')
  const [theme, setTheme] = useGlobalState('theme')

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        if (location.pathname !== '/login' && location.pathname !== '/register') {
          // setTheme(themeOfPage('dark'))
          const data = await GetUserLogin()
          // console.log(data, '<-- check user, dari checkedlogged.jsx');
  
          setUuidUser(data.data.uuid)
          setUsername(data.data.username)
          const picture = data.data.profile_picture
  
          picture === null || picture === undefined || picture === ''
            ? setProfilePicture('')
            : setProfilePicture(`${urlServer}/${data.data.profile_picture}`)
  
          if (data.status === 401 && location.pathname !== '/') {
            console.log('tidak ada user yg login')
            setIsLoggedIn(false);
            navigate('/')
          }
          if (data.status === 200) {
            setIsLoggedIn(true);
          }
          
        }
      } catch (error) {
        throw error
      }
    };

    if (location.pathname !== '/'+username+'/edit' && username === '') {
      navigate('/'+username+'/edit')
    }

    checkLoginStatus();
  }, [isLoggedIn, username, profilePicture])

  if (isLoggedIn) {
    return (
      children
    )
  }
}
