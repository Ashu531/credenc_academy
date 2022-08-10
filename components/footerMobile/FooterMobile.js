import React, { useEffect, useRef, useState } from 'react';
import projectorIcon from '../../assets/images/icons/projector.svg';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg';
import loginIcon from '../../assets/images/icons/loginIcon.svg';
import homeIcon from '../../assets/images/icons/home.svg';
import Image from "next/image";
import userIcon from "../../assets/images/icons/loginIcon.svg";
import profileIcon from '../../assets/images/icons/profile-icon.svg';
import { useRouter } from 'next/router'
import Link from "next/link";
const EdtechToken = 'credenc-edtech-authkey';

export default function FooterMobile(props){ 

    let location = useRouter();

    const [token,setToken] = useState('')

    useEffect(()=>{
      _retrieveData()
    },[])

    const _retrieveData=()=>{
      let authKey = localStorage.getItem(EdtechToken)
      setToken(authKey)
    }

    const renderProfile = () => {
        if (token && token.length > 0) {
            return (
                <Image  
                src={profileIcon}
                alt='user icon'
                objectFit='cover'
                onClick={() => { 
                    openProfilePage();
                    // Mixpanel.track(MixpanelStrings.NAV_SIGNIN_BUTTON_CLICK) 
                }}
                />
            );
        } else {
            return (
                <Image 
                src={userIcon}
                alt='profile icon'
                objectFit='cover'
                onClick={() => {
                    props?.openLoginModal();
                //    Mixpanel.track(MixpanelStrings.NAV_SIGNIN_BUTTON_CLICK)
                    }}
                />
            );
        }
    }

    const openProfilePage=()=>{
        location.push('/profile');
        props.setMobileLoginNaviagtion()
    }
  
    return(
        <div className='mobile-footer'>
        <div className='mobile-footer-container'>
        <Link href='/'>
        <div className='mobile-footer-element'>
        <Image src={homeIcon} objectFit="contain" alt='homeIcon' />
        <span className='mobile-footer-text'>
            Home
        </span>
        </div>
        </Link>
        <div className='mobile-footer-element'>
        <Image src={projectorIcon} objectFit="contain" alt='projectorIcon'/>
        <span className='mobile-footer-text'>
            Compare
        </span>
        </div>
        <div className='mobile-footer-element'>
        <Image src={bookmarkIcon} objectFit="contain" alt='bookmarkIcon' />
        <span className='mobile-footer-text'>
            Bookmark
        </span>
        </div>
        {/* <div className='mobile-footer-element' onClick={()=>props.openLoginModal()}>
        <Image src={loginIcon} objectFit="contain" alt='loginIcon' />
        <span className='mobile-footer-text'>
            Login
        </span>
        </div> */}

        <div className='nav-item-container'>
                {renderProfile()}
                {/* <img src={profileIcon} alt='home icon'></img> */}
                <span className='nav-item-name'>{ token && token.length > 0 ? 'Profile' : 'Login'}</span>
            </div>

        </div>
        </div>
    )
}