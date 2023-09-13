import React, { useState, useEffect } from 'react'
import { GetAllUser, UpdateUserProfile } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { CheckLogged } from '../components/checkLogged'
import { useGlobalState } from '../state/state';
import { SimpleInput } from '../components/baseInput';
import { Navbar } from '../components/Navbar';
import { BaseCard } from '../components/BaseCard';
import { getId } from '../function/baseFunction';
import { BaseLoading } from '../components/BaseLoading';

const Dashboard = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useGlobalState('username')
  const [uuidUser, setUuidUser] = useGlobalState('uuidUser')
  const [newUsername, setNewUsername] = useState('')
  const [fullname, setFullname] = useState('')

  const getAllData = async () => {
    try {
      if (username) {
        getId('hideUsernameModal').click()
      } else {
        getId('usernameModal').showModal()
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username': setNewUsername(value); break;
      case 'fullname': setFullname(value); break;
      default: break;
    }
  };

  const updateUsername = async () => {
    try {
      const data = await UpdateUserProfile({ username: newUsername, fullname: fullname, uuid_user: uuidUser })
      if (data.status !== 500) {
        getId('hideUsernameModal').click()
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllData()
  }, [username])


  return (
    <>
      <BaseLoading className='hidden' />
      <CheckLogged />
      <Navbar/>
      <div className='px-20 py-10'>
        <div className='grid grid-cols-3 gap-4'>
          <BaseCard text='Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit' />
          <BaseCard/>
          <BaseCard/>
          <BaseCard/>
        </div>

      </div>

      <dialog id="usernameModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Buat username dan nama anda</h3>
          <div className='flex flex-col w-full pt-4'>
            <SimpleInput label='username' name='username' value={newUsername} onChange={handleInput} className='mb-4' />
            <SimpleInput label='nama lengkap' name='fullname' value={fullname} onChange={handleInput} />
            <button className="btn btn-primary mt-8 mx-auto" onClick={updateUsername}>change username</button>
          </div>
          <div className="modal-action flex justify-center">
            <form method="dialog" className='hidden'>
              <button className="btn" id='hideUsernameModal'></button>
            </form>
          </div>
        </div>
      </dialog>

     
    </>
  )
}

export default Dashboard