import React from 'react'
import { BaseButton } from './BaseButton'
import profilePicture from '../assets/images/blank-profile-picture.png'

export const BaseCard = (props) => {
  const images = 'https://hygger.io/wp-content/uploads/2018/11/389913ecaf218dff96ba78770abdeb84.jpg'
  const randomPeople = 'https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg'
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src={props.imageUse || images} alt="Shoes" /></figure>
      <div className="card-body">
        <div className='flex flex-row'>
          <div className="avatar">
            <div className="w-8 rounded-full me-2">
              <img src={randomPeople} />
            </div>
          </div>
          <h2 className="card-title">{props.title || 'Example title for project'}</h2>

        </div>
        <div className='text-gray-500'>
          <i className="fa-regular fa-calendar"></i>
          <small className='ms-2'>{props.date || 'september 2023'}</small>
        </div>
        <p>
          {props.text || 'If a dog chews shoes whose shoes does he choose?'}
          <div className='flex flex-row mt-2'>
            <span className="badge badge-ghost p-3 me-2">Badge</span>
          </div>
        </p>
        <div className="card-actions justify-start mt-5">
          <BaseButton icon='fa-solid fa-play' text='demo' />
          <BaseButton icon='fa-brands fa-github' text='source code' />
        </div>
      </div>
    </div>
  )
}
