import React from 'react'

export const ProfileCard = (props) => {
  return (
    <div className={`w-full ms-16 ${props.className}`} id={props.id}>
      <div className='w-full pb-4 flex justify-between'>
        <p className='text-2xl'>{props.username}</p>
        {props.button}
        {/* <button className="btn btn-sm btn-primary">button</button> */}
      </div>
      <div>
        <p className='font-bold text-2xl capitalize'>{props.fullname}</p>
        <p className='text-md capitalize'>{props.category}</p>
      </div>
      
      <div className='my-4'>
        <div className='flex flex-row items-center'>
          <div className='w-5'>
            <i class="fa-solid fa-location-dot"></i>
          </div>
          <p className='ps-2 capitalize'>{props.address}</p>
        </div>
        <div className='flex flex-row items-center'>
          <div className='w-5'>
            <i class="fa-solid fa-building"></i>
          </div>
          <p className='ps-2 capitalize'>{props.work}</p>
        </div>
        <div className='flex flex-row items-center cursor-pointer'>
          <div className="w-5">
            <i class="fa-solid fa-link"></i>
          </div>
          <p className='ps-2'>{props.link}</p>
        </div>
      </div>
      <hr />
      <p className='my-4'>{props.biodata}</p>
    </div>
  )
}
