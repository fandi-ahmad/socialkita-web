import React from 'react'

export const BaseButton = (props) => {
  return (
    <button className={`btn capitalize ${props.className}`} onClick={props.onClick}>
      <i className={props.icon || 'hidden'}></i> {props.text}
    </button>
  )
}
