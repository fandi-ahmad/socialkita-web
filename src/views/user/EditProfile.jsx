import React, { useState, useEffect } from 'react'
import { Navbar, MiniNavbar } from '../../components/Navbar'
import { SimpleInput } from '../../components/baseInput'
import { ProfileCard } from '../../components/ProfileCard'
import profilePicture from '../../assets/images/blank-profile-picture.png'
import { CheckLogged } from '../../components/checkLogged'
import { useGlobalState } from '../../state/state'
import { GetUserProfile, UpdateUserProfile } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const [uuidUser, setUuidUser] = useGlobalState('uuidUser')
  const [username, setUsername] = useGlobalState('username')
  const [newUsername, setNewUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [category, setCategory] = useState('')
  const [address, setAddress] = useState('')
  const [work, setWork] = useState('')
  const [link, setLink] = useState('')
  const [biodata, setBiodata] = useState('')
  const navigate = useNavigate()

  const getUserProfile = async () => {
    try {
      if (uuidUser) {
        const user = await GetUserProfile(uuidUser)
        const data = user.data
        setNewUsername(username)
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


  const btnSave = async () => {
    try {
      await UpdateUserProfile({
        uuid_user: uuidUser,
        username: newUsername,
        fullname: fullname,
        category: category,
        address: address,
        work: work,
        link: link,
        biodata: biodata
      })
      navigate('/profile')
    } catch (error) {
      console.log(error, '<-- error');
    }
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
      <MiniNavbar/>
      <div className='px-20 pt-10 flex flex-row'>
        <div className="avatar cursor-pointer tooltip tooltip-bottom" data-tip='ganti foto profile'>
          <div className="w-72 h-72 rounded-full">
            <img src={profilePicture} />
          </div>
        </div>

        <ProfileCard  id='profileEdit'
          username={<SimpleInput placeholder='username' name='username' value={newUsername} onChange={handleInput} />}
          fullname={<SimpleInput placeholder='nama lengkap' name='fullname' value={fullname} onChange={handleInput} className='max-w-xs' />}
          category={<SimpleInput placeholder='kategori' name='category' value={category} onChange={handleInput} className='max-w-xs' />}
          button={
            <div>
              <button className="btn btn-sm bg-base-300 hover:brightness-90 capitalize me-2" onClick={() => navigate('/profile')}>batal</button>
              <button className="btn btn-sm btn-primary capitalize" onClick={btnSave}>simpan</button>
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

export default EditProfile