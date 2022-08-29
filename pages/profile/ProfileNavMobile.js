import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import Link from "next/link";
import credencLogo from '../../assets/images/logo/credencLogo.svg';
import profileIcon from '../../assets/images/icons/profile-icon.svg';
import ApiStatus from '../../config/apiStatus';
import axios from 'axios';
import Image from "next/image";
import constant from '../../config/constant';
import EditProfile from './EditProfile'
import ResetPassword from './ResetPassword'
import PrivacyPolicy from '../privacy'

export default function ProfileNavMobile({
    token, 
    dispatchLogout,
    openForgotPasswordModal,
    mobileLoginNavigation,
    setMobileLoginNavigation,
    logoutUser,
    handleLogout
}) {

    let location = useRouter();

    const userApiStatus = useRef(new ApiStatus());

    const [name, setName] = useState('');
    const [inputName, setInputName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [provider, setProvider] = useState('');
    const [profilePages, setProfilePages] = useState({
        editProfile: false,
        privacyPolicy: false,
        recommendation: false,
        resetPassword: false,
      })

    const routes = {
        EDIT: 'edit',
        RESET_PASSWORD: 'reset_password',
        NOTIFICATIONS: 'notifications',
        INVITE: 'invite',
        POLICIES: 'policies',
        REVIEWS: 'reviews',
        UPVOTES: 'upvotes',
        NAVBAR_MOBILE: 'navbar',
    }

    const triggerMixpanel = (type) => {
        let eventText;
        switch (type) {
            case ('edit'):
                // eventText = MixpanelStrings.PROFILE_SETTINGS
                break;
            case ('reset password'):
                // eventText = MixpanelStrings.RESET_PASSWORD
                break;
            case ('policies'):
                // eventText = MixpanelStrings.POLICIES
                break;
            case ('reviews'):
                // eventText = MixpanelStrings.REVIEWS
                break;
            case ('upvotes'):
                // eventText = MixpanelStrings.UPVOTES
                break;
            default:
                eventText = 'Nothing is triggered!'
        }
        Mixpanel.track(eventText, {
            triggered_from: 'Profile page'
        })
    }

    const handleNavClick = (mixpanelText, navigationText) => {
        triggerMixpanel(mixpanelText); 
        if (navigationText === 'logout'){
            dispatchLogout();
            window.location.reload();
            return;
        } else {
            location.push({
                pathname: '/profile',
                state: navigationText
            })
            // navigate(`/profile/${navigationText}`);
        }
    }

    const getDataFromUrl = async (url, token, apiStatus) => {
        if(apiStatus){
            apiStatus.current.makeApiCall();
        }
        const res = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if(apiStatus){
                apiStatus.current.success();
            }
            return res;
        })
        .catch(err => {
            if(apiStatus){
                apiStatus.current.failed();
            }
            console.log(err);
        });
    
        return res ? res.data : [];
    }

    useEffect(() => {
        async function getProfileDetails(){
            userApiStatus.current.start();
            let res = await getDataFromUrl(`${constant.API_URL.DEV}/profiles/`, token, userApiStatus)
            .then(res => {
                setEmail(res.email);
                setName(res.full_name);
                setInputName(res.full_name);
                setProfileImage(res.profile_image);
                setProvider(res.auth_provider);
            })
            .catch(err => {
                console.log(err);
            })
        }
        getProfileDetails()
    }, [])

    const _openResetPasswordPage=()=>{
        setProfilePages({
          editProfile: false,
          privacyPolicy: false,
          recommendation: false,
          resetPassword: true,
        })
        setMobileLoginNavigation()
      }
    
      const _openEditProfilePage=()=>{
        setProfilePages({
          editProfile: true,
          privacyPolicy: false,
          recommendation: false,
          resetPassword: false,
        })
        setMobileLoginNavigation()
      }
    
      const _openPrivacyPolicyPage=()=>{
        setProfilePages({
          editProfile: false,
          privacyPolicy: true,
          recommendation: false,
          resetPassword: false,
        })
        setMobileLoginNavigation()
      }

    const  _handleLogout=()=>{
        logoutUser()
        handleLogout()
        location.push('/')
    }


    return (
            <>
            {
                mobileLoginNavigation ?  
                <>
                <div className='header'>
                <Link 
                href='/' 
                className='navbar-brand' 
                // onClick={() => Mixpanel.track(MixpanelStrings.HOME_BUTTON_CLICK)}
                >
                    <Image src={credencLogo} objectFit='cover' alt='credenc'/>
                </Link>
                <div className='profile-info' style={{display:"flex",alignItems:"center"}}>
                    <span className='user-name'>{name}</span>
                    <Image className='avatar' src={profileIcon} objectFit='contain' alt='user'/>
                </div>
                </div>
                <div className='profile-nav-mobile'>
                    <div className='menu-column'  style={{padding: 0}}>
                        <div onClick={() => _openEditProfilePage()} className='menu-item'>Edit Profile<span className={`arrow-right`}>{'>'}</span></div>
                        <div className='hr'></div>
                        {provider === 'email' && <> <div onClick={() => _openResetPasswordPage()} className='menu-item'>Reset Password<span className={`arrow-right`}>{'>'}</span></div>
                        <div className='hr'></div> </>}
                        <div onClick={() => _openPrivacyPolicyPage()} className='menu-item'>Privacy Policy<span className={`arrow-right`}>{'>'}</span></div>
                        <div className='hr'></div>
                        <div 
                        onClick={() => _handleLogout()} 
                            className='menu-item'>Logout<span className={`arrow-right`}>{'>'}</span></div>
                        <div className='hr'></div>
                    </div>
                </div> 
                </>
                : 
                <>
                    {profilePages.editProfile === true && <EditProfile token={token} setMobileLoginNavigation={()=>setMobileLoginNavigation()} />}
                    {profilePages.resetPassword === true && <ResetPassword token={token} openForgotPasswordModal={()=>openForgotPasswordModal()} setMobileLoginNavigation={()=>setMobileLoginNavigation()}/>}
                    {profilePages.privacyPolicy === true && <PrivacyPolicy profilePage={true} setMobileLoginNavigation={()=>setMobileLoginNavigation()}/>}
                </>
            }
       </>
    )
}
