import React from 'react'

export const BaseButton = (props) => {
  return (
    <button className={`btn capitalize ${props.className}`}>
      <i className={props.icon || 'hidden'}></i> {props.text}
    </button>
  )
}
