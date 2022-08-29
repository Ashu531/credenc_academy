import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import ApiStatus from '../../config/apiStatus';
import { getDataFromUrl, getUserInitials } from '../../helper/userService';
import { validateName } from '../../helper/validationService';
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import ProfileHeader from './ProfileHeader';
import constant from '../../config/constant'

export default function EditProfile(props) {

    const [name, setName] = useState('');
    const [inputName, setInputName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [errorState, setErrorState] = useState(null);

    const userApiStatus = useRef(new ApiStatus());
    const upadteUserApiStatus = useRef(new ApiStatus());

    const handleMakeChanges = async () => {
        upadteUserApiStatus.current.start();
        setErrorState(null);
        let error = validateName(inputName);
        if(error === null){
            let res = await updateProfileDetails();
            await _getProfileData();
        } else {
            setErrorState(error);
            upadteUserApiStatus.current.cancel();
        }
    }

    useEffect(() => {
        console.log(errorState);
    }, [errorState]);

    const _getProfileData=async()=>{
        userApiStatus.current.start();
        let res = await getDataFromUrl(`${constant.API_URL.DEV}/profiles/`, props.token, userApiStatus)
        .then(res => {
            setEmail(res?.email)
            setName(res?.full_name)
            setInputName(res?.full_name)
            setProfileImage(res?.profile_image);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const updateProfileDetails = async () => {
        if(upadteUserApiStatus){
            upadteUserApiStatus.current.makeApiCall();
        }
        const res = await axios.post(`${constant.API_URL.PROD}/profile/`, {
            full_name: inputName.trim(),
        }, {
            headers: {
                'Authorization': `Bearer ${props.token}`
            }
        })
        .then(res => {
            if(upadteUserApiStatus){
                upadteUserApiStatus.current.success();
            }
            return res;
        })
        .catch(err => {
            if(upadteUserApiStatus){
                upadteUserApiStatus.current.failed();
            }
            setErrorState(err.response.data.message);
        });
    
        return res ? res.data : [];
    }

    // const getProfileDetails = async () => {
        
    // }

    useEffect(() => {
        async function getProfileDetails(){
        userApiStatus.current.start();
        let res = await getDataFromUrl(`${constant.API_URL.DEV}/profiles/`, props.token, userApiStatus)
        .then(res => {
            console.log(res,"response++")
            setEmail(res?.email)
            setName(res?.full_name)
            setInputName(res?.full_name)
            setProfileImage(res?.profile_image);
        })
        .catch(err => {
            console.log(err);
        })
        }
        getProfileDetails()  
    },[])

  return (
    <div className='edit-profile'>
        <ProfileHeader heading='Edit Profile' setMobileLoginNavigation={()=>props.setMobileLoginNavigation()} />
        <div className='row'>
            <div className='profile-image'>
                {/* <img src={profileImage} alt="Profile Image"></img> */}
                <span>{getUserInitials(name)}</span>
            </div>
            <div className='header'>
                <div className='heading'>{name}</div>
                {/* <div className='subtitle'>Change Profile Picture</div> */}
                <div className='subtitle'>{email}</div>
            </div>
            {/* <Button 
                text='Delete Account' 
                classes='btn-secondary' 
                style={{
                    color: '#B03D52', 
                    border: '1px solid #B03D52', 
                    maxWidth: '15rem',
                    maxHeight: '4rem'
                }}
            /> */}
        </div>
        <div className='row margin-35 mobile'>
            <div className='label'>Name:</div>
            <div className='input-container'>
                <Input placeholder='John Doe' value={inputName} handleInput={(val) => setInputName(val)} err={errorState}/>
            </div>
        </div>
        {/* <div className='row'>
            <div className='label'>Email:</div>
            <div className='input-container'>
                <Input placeholder='johndoe@gmail.com' disabled={true} value={email} handleInput={(val) => setEmail(val)}/>
            </div>
        </div> */}
        <div className='row margin-35'>
            <div className='button-container'>
                <Button onClick={handleMakeChanges} linearGradient='green' text='Make Changes' classes='btn-secondary small-wrapper-colored' style={{maxHeight: '4rem', paddingLeft: '2rem', paddingRight: '2rem'}}/>
            </div>
        </div>
    </div>
  )
}
