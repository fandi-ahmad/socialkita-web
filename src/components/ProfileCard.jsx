import React from 'react'

export const ProfileCard = (props) => {
  const checkProps = (propsSelected, icon, className = null, text = 'capitalize') => {
    if (propsSelected) {
      return (
        <div className={`flex flex-row items-center ${className}`}>
          <div className='w-5'>
            <i className={`fa-solid ${icon}`}></i>
          </div>
          <p className={`ps-2 ${text}`}>{propsSelected}</p>
        </div>
      )
    }
  }

  const checkPropsLink = (propsSelected) => {
    if (propsSelected) {
      return (
        <a className='flex flex-row items-center cursor-pointer hover:text-blue-500 w-fit' target='_blank' href={`https://${propsSelected}`}>
          <div className='w-5'>
            <i className='fa-solid fa-link'></i>
          </div>
          <p className='ps-2'>{propsSelected}</p>
        </a>
      )
    }
  }

  return (
    <div className={`w-full ms-16 ${props.className}`} id={props.id}>
      <div className='w-full pb-4 flex justify-between'>
        <p className='text-2xl'>{props.username}</p>
        {props.button}
      </div>
      <div>
        <p className='font-bold text-2xl capitalize'>{props.fullname}</p>
        <p className='text-md capitalize'>{props.category}</p>
      </div>
      
      <div className='my-4'>
        {checkProps(props.address, 'fa-location-dot')}
        {checkProps(props.work, 'fa-building')}
        {checkPropsLink(props.link)}
      </div>
      <hr />
      <p className='my-4'>{props.biodata}</p>
    </div>
  )
}

export const ProfileCardInput = (props) => {
  return (
    <div className={`w-full ms-16 ${props.className}`} id={props.id}>
      <div className='w-full pb-4 flex justify-between'>
        <p className='text-2xl'>{props.username}</p>
        {props.button}
      </div>
      <div>
        <p className='font-bold text-2xl capitalize'>{props.fullname}</p>
        <p className='text-md capitalize'>{props.category}</p>
      </div>
      
      <div className='my-4'>
        <div className='flex flex-row items-center'>
          <div className='w-5'>
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <p className='ps-2 capitalize'>{props.address}</p>
        </div>
        <div className='flex flex-row items-center'>
          <div className='w-5'>
            <i className="fa-solid fa-building"></i>
          </div>
          <p className='ps-2 capitalize'>{props.work}</p>
        </div>
        <div className='flex flex-row items-center cursor-pointer'>
          <div className="w-5">
            <i className="fa-solid fa-link"></i>
          </div>
          <p className='ps-2'>{props.link}</p>
        </div>
      </div>
      <hr />
      <p className='my-4'>{props.biodata}</p>
    </div>
  )
}
