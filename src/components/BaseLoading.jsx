import React from 'react'

export const BaseLoading = (props) => {
  return (
    <div id={props.id} className={`bg-base-100 w-full min-h-full absolute z-50 flex justify-center items-center duration-100 ${props.className}`}>
      <span className="loading loading-spinner text-primary loading-lg"></span>
    </div>
  )
}

export const LoadingScreen = (props) => {
  return (
    <div id={props.id} className='hidden fixed top-0 z-30 w-full h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center' style={{ height: props.heightPage }}>
      <span className="loading loading-spinner text-primary loading-lg"></span>
    </div>
  )
}
