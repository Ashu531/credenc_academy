import React, { useEffect, useRef, useState } from 'react';
import filterIcon from '../../assets/images/icons/filterIcon.svg';
import credencLogo from '../../assets/images/logo/credencLogo.svg'
import Image from "next/image";
import dropdownIcon from '../../assets/images/icons/dropdown.svg'
import searchIcon from '../../assets/images/icons/searchIcon.svg'
import { useRouter } from 'next/router'

export default function HeaderMobile(props){

       const [selectedSubject,setSelectedSubject] = useState('All Subjects');
       let location = useRouter();

        useEffect(()=>{
            _getDataFromUrl()
        },[location?.query?.subject])

        const _getDataFromUrl=()=>{
            if(location?.query?.hasOwnProperty('subject')){
                setSelectedSubject(location?.query?.subject)
            }else{
                setSelectedSubject('All Subjects')
            }
        }

    return(
        <div className='mobile-header'>
        <div className='mobile-header_container'>
        <Image src={credencLogo} objectFit="cover" alt='credencLogo' />
        <div className='mobile-header-content'>
        <div className='mobile-header-element' style={{marginRight: 10}} onClick={()=>props.toggleSubjectDropdown()}>
          <span className='all-subject-text'>{selectedSubject}</span>
         <Image src={dropdownIcon} objectFit="cover" alt='dropdownIcon'/>
        </div> 
        <div className='mobile-header-element' style={{marginRight: 10}}>
        <Image src={searchIcon} objectFit="cover" alt='searchIcon' />
        </div>
        <div className='mobile-header-element' onClick={()=>props.openFilterExpandedStage()}>
        <Image src={filterIcon} objectFit="cover" alt='filterIcon' />
        </div>
        </div>
        </div>

        </div>
    )
}