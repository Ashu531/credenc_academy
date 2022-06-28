import React, { useEffect, useRef, useState } from 'react';
import filterIcon from '../../assets/images/icons/filterIcon.svg';
import credencLogo from '../../assets/images/logo/credencLogo.svg'
import Image from "next/image";
import dropdownIcon from '../../assets/images/icons/dropdown.svg'
import searchIcon from '../../assets/images/icons/searchIcon.svg'

export default function HeaderMobile(){
  
    return(
        <div className='mobile-header'>
        <div className='mobile-header_container'>
        <Image src={credencLogo} objectFit="cover" alt='credencLogo' />
        <div className='mobile-header-content'>
        <div className='mobile-header-element' style={{marginRight: 10}}>
        <span className='all-subject-text'>All Subjects</span>
        <Image src={dropdownIcon} objectFit="cover" alt='dropdownIcon'/>
        </div> 
        <div className='mobile-header-element' style={{marginRight: 10}}>
        <Image src={searchIcon} objectFit="cover" alt='searchIcon' />
        </div>
        <div className='mobile-header-element'>
        <Image src={filterIcon} objectFit="cover" alt='filterIcon' />
        </div>
        </div>
        </div>

        </div>
    )
}