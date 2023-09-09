import React, { useState, useEffect } from 'react'
import { GetAllUser, LogoutUser } from '../api/userApi'
import { redirect } from 'react-router-dom'

const Dashboard = () => {
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
      const out = await LogoutUser()
      console.log(out);
      redirect('/login')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllData()
  }, [])


  return (
    <>
      <div>Dashboard</div>
      <button className='btn btn-error' onClick={logout}>logout</button>
    </>
  )
}

export default Dashboard