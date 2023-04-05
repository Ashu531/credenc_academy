import React,{useEffect, useState} from 'react'
import Image from "next/image";
import trailingIcon from '../../assets/images/icons/eye-close.svg'
import { color } from '@mui/system';

export default function NewButton({
    linearGradient,
    text,
    height,
    width,
    handleButtonClick
}) {

  const [buttonPressed,setButtonPressed] = useState(false)

  useEffect(() => {
    return () => {
      setButtonPressed(false)
    };
  }, []);


  const _handleButtonClick = () => {
    setButtonPressed(true)
    handleButtonClick()
  }

  return (
    <div 
      style={{ 
          background: linearGradient, 
          height: height, 
          width: width, 
          color: '#FFFFFF',
          borderRadius: 4,
          fontFamily: 'Work Sans',
          fontSize: 14,
          fontWeight: 600,
          fontStyle: 'normal',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          cursor:'pointer'
        }} 
      onClick={()=>_handleButtonClick()}> 
      {text}
    </div>
  )
}
