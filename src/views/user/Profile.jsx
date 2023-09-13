import React, { useState, useEffect } from 'react'
import { Navbar, MiniNavbar } from '../../components/Navbar'
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
  const [newUsername, setNewUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [category, setCategory] = useState('')
  const [address, setAddress] = useState('')
  const [work, setWork] = useState('')
  const [link, setLink] = useState('')
  const [biodata, setBiodata] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const navigate = useNavigate()

  const getUserProfile = async () => {
    try {
      if (uuidUser) {
        const user = await GetUserProfile(uuidUser)
        const data = user.data

        setProfilePicture(`http://${urlServer}/${data.profile_picture}`)
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
    <>
      <CheckLogged />
      <Navbar/>
      <MiniNavbar/>
      <div className='px-20 pt-10 flex flex-row'>
        <div className="avatar cursor-pointer tooltip tooltip-bottom h-full" data-tip='edit foto profile' onClick={() => navigate('/profile/edit')}>
          <div className="w-72 h-72 rounded-full">
            <img src={profilePicture || profilePictureEmpty} className='w-full' />
          </div>
        </div>

        <ProfileCard className='' id='profileCard'
          username={username}
          fullname={fullname}
          category={category}
          button={<button className="btn btn-sm btn-primary capitalize" onClick={() => navigate('/profile/edit')}>Edit profile</button>}
          address={address}
          work={work}
          link={link}
          biodata={biodata}
        />

      </div>
    </>
  )
}

export default Profile