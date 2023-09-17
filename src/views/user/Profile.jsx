import React, { useState, useEffect } from 'react'
import { Navbar, MiniNavbar, BottomNavbar } from '../../components/Navbar'
import { SimpleInput } from '../../components/baseInput'
import { ProfileCard } from '../../components/ProfileCard'
import profilePictureEmpty from '../../assets/images/blank-profile-picture.png'
import { CheckLogged } from '../../components/checkLogged'
import { useGlobalState } from '../../state/state'
import { GetUserProfile, UpdateUserProfile } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'
const urlServer = process.env.KARYAKU_SERVER

const Profile = () => {
  const [uuidUser, setUuidUser] = useGlobalState('uuidUser')
  const [username, setUsername] = useGlobalState('username')
  const [alertSuccessEdit, setAlertSuccessEdit] = useGlobalState('alertSuccessEdit')
  const [newUsername, setNewUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [category, setCategory] = useState('')
  const [address, setAddress] = useState('')
  const [work, setWork] = useState('')
  const [link, setLink] = useState('')
  const [biodata, setBiodata] = useState('')
  const [profilePicture, setProfilePicture] = useGlobalState('profile_picture')
  const navigate = useNavigate()

  const getUserProfile = async () => {
    try {
      if (uuidUser) {
        const user = await GetUserProfile(uuidUser)
        const data = user.data

        setProfilePicture(`${urlServer}/${data.profile_picture}`)
        setFullname(data.fullname)
        setCategory(data.category)
        setAddress(data.address)
        setWork(data.work)
        setLink(data.link)
        setBiodata(data.biodata)
        
      }
    } catch (error) {
      console.log(error, '<-- error');
    }
  }



  useEffect(() => {
    getUserProfile()
  }, [uuidUser])

  return (
    <div className='h-screen overflow-y-auto'>
      <CheckLogged />
      <Navbar/>
      <MiniNavbar/>
      <div className={`fixed top-5 w-full px-20 flex justify-center transition-all duration-200 ${alertSuccessEdit}`} id='succesEdit'>
        <div className={`alert alert-success w-fit`} >
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Data berhasil diperbarui</span>
        </div>
      </div>

      <div>
        <div className='px-10 pt-10 flex flex-col md:flex-row mx-auto' style={{maxWidth: '1380px'}}>
          <div className="avatar cursor-pointer tooltip tooltip-bottom h-full flex justify-center" data-tip='edit foto profile' onClick={() => navigate('/profile/edit')}>
            <div className="w-72 h-72 rounded-full">
              <img src={profilePicture || profilePictureEmpty} className='w-full' />
            </div>
          </div>

          <ProfileCard className='pb-64' id='profileCard'
            username={username}
            fullname={fullname}
            category={category}
            button={
              <div className='flex justify-end mb-4'>
                <button className="btn btn-sm btn-primary capitalize" onClick={() => navigate('/profile/edit')}>Edit profile</button>
              </div>
            }
            address={address}
            work={work}
            link={link}
            biodata={biodata}
          />

        </div>
      </div>
      <BottomNavbar/>
    </div>
  )
}

export default Profile