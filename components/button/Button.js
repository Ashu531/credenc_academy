import React,{useEffect, useState} from 'react'
import Image from "next/image";
import trailingIcon from '../../assets/images/icons/eye-close.svg'
import { color } from '@mui/system';

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
    linearGradient,
    theme
}) {

  return (
    <div className={`button-component ${classes} ${disabled ? 'disable' : ''}`} style={ linearGradient == 'green' ? {background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)'} : style} onClick={onClick}> 
        {/* {leadingIcon && <img src={leadingIcon}/>} */}
        {!!count && <div className={'text'} style={theme === 'light' ? {color: '#222222'} : {color: '#DEDEDE'}}>{count}</div>}
        {(text && window.innerWidth > 500) && <div className={showTextOnHover ? 'hideText text' : 'text'} style={theme === 'light' ? {color: '#222222'} : {color: '#DEDEDE'}}>{text}</div>}
        {window.innerWidth <= 500 && (text) && <div className='text'>{text}</div>}
        {(!!mobileButtonText && window.innerWidth <= 500) && <div className='text'>{mobileButtonText}</div>}
        {/* {trailingIcon && <Image src={trailingIcon} objectFit="contain"/>} */}
    </div>
  )
}
