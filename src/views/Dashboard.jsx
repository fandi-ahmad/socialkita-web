import React, { useState, useEffect } from 'react'
import { GetAllUser, UpdateUserProfile } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { CheckLogged } from '../components/checkLogged'
import { useGlobalState } from '../state/state';
import { Navbar } from '../components/Navbar';
import { BaseCard } from '../components/BaseCard';
import { getId, formatDate } from '../function/baseFunction';
import { BaseLoading, LoadingData, LoadingScreen } from '../components/BaseLoading';
import { GetAllProjectList } from '../api/projectApi';
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
    <>
      <CheckLogged />
      <Navbar/>
      <BaseAlert type='success' text='projectmu berhasil ditambahkan' className={alertClass} />
      <div className='px-20 py-10'>
        <LoadingData/>
        <div className='grid grid-cols-3 gap-4'>
          {projectList.map((project) => (
            <div className='flex flex-grow' key={project.id}>
              <BaseCard 
                title={project.title}
                username={project.username}
                text={project.description}
                date={formatDate(project.createdAt)}
                projectImage={urlServer+'/'+project.project_image}
                profilePicture={urlServer+'/'+project.profile_picture}
                demoLink={project.demo_link}
                sourceCode={project.source_code}
              />
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default Dashboard