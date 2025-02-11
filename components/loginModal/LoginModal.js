import React, { useCallback, useEffect, useState,useRef } from "react";
import passVisibleIcon from "../../assets/images/icons/eye.svg";
import passNotVisibleIcon from "../../assets/images/icons/eye-close.svg";
import googleIcon from "../../assets/images/icons/google-icon.svg";
import linkedinIcon from "../../assets/images/icons/linkedin-icon.svg";
import closeIcon from '../../assets/images/icons/close-icon-white.svg';
import closeIconLight from '../../assets/images/icons/crossIcon.svg';
import credencLogo from '../../assets/images/icons/credenc-logo.svg';
import credencAcademy from '../../assets/images/icons/credencAcademy.svg'
import Input from "../input/Input";
import Button from "../button/Button";
import SegmentedBar from "../segementedBar/SegmentedBar";
import CheckBox from "../checkbox/CheckBox";
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from "../../helper/validationService";
import States from "../../config/states";
import Strings from "../../config/strings";
import axios from "axios";
import ApiStatus from "../../config/apiStatus";
import { CircularProgress, Link } from "@mui/material";
// import GoogleLogin from "react-google-login";
import constant from '../../config/constant'
import Image from "next/image";
import { useRouter } from 'next/router'
import { useTheme } from "@emotion/react";
import { GoogleLogin,GoogleOAuthProvider } from '@react-oauth/google';
import UrlService from "../../helper/urlService";
import { useMediaQuery } from "react-responsive";
const EdtechPartnerKey = 'credenc-edtech-partner-key';
const bookmarkKey = 'credenc-edtech-bookmarks';
const authKey = 'credenc-edtech-authkey';

export default function LoginModal({
  closeLoginModal,
  openForgotPasswordModal,
  handleLogin,
  setUserEmail,
  setUserLoginState,
}) {

  const modalStates = States.loginModalStates;
  const buttonStates = States.loginButtonStates;

  const [header, setHeader] = useState('');
  const [formSegment, setFormSegment] = useState(modalStates.LOGIN);
  const [formError, setFormError] = useState(null);

  const [nameInputState, setNameInputState] = useState('');
  const [emailInputState, setEmailInputState] = useState('');
  const passwordInputInitialState = States.passwordInputInitialState;
  const [passwordInputState, setPasswordInputState] = useState({ ...passwordInputInitialState });
  const [confirmPassInputState, setConfirmPassInputState] = useState({ ...passwordInputInitialState });
  const [theme,setTheme] = useState('')
  const [buttonState, setButtonState] = useState({});
  const [error,setErrorMsg] = useState(false)

  const [authApiStatus, setAuthApiStatus] = useState(ApiStatus.NOT_STARTED);
  const [externalUser,setExternalUser] = useState(false);
  let location = useRouter();
  let nextURL=location?.asPath?.substring(2,location?.asPath?.length)
  let urlService = useRef(new UrlService(nextURL));

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });

  const showHidePassword = () => {
    if (passwordInputState.hide) {
      setPasswordInputState({
        ...passwordInputState,
        hide: false,
        trailingIcon: passVisibleIcon,
        type: 'text'
      })
    } else {
      setPasswordInputState({
        ...passwordInputState,
        hide: true,
        trailingIcon: passNotVisibleIcon,
        type: 'password'
      })
    }
  }

  const showSegment = (type) => {
    return type === formSegment;
  }

  const validate = () => {
    setFormError(null);
    if(formSegment === modalStates.LOGIN){
      let emailError = validateEmail(emailInputState);
      if(emailError){
        console.log(emailError);
        setFormError(Strings.EMAIL_OR_PASSWORD_INCORRECT);
        return false;
      }
      
      // let passwordError = validatePassword(passwordInputState.value);
      // if(passwordError){
      //   setFormError(Strings.EMAIL_OR_PASSWORD_INCORRECT);
      //   return false;
      // }
    } 
    else {
      let nameError = validateName(nameInputState);
      if(nameError){
        setFormError(nameError);
        return false;
      }
      
      let emailError = validateEmail(emailInputState);
      if(emailError){
        setFormError(emailError);
        return false;
      }
      
      // let passwordError = validatePassword(passwordInputState.value);
      // if(passwordError){
      //   setFormError(passwordError);
      //   return false;
      // }
      
      // let confirmPasswordError = validateConfirmPassword(passwordInputState.value, confirmPassInputState.value);
      // if(confirmPasswordError){
      //   setFormError(confirmPasswordError);
      //   return false;
      // }
    }

    return true;
  }

  const signUp = async () => {
    const response = await axios.post(`${constant.API_URL.DEV}/signup_otp/`, {
      full_name: nameInputState.trim(),
      // password: passwordInputState.value.trim(),
      // password2: confirmPassInputState.value.trim(),
      email: emailInputState.toLowerCase().trim()
    }).then(res => {
      setAuthApiStatus(ApiStatus.SUCCESS);
      setFormSegment(modalStates.LOGIN);
      setUserEmail(emailInputState.toLowerCase().trim())
      setHeader(res?.message)
      openForgotPasswordModal()
      setUserLoginState(2)
      // setTimeout(() => location.reload(), 100)
    })
    .catch(err => {
      console.log(err); 
      setAuthApiStatus(ApiStatus.FAILED) 
      setHeader(err?.response?.data?.message)
      setErrorMsg(true)
    })
  }

  const addBookmarkToBackend = async (bookmarks, token) => {
    let res = await axios.post(`${constant.API_URL.DEV}/bookmark/`, {
      "id": bookmarks && bookmarks.length > 0 ? [...bookmarks] : [],
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    .then(res => res.data)
    .catch(err => {
        // setUpvoteButtonState({...States.upvoteButtonState.DEFAULT});
        // setUpvotes(item['upvotes'] || 0);
        console.log(err);
        // dispatchRemoveBookmark(id, bookmarks);
    })
    return res;
  }

  const signIn = async () => {
    const response = await axios.post(`${constant.API_URL.DEV}/login_otp/`, {
      // password: passwordInputState.value.trim(),
      email: emailInputState.toLowerCase().trim()
    })
    .then(res => {
      try{
        setAuthApiStatus(ApiStatus.SUCCESS);
        // setTimeout(() => location.reload(), 100)
        setUserEmail(emailInputState.toLowerCase().trim())
        handleModalClose();
        openForgotPasswordModal()
        setUserLoginState(1)
        return res.data;
      } catch(e) {
        console.log(e);
      }
    })
    .catch(err => {
      setAuthApiStatus(ApiStatus.FAILED)
      setFormError(err?.response?.data?.message || '')
    })

    // if (response?.response === "Successfully LoggedIn") {

    //   let currentBookmarks = JSON.parse(localStorage.getItem(bookmarkKey));
    //   // currentBookmarks = currentBookmarks?.split(',');
    //   let res = await addBookmarkToBackend(currentBookmarks, response?.tokens?.access);
    //   if (res?.status) localStorage.removeItem(bookmarkKey);
    // }
  }

  const handleSubmit = async () => {
    // Mixpanel.track(`${buttonState.text} ${MixpanelStrings.SIGNIN_MODAL_SIGNIN}`)
    setAuthApiStatus(ApiStatus.STARTED);
    if(validate()){
      setAuthApiStatus(ApiStatus.PENDING);
      if(formSegment === modalStates.LOGIN){
        await signIn();
      } else {
        await signUp();
      }
    } else {
      setAuthApiStatus(ApiStatus.CANCELLED);
    }
  }

  const isApiInProgress = () => {
    return authApiStatus === ApiStatus.STARTED || authApiStatus === ApiStatus.PENDING;
  }

  const _authorizeUser=(tokens)=>{
    localStorage.setItem(authKey, tokens['access']);
  }

  const onGoogleLoginSuccess = async (response) => {
    if (response?.error === "idpiframe_initialization_failed" || response?.error === "popup_closed_by_user") {
      // setFormError(Strings.ALLOW_COOKIES_IN_INCOGNITO);
      return;
    } else if (!!response?.error) {
      setFormError(response?.error);
    }
    setAuthApiStatus(ApiStatus.PENDING);

    let googleLogInRes = await axios.post(`${constant.API_URL.DEV}/google/`, {
      auth_token: response.credential,
    })
    .then(res => {
      try{
        setAuthApiStatus(ApiStatus.SUCCESS);
        handleModalClose();
        handleLogin()
        _authorizeUser(res.data.tokens)
        _setThirdPartyUser(res.data)
        _goToHome()
        if (res?.status) localStorage.removeItem(bookmarkKey);
        return res.data;
      } catch(e) {
        console.log(e);
      }
    })
    .catch(err => {
      setAuthApiStatus(ApiStatus.FAILED)
      setFormError(err?.response?.data?.detail || '')
      setAuthApiStatus(ApiStatus.CANCELLED);
    })

    if (!!googleLogInRes?.tokens?.access) {
      let currentBookmarks = localStorage.getItem(bookmarkKey);
      currentBookmarks = currentBookmarks?.split(',');

      let res = await addBookmarkToBackend(currentBookmarks, googleLogInRes?.tokens?.access);
      if (res?.status) localStorage.removeItem(bookmarkKey);
      setTimeout(() => location.reload(), 100)
    }
  }

  const _setThirdPartyUser=(data)=>{
    if(data.partner_key && data.partner_key.length > 0){
      localStorage.setItem(EdtechPartnerKey,JSON.stringify(data.partner_key));
    }
  }

  const validateTokenAndObtainSession = ({ data, idToken }) => {
    const headers = {
      Authorization: idToken,
      'Content-Type': 'application/json'
    };
  
    return axios.post('users/init/', data, { headers });
  };

  const handlePostMessage = event => {
    if (event.data.type === 'code') {
      const { code } = event.data;
      getUserCredentials(code);
    }
  };

  const getCodeFromWindowURL = url => {
    const popupWindowURL = new URL(url);
    return popupWindowURL.searchParams.get("code");
  };

  const showPopup = () => {
    // Mixpanel.track(MixpanelStrings.LINKEDIN_LOGIN);
    
    let { clientId, redirectUrl,  authUrl, scope, state } = constant.LINKEDIN_API;
    authUrl = `${authUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;
    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;
    window.open(
      authUrl,
      'Linkedin',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' +
      width +
      ', height=' +
      height +
      ', top=' +
      top +
      ', left=' +
      left
    );
  };

  const getUserCredentials = async (code) => {
    // -- linkedIn backend call
    setAuthApiStatus(ApiStatus.PENDING);
    if (!!code) {
      let linekdInRes = await axios.post(`${constant.API_URL.DEV}/linkedin/`, {
        'code': `${code}`
      })
      .then(res => {
      try{
        _authorizeUser(res.data.tokens);
        setAuthApiStatus(ApiStatus.SUCCESS);
        handleModalClose();
        return res.data;
      } catch(e) {
        console.log(e);
      }
    })
    .catch(err => {
      console.log(err,"error")
      setAuthApiStatus(ApiStatus.FAILED)
      setFormError(err?.response?.data?.message || '')
      setAuthApiStatus(ApiStatus.CANCELLED);
    })

    if (!!linekdInRes?.tokens?.access) {
      let currentBookmarks = localStorage.getItem(bookmarkKey);
      currentBookmarks = currentBookmarks?.split(',');

      let res = await addBookmarkToBackend(currentBookmarks, linekdInRes?.tokens?.access);
      if (res?.status) localStorage.removeItem(bookmarkKey);
      setTimeout(() => location.reload(), 100)
    }
    }
  }

  const handleModalClose = () => {
    // changeNavbarVisibility(shouldNavbarVisible());
    // handleClose();
    closeLoginModal()
  }

  useEffect(() => {
    setFormError(null);
    if (formSegment === 0) {
      setHeader(Strings.LOGIN_HEADER);
      setButtonState({...buttonStates.LOGIN});
    } else {
      setHeader(Strings.SIGNUP_HEADER);
      setButtonState({...buttonStates.SIGNUP});
    }
    setNameInputState('')
    setEmailInputState('');
    setPasswordInputState({ ...passwordInputInitialState });
    setConfirmPassInputState({ ...passwordInputInitialState })
  }, [formSegment]);

  useEffect(() => {
    if(authApiStatus === ApiStatus.SUCCESS){
    }
  }, [authApiStatus]);

  useEffect(() => {
    
    const code = getCodeFromWindowURL(window.location.href);
    if (window.opener && window.opener !== window) {
      console.log("code", code)
      window.opener.postMessage({'type': 'code', 'code': code}, '*')
      // window.close();
    }
  }, []);

  useEffect(() => {
    _retrieveData()
  }, [])
  
  const _retrieveData=()=>{
    let theme = localStorage.getItem('EdtechTheme')
    setTheme(theme)
  }

  useEffect(()=>{

    if(!location.isReady) return;

    if(location?.query && Object.keys(location?.query).length > 0){
        if(location?.query?.partner_key && location?.query?.partner_key.length > 0){
          setExternalUser(true)
        _getEmailFromThirdParty(location?.query)
      }
    }
    
  },[location.isReady])

  const _getEmailFromThirdParty=async(query)=>{
    let routerKeys = Object.values(query);

    let data = {
      partnerkey: routerKeys[0].replace(/\s/g, ''),
      ui: routerKeys[1],
      session: routerKeys[2]
    }
   
    let response = await axios.post(`${constant.API_URL.DEV}/partnerdata/`,data
     )
    .then(res => {
    try{
      setEmailInputState(res.data.data)
      return res.data;
    } catch(e) {
      console.log(e);
    }
  })
  .catch(err => {
    console.log(err,"error")
  })
  }

  const _goToHome=()=>{
    if(location?.pathname === '/profile'){
      location.replace({
        pathname: '/',
        query: {},
     }).then(() => location.reload())
    }
      
  }

  return (
    <div className="login-modal" onClick={handleModalClose}>
      <div 
        className={`wrapper modal-container`} 
        onClick={(e) => e.stopPropagation()}>
        <div className="close-button" onClick={handleModalClose}>
          <Image src={ theme === 'dark' ? closeIcon : closeIconLight} objectFit="cover" height={25} width={25} />
        </div>
        <Link 
        to='/' 
        className='login-modal-brand' 
        // onClick={() => Mixpanel.track(MixpanelStrings.HOME_BUTTON_CLICK)}
        >
          <Image src={credencLogo} objectFit="cover"/>
          {/* <div style={{textDecoration: 'none', color: '#FFFFFF', fontSize: '21px'}}>BETA</div> */}
        </Link>
        {
          externalUser === false ? 
              <div className="segment-container" style={!isDesktopOrLaptop ? {marginTop: '1rem'} : null}>
                <SegmentedBar
                  items={['Sign In', 'Sign Up']}
                  handleTabNumber={(i) => setFormSegment(i)}
                  theme={theme}
                />
              </div> : null
        }
        {
          externalUser === false ? 
            <div className="header-container">
              <div className="headline" style={ error ? {
                fontFamily: 'Work Sans',
                fontWeight: 500,
                fontSize: 12,
                color: 'red'
              } : null}
              >{header}</div>
            </div> 
        : 
            <div className="header-container">
              <Image src={credencAcademy} alt='credencAcademy' />
              <div className="headline" style={ error ? {
                fontFamily: 'Work Sans',
                fontWeight: 500,
                fontSize: 12,
                color: 'red'
              } : null}
              >Welcome To Credenc</div>
          </div>
        }
        
        {showSegment(modalStates.LOGIN) && <div className="form-container">
          {formError && <div className='error-container'>{formError}</div>}
          <Input
            placeholder="Email"
            value={emailInputState}
            handleInput={(value) => setEmailInputState(value)}
            disabled={externalUser ? true : false}
          />
          {/* <Input
            placeholder="Password"
            type={passwordInputState.type}
            trailingIcon={passwordInputState.trailingIcon}
            value={passwordInputState.value}
            handleInput={(value) => setPasswordInputState({ ...passwordInputState, value: value })}
            onTrailingIconClick={showHidePassword}
          /> */}
          {/* <div className="subtext-container">
            <div onClick={openForgotPasswordModal}>{Strings.FORGOT_PASSWORD}</div>
          </div> */}
        </div>}
        {showSegment(modalStates.SIGNUP) && <div className="form-container">
          {formError && <div className='error-container'>{formError}</div>}
          <Input
            placeholder="Full Name"
            value={nameInputState}
            handleInput={(value) => setNameInputState(value)}
          />
          <Input
            placeholder="Email"
            value={emailInputState}
            handleInput={(value) => setEmailInputState(value)}
          />
          {/* <Input
            placeholder="Password"
            type={passwordInputState.type}
            trailingIcon={passwordInputState.trailingIcon}
            value={passwordInputState.value}
            handleInput={(value) => setPasswordInputState({ ...passwordInputState, value: value })}
            onTrailingIconClick={showHidePassword}
          />
          <Input
            placeholder="Confirm Password"
            type={confirmPassInputState.type}
            value={confirmPassInputState.value}
            handleInput={(value) => setConfirmPassInputState({ ...confirmPassInputState, value: value })}
          /> */}
        </div>}
        <div className="auth-container">
          <span className='privacy'>
            By continuing you are agreeing to our
            <a 
            className="link" 
            href={`/privacy`} 
            target='_blank' 
            rel="noreferrer"
            // onClick={() => Mixpanel.track(MixpanelStrings.SIGNIN_MODAL_PRIVACY)}
             >
              {" "}Privacy Policy and Disclaimer
            </a>
          </span>
          {!isApiInProgress() && <Button text={buttonState.text} linearGradient='green' classes="btn-secondary small-wrapper-colored" onClick={handleSubmit} />}
          {isApiInProgress() && <CircularProgress />}
          {
             externalUser === false ? 
              <div className="or-divider">
                <div className="divider"></div>
                  {buttonState.divider}
                <div className="divider"></div>
              </div>
             : null
          }
          
          {
            externalUser === false ? 
            <div className="social-icons-container" style={!isDesktopOrLaptop ? {padding: 0} : null }>
            <div>
            <GoogleOAuthProvider clientId={constant.GOOGLE_CLIENT_ID}>
              <GoogleLogin
                // clientId={`${constant.GOOGLE_CLIENT_ID}`}
                onSuccess={onGoogleLoginSuccess}
                onFailure={onGoogleLoginSuccess}
                // render={renderProps => (
                //   <div 
                //   className='social-icon' 
                //   style={{ display:"flex",justifyContent:"center",alignItems:'center' }} 
                //   onClick={() => {
                //     renderProps.onClick(); 
                //     // Mixpanel.track(MixpanelStrings.GOOGLE_LOGIN)
                //     }}>
                //       <Image src={googleIcon} objectFit="cover" />
                //   </div>
                // )}
              />
            </GoogleOAuthProvider>
            </div>
            {/* <div 
            className='social-icon' 
            style={{ display:"flex",justifyContent:"center",alignItems:'center' }} 
            onClick={showPopup}>
                  <Image src={linkedinIcon} objectFit="cover" />
            </div> */}
          </div> : null
          }
          
        </div>
      </div>
    </div>
  );
}
