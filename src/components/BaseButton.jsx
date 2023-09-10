import React from 'react'

export const BaseButton = (props) => {
  return (
    <button className="btn">
      <i class={props.icon || 'hidden'}></i> {props.text}
    </button>
  )
}
