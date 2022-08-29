import React, { useEffect, useState } from 'react'
import EditProfile from './EditProfile'
import ResetPassword from './ResetPassword'
import { useRouter } from 'next/router'
import PrivacyPolicy from '../privacy'
import ForgotPasswordModal from '../../components/forgotPasswordModal/ForgotPasswordModal'
import { useMediaQuery } from "react-responsive";
import ProfileMobilePage from './ProfileNavMobile'
const EdtechToken = 'credenc-edtech-authkey';

export default function ProfilePage({
  openForgotPasswordModal,
  forgotPasswordModal,
  handleForgotPasswordEnd,
  mobileLoginNavigation,
  setMobileLoginNaviagtion,
  logoutUser,
  handleLogout
}) {
  let location = useRouter();

  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const [profilePages, setProfilePages] = useState({
    editProfile: false,
    privacyPolicy: false,
    recommendation: false,
    resetPassword: false,
  })
  // let navigate = useNavigate();

  const [token, setToken] = useState('');

  const routes = {
    EDIT: 'policy/edit',
    RESET_PASSWORD: 'policy/reset_password',
    NOTIFICATIONS: 'policy/notifications',
    INVITE: 'policy/invite',
    POLICIES: 'policy/policies',
    REVIEWS: 'policy/reviews',
    UPVOTES: 'policy/upvotes',
    NAVBAR_MOBILE: 'policy/navbar',
  }

  useEffect(()=>{
    _retrieveData()
  },[])

  const _retrieveData=()=>{
     let authKey = localStorage.getItem(EdtechToken)
     setToken(authKey);
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
    // Mixpanel.track(eventText, {
    //   triggered_from: 'Profile page'
    // })
  }

  useEffect(() => {
  if (typeof window !== "undefined") {
      if (location && location?.route === routes.EDIT) {
        setProfilePages({
          editProfile: true,
          privacyPolicy: false,
          recommendation: false,
          resetPassword: false,
        })
      } 
      else if(location && location?.route === routes.RESET_PASSWORD) {
        setProfilePages({
          editProfile: false,
          privacyPolicy: false,
          recommendation: false,
          resetPassword: true,
        })
      }
      else{
        setProfilePages({
          editProfile: true,
          privacyPolicy: false,
          recommendation: false,
          resetPassword: false,
        })
      }
    }
  }, [location?.route]);

  
  const _openResetPasswordPage=()=>{
    setProfilePages({
      editProfile: false,
      privacyPolicy: false,
      recommendation: false,
      resetPassword: true,
    })
  }

  const _openEditProfilePage=()=>{
    setProfilePages({
      editProfile: true,
      privacyPolicy: false,
      recommendation: false,
      resetPassword: false,
    })
  }

  const _openPrivacyPolicyPage=()=>{
    setProfilePages({
      editProfile: false,
      privacyPolicy: true,
      recommendation: false,
      resetPassword: false,
    })
  }
  
  return (
    <>
    {
        mounted && 
        <>
        
          <div className='profile-page'>
            <div className='profile-container'>
              <div className='menu-column'>
                  <div 
                  className='menu-item'
                  onClick={() => {
                    _openEditProfilePage()
                    // triggerMixpanel('edit profile')
                  }}
                  >
                  <span className={`border-left ${isActiveTab(routes.EDIT)}`}></span>
                  Edit Profile
                  </div>
                <div className='hr'></div>
                <div 
                  className='menu-item'
                  onClick={() => {
                    _openResetPasswordPage()
                    // triggerMixpanel('reset password')
                  }}
                  >
                  <span className={`border-left ${isActiveTab(routes.RESET_PASSWORD)}`}></span>
                  Reset Password
                  </div>
                <div className='hr'></div>
                
                <div 
                className='menu-item'
                onClick={() => {
                  _openPrivacyPolicyPage()
                  // triggerMixpanel('privacy policy')
                }}
                >
                  <span className={`border-left ${isActiveTab(routes.POLICIES)}`}></span>
                  Privacy Policy
                  </div>
                <div className='hr'></div>
              </div>
              <div className='content-column'>
                {window.innerWidth > 500 && profilePages.editProfile === true && <EditProfile token={token} />}
                {window.innerWidth > 500 && profilePages.resetPassword === true && <ResetPassword token={token} openForgotPasswordModal={()=>openForgotPasswordModal()} />}
                {window.innerWidth > 500 && profilePages.privacyPolicy === true && <PrivacyPolicy profilePage={true} />}
                {window.innerWidth <= 500 && 
                <ProfileMobilePage 
                    token={token} 
                    mobileLoginNavigation={mobileLoginNavigation} 
                    setMobileLoginNavigation={()=>setMobileLoginNaviagtion()}
                    logoutUser={()=>logoutUser()}
                    handleLogout={()=>handleLogout()}
                    handleLogin={()=>handleLogin()}
                />}
              </div>
            </div>
            {
              forgotPasswordModal ? 
              <ForgotPasswordModal
              handleForgotPasswordEnd={()=>handleForgotPasswordEnd()}
              />
              : null
            }
          </div>
           
          </>
    }
    </>
  )
}
