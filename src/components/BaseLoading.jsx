import React from 'react'

export const BaseLoading = (props) => {
  return (
    <div id={props.id} className={`bg-base-100 w-full min-h-full absolute z-50 flex justify-center items-center duration-100 ${props.className}`}>
      <span className="loading loading-spinner text-primary loading-lg"></span>
    </div>
  )
}
