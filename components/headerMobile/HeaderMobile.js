import React, { useEffect, useRef, useState } from 'react';
import filterIcon from '../../assets/images/icons/filterIcon.svg';
import credencLogo from '../../assets/images/logo/credencLogo.svg'
import Image from "next/image";
import dropdownIcon from '../../assets/images/icons/dropdown.svg'
import searchIcon from '../../assets/images/icons/searchIcon.svg'
import credencLogoLight from '../../assets/images/icons/credenc-logo.svg'
import { useRouter } from 'next/router'

export default function HeaderMobile(props){

   const [subject,setSubject] = useState('');
   let location = useRouter();

   useEffect(()=>{
     _retrieveData()
   },[location?.query?.domain])

   const _retrieveData=()=>{
       if(location.query.hasOwnProperty('domain')){
        setSubject(location?.query?.domain)
       }
   }

   const  _handleSubjectItem=()=>{
        props?.toggleSubjectDropdown()
        props?.toggleFilterVisible()
    }
 
    return(
        <div className='mobile-header'>
            <div className='mobile-header_container'>
                <Image src={props.theme === 'dark' ? credencLogoLight : credencLogo} objectFit="cover" alt='credencLogo' />
                <div className='mobile-header-content'>
                    <div 
                        className='mobile-header-element' 
                        style={{marginRight: 10}} 
                        onClick={()=> _handleSubjectItem()}
                    >
                        <span className='all-subject-text'>{subject ? subject : props?.subjectName}</span>
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