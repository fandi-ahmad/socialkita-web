import React from 'react'
import { BaseButton } from './BaseButton'

export const BaseCard = (props) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src={props.image || 'https://hygger.io/wp-content/uploads/2018/11/389913ecaf218dff96ba78770abdeb84.jpg'} alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">{props.title || 'Title'}</h2>
        <div className='text-gray-500'>
          <i class="fa-regular fa-calendar"></i>
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
