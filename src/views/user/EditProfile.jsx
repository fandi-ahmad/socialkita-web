import React, { useState, useEffect } from 'react'
import { Navbar, MiniNavbar, BottomNavbar } from '../../components/Navbar'
import { InputText, InputTextArea, SimpleInput } from '../../components/baseInput'
import { ProfileCard, ProfileCardInput } from '../../components/ProfileCard'
import profilePictureEmpty from '../../assets/images/blank-profile-picture.png'
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
  const [profilePicture, setProfilePicture] = useGlobalState('profile_picture')
  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const [newProfilePictureUrl, setNewProfilePictureUrl] = useState('')
  const [alertErrorUsername, setAlertErrorUsername] = useState('opacity-0 hidden')
  const [errorText, setErrorText] = useState('')
  const [inputUsernameClass, setInputUsernameClass] = useState('')
  const [dataUser, setDataUser] = useGlobalState('dataUser')

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

  const fillDataUser = () => {
    // setProfilePicture(`http://${urlServer}/${dataUser.profile_picture}`)
    setProfilePicture(urlServer+'/'+dataUser.profile_picture)
    setNewUsername(username)
    setFullname(dataUser.fullname)
    setCategory(dataUser.category)
    setAddress(dataUser.address)
    setWork(dataUser.work)
    setLink(dataUser.link)
    setBiodata(dataUser.biodata)
  }

  const showAlertError = () => {
    setInputUsernameClass('input-error')
    setAlertErrorUsername('opacity-100')
    setTimeout(() => {
      setAlertErrorUsername('opacity-0')
      setTimeout(() => {
        setAlertErrorUsername('opacity-0 hidden')
      }, 100);
    }, 2000);
  }

  const btnSave = async () => {
    try {
      if (newUsername.length === 0) {
        setErrorText('username tidak boleh kosong')
        showAlertError()
      } else if (newUsername.indexOf(' ') !== -1) {
        setErrorText('username tidak boleh ada spasi')
        showAlertError()
      } else if (newUsername.includes('.')) {
        setErrorText('username tidak menggunakan "." alternatif "-" atau "_"')
        showAlertError()
      } else {
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

        const data = await UpdateUserProfile(formData)

        if (data.status === 200) {
          setUsername(newUsername)
          setTimeout(() => { navigate('/p/'+newUsername) }, 100)
          setAlertSuccessEdit('opacity-100')
          setTimeout(() => {
            setAlertSuccessEdit('opacity-0')
            setTimeout(() => {
              setAlertSuccessEdit('opacity-0 hidden')
            }, 100);
          }, 2000);
        } else {
          setErrorText('username tidak tersedia')
          showAlertError()
        }
      }
      
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
    if (newUsername.length > 0 && newUsername.indexOf(' ') === -1) {
      setInputUsernameClass('')
    }
  };

  const handleInputFile = (e) => {
    const imageSelect = e.target.files[0]
    setNewProfilePicture(imageSelect)
    setNewProfilePictureUrl(URL.createObjectURL(imageSelect))
  };

  useEffect(() => {
    fillDataUser()
  }, [uuidUser])

  return (
    <div className='h-screen overflow-y-auto'>
      <Navbar/>
      <MiniNavbar/>
      <div className={`fixed z-50 top-5 w-full px-20 flex justify-center transition-all duration-200 ${alertErrorUsername}`} id='errorUsername'>
        <div className={`alert alert-error w-fit`} >
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorText}</span>
        </div>
      </div>

      <div>
        <div className='px-10 pt-10 flex flex-col md:flex-row mx-auto' style={{maxWidth: '1380px'}}>
          <div className="avatar cursor-pointer tooltip tooltip-bottom h-fit flex justify-center mb-12" data-tip='edit foto profile' onClick={() => navigate('/p/'+username+'/edit')}>
            <div className="w-40 h-40 xsm:w-52 xsm:h-52 sm:w-72 sm:h-72 rounded-full">
              <img src={newProfilePictureUrl || profilePicture || profilePictureEmpty} onClick={() => document.getElementById('inputFile').click()} className='w-full hover:brightness-90 duration-200' />
              <input type="file" className='hidden' id='inputFile' name='profile_picture'  onChange={handleInputFile} />
            </div>
          </div>

          <ProfileCardInput  id='profileEdit'
            username={<InputText placeholder='username' name='username' value={newUsername} onChange={handleInput} id='username' className={inputUsernameClass} />}
            fullname={<InputText placeholder='nama lengkap' name='fullname' value={fullname} onChange={handleInput} className='max-w-xs' />}
            category={<InputText placeholder='kategori' name='category' value={category} onChange={handleInput} className='max-w-xs' />}
            button={
              <div className='flex justify-end mb-4'>
                <button className={`btn btn-sm bg-base-300 hover:brightness-90 capitalize me-2 ${username === null || username === '' ? 'hidden' : ''}`} onClick={() => navigate('/p/'+username)}>batal</button>
                <button className="btn btn-sm btn-primary capitalize" onClick={btnSave}>simpan</button>
              </div>
            }
            address={<InputText placeholder='alamat' name='address' value={address} onChange={handleInput} />}
            work={<InputText placeholder='tempat kerja' name='work' value={work} onChange={handleInput} />}
            link={<InputText placeholder='link' name='link' value={link} onChange={handleInput} />}
            biodata={<InputTextArea placeholder='Tambahkan biodata' name='biodata' value={biodata} onChange={handleInput} height='h-60 border-b-0 focus:border-0' />}
          />

        </div>
      </div>
      <BottomNavbar/>
    </div>
  )
}

export default EditProfile