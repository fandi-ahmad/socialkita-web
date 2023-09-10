import React, { useState, useEffect } from 'react'
import { GetAllUser, LogoutUser, UpdateUserProfile } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { CheckLogged } from '../components/checkLogged'
import { useGlobalState } from '../state/state';
import { SimpleInput } from '../components/baseInput';

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

  const logout = async () => {
    try {
      await LogoutUser()
      navigate('/login')
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
      <div className="navbar bg-gray-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">KaryaKu</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li tabIndex={0}>
              <details>
                <summary>Parent ada si sini</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn"><i className="fa-solid fa-user"></i></a>
        </div>
      </div>
      <div>Dashboard</div>
      <p>hay {username}!</p>

      <div className='flex flex-col w-52 gap-3'>
        <SimpleInput label='change username' name='username' value={newUsername} onChange={handleInput} />
        <button className="btn btn-primary" onClick={updateUsername}>change username</button>
      </div>

      <br />
      <button className='btn btn-error' onClick={logout}>logout</button>

      <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box min-w-full">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Dashboard