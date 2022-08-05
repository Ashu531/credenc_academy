import React, { useRef, useState } from 'react';
import States from '../../../values/states';
import Button from '../elementalComponents/button/Button';
import Input from '../elementalComponents/input/Input';
import passVisibleIcon from '../../../assets/eye.svg';
import passNotVisibleIcon from '../../../assets/eye-close.svg';
import ApiStatus from '../../../values/ApiStatus';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { validateConfirmPassword, validatePassword } from '../../services/validationService';
import ProfileHeader from './ProfileHeader';

export default function ResetPassword({token, handleForgotPassword}) {

  const passwordInputInitialState = States.passwordInputInitialState;
  const [oldPasswordInputState, setOldPasswordInputState] = useState({ ...passwordInputInitialState });
  const [newPasswordInputState, setNewPasswordInputState] = useState({ ...passwordInputInitialState });
  const [confirmPasswordInputState, setConfirmPasswordInputState] = useState({ ...passwordInputInitialState });
  const [errorState, setErrorState] = useState(null);

  const resetPasswordApiStatus = useRef(new ApiStatus());

  const buttonStates = States.resetPasswordButtonState;
  const [buttonState, setButtonState] = useState(buttonStates.DEFAULT)

  const handleResetPassword = async () => {
    resetPasswordApiStatus.current.start();

    let err = validatePassword(newPasswordInputState.value);

    if (!err) err = validateConfirmPassword(newPasswordInputState.value, confirmPasswordInputState.value);

    if (err === null) {
      let res = await resetPassword();
    } else {
      setErrorState(err);
      resetPasswordApiStatus.current.cancel();
    }
    // console.log(res, "reset password response")
  }

  const resetPassword = async () => {
    if(resetPasswordApiStatus){
      resetPasswordApiStatus.current.makeApiCall();
    }
    const res = await axios.post(`${API_URL}/set_new_password/`, {
      old_password: oldPasswordInputState.value.trim(),
      new_password: newPasswordInputState.value.trim(),
      confirm_new_password: confirmPasswordInputState.value.trim(),
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if(resetPasswordApiStatus){
            resetPasswordApiStatus.current.success();
            setButtonState(buttonStates.UPDATED)
        }
        return res;
    })
    .catch(err => {
        if(resetPasswordApiStatus){
            resetPasswordApiStatus.current.failed();
        }
        setErrorState(err.response.data.message);
    });

    return res ? res.data : [];
  }

  const isApiInProgress = () => {
    return resetPasswordApiStatus === ApiStatus.STARTED || resetPasswordApiStatus === ApiStatus.PENDING;
  }

  const showHidePassword = (field) => {

    switch(field){
      case 'old': 
        if (oldPasswordInputState.hide) {
          setOldPasswordInputState({
            ...oldPasswordInputState,
            hide: false,
            trailingIcon: passVisibleIcon,
            type: 'text'
          })
        } else {
          setOldPasswordInputState({
            ...oldPasswordInputState,
            hide: true,
            trailingIcon: passNotVisibleIcon,
            type: 'password'
          })
        }
        break;

      case 'new':
        if (newPasswordInputState.hide) {
          setNewPasswordInputState({
            ...newPasswordInputState,
            hide: false,
            trailingIcon: passVisibleIcon,
            type: 'text'
          })
        } else {
          setNewPasswordInputState({
            ...newPasswordInputState,
            hide: true,
            trailingIcon: passNotVisibleIcon,
            type: 'password'
          })
        }
        break;

      case 'confirm':
        if (confirmPasswordInputState.hide) {
          setConfirmPasswordInputState({
            ...confirmPasswordInputState,
            hide: false,
            trailingIcon: passVisibleIcon,
            type: 'text'
          })
        } else {
          setConfirmPasswordInputState({
            ...confirmPasswordInputState,
            hide: true,
            trailingIcon: passNotVisibleIcon,
            type: 'password'
          })
        }
        break;

      default:
        break;
    }

  }

  return (
    <div className='reset-password'>
      <ProfileHeader heading='Reset Password' />
      <div className='row'>
          <div className='label'>Old Password:</div>
          <div className='input-container'>
              <Input 
                placeholder='Enter Old Passowrd' 
                handleInput={(value) => setOldPasswordInputState({...oldPasswordInputState, value: value})}
                trailingIcon={oldPasswordInputState.trailingIcon}
                value={oldPasswordInputState.value}
                onTrailingIconClick={() => showHidePassword('old')}
                type={oldPasswordInputState.type}
              />
          </div>
      </div>
      <div className='row'>
          <div className='label'>New Password:</div>
          <div className='input-container'>
              <Input 
                placeholder='Enter New Passowrd' 
                handleInput={(value) => setNewPasswordInputState({...newPasswordInputState, value: value})}
                trailingIcon={newPasswordInputState.trailingIcon}
                value={newPasswordInputState.value}
                onTrailingIconClick={() => showHidePassword('new')}
                type={newPasswordInputState.type}
              />
          </div>
      </div>
      <div className='row'>
          <div className='label'>Confirm Password:</div>
          <div className='input-container'>
              <Input 
                placeholder='Re-Enter New Passowrd' 
                handleInput={(value) => setConfirmPasswordInputState({...confirmPasswordInputState, value: value})}
                value={confirmPasswordInputState.value}
                type={confirmPasswordInputState.type}
              />
          </div>
      </div>
      {errorState && <div className='error'>{errorState}</div>}
      <div className='row'>
        <div className='button-container'>
          <div className='text-button' onClick={handleForgotPassword}>Forgot Password?</div>
          <div className="auth-container">
            {isApiInProgress() ? <CircularProgress /> : <Button style={{maxHeight: '4rem', maxWidth: `${window.innerWidth > 500 ? '15rem' : 'auto'}`, background: buttonState.color}} onClick={handleResetPassword} text={buttonState.text} classes='btn-secondary small-wrapper-colored'/>}
          </div>
        </div>
      </div>
    </div>
  )
}
