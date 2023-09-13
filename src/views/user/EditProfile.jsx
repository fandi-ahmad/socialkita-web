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

const EditProfile = () => {
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
  const [profilePicture, setProfilePicture] = useState('')
  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const [newProfilePictureUrl, setNewProfilePictureUrl] = useState('')

  const navigate = useNavigate()

  const getUserProfile = async () => {
    try {
      if (uuidUser) {
        const user = await GetUserProfile(uuidUser)
        const data = user.data
        setProfilePicture(`http://${urlServer}/${data.profile_picture}`)
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
      const formData = new FormData();
      formData.append('uuid_user', uuidUser)
      formData.append('username', newUsername)
      formData.append('fullname', fullname)
      formData.append('category', category)
      formData.append('address', address)
      formData.append('work', work)
      formData.append('link', link)
      formData.append('biodata', biodata)
      formData.append('image_upload', newProfilePicture)

      await UpdateUserProfile(formData)
      navigate('/profile')
      setAlertSuccessEdit('opacity-100')
      setTimeout(() => {
        setAlertSuccessEdit('opacity-0')
      }, 2000);
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

  const handleInputFile = (e) => {
    const imageSelect = e.target.files[0]
    setNewProfilePicture(imageSelect)
    setNewProfilePictureUrl(URL.createObjectURL(imageSelect))
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
        <div className="avatar cursor-pointer tooltip tooltip-bottom h-fit" data-tip='edit foto profile' onClick={() => navigate('/profile/edit')}>
          <div className="w-72 h-72 rounded-full">
            <img src={newProfilePictureUrl || profilePicture || profilePictureEmpty} onClick={() => document.getElementById('inputFile').click()} className='w-full hover:brightness-90 duration-200' />
            <input type="file" className='hidden' id='inputFile' name='profile_picture'  onChange={handleInputFile} />
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