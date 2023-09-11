import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { SimpleInput } from '../components/baseInput'
import { ProfileCard } from '../components/ProfileCard'
import profilePicture from '../assets/images/blank-profile-picture.png'
import { CheckLogged } from '../components/checkLogged'
import { useGlobalState } from '../state/state'
import { GetUserProfile, UpdateUserProfile } from '../api/userApi'

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

  const getUserProfile = async () => {
    try {
      if (uuidUser) {
        const user = await GetUserProfile(uuidUser)
        const data = user.data
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

  const btnEditProfile = () => {
    setNewUsername(username)
    document.getElementById('profileCard').classList.add('hidden')
    document.getElementById('profileEdit').classList.remove('hidden')
  }

  const btnSave = async () => {
    try {
      const data = await UpdateUserProfile({
        uuid_user: uuidUser,
        username: newUsername,
        fullname: fullname,
        category: category,
        address: address,
        work: work,
        link: link,
        biodata: biodata
      })
      setUsername(newUsername)

      document.getElementById('profileCard').classList.remove('hidden')
      document.getElementById('profileEdit').classList.add('hidden')
    } catch (error) {
      console.log(error, '<-- error');
    }
  }

  const btnCancel = () => {
    document.getElementById('profileCard').classList.remove('hidden')
    document.getElementById('profileEdit').classList.add('hidden')
    getUserProfile()
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username': setNewUsername(value); break;
      case 'fullname': setFullname(value); break;
      case 'category': setCategory(value); break;
      case 'address': setAddress(value); break;
      case 'work': setWork(value); break;
      case 'link': setLink(value); break;
      case 'biodata': setBiodata(value); break;
      default: break;
    }
  };


  useEffect(() => {
    getUserProfile()
  }, [uuidUser])

  return (
    <>
      <CheckLogged />
      <Navbar/>
      <div className='px-20 pt-10 flex flex-row'>
        <div className="avatar">
          <div className="w-72 h-72 rounded-full">
            <img src={profilePicture} />
          </div>
        </div>

        <ProfileCard className='' id='profileCard'
          username={username}
          fullname={fullname}
          category={category}
          button={<button className="btn btn-sm btn-primary" onClick={btnEditProfile}>Edit profile</button>}
          address={address}
          work={work}
          link={link}
          biodata={biodata}
        />

        <ProfileCard className='hidden' id='profileEdit'
          username={<SimpleInput placeholder='username' name='username' value={newUsername} onChange={handleInput} />}
          fullname={<SimpleInput placeholder='nama lengkap' name='fullname' value={fullname} onChange={handleInput} className='max-w-xs' />}
          category={<SimpleInput placeholder='kategori' name='category' value={category} onChange={handleInput} className='max-w-xs' />}
          button={
            <div>
              <button className="btn btn-sm bg-gray-300 hover:bg-gray-400 me-2" onClick={btnCancel}>batal</button>
              <button className="btn btn-sm btn-primary" onClick={btnSave}>simpan</button>
            </div>
          }
          address={<SimpleInput placeholder='alamat' name='address' value={address} onChange={handleInput} />}
          work={<SimpleInput placeholder='tempat kerja' name='work' value={work} onChange={handleInput} />}
          link={<SimpleInput placeholder='link' name='link' value={link} onChange={handleInput} />}
          biodata={<textarea placeholder="Bio" name='biodata' value={biodata} onChange={handleInput} className="textarea textarea-bordered textarea-lg w-full h-64 no-resize"></textarea>}
        />


      </div>
    </>
  )
}

export default Profile