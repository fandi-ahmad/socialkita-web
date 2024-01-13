import { React, useState } from 'react'
import { Navbar } from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import { InputText } from '../../../components/baseInput'
import { useGlobalState } from '../../../state/state'

const ChangePassword = () => {
  const [theme, setTheme] = useGlobalState('theme')
  const [lastPassword, setLastPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'lastPassword': setLastPassword(value); break;
      case 'newPassword': setNewPassword(value); break;
      case 'confirmNewPassword': setConfirmNewPassword(value); break;
      default: break;
    }
  };

  return (
    <div className='h-screen overflow-hidden'>
      <Navbar/>
      <div className='flex flex-row h-screen overflow-y-auto'>
        <Sidebar/>
        <div className='w-full py-6 pl-4'>
          <h1 className='font-semibold mb-8 text-lg'>Change Password</h1>

          <div className='w-96 mt-6'>
            <div>Last Password</div>
            <InputText type='password' className='w-full' placeholder='****' value={lastPassword} name='lastPassword' onChange={handleInput} theme={theme} />
          </div>

          <div className='w-96 mt-6'>
            <div>New Password</div>
            <InputText type='password' className='w-full' placeholder='****' value={newPassword} name='newPassword' onChange={handleInput} theme={theme} />
          </div>

          <div className='w-96 mt-6'>
            <div>Confirm New Password</div>
            <InputText type='password' className='w-full' placeholder='****' value={confirmNewPassword} name='confirmNewPassword' onChange={handleInput} theme={theme} />
          </div>
          
          <div className='w-96 mt-8 flex justify-end'>
            <button className='btn btn-primary btn-sm'>Change Password</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ChangePassword