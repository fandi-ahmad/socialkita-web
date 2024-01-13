import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalState } from '../state/state'

const Sidebar = () => {
  const btnSettingClass = 'py-1 pl-6 my-0.5 rounded-md hover:bg-base-200 text-start cursor-pointer duration-200 '
  const [username, setUsername] = useGlobalState('username')

  const activeBtn = (path) => {
    return location.pathname === `/p/${username}/setting/${path}` ? 'bg-base-200' : ''
  }
  return (
    <div className='w-80 h-screen py-4 flex flex-col px-4'>
      <Link to={'/p/'+ username + '/setting/account'} className={btnSettingClass + activeBtn('account')}>Account</Link>
      <Link to={'/p/'+ username + '/setting/changepassword'}  className={btnSettingClass + activeBtn('changepassword')}>Change Password</Link>
    </div>
  )
}

export default Sidebar