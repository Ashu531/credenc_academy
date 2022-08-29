import React, { useEffect, useRef, useState } from 'react';
import projectorIcon from '../../assets/images/icons/projector.svg';
import projectorIconLight from '../../assets/images/icons/projector-light.svg'
import bookmarkIcon from '../../assets/images/icons/bookmark.svg';
import bookmarkIconLight from '../../assets/images/icons/bookmark-dark.svg';
import loginIcon from '../../assets/images/icons/loginIcon.svg';
import homeIcon from '../../assets/images/icons/home.svg';
import homeIconLight from '../../assets/images/icons/home-light.svg';
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
    },[props?.loggedIn])

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
                height={18} 
                width={18}
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
                height={18} 
                width={18}
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
        <div className='mobile-footer' style={ props?.filterModalVisible ? {zIndex: 0} : null }>
        <div className='mobile-footer-container'>
        <Link href='/'>
        <div className='mobile-footer-element'>
        <Image src={props?.theme === 'dark' ? homeIconLight : homeIcon} objectFit="contain" alt='homeIcon' style={{alignSelf:"flex-end"}} />
        <span className='mobile-footer-text'>
            Home
        </span>
        </div>
        </Link>
        <div className='mobile-footer-element'>
        <Image src={ props?.theme === 'dark' ? projectorIconLight : projectorIcon} objectFit="contain" alt='projectorIcon' height={18} width={18}/>
        <span className='mobile-footer-text'>
            Compare
        </span>
        </div>
        <div className='mobile-footer-element'>
        <Image src={ props?.theme === 'dark' ? bookmarkIconLight : bookmarkIcon} objectFit="contain" alt='bookmarkIcon' height={18} width={18}/>
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