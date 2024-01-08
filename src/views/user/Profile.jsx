import React, { useState, useEffect } from 'react'
import { Navbar, MiniNavbar, BottomNavbar } from '../../components/Navbar'
import { SimpleInput } from '../../components/baseInput'
import { ProfileCard } from '../../components/ProfileCard'
import profilePictureEmpty from '../../assets/images/blank-profile-picture.png'
import { CheckLogged } from '../../components/checkLogged'
import { useGlobalState } from '../../state/state'
import { GetUserProfile, UpdateUserProfile } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'
import { BaseCard } from '../../components/BaseCard'
import { formatDate } from '../../function/baseFunction'
const urlServer = import.meta.env.VITE_SOCIALKITA_SERVER

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
  const [profilePictureSearch, setProfilePictureSearch] = useState(null)
  const [dataUser, setDataUser] = useGlobalState('dataUser')
  const [dataProjectUser, setDataProjectUser] = useGlobalState('dataProjectUser')

  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')
  const [isUsername, setIsUsername] = useGlobalState('isUsername')
  const [isUsernameSame, setIsUsernameSame] = useGlobalState('isUsernameSame')
  const navigate = useNavigate()

  // const getUserProfile = async () => {
  //   try {
  //     if (uuidUser) {
  //       const user = await GetUserProfile(uuidUser)
  //       const data = user.data

  //       setProfilePicture(`${urlServer}/${data.profile_picture}`)
  //       setFullname(data.fullname)
  //       setCategory(data.category)
  //       setAddress(data.address)
  //       setWork(data.work)
  //       setLink(data.link)
  //       setBiodata(data.biodata)
        
  //     }
  //   } catch (error) {
  //     console.log(error, '<-- error');
  //   }
  // }

  const fillDataUser = () => {
    setProfilePictureSearch(dataUser.profile_picture ? urlServer+'/'+dataUser.profile_picture : null)
    setFullname(dataUser.fullname)
    setCategory(dataUser.category)
    setAddress(dataUser.address)
    setWork(dataUser.work)
    setLink(dataUser.link)
    setBiodata(dataUser.biodata)
  }

  const classImageProfile = isUsernameSame ? 'cursor-pointer' : ''
  
  useEffect(() => {
    fillDataUser()
  }, [dataUser])

  return (
    <div className='h-screen overflow-y-auto'>
      <Navbar/>
      <MiniNavbar/>
      <div className={`fixed z-50 top-5 w-full px-20 flex justify-center transition-all duration-200 ${alertSuccessEdit}`} id='succesEdit'>
        <div className={`alert alert-success w-fit`} >
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Data berhasil diperbarui</span>
        </div>
      </div>

      <div>
        <div className='px-10 pt-10 flex flex-col md:flex-row mx-auto' style={{maxWidth: '1380px'}}>
          <div className={"avatar tooltip tooltip-bottom h-full flex justify-center mb-12 " + classImageProfile} data-tip={isUsernameSame ? 'edit foto profile' : null} onClick={() => isUsernameSame ? navigate('/p/'+username+'/edit') : null}>
            <div className="w-40 h-40 xsm:w-52 xsm:h-52 sm:w-72 sm:h-72 rounded-full">
              <img src={profilePictureSearch || profilePicture || profilePictureEmpty} className='w-full' />
            </div>
          </div>

          <ProfileCard className='pb-24' id='profileCard'
            username={dataUser.username}
            fullname={fullname}
            category={category}
            button={ isUsernameSame ?
              <div className='flex justify-end mb-4'>
                <button className="btn btn-sm btn-primary capitalize" onClick={() => navigate('/p/'+dataUser.username+'/edit')}>Edit profile</button>
              </div> : null
            }
            address={address}
            work={work}
            link={link}
            biodata={biodata}
          />

        </div>
      </div>

      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-28'>
        {dataProjectUser.map((project) => (
          <div className='flex flex-grow mx-auto' key={project.id}>
            <BaseCard
              title={project.title}
              username={dataUser.username}
              text={project.description}
              date={formatDate(project.createdAt)}
              projectImage={urlServer+'/'+project.project_image}
              profilePicture={profilePictureSearch || profilePicture || profilePictureEmpty}
              demoLink={project.demo_link}
              sourceCode={project.source_code}
            />
          </div>
        ))}

      </div>

      <BottomNavbar/>

    </div>
  )
}

export default Profile