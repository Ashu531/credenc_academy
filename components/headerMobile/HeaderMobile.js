import React, { useEffect, useRef, useState } from 'react';
import filterIcon from '../../assets/images/icons/filterIcon.svg';
import credencLogo from '../../assets/images/logo/credencLogo.svg'
import Image from "next/image";
import dropdownIcon from '../../assets/images/icons/dropdown.svg'
import searchIcon from '../../assets/images/icons/searchIcon.svg'
import { useRouter } from 'next/router'
import credencLogoLight from '../../assets/images/icons/credenc-logo.svg'
import UrlService from "../../helper/urlService";

export default function HeaderMobile(props){

       const [selectedSubject,setSelectedSubject] = useState('All Subjects');
       let location = useRouter();
       let nextURL=location?.asPath?.substring(2,location?.asPath?.length)
       let urlService = useRef(new UrlService(nextURL));
       

        useEffect(()=>{
            _getDataFromUrl()
        },[])

        const _getDataFromUrl=()=>{
            let urlSubjectQuery = urlService.current.getValueFromEntry('subject')

            if(urlSubjectQuery && Object.keys(urlSubjectQuery).length !== 0){
                setSelectedSubject(urlSubjectQuery)
            }else{
                setSelectedSubject('All Subjects')
            }
        }


    return(
        <div className='mobile-header'>
        <div className='mobile-header_container'>
        <Image src={props.theme === 'dark' ? credencLogoLight : credencLogo} objectFit="cover" alt='credencLogo' />
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