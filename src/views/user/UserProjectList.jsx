import React, { useEffect, useState } from 'react'
import { CheckLogged } from '../../components/checkLogged'
import { BottomNavbar, MiniNavbar, Navbar } from '../../components/Navbar'
import { BaseCard } from '../../components/BaseCard'
import { GetProjectListByUser, UpdateProject, DeleteProject } from '../../api/projectApi'
import { useGlobalState } from '../../state/state'
import { InputText, InputTextArea, SimpleInput } from '../../components/baseInput'
import { BaseButton } from '../../components/BaseButton'
import { getId, formatDate } from '../../function/baseFunction'
import { BaseAlert } from '../../components/BaseAlert'
import { BaseLoading, LoadingData, LoadingScreen } from '../../components/BaseLoading'
const urlServer = process.env.KARYAKU_SERVER


const UserProjectList = () => {
  const [uuidUser, setUuidUser] = useGlobalState('uuidUser')
  const [profilePicture, setProfilePicture] = useGlobalState('profile_picture')
  const [projectList, setProjectList] = useState([])
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  const [heightPage, setHeightPage] = useState(0)
  const [theme, setTheme] = useGlobalState('theme')

  // for edit project
  const [uuid, setUuid] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [demoLink, setDemoLink] = useState('')
  const [sourceCode, setSourceCode] = useState('')
  const [projectImage, setProjectImage] = useState(null)
  const [projectImageUrl, setProjectImageUrl] = useState('')


  const getAllData = async () => {
    try {
      if (uuidUser) {
        getId('loadingData').classList.remove('hidden')
        const data = await GetProjectListByUser(uuidUser)
        setProjectList([...data.data]);
        getId('loadingData').classList.add('hidden')
      }
    } catch (error) {
      console.log(error, '<-- error get data');
    }
  }

  const handleInputFile = (e) => {
    const imageSelect = e.target.files[0];
  
    // get extension file
    const fileExtension = imageSelect.name.split(".").pop().toLowerCase();
  
    // check if extension is .jpg, .jpeg, .png
    if (["jpg", "jpeg", "png"].includes(fileExtension)) {
      setProjectImage(imageSelect);
      setProjectImageUrl(URL.createObjectURL(imageSelect));
    } else {
      showAlert('error', 'Hanya file dengan ekstensi .jpg, .jpeg, atau .png yang diterima.')
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title': setTitle(value); break;
      case 'description': setDescription(value); break
      case 'demoLink': setDemoLink(value); break;
      case 'sourceCode': setSourceCode(value); break;
      default: break;
    }
  };

  const showAlert = (type, message, id = 'alertMessage') => {
    setAlertType(type)
    setAlertMsg(message)
    getId(id).classList.remove('hidden')
    setTimeout(() => {
      getId(id).classList.add('opacity-0')
      setTimeout(() => {
        getId(id).classList.remove('opacity-0')
        getId(id).classList.add('hidden')
      }, 100);
    }, 2000);
  }

  const editProject = (data) => {
    setUuid(data.uuid)
    setTitle(data.title)
    setDescription(data.description)
    setDemoLink(data.demo_link)
    setSourceCode(data.source_code)
    setProjectImageUrl(urlServer+'/'+data.project_image)
  }

  const updateProject = async () => {
    try {
      if (title === '' || description === '') {
        showAlert('error', 'judul dan deskripsi harus terisi.')
      } else {
        const formData = new FormData();
        formData.append('uuid', uuid)
        formData.append('image_upload', projectImage)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('demo_link', demoLink)
        formData.append('source_code', sourceCode)

        const response = await UpdateProject(formData)

        getId('closeModal').click()
        response.status === 200
        ? showAlert('success', 'project diperbarui', 'alertMessageList')
        : showAlert('error', 'terjadi kesalahan!', 'alertMessageList')
      
        setTimeout(() => {
          getAllData()
        }, 100);
      }
    } catch (error) {
      console.log(error, '<-- error update project');
    }
  }

  const deleteProject = (uuid_project) => {
    setUuid(uuid_project);
    getId('deleteModal').showModal()
  }
  
  const confirmDeleteProject = async () => {
    try {
      getId('loadingScreen').classList.remove('hidden')
      getId('closeModalDelete').click()
      const response = await DeleteProject(uuid)

      getId('loadingScreen').classList.add('hidden')
      response.status === 200
      ? showAlert('success', 'project berhasil dihapus', 'alertMessageList')
      : showAlert('error', 'terjadi kesalahan!', 'alertMessageList')

      setTimeout(() => {
        getAllData()
      }, 100);
    } catch (error) {
      console.log(error, '<-- error delete project');
    }
  }

  useEffect(() => {
    getAllData()
  }, [uuidUser])


  return (
    <div className='h-screen overflow-hidden'>
      <CheckLogged />
      <Navbar/>
      <MiniNavbar/>
      <LoadingScreen id='loadingScreen' />
      <BaseAlert type={alertType} text={alertMsg} className='hidden' id='alertMessageList' />
      <div className='h-screen overflow-y-auto'>
        <div className='px-10 py-10 mx-auto pb-48' style={{maxWidth: '1380px'}}>
          <LoadingData/>
          <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
            {projectList.map((project) => (
              <div className='flex flex-grow' key={project.uuid}>
                <BaseCard
                  title={project.title}
                  text={project.description}
                  date={formatDate(project.createdAt)}
                  projectImage={urlServer+'/'+project.project_image}
                  profilePicture={profilePicture}
                  demoLink={project.demo_link}
                  sourceCode={project.source_code}
                  showMenu='show'
                  onClickEdit={() => editProject(project)}
                  onClickDelete={() => deleteProject(project.uuid)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <dialog id="deleteModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Yakin ingin menghapus project?</h3>
          <p className="py-4 text-center">Anda tidak dapat membatalkan ini</p>
          <div className="modal-action flex justify-center">
            <button className="btn btn-primary" onClick={confirmDeleteProject}>Ya</button>
            <form method="dialog">
              <button className="btn" id='closeModalDelete'>tidak</button>
            </form>
          </div>
        </div>
      </dialog>


      <input type="checkbox" id="my_modal_62" className="modal-toggle" />
      <div className="modal">
        <BaseAlert type={alertType} text={alertMsg} className='hidden' id='alertMessage' />
        <div className="modal-box min-w-fit">
          <h3 className="font-bold text-lg mb-4">Edit Project</h3>
          <div className='modal-action'>
            <label htmlFor="my_modal_62" id='closeModal' className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              <i className="fa-solid fa-xmark fa-lg"></i>
            </label>
          </div>
          <div className='flex overflow-y-auto flex-col lg:flex-row'>
            <div className=''>
              <img className='rounded-md w-full lg:w-80 lg:mr-4 h-60 object-cover cursor-pointer hover:brightness-90 duration-200' src={projectImageUrl} alt="" onClick={() => getId('inputFile').click()} />
              <input type="file" id='inputFile' onChange={handleInputFile} className='hidden' />
            </div>
            <div className='w-full lg:w-96 mt-4'>
              <InputText placeholder='Tambahkan judul' className='mb-4 font-bold text-xl' value={title} name='title' onChange={handleInput} theme={theme} />
              <InputTextArea placeholder='Tambahkan deskripsi singkat' className='mb-4' name='description' value={description} onChange={handleInput} theme={theme} />
              
              <div className='flex items-center mb-4'>
                <i className="fa-solid fa-play mr-4"></i>
                <InputText className='w-full' placeholder='demo link' value={demoLink} name='demoLink' onChange={handleInput} theme={theme} />
              </div>
              <div className="flex items-center mb-4">
                <i className="fa-brands fa-github mr-4"></i>
                <InputText className='w-full' placeholder='source code' value={sourceCode} name='sourceCode' onChange={handleInput} theme={theme} />
              </div>
            </div>
          </div>
          <div className='flex justify-center lg:justify-end mt-4'>
            <BaseButton text='selesai' onClick={updateProject} />
          </div>
        </div>
      </div>
      <BottomNavbar/>

    </div>
  )
}

export default UserProjectList