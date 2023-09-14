import React from 'react'
import { BaseButton } from './BaseButton'
import profilePictureEmpty from '../assets/images/blank-profile-picture.png'

export const BaseCard = (props) => {
  const images = 'https://hygger.io/wp-content/uploads/2018/11/389913ecaf218dff96ba78770abdeb84.jpg'

  const showHideButton = (propsSelected, icon, text) => {
    if (propsSelected) {
      return (
        <a target='_blank' href={propsSelected}>
          <BaseButton icon={icon} text={text} className='me-4' />
        </a>
      )
    }
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className='h-60'><img src={props.projectImage || images} className='object-cover object-center w-full' /></figure>
      <div className="card-body flex">
        <div className='flex flex-row'>
          <div className="avatar">
            <div className="w-8 rounded-full me-2">
              <img src={props.profilePicture || profilePictureEmpty} />
            </div>
          </div>
          <h2 className="card-title">{props.title || 'Example title for project'}</h2>

        </div>
        <div className='text-gray-500'>
          <i className="fa-regular fa-calendar"></i>
          <small className='ms-2'>{props.date || 'september 2023'}</small>
        </div>
        <span>
          {props.text || 'If a dog chews shoes whose shoes does he choose?'}
          <div className='flex flex-row mt-2'>
            <span className="badge badge-ghost p-3 me-2">Badge</span>
          </div>
        </span>
        <div className="card-actions flex flex-grow justify-between items-end mt-5">
          <div>
            {showHideButton(props.demoLink, 'fa-solid fa-play', 'demo')}
            {showHideButton(props.sourceCode, 'fa-brands fa-github', 'source code')}
          </div>
          <div className='h-12 flex items-center justify-center'>
            <div className='dropdown dropdown-bottom dropdown-end cursor-pointer' tabIndex={0} >
              <label className="m-1 cursor-pointer">
                <i className="fa-solid fa-ellipsis-vertical fa-xl"></i>
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Edit</a></li>
                <li><a>Hapus</a></li>
                <li><a>Arsipkan</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
