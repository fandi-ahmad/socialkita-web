import React from 'react'
import { BaseButton } from './BaseButton'
import profilePictureEmpty from '../assets/images/blank-profile-picture.png'
const urlServer = import.meta.env.VITE_SOCIALKITA_SERVER

export const BaseCard = (props) => {
  const exampleImage = 'https://img.freepik.com/free-psd/music-magazine-landing-page-theme_23-2148824020.jpg?w=826&t=st=1694677888~exp=1694678488~hmac=ea42a6e7f43fe3cbc829bfa7ad386d1ecd37eb0b7e037e539c25e1b446d68290'
  const classMenuDropdown = 'flex w-full py-2 px-4 cursor-pointer hover:bg-base-300 rounded-md'

  const showHideButton = (propsSelected, icon, text) => {
    if (propsSelected) {
      return (
        <a target='_blank' href={'https://'+propsSelected}>
          <BaseButton icon={icon} text={text} className='me-4 btn-sm sm:btn-md' />
        </a>
      )
    }
  }

  const showHideMenu = (propsSelected) => {
    if (propsSelected) {
      return (
        <div className='h-12 flex items-center justify-center'>
          <div className='dropdown dropdown-bottom dropdown-end cursor-pointer' tabIndex={0} >
            <label className="m-1 cursor-pointer">
              <i className="fa-solid fa-ellipsis-vertical fa-xl"></i>
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <ul><label htmlFor='my_modal_62' onClick={props.onClickEdit} className={classMenuDropdown}>Edit</label></ul>
              <ul><label htmlFor="" onClick={props.onClickDelete} className={classMenuDropdown}>Hapus</label></ul>
            </ul>
          </div>
        </div>
      )
    }
  }

  const showHideMenuProfile = (propsSelected) => {
    if (propsSelected) {
      return (
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li onClick={props.onClickShowProfile}><a>Show Profile</a></li>
          <li onClick={props.onClickSendMessage}><a>Send Message</a></li>
        </ul>
      )
    }
  }


  return (
    <div className="card bg-base-100 shadow-xl mx-auto w-full xsm:w-72 sm:w-96 lg:mx-0 md:w-80 lg:w-96" key={props.key}>
      <figure className='h-32 sm:h-48 md:h-60'>
        <img src={!props.projectImage || props.projectImage === urlServer+'/' ? exampleImage : props.projectImage} 
          className='object-cover object-center w-full h-full' />
      </figure>
      <div className="card-body flex">
        <div className='flex flex-row items-center'>

          <div className="dropdown">
            <div className="avatar" tabIndex={0} role='button'>
              <div className="w-8 h-8 rounded-full me-2">
                <img src={!props.profilePicture || props.profilePicture === urlServer+'/' ? profilePictureEmpty : props.profilePicture} />
              </div>
            </div>
            {showHideMenuProfile(props.showMenuProfile)}            
          </div>

          <div>
            <h2 className="card-title">{props.title || 'Example title for project'}</h2>
            <p>{props.username}</p>
          </div>

        </div>
        <div className='text-gray-500'>
          <i className="fa-regular fa-calendar"></i>
          <small className='ms-2'>{props.date}</small>
        </div>
        <span>
          {props.text}
        </span>
        <div className="card-actions flex flex-grow justify-between items-end mt-5 flex-row md:flex-row">
          <div className='flex flex-col sm:flex-row gap-2'>
            {showHideButton(props.demoLink, 'fa-solid fa-play', 'demo')}
            {showHideButton(props.sourceCode, 'fa-brands fa-github', 'source')}
          </div>
          {showHideMenu(props.showMenu)}
        </div>
      </div>
    </div>
  )
}
