import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import { validateConfirmPassword, validateEmail, validateOtp, validatePassword } from "../../helper/validationService";
import OtpField from "../otpField/OtpField";
import passVisibleIcon from "../../assets/images/icons/eye.svg";
import passNotVisibleIcon from "../../assets/images/icons/eye-close.svg";
import backIcon from '../../assets/images/icons/caret-left-grey.svg';
import backArrowDark from '../../assets/images/icons/backArrowDark.svg'
import credencLogo from '../../assets/images/icons/credenc-logo.svg';
import credencLogoLight from '../../assets/images/logo/credencLogo.svg'
import Link from "next/link";
import States from "../../config/states";
import Strings from "../../config/states";
import axios from "axios";
import Image from "next/image";
import constant from "../../config/constant";
import { useRouter } from 'next/router'
import { useMediaQuery } from "react-responsive";
import SuccessAlert from "../successAlert/SuccessAlert";
const bookmarkKey = 'credenc-edtech-bookmarks';
const EdtechPartnerKey = 'credenc-edtech-partner-key';
const authKey = 'credenc-edtech-authkey';

// import { Mixpanel } from "../../../services/Mixpanel";
// import MixpanelStrings from "../../../../values/mixpanelStrings";

export default function ForgotPasswordModal({
  handleForgotPasswordEnd,
  userEmail,
  closeForgotPasswordModal,
  openLoginModal,
  loginState
}) {
  
  const modalStates = States.forgotPasswordModalStates;

  const [modalState, setModalState] = useState(modalStates.ENTER_EMAIL);
  const [header, setHeader] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [formError, setFormError] = useState(null);
  const [passwordSuccess,setPasswordSuccess] = useState({
    reset: false,
    heading: '',
    subHeading: ''
  })
  const [emailInputState, setEmailInputState] = useState('');
  const passwordInputInitialState = States.passwordInputInitialState;
  const [passwordInputState, setPasswordInputState] = useState({ ...passwordInputInitialState });
  const [confirmPassInputState, setConfirmPassInputState] = useState({ ...passwordInputInitialState });
  const [showOtpAlert,setShowOtpAlert] = useState(false)
  let location = useRouter();
  const [otp, setOtp] = useState({
      generated: false,
      values: ['', '', '', '', '', '']
  });

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });

  useEffect(()=>{
    setEmailInputState(userEmail)
  },[])

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

  const validate = () => {
    setFormError(null);
    // if(modalState === modalStates.ENTER_EMAIL){
    //   let emailError = validateEmail(emailInputState);
    //   if(emailError){
    //     setFormError(emailError);
    //     return false;
    //   }
    // }

    // else if(modalState === modalStates.ENTER_OTP){
      let otpError = validateOtp(otp.values);
      if(otpError){
        setFormError(otpError);
        return false;
      }
    

    // else {
    //   let passwordError = validatePassword(passwordInputState.value);
    //   if(passwordError){
    //     setFormError(passwordError);
    //     return false;
    //   }

    //   let confirmPasswordError = validateConfirmPassword(passwordInputState.value, confirmPassInputState.value);
    //   if(confirmPasswordError){
    //     setFormError(confirmPasswordError);
    //     return false;
    //   }
    // }

    return true;
  }

  const handleSendOTP = async () => {
    // Mixpanel.track(MixpanelStrings.SEND_OTP_FORGOT_PASSWORD, {
    //   'email_forgot_password' : emailInputState.toString(),
    // })
    if(validate()){
      let res = await axios.post(`${constant.API_URL.DEV}/signup_new/`, {
        'email': emailInputState.toString(),
        "otp" : otp.values.join('')
      })
      .then(res => {
        if(res['data']['error'] && res['data']['error'] != '')
          setFormError(res['data']['error']);
        else{
          // dispatchLogin(res.data.tokens);
          // setModalState(modalStates.NEW_PASSWORD);
          closeForgotPasswordModal()
          openLoginModal()
          }
      })
      .catch(err => {
        setFormError(err.response.data.error);
      });
    }
  }

  const handleOtp = (val, i) => {
      let values = [...otp.values];
      values[i] = val;
      setOtp({...otp, values: values});
  }

  const _authorizeUser=(tokens)=>{
    localStorage.setItem(authKey, tokens['access']);
  }

  const verifyOtp = async () => {

    if(validate()){
      let response = await axios.post(`${constant.API_URL.DEV}/login_verify/`, {
        'email': emailInputState.toString(),
        "otp" : otp.values.join('')
      })
      .then(res => {
        if(res['data']['error'] && res['data']['error'] != '')
          setFormError(res['data']['error']);
        else{
        _authorizeUser(res.data.tokens)
        _setThirdPartyUser(res.data)
        
        // setModalState(modalStates.NEW_PASSWORD);
        closeForgotPasswordModal()
        }
          
      })
      .catch(err => {
        console.log(err)
        setFormError(err.response.data.error);
      });
      if (response?.response === "Successfully LoggedIn") {

        let currentBookmarks = JSON.parse(localStorage.getItem(bookmarkKey));
        // currentBookmarks = currentBookmarks?.split(',');
        let res = await addBookmarkToBackend(currentBookmarks, response?.tokens?.access);
        if (res?.status) localStorage.removeItem(bookmarkKey);
      }
    }

    
  }

  const _setThirdPartyUser=(data)=>{
    if(data?.partner_key && data.partner_key.length > 0){
      localStorage.setItem(EdtechPartnerKey,JSON.stringify(data.partner_key));
    }
    _goToHome()
}

  const setNewPassword = async () => {

    if(validate()){
      let res = await axios.post(`${constant.API_URL.DEV}/forgot_password/`, {
        "otp": otp.values.join(''),
        "email": emailInputState.toString(),
        "new_password" : passwordInputState.value.toString(),
        "confirm_password" : confirmPassInputState.value.toString(),
      })
      .then(res => {
        if(res?.data?.status === true){
          setPasswordSuccess({
            reset: true,
            heading: 'New Password Set!',
            subHeading: 'Log in and get browsing!'
          })
          setModalState(modalStates.PASSWORD_SUCCESS);
        }
        if(res['data']['error'] && res['data']['error'] != '')
          setFormError(res['data']['error']);
        // else
        // handleForgotPasswordEnd();
      })
      .catch(err => {
        setFormError(err?.response?.data.message);
      });
    }
  }

  const handleBackClick = () => {
    handleForgotPasswordEnd();
  }

  const renderState = (state) => {
    return state === modalState;
  }

  useEffect(()=>{
   setModalState(modalStates.ENTER_OTP)
  },[])

  const goToLogin=()=>{
    handleForgotPasswordEnd();
  }

  const _goToHome=()=>{

    // let routerKeys = Object.values(location.query);

    location.push({
      pathname: '/'
    }).then(() => location.reload())
    
  }
  useEffect(() => {
    if(!location.isReady) return;

    if(location?.query && Object.keys(location?.query).length > 0){

    }

  }, [location.isReady])

  const resendOtp = async () => {
    setShowOtpAlert(true)
   
    setOtp({generated: false,
      values: ['', '', '', '', '', '']})
    const response = await axios.post(`${constant.API_URL.DEV}/login_otp/`, {
      // password: passwordInputState.value.trim(),
      email: emailInputState.toLowerCase().trim()
    })
    .then(res => {
      try{
        // dispatchLogin(res.data.tokens);
        setAuthApiStatus(ApiStatus.SUCCESS);
        // setTimeout(() => location.reload(), 100)

        return res.data;
      } catch(e) {
        console.log(e);
      }
    })
    .catch(err => {
      // setAuthApiStatus(ApiStatus.FAILED)
      setFormError(err?.response?.data?.message || '')
    })

    setTimeout(()=>setShowOtpAlert(false),7000)
  }

  return (
    <div className="modal" onClick={handleForgotPasswordEnd}>
      <div 
      className={`wrapper forgot-pass-modal-container`}
      onClick={(e) => e.stopPropagation()}>
        {
          passwordSuccess.reset === true ? null : <div className="back-button" onClick={handleBackClick}>
          <Image src={backArrowDark} objectFit='contain' height={12} width={7}/>
        </div>
        }
        {
          passwordSuccess.reset === true ? 
          <div className='forgot-modal-header'>
            <span className='new-password-set'>
              {passwordSuccess.heading}
            </span>
            <span className='new-password-otp'>
              {passwordSuccess.subHeading}
            </span>
        </div> :
        <div className='forgot-modal-header'>
            <span className='forgot-pass-text'>
              OTP Confirmation
            </span>
            <span className='generate-otp-text'>
              Enter your OTP here
            </span>
       </div>
        }
        
        <div className="header-container">
          <div className="headline">{header}</div>
          <div className="subtitle">{subtitle}</div>
        </div>
        {!formError && <div style={{height: '2.4rem'}}></div>}
        {formError && <div className='error-container'>{formError}</div>}
        {renderState(modalStates.ENTER_EMAIL) && <div className='auth-container' >
          <Input
            placeholder="Email"
            value={emailInputState}
            handleInput={(value) => setEmailInputState(value)}
          />
          <div style={{height: '1.6rem'}}></div>
          <Button text="Send OTP" linearGradient='green' classes="btn-secondary small-wrapper-colored" onClick={handleSendOTP} />
        </div>}
        {renderState(modalStates.ENTER_OTP) && <div className='otp-auth-container'>
          <OtpField
            otp={otp}
            handleChange={handleOtp}
          />
          <div style={{height: '1.6rem'}}></div>
          <Button text="Submit" linearGradient='green' classes="btn-secondary small-wrapper-colored" onClick={loginState === 1 ? verifyOtp : handleSendOTP} />
          <div className='resend-otp' onClick={resendOtp}>
            Resend OTP
          </div>
        </div>}

          {/* {renderState(modalStates.NEW_PASSWORD) && <div className='reset-password-container'>
          <Input
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
          />
          <div style={{height: '1.6rem'}}></div>
          <Button text="Set New Password" linearGradient='green' classes="btn-secondary small-wrapper-colored" onClick={setNewPassword} />
          </div>
        } */}
        {
          renderState(modalStates.PASSWORD_SUCCESS) ? 
          <Button text="Log In" linearGradient='green' classes="btn-secondary success-button" onClick={goToLogin} /> : null
        }
      </div>
      {
        showOtpAlert &&
        <SuccessAlert
          title="OTP Sent"
          style={window.innerWidth > 500 ? { 
            zIndex: 99,
            position:'fixed',
            bottom:30,
            right: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          } : {
            zIndex: 99,
            position:'fixed',
            bottom:80,
            right: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          titleStyle={{
            fontSize: 14,
            fontFamily: 'Work Sans',
          }}
       />
      }
      
    </div>
  );
}
