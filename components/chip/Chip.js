import React from 'react'

export default function Chip({text='', leadingIcon, trailingIcon, style={}}) {
  return (
    <span className='chip' style={style}>
        {leadingIcon && <img src={leadingIcon}/>}
        <span>{text}</span>
        {trailingIcon && <img src={trailingIcon}/>}
    </span>
  )
}
