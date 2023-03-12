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
const bookmarkKey = 'credenc-edtech-bookmarks';

// import { Mixpanel } from "../../../services/Mixpanel";
// import MixpanelStrings from "../../../../values/mixpanelStrings";

export default function ForgotPasswordModal({
  handleClose,
  handleBack,
  handleForgotPasswordEnd,
  theme,
  userEmail,
  closeForgotPasswordModal,
  dispatchLogin,
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
  let location = useRouter();
  const [otp, setOtp] = useState({
      generated: false,
      values: ['', '', '', '', '', '']
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
    console.log(loginState,"loginAT")
    // Mixpanel.track(MixpanelStrings.SEND_OTP_FORGOT_PASSWORD, {
    //   'email_forgot_password' : emailInputState.toString(),
    // })
    console.log(emailInputState,"emailInputState++++")
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

  const verifyOtp = async () => {
    // Mixpanel.track(MixpanelStrings.VERIFY_OTP_FORGOT_PASSWORD, {
    //   'email': emailInputState.toString(),
    //   "otp" : otp.values.join('')
    // })

    if(validate()){
      let response = await axios.post(`${constant.API_URL.DEV}/login_verify/`, {
        'email': emailInputState.toString(),
        "otp" : otp.values.join('')
      })
      .then(res => {
        if(res['data']['error'] && res['data']['error'] != '')
          setFormError(res['data']['error']);
        else{
        dispatchLogin(res.data.tokens);
        _goToHome()
        // setModalState(modalStates.NEW_PASSWORD);
        closeForgotPasswordModal()
        }
          
      })
      .catch(err => {
        console.log(err,"error+++")
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

  const setNewPassword = async () => {
    // Mixpanel.track(MixpanelStrings.SET_PASSWORD_FORGOT_PASSWORD, {
    //   "new_password" : 'Not saved!',
    //   "confirm_password" : 'Not saved!',
    // });

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
    // if(modalState === modalStates.ENTER_EMAIL){
    //   handleForgotPasswordEnd();
    // } else if(modalState === modalStates.ENTER_OTP){
    //   handleForgotPasswordEnd();
    // } else {
    //   setModalState(modalStates.ENTER_EMAIL);
    // }
    handleForgotPasswordEnd();
  }

  const renderState = (state) => {
    return state === modalState;
  }

  // useEffect(() => {
  //   setFormError(null);
  //   if(modalState === modalStates.ENTER_EMAIL){
  //     setHeader(Strings.FORGOT_PASSWORD_HEADER);
  //     setSubtitle(Strings.FORGOT_PASSWORD_SUBTITLE);
  //   }
  //   else if(modalState === modalStates.ENTER_OTP){
  //     setHeader(Strings.ENTER_OTP_HEADER);
  //     setSubtitle(Strings.ENTER_OTP_SUBTITLE);
  //   }
  //   else if(modalState === modalStates.NEW_PASSWORD){
  //     setHeader(Strings.NEW_PASSWORD_HEADER);
  //     setSubtitle(Strings.NEW_PASSWORD_SUBTITLE);
  //   }
  // }, [modalState]);

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
    })  
  }
  useEffect(() => {
    if(!location.isReady) return;

    if(location?.query && Object.keys(location?.query).length > 0){

    }

  }, [location.isReady])

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
        {/* <Link 
        href='/' 
        className='login-modal-brand' 
        onClick={() => Mixpanel.track(MixpanelStrings.HOME_BUTTON_CLICK)}
        >
          <Image src={ theme === 'dark' ? credencLogo : credencLogoLight} objectFit="cover" />
          <div style={{textDecoration: 'none', color: '#FFFFFF', fontSize: '21px'}}>BETA</div>
        </Link> */}
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
    </div>
  );
}
