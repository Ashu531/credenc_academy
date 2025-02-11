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
    theme,
    type
}) {

  const [buttonPressed,setButtonPressed] = useState(false)

  useEffect(() => {
    return () => {
      setButtonPressed(false)
    };
  }, []);


  const _handleButtonClick = () => {
    setButtonPressed(true)
    onClick()
  }

  return (
    <div className={`button-component ${classes} ${disabled ? 'disable' : ''}`} style={ linearGradient == 'green' ? {background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)',borderRadius: 6} : style} onClick={()=>_handleButtonClick()}> 
        {/* {leadingIcon && <img src={leadingIcon}/>} */}
        {!!count && <div className={'text'}>{count}</div>}
        {text && <div className={showTextOnHover ? 'hideText text' : 'text'} style={type == 'Show' ? {color : '#FFFFFF'} : null }>{text}</div>}
        {/* {!isDesktopOrLaptop && (text) && <div className='text'>{text}</div>} */}
        {/* {(!!mobileButtonText && !isDesktopOrLaptop) && <div className='text'>{mobileButtonText}</div>} */}
        {/* {trailingIcon && <Image src={trailingIcon} objectFit="contain"/>} */}
        {/* {buttonPressed && <div className='pressedBubble' />} */}
    </div>
  )
}
