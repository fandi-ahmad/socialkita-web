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
      <div className='bg-base-200 '>
        <div className="navbar bg-base-200 px-10 mx-auto" style={{maxWidth: '1380px'}}>
          <div className="flex-1">
            <a className="normal-case text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>KaryaKu</a>
          </div>
          <div className="flex-none gap-2">
            <button className="btn btn-primary capitalize tooltip tooltip-bottom hidden sm:block" data-tip='tambah project baru' onClick={newProjectBtn}>
              <i className="fa-solid fa-plus fa-xl"></i>
            </button>
            <div className="form-control hidden sm:block">
              <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>
            <div className="dropdown dropdown-end hidden sm:block">
              <label tabIndex={0} className="btn bg-gray-200 btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={profilePicture || profilePictureEmpty} />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <a className='py-2' onClick={() => navigate('/profile')}><i className="fa-solid fa-user"></i>Profile</a>
                </li>
                <li>
                  <a className='py-2' onClick={() => navigate('/profile/project')}><i className="fa-solid fa-briefcase"></i>Project</a>
                </li>
                <li><a className='py-2'><i className="fa-solid fa-gear"></i>Settings</a></li>
                <li>
                  <a className='py-2' onClick={()=>document.getElementById('logoutModal').showModal()}><i className="fa-solid fa-right-from-bracket"></i>Logout</a>
                </li>
              </ul>
            </div>
            <a className='py-2 block sm:hidden' onClick={()=>document.getElementById('logoutModal').showModal()}>
              <i className="fa-solid fa-right-from-bracket fa-xl"></i>
            </a>
          </div>
        </div>

      </div>

      <dialog id="logoutModal" className="modal">
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
    <div className='bg-base-200 hidden sm:block'>
      <div className='bg-base-200 w-full px-10 mx-auto' style={{maxWidth: '1380px'}}>
        <button className={`btn btn-sm capitalize me-2 ${location.pathname === '/profile' ? 'bg-base-300' : ''}`} onClick={() => navigate('/profile')}>
          <i className="fa-solid fa-book-open"></i> overview
        </button>
        <button className={`btn btn-sm capitalize me-2 ${location.pathname === '/profile/project' ? 'bg-base-300' : ''}`} onClick={() => navigate('/profile/project')}>
          <i className="fa-solid fa-briefcase"></i> project
        </button>
      </div>
    </div>
  )
}

export const BottomNavbar = () => {
  const [pagePrevious, setPagePrevious] = useGlobalState('pagePrevious')
  const navigate = useNavigate()

  const newProjectBtn = () => {
    setPagePrevious(location.pathname)
    navigate('/project/new')
  }

  return (
    <>
      <div className='fixed bottom-0 z-50 w-screen sm:hidden'>
        <div className="navbar bg-red-3 px-10 mx-auto bg-base-200 flex justify-between" style={{maxWidth: '1380px'}}>

          <button className={`btn btn-sm xsm:btn-md sm:btn-lg ${location.pathname === '/' ? 'btn-primary' : ''}`} onClick={() => navigate('/')}>
            <i className="fa-solid fa-house fa-xl"></i>
          </button>

          <button className='btn btn-sm xsm:btn-md sm:btn-lg'>
            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
          </button>

          <button className='btn btn-sm xsm:btn-md sm:btn-lg' onClick={newProjectBtn}>
            <i className="fa-solid fa-plus fa-2xl"></i>
          </button>

          <button className={`btn btn-sm xsm:btn-md sm:btn-lg ${location.pathname === '/profile/project' ? 'btn-primary' : ''}`} onClick={() => navigate('/profile/project')}>
            <i className="fa-solid fa-briefcase fa-xl"></i>
          </button>

          <button 
            className={`btn btn-sm xsm:btn-md sm:btn-lg ${location.pathname === '/profile' || location.pathname == '/profile/edit' ? 'btn-primary' : ''}`} 
            onClick={() => navigate('/profile')}
          >
            <i className="fa-solid fa-user fa-xl"></i>
          </button>

        </div>
      </div>
    </>
  )
}
