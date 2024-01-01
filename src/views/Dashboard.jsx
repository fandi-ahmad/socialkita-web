import React, { useState, useEffect } from 'react'
import { GetAllUser, UpdateUserProfile, GetUserByUsername } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { CheckLogged } from '../components/checkLogged'
import { useGlobalState } from '../state/state';
import { BottomNavbar, Navbar } from '../components/Navbar';
import { BaseCard } from '../components/BaseCard';
import { getId, formatDate } from '../function/baseFunction';
import { BaseLoading, LoadingData, LoadingScreen } from '../components/BaseLoading';
import { GetAllDataUserByUsername, GetAllProjectList } from '../api/projectApi';
import { BaseAlert } from '../components/BaseAlert';
const urlServer = process.env.KARYAKU_SERVER

const Dashboard = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useGlobalState('username')
  const [projectList, setProjectList] = useState([])
  const [alertClass, setAlertClass] = useGlobalState('alertClass')

  const getAllData = async () => {
    try {
      if (username !== null) {
        if (username === '') {
          navigate('/profile/edit')
        } 
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllProjectList = async () => {
    try {
      getId('loadingData').classList.remove('hidden')
      const data = await GetAllProjectList()
      setProjectList(data.data)
      getId('loadingData').classList.add('hidden')
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAllProjectList()
  }, [])

  useEffect(() => {
    getAllData()
  }, [username])


  return (
    <div className='h-screen overflow-hidden'>
      <Navbar/>
      <BaseAlert type='success' text='projectmu berhasil ditambahkan' className={alertClass} />
      <div className='h-screen overflow-y-auto'>
        <div className='px-10 py-10 mx-auto pb-48' style={{maxWidth: '1380px'}}>
          <LoadingData/>
          <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
            {projectList.map((project) => (
              <div className='flex flex-grow mx-auto' key={project.id}>
                <BaseCard 
                  title={project.title}
                  username={project.username}
                  text={project.description}
                  date={formatDate(project.createdAt)}
                  projectImage={urlServer+'/'+project.project_image}
                  profilePicture={urlServer+'/'+project.profile_picture}
                  demoLink={project.demo_link}
                  sourceCode={project.source_code}
                  showMenuProfile='show'
                  onClickShowProfile={() => navigate('/p/'+project.username)}
                />
              </div>
            ))}

          </div>
        </div>
      </div>
      <BottomNavbar/>
    </div>
  )
}

export default Dashboard