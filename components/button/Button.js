import React from 'react'
import Image from "next/image";
import trailingIcon from '../../assets/images/icons/eye-close.svg'

export default function Button({
    text,
    count='',
    leadingIcon,
    style={},
    classes='',
    onClick,
    disabled=false,
    showTextOnHover=false,
    mobileButtonText='',
    linearGradient
}) {
  return (
    <div className={`button-component ${classes} ${disabled ? 'disable' : ''}`} style={ linearGradient == 'green' ? {background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)'} : style} onClick={onClick}> 
        {/* {leadingIcon && <img src={leadingIcon}/>} */}
        {!!count && <div className={'text'}>{count}</div>}
        {(text && window.innerWidth > 500) && <div className={showTextOnHover ? 'hideText text' : 'text'}>{text}</div>}
        {window.innerWidth <= 500 && (text) && <div className='text'>{text}</div>}
        {(!!mobileButtonText && window.innerWidth <= 500) && <div className='text'>{mobileButtonText}</div>}
        {/* {trailingIcon && <Image src={trailingIcon} objectFit="contain"/>} */}
    </div>
  )
}
