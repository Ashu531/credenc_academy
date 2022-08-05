import React, { useEffect } from 'react'
import { Link, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import MixpanelStrings from '../../../values/mixpanelStrings'
import { Mixpanel } from '../../services/Mixpanel'
import { shouldNavbarVisible } from '../../services/shouldNavbarVisible'
import EditProfile from './EditProfile'
import Invite from './Invite'
import Notifications from './Notifications'
import Policies from './Policies'
import ProfileNavMobile from './ProfileNavMobile'
import ResetPassword from './ResetPassword'
import Reviews from './Reviews'
import Upvotes from './Upvotes'

export default function ProfilePage({ token, handleForgotPassword, changeNavbarVisibility, dispatchLogout }) {
  let location = useLocation();

  let navigate = useNavigate();

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

  const isActiveTab = (tabName) => {
    if(location.pathname.match(tabName)){
      return 'active-tab';
    }

    return '';
  }

  const triggerMixpanel = (type) => {
    let eventText;
    switch(type){
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

  useEffect(() => {
    changeNavbarVisibility(shouldNavbarVisible());
    if(!token){
      navigate('/', {replace: true});
    }
  }, []);

  return (
    <div className='profile-page'>
      <div className='profile-container'>
        <div className='menu-column'>
          <Link to={routes.EDIT} onClick={() => triggerMixpanel('edit')} className='menu-item'><span className={`border-left ${isActiveTab(routes.EDIT)}`}></span>Edit Profile</Link>
          <div className='hr'></div>
          <Link to={routes.RESET_PASSWORD} onClick={() => triggerMixpanel('reset password')} className='menu-item'><span className={`border-left ${isActiveTab(routes.RESET_PASSWORD)}`}></span>Reset Password</Link>
          <div className='hr'></div>
          {/* <Link to={routes.NOTIFICATIONS} onClick={triggerMixpanel('edit')} className='menu-item'><span className={`border-left ${isActiveTab(routes.NOTIFICATIONS)}`}></span>Notifications</Link>
          <div className='hr'></div>
          <Link to={routes.INVITE} onClick={triggerMixpanel('edit')} className='menu-item'><span className={`border-left ${isActiveTab(routes.INVITE)}`}></span>Invite a Friend</Link>
          <div className='hr'></div>*/}
          <Link to={routes.POLICIES} onClick={() => triggerMixpanel('policies')} className='menu-item'><span className={`border-left ${isActiveTab(routes.POLICIES)}`}></span>Privacy Policy</Link>
          <div className='hr'></div> 
          <Link to={routes.REVIEWS} onClick={() => triggerMixpanel('reviews')} className='menu-item'><span className={`border-left ${isActiveTab(routes.REVIEWS)}`}></span>My Reviews</Link>
          <div className='hr'></div>
          <Link to={routes.UPVOTES} onClick={() => triggerMixpanel('upvotes')} className='menu-item'><span className={`border-left ${isActiveTab(routes.UPVOTES)}`}></span>My Upvotes</Link>
          <div className='hr'></div>
        </div>
        <div className='content-column'>
          <Routes>
            <Route exact path={`/${routes.EDIT}`} element={<EditProfile token={token} replace/>} />
            <Route exact path={`/${routes.RESET_PASSWORD}`} element={<ResetPassword token={token} handleForgotPassword={handleForgotPassword}/>} replace/>
            <Route exact path={`/${routes.NOTIFICATIONS}`} element={<Notifications token={token} />} replace/>
            <Route exact path={`/${routes.INVITE}`} element={<Invite/>} replace/>
            <Route exact path={`/${routes.POLICIES}`} element={<Policies changeNavbarVisibility={changeNavbarVisibility} />} replace/>
            <Route exact path={`/${routes.REVIEWS}`} element={<Reviews token={token}/>} replace/>
            <Route exact path={`/${routes.UPVOTES}`} element={<Upvotes token={token}/>} replace/>
            <Route exact path={`/${routes.NAVBAR_MOBILE}`} element={<ProfileNavMobile dispatchLogout={dispatchLogout} changeNavbarVisibility={changeNavbarVisibility} handleForgotPassword={handleForgotPassword} token={token}/>} replace/>
            <Route exact path="/*" element={<Navigate to='/' replace/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
