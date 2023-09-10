import React, { useState, useEffect } from 'react'
import { GetAllUser, UpdateUserProfile } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { CheckLogged } from '../components/checkLogged'
import { useGlobalState } from '../state/state';
import { SimpleInput } from '../components/baseInput';
import { Navbar } from '../components/Navbar';
import { BaseCard } from '../components/BaseCard';

const Dashboard = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useGlobalState('username')
  const [newUsername, setNewUsername] = useState('')

  const getAllData = async () => {
    try {
      const data = await GetAllUser()
      console.log(data, '<-- semua data');
    } catch (error) {
      console.log(error);
    }
  }


  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username': setNewUsername(value); break;
      default: break;
    }
  };

  const updateUsername = async () => {
    try {
      const data = await UpdateUserProfile({ username: newUsername })
      data.status === 200 ? setUsername(newUsername) : null
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
      <Navbar/>
      <div className='px-20 py-10'>
        {/* <p>hay {username}!</p>
        <div className='flex flex-col w-52 gap-3'>
          <SimpleInput label='change username' name='username' value={newUsername} onChange={handleInput} />
          <button className="btn btn-primary" onClick={updateUsername}>change username</button>
        </div> */}

        <div className='grid grid-cols-3 gap-4'>
          <BaseCard text='Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit' />
          <BaseCard/>
          <BaseCard/>
          <BaseCard/>
        </div>

      </div>


     
    </>
  )
}

export default Dashboard