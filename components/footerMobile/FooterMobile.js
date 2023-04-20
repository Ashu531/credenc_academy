import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import profileIcon from '../../assets/images/icons/profile-icon.svg';
import { useRouter } from 'next/router'
const EdtechToken = 'credenc-edtech-authkey';

export default function FooterMobile(props) {

    let location = useRouter();

    const [token, setToken] = useState('')

    useEffect(() => {
        _retrieveData()
    }, [props?.loggedIn])

    const _retrieveData = () => {
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
                <div className='imageContainer' onClick={()=>props?.openLoginModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style={props?.loginModal ? {color:'#8F14CC'} : null}><rect width="24px" height="24px" fill="none" /><rect x="52.13" y="52.13" width="151.73" height="151.73" rx="7.95" transform="translate(-53.02 128) rotate(-45)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                </div>
            );
        }
    }

    const navigateBookmarkPage = () => {
        props?.closeLoginModal()
        location.push('/bookmarks');
    }

    const openProfilePage = () => {
        location.push('/profile');
        props.setMobileLoginNaviagtion()
    }

    const navigateHomePage = () => {
        props?.closeLoginModal()
        location.push('/');
    }

    return (
        <div 
            className='mobile-footer showInMobile' 
        >
            <div className='mobile-footer-container'>

                <div className='mobile-footer-element' onClick={() => navigateHomePage()}>
                    <div className='imageContainer'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style={location.pathname === '/' && !props?.loginModal ? {color:'#8F14CC'} : null}><rect width="24px" height="24px" fill="none" /><path d="M142.41,40.22l87.46,151.87C236,202.79,228.08,216,215.46,216H40.54C27.92,216,20,202.79,26.13,192.09L113.59,40.22C119.89,29.26,136.11,29.26,142.41,40.22Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                    </div>
                    <span className='mobile-footer-text' style={location.pathname === '/' && !props?.loginModal ? {color:'#8F14CC'} : null}>
                        Home
                    </span>
                </div>

                <div className='mobile-footer-element'>
                    <div className='imageContainer'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style={location.pathname === '/search' && !props?.loginModal ? {color:'#8F14CC'} : null}><rect width="24px" height="24px" fill="none" /><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                    </div>
                    <span className='mobile-footer-text' style={location.pathname === '/search' && !props?.loginModal ? {color:'#8F14CC'} : null}>
                        Search
                    </span>
                </div>
                <div className='mobile-footer-element' onClick={() => navigateBookmarkPage()}>
                    <div className='bookmark-element-mobile'>
                        <div className='imageContainer'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style={location.pathname === '/bookmarks' && !props?.loginModal ? {color:'#8F14CC'} : null}><rect width="24px" height="24px" fill="none" /><path d="M128,216S24,160,24,94A54,54,0,0,1,78,40c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,160,128,216,128,216Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                        </div>
                        {
                            props?.bookmarkCount >= 1 ? <span className="bookmark-count-container-mobile">
                                <span className="bookmark-count-mobile"  style={location.pathname === '/bookmarks' && !props?.loginModal ? {color:'#8F14CC'} : null}>{props?.bookmarkCount >= 1 ? props?.bookmarkCount : null}</span>
                            </span> : null
                        }
                    </div>
                    <span className='mobile-footer-text'  style={location.pathname === '/bookmarks' && !props?.loginModal ? {color:'#8F14CC'} : null}>
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
                    <span className='nav-item-name' style={props?.loginModal ? {color:'#8F14CC'} : null}>{token && token.length > 0 ? 'Profile' : 'Login'}</span>
                </div>

            </div>
        </div>
    )
}