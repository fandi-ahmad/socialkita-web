import React from 'react'
import { CheckLogged } from '../../components/checkLogged'
import { MiniNavbar, Navbar } from '../../components/Navbar'
import { BaseCard } from '../../components/BaseCard'

const UserProjectList = () => {
  return (
    <>
      <CheckLogged />
      <Navbar/>
      <MiniNavbar/>
      <div className='px-20 py-10'>
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

export default UserProjectList