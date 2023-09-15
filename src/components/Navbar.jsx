import React, { useState } from 'react'
import { LogoutUser } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import profilePictureEmpty from '../assets/images/blank-profile-picture.png'
import { useGlobalState } from '../state/state'

export const Navbar = (props) => {
  const [profilePicture, setProfilePicture] = useGlobalState('profile_picture')
  const [pagePrevious, setPagePrevious] = useGlobalState('pagePrevious')
  const navigate = useNavigate()

  const newProjectBtn = () => {
    setPagePrevious(location.pathname)
    navigate('/project/new')
  }

  const logout = async () => {
    try {
      await LogoutUser()
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="navbar bg-base-200 px-20">
        <div className="flex-1">
          <a className="normal-case text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>KaryaKu</a>
        </div>
        <div className="flex-none gap-2">
          <button className="btn btn-sm btn-primary capitalize" onClick={newProjectBtn}>
            project baru <i className="fa-solid fa-plus"></i>
          </button>
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn bg-gray-200 btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profilePicture || profilePictureEmpty} />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between" onClick={() => navigate('/profile')}>Profile</a>
              </li>
              <li><a>Settings</a></li>
              <li onClick={()=>document.getElementById('my_modal_1').showModal()}><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Yakin ingin keluar?</h3>
          <p className="py-4 text-center">Anda tidak dapat membatalkan ini</p>
          <div className="modal-action flex justify-center">
            <button className="btn btn-primary" onClick={logout}>Ya</button>
            <form method="dialog">
              <button className="btn">tidak</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}


export const MiniNavbar = (props) => {
  const navigate = useNavigate()
  return (
    <div className='bg-base-200 w-full px-20'>
      <button className={`btn btn-sm capitalize me-2 ${location.pathname === '/profile' ? 'bg-base-300' : ''}`} onClick={() => navigate('/profile')}>
        <i className="fa-solid fa-book-open"></i> overview
      </button>
      <button className={`btn btn-sm capitalize me-2 ${location.pathname === '/profile/project' ? 'bg-base-300' : ''}`} onClick={() => navigate('/profile/project')}>
        <i className="fa-solid fa-briefcase"></i> project
      </button>
    </div>
  )
}
