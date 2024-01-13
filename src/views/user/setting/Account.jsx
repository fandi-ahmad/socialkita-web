import { React } from 'react'
import { Navbar } from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'

const Account = () => {
  return (
    <div className='h-screen overflow-hidden'>
      <Navbar/>
      <div className='flex flex-row h-screen overflow-y-auto'>
        <Sidebar/>
        <div className='w-full py-6 pl-4'>
          content account
        </div>
      </div>
    </div>
  )
}

export default Account