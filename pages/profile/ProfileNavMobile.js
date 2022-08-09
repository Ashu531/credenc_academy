import React, { useEffect, useRef, useState } from 'react'
// import { div, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import Link from "next/link";
// import MixpanelStrings from '../../../values/mixpanelStrings';
// import { Mixpanel } from '../../services/Mixpanel';
import credencLogo from '../../assets/images/icons/credenc-logo.svg';
import profileIcon from '../../assets/images/icons/profile-icon.svg';
import ApiStatus from '../../config/apiStatus';
import axios from 'axios';

export default function ProfileNavMobile({token, dispatchLogout}) {

    let location = useRouter();

    // let navigate = useNavigate();

    const userApiStatus = useRef(new ApiStatus());

    const [name, setName] = useState('');
    const [inputName, setInputName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [provider, setProvider] = useState('');

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
                eventText = MixpanelStrings.PROFILE_SETTINGS
                break;
            case ('reset password'):
                eventText = MixpanelStrings.RESET_PASSWORD
                break;
            case ('policies'):
                eventText = MixpanelStrings.POLICIES
                break;
            case ('reviews'):
                eventText = MixpanelStrings.REVIEWS
                break;
            case ('upvotes'):
                eventText = MixpanelStrings.UPVOTES
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

    const getProfileDetails = async () => {
        userApiStatus.current.start();
        let res = await getDataFromUrl(`${API_URL}/profiles/`, token, userApiStatus)
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

    useEffect(async () => {
        await getProfileDetails();
    }, [])

    return (
        <div className='profile-nav-mobile'>
            <div className='header'>
                <Link to='/' className='navbar-brand' onClick={() => Mixpanel.track(MixpanelStrings.HOME_BUTTON_CLICK)}>
                    <img src={credencLogo}/>
                </Link>
                <div className='profile-info'>
                    <span className='user-name'>{name}</span>
                    <img className='avatar' alt='user image' src={profileIcon} ></img>
                </div>
            </div>
            <div className='menu-column'>
                <div onClick={() => handleNavClick('edit', routes.EDIT)} className='menu-item'>Edit Profile<span className={`arrow-right`}>{'>'}</span></div>
                <div className='hr'></div>
                {provider === 'email' && <> <div onClick={() => handleNavClick('reset password', routes.RESET_PASSWORD)} className='menu-item'>Reset Password<span className={`arrow-right`}>{'>'}</span></div>
                <div className='hr'></div> </>}
                {/* <div to={routes.NOTIFICATIONS} onClick={triggerMixpanel('edit')} className='menu-item'><span className={`arrow-right ${isActiveTab(routes.NOTIFICATIONS)}`}>{'>'}</span>Notifications</div>
                <div className='hr'></div>
                <div to={routes.INVITE} onClick={triggerMixpanel('edit')} className='menu-item'><span className={`arrow-right ${isActiveTab(routes.INVITE)}`}>{'>'}</span>Invite a Friend</div>
                <div className='hr'></div>*/}
                <div onClick={() => handleNavClick('policies', routes.POLICIES)} className='menu-item'>Privacy Policy<span className={`arrow-right`}>{'>'}</span></div>
                <div className='hr'></div>
                <div onClick={() => handleNavClick('reviews', routes.REVIEWS)} className='menu-item'>My Reviews<span className={`arrow-right`}>{'>'}</span></div>
                <div className='hr'></div>
                <div onClick={() => handleNavClick('upvotes', routes.UPVOTES)} className='menu-item'>My Upvotes<span className={`arrow-right`}>{'>'}</span></div>
                <div className='hr'></div>
                <div onClick={() => handleNavClick('logout', 'logout')} className='menu-item'>Logout</div>
                <div className='hr'></div>
            </div>
        </div>
    )
}
