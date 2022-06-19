import React, { useEffect, useRef, useState } from 'react';
import projectorIcon from '../../assets/images/icons/projector.svg';
import credencLogo from '../../assets/images/logo/credencLogo.svg'
import Image from "next/image";
import dropdownIcon from '../../assets/images/icons/dropdown.svg'

export default function HeaderMobile(){
  
    return(
        <div className='mobile-header'>
        <div className='mobile-header_container'>
        <Image src={credencLogo} objectFit="cover"/>
        <div className='mobile-header-content'>
        <div className='mobile-header-element' style={{marginRight: 10}}>
        <span className='all-subject-text'>All Subjects</span>
        <Image src={dropdownIcon} objectFit="cover" />
        </div> 
        <div className='mobile-header-element' style={{marginRight: 10}}>
        <Image src={projectorIcon} objectFit="cover"/>
        </div>
        <div className='mobile-header-element'>
        <Image src={projectorIcon} objectFit="cover"/>
        </div>
        </div>
        </div>

        </div>
    )
}