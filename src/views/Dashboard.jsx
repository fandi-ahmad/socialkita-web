import React, { useState, useEffect } from 'react'
import { GetAllUser, LogoutUser } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { CheckLogged } from '../components/checkLogged'
import { useGlobalState } from '../state/state';


const Dashboard = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useGlobalState('username')

  const getAllData = async () => {
    try {
      const data = await GetAllUser()
      console.log(data, '<-- semua data');
    } catch (error) {
      console.log(error);
    }
  }

  const logout = async () => {
    try {
      await LogoutUser()
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllData()
  }, [username])


  return (
    <>
      <CheckLogged />
      <div>Dashboard</div>
      <p>hay {username}!</p>
      <button className='btn btn-error' onClick={logout}>logout</button>
    </>
  )
}

export default Dashboard