import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import { validateConfirmPassword, validateEmail, validateOtp, validatePassword } from "../../helper/validationService";
import OtpField from "../otpField/OtpField";
import passVisibleIcon from "../../assets/images/icons/eye.svg";
import passNotVisibleIcon from "../../assets/images/icons/eye-close.svg";
import backIcon from '../../assets/images/icons/caret-left-grey.svg';
import credencLogo from '../../assets/images/icons/credenc-logo.svg';
import credencLogoLight from '../../assets/images/logo/credencLogo.svg'
import Link from "next/link";
import States from "../../config/states";
import Strings from "../../config/states";
import axios from "axios";
import Image from "next/image";
import constant from "../../config/constant";
// import { Mixpanel } from "../../../services/Mixpanel";
// import MixpanelStrings from "../../../../values/mixpanelStrings";

export default function ForgotPasswordModal({
  handleClose,
  handleBack,
  handleForgotPasswordEnd,
  theme
}) {
  
  const modalStates = States.forgotPasswordModalStates;

  const [modalState, setModalState] = useState(modalStates.ENTER_EMAIL);
  const [header, setHeader] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [formError, setFormError] = useState(null);

  const [emailInputState, setEmailInputState] = useState('');
  const passwordInputInitialState = States.passwordInputInitialState;
  const [passwordInputState, setPasswordInputState] = useState({ ...passwordInputInitialState });
  const [confirmPassInputState, setConfirmPassInputState] = useState({ ...passwordInputInitialState });

  const [otp, setOtp] = useState({
      generated: false,
      values: ['', '', '', '', '', '']
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

  const validate = () => {
    setFormError(null);
    if(modalState === modalStates.ENTER_EMAIL){
      let emailError = validateEmail(emailInputState);
      if(emailError){
        setFormError(emailError);
        return false;
      }
    }

    else if(modalState === modalStates.ENTER_OTP){
      let otpError = validateOtp(otp.values);
      if(otpError){
        setFormError(otpError);
        return false;
      }
    }

    else {
      let passwordError = validatePassword(passwordInputState.value);
      if(passwordError){
        setFormError(passwordError);
        return false;
      }

      let confirmPasswordError = validateConfirmPassword(passwordInputState.value, confirmPassInputState.value);
      if(confirmPasswordError){
        setFormError(confirmPasswordError);
        return false;
      }
    }

    return true;
  }

  const handleSendOTP = async () => {
    // Mixpanel.track(MixpanelStrings.SEND_OTP_FORGOT_PASSWORD, {
    //   'email_forgot_password' : emailInputState.toString(),
    // })
    if(validate()){
      let res = await axios.post(`${constant.API_URL.PROD}/send_forgot_password_otp/`, {
        'email': emailInputState.toString()
      })
      .then(res => {
        if(res['data']['error'] && res['data']['error'] != '')
          setFormError(res['data']['error']);
        else
          setModalState(modalStates.ENTER_OTP);
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
      let res = await axios.post(`${constant.API_URL.PROD}/verify_forgot_password_otp/`, {
        'email': emailInputState.toString(),
        "otp" : otp.values.join('')
      })
      .then(res => {
        if(res['data']['error'] && res['data']['error'] != '')
          setFormError(res['data']['error']);
        else
          setModalState(modalStates.NEW_PASSWORD);
      })
      .catch(err => {
        setFormError(err.response.data.error);
      });
    }
  }

  const setNewPassword = async () => {
    // Mixpanel.track(MixpanelStrings.SET_PASSWORD_FORGOT_PASSWORD, {
    //   "new_password" : 'Not saved!',
    //   "confirm_password" : 'Not saved!',
    // });

    if(validate()){
      let res = await axios.post(`${constant.API_URL.PROD}/forgot_password/`, {
        "otp": otp.values.join(''),
        "email": emailInputState.toString(),
        "new_password" : passwordInputState.value.toString(),
        "confirm_password" : confirmPassInputState.value.toString(),
      })
      .then(res => {
        if(res['data']['error'] && res['data']['error'] != '')
          setFormError(res['data']['error']);
        else
        handleForgotPasswordEnd();
      })
      .catch(err => {
        setFormError(err?.response?.data.error);
      });
    }
  }

  const handleBackClick = () => {
    if(modalState === modalStates.ENTER_EMAIL){
      handleForgotPasswordEnd();
    } else if(modalState === modalStates.ENTER_OTP){
      setModalState(modalStates.ENTER_EMAIL);
    } else {
      setModalState(modalStates.ENTER_EMAIL);
    }
  }

  const renderState = (state) => {
    return state === modalState;
  }

  useEffect(() => {
    setFormError(null);
    if(modalState === modalStates.ENTER_EMAIL){
      setHeader(Strings.FORGOT_PASSWORD_HEADER);
      setSubtitle(Strings.FORGOT_PASSWORD_SUBTITLE);
    }
    else if(modalState === modalStates.ENTER_OTP){
      setHeader(Strings.ENTER_OTP_HEADER);
      setSubtitle(Strings.ENTER_OTP_SUBTITLE);
    }
    else if(modalState === modalStates.NEW_PASSWORD){
      setHeader(Strings.NEW_PASSWORD_HEADER);
      setSubtitle(Strings.NEW_PASSWORD_SUBTITLE);
    }
  }, [modalState]);

  // useEffect(() => {
  //   changeNavbarVisibility(false)
  // }, [])

  return (
    <div className="modal" onClick={handleForgotPasswordEnd}>
      <div 
      className={`wrapper forgot-pass-modal-container`}
      onClick={(e) => e.stopPropagation()}>
        <div className="back-button" onClick={handleBackClick}>
          <Image src={backIcon} objectFit='cover' height={20} width={20}/>
        </div>
        <Link 
        href='/' 
        className='login-modal-brand' 
        // onClick={() => Mixpanel.track(MixpanelStrings.HOME_BUTTON_CLICK)}
        >
          <Image src={ theme === 'dark' ? credencLogo : credencLogoLight} objectFit="cover" />
          {/* <div style={{textDecoration: 'none', color: '#FFFFFF', fontSize: '21px'}}>BETA</div> */}
        </Link>
        <div className="header-container" >
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
          <Button text="Submit" linearGradient='green' classes="btn-secondary small-wrapper-colored" onClick={verifyOtp} />
        </div>}
        {renderState(modalStates.NEW_PASSWORD) && <div className='reset-password-container'>
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
        </div>}
      </div>
    </div>
  );
}
