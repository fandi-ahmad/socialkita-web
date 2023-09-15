import React, { useEffect, useState } from 'react'
import { CheckLogged } from '../../components/checkLogged'
import { MiniNavbar, Navbar } from '../../components/Navbar'
import { BaseCard } from '../../components/BaseCard'
import { GetProjectListByUser } from '../../api/projectApi'
import { useGlobalState } from '../../state/state'
const urlServer = process.env.KARYAKU_SERVER


const UserProjectList = () => {
  const [uuidUser, setUuidUser] = useGlobalState('uuidUser')
  const [profilePicture, setProfilePicture] = useGlobalState('profile_picture')
  const [projectList, setProjectList] = useState([])


  const getAllData = async () => {
    try {
      if (uuidUser) {
        const data = await GetProjectListByUser(uuidUser)
        setProjectList(data.data)
      }
    } catch (error) {
      console.log(error, '<-- error get data');
    }
  }

  useEffect(() => {
    getAllData()
  }, [uuidUser])


  return (
    <>
      <CheckLogged />
      <Navbar/>
      <MiniNavbar/>
      <div className='px-20 py-10'>
        <div className='grid grid-cols-3 gap-4'>
          {projectList.map((project) => (
            <div className='flex flex-grow' key={project.id}>
              <BaseCard
                title={project.title}
                text={project.description}
                date={project.createdAt}
                projectImage={urlServer+'/'+project.project_image}
                profilePicture={profilePicture}
                demoLink={project.demo_link}
                sourceCode={project.source_code}
                showMenu='show'
              />

            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default UserProjectList