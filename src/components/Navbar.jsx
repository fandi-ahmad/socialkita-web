import React, { useEffect, useState } from 'react'
import { LogoutUser } from '../api/userApi'
import { useNavigate, useParams } from 'react-router-dom'
import profilePictureEmpty from '../assets/images/blank-profile-picture.png'
import { useGlobalState } from '../state/state'
import { themeOfPage } from '../function/baseFunction'
import { GetAllDataUserByUsername } from '../api/projectApi'

export const Navbar = (props) => {
  const [profilePicture, setProfilePicture] = useGlobalState('profile_picture')
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')
  const [isUsername, setIsUsername] = useGlobalState('isUsername')
  const [isUsernameSame, setIsUsernameSame] = useGlobalState('isUsernameSame')
  const [dataUser, setDataUser] = useGlobalState('dataUser')
  const [dataProjectUser, setDataProjectUser] = useGlobalState('dataProjectUser')

  const [tema, setTema] = useState('false')
  const [username, setUsername] = useGlobalState('username')
  const { user } = useParams()

  const navigate = useNavigate()

  const logout = async () => {
    try {
      await LogoutUser()
      navigate('/')
      location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  // false = light
  // true = dark
  const handleTheme = (e) => {
    const { value } = e.target;
    setTema(value)
    value === 'false' ? setTema('true') : setTema('false')
    value === 'false' ? themeOfPage('dark') : themeOfPage('light')
  }

  const toProfilePage = async () => {
    try {
      const data = await GetAllDataUserByUsername(username)
      setIsUsername(true)
      setDataUser(data.data)
      setDataProjectUser(data.data.projects)
      setIsUsernameSame(true)

      navigate('/p/' + username)
      
    } catch (error) {
      
    }
  }


  const navbarMenuLogin = () => {
    // ===== user login condition =====
    if (isLoggedIn) {
      return (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end hidden sm:block">
            <label tabIndex={0} className="btn btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profilePicture || profilePictureEmpty} />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className='py-2' onClick={toProfilePage}><i className="fa-solid fa-user"></i>Profile</a>
              </li>
              <li>
                <a className='py-2' onClick={() => navigate('/p/' + username +'/project')}><i className="fa-solid fa-briefcase"></i>Project</a>
              </li>
              <li>
                <a className='py-2' onClick={()=>document.getElementById('logoutModal').showModal()}><i className="fa-solid fa-right-from-bracket"></i>Logout</a>
              </li>
            </ul>
          </div>
          <button className='py-2 btn block sm:hidden' onClick={()=>document.getElementById('logoutModal').showModal()}>
            <i className="fa-solid fa-right-from-bracket fa-xl"></i>
          </button>

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
        </div>
      )
    } else {
      // ===== user is not login condition =====
      return (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1"><i className="fa-solid fa-user fa-xl"></i></label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className='py-2' onClick={() => navigate('/login')}>Masuk</a>
            </li>
            <li>
              <a className='py-2' onClick={() => navigate('/register')}>Daftar</a>
            </li>
          </ul>
        </div>
      )
    }
  }

  return (
    <div className='bg-base-200 '>
      <div className="navbar bg-base-200 px-10 mx-auto" style={{maxWidth: '1380px'}}>
        <div className="flex-1">
          <a className="normal-case text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>SocialKita</a>
        </div>
        <div>
        <label className="swap swap-rotate mr-4">
          <input type="checkbox" value={tema} onChange={handleTheme} />
          <svg id='dark' className="swap-off fill-current w-8 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
          <svg id='light' className="swap-on fill-current w-8 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
        </label>
        {navbarMenuLogin()}
        </div>
      </div>
    </div>
  )
}


export const MiniNavbar = (props) => {
  const navigate = useNavigate()
  const [username, setUsername] = useGlobalState('username')
  const [isUsernameSame, setIsUsernameSame] = useGlobalState('isUsernameSame')

  return isUsernameSame ? 
    <div className='bg-base-200 hidden sm:block'>
      <div className='bg-base-200 w-full px-10 mx-auto' style={{maxWidth: '1380px'}}>
        <button className={`btn btn-sm capitalize me-2 ${location.pathname === '/p/' + username || location.pathname === '/p/' + username + '/edit' ? 'bg-base-300' : ''}`} onClick={() => navigate('/p/'+username)}>
          <i className="fa-solid fa-book-open"></i> overview
        </button>
        <button className={`btn btn-sm capitalize me-2 ${location.pathname === '/p/' + username + '/project' ? 'bg-base-300' : ''}`} onClick={() => navigate('/p/'+username+'/project')}>
          <i className="fa-solid fa-briefcase"></i> project
        </button>
        <button className={`btn btn-sm capitalize me-2`} onClick={() => navigate('/project/new')}>
          <i className="fa-solid fa-square-plus"></i> project baru
        </button>
      </div>
    </div> : null
}

export const BottomNavbar = () => {
  const [pagePrevious, setPagePrevious] = useGlobalState('pagePrevious')
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')
  const navigate = useNavigate()
  const [username, setUsername] = useGlobalState('username')

  const newProjectBtn = () => {
    setPagePrevious(location.pathname)
    navigate('/project/new')
  }

  if (isLoggedIn) {
    return (
      <div className='fixed bottom-0 z-50 w-screen sm:hidden'>
        <div className="navbar bg-red-3 px-10 mx-auto bg-base-200 flex justify-between" style={{maxWidth: '1380px'}}>

          <button className={`btn btn-sm xsm:btn-md sm:btn-lg ${location.pathname === '/' ? 'btn-primary' : ''}`} onClick={() => navigate('/')}>
            <i className="fa-solid fa-house fa-xl"></i>
          </button>

          <button className='btn btn-sm xsm:btn-md sm:btn-lg tooltip tooltip-top normal-case' data-tip='Fitur ini segera hadir'>
            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
          </button>

          <button className='btn btn-sm xsm:btn-md sm:btn-lg' onClick={newProjectBtn}>
            <i className="fa-solid fa-plus fa-2xl"></i>
          </button>

          <button className={`btn btn-sm xsm:btn-md sm:btn-lg ${location.pathname === '/p/'+username+'/project' ? 'btn-primary' : ''}`} onClick={() => navigate('/p/'+username+'/project')}>
            <i className="fa-solid fa-briefcase fa-xl"></i>
          </button>

          <button 
            className={`btn btn-sm xsm:btn-md sm:btn-lg ${location.pathname === '/p/'+username || location.pathname == '/p/'+username+'/edit' ? 'btn-primary' : ''}`} 
            onClick={() => navigate('/p/'+username)}
          >
            <i className="fa-solid fa-user fa-xl"></i>
          </button>

        </div>
      </div>
    )
  }
}
