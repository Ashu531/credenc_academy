import React from 'react'

export default function Button({
    text,
    count='',
    leadingIcon,
    style={},
    classes='',
    onClick,
    trailingIcon,
    disabled=false,
    showTextOnHover=false,
    mobileButtonText='',
}) {
  return (
    <div className={`button-component ${classes} ${disabled ? 'disable' : ''}`} style={style} onClick={onClick}>
        {leadingIcon && <img src={leadingIcon}/>}
        {!!count && <div className={'text'}>{count}</div>}
        {(text && window.innerWidth > 500) && <div className={showTextOnHover ? 'hideText text' : 'text'}>{text}</div>}
        {window.innerWidth <= 500 && (text) && <div className='text'>{text}</div>}
        {(!!mobileButtonText && window.innerWidth <= 500) && <div className='text'>{mobileButtonText}</div>}
        {trailingIcon && <img src={trailingIcon}/>}
    </div>
  )
}
