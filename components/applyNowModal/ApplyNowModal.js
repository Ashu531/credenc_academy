import React,{useEffect, useState,useRef} from 'react';
import Image from "next/image";
import Input from '../input/Input';
import { getTabNumber } from "../../helper/getTabNumber";
import UrlService from "../../helper/urlService";
import SegmentedBar from '../segementedBar/SegmentedBar';
import { useRouter } from 'next/router'
import Lists from '../../config/list';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import whatsAppIcon from '../../assets/images/icons/whatsAppIcon.svg'
import callIcon from '../../assets/images/icons/phoneCall.svg'
import axios from "axios";
import constant from '../../config/constant';
import moment from 'moment'
import closeIcon from '../../assets/images/icons/close-icon-grey.svg'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Checkbox from '@mui/material/Checkbox';
import applyNowSchema from '../../helper/models/applyNowModel';
import { Alert } from 'antd';
import DotLoader from "react-spinners/DotLoader";
import { useMediaQuery } from 'react-responsive';
const EdtechAuthKey = 'credenc-edtech-authkey';
const EdtechPartnerKey = 'credenc-edtech-partner-key';

const spinnerCSS = {
    display: "block",
    // margin: "30rem auto",
};

const spinnerContainer = {
   width: '100%',
   height: '100%',
   position: 'fixed',
   top: '70%',
   left: '75%',
   height: '100%',
}

export default function ApplyNowModal(props){

    const [genderType, setGenderType] = useState(0);
    const genderTypeRef = useRef(null);
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [number,setNumber] = useState('')
    const [gender,setGender] = useState('Male')
    const [dob,setDob] = useState(new Date())
    const [token,setToken] = useState('');
    const [clearData,setClearData] = useState(false);
    const [thirdPartyData,setThirdPartyData] = useState({})
    const [error,setError] = useState('')
    const [loader,setLoader] = useState(true)

    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 500px)",
      });

    useEffect(()=>{
        let authToken = localStorage.getItem(EdtechAuthKey);
        setToken(authToken)
        _getProfileData(authToken)
    },[])

    const _getProfileData=async(authToken)=>{
        await axios.get(`${constant.API_URL.DEV}/profiles/`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
            })
            .then(res => {
                _setThirdPartyFields(res.data)
                setThirdPartyData(res.data)
                _setThirdPartyUser(res.data)
            })
            .catch(err => {
                console.log(err);
            });
    }

    const _setThirdPartyUser=(data)=>{
        localStorage.setItem(EdtechPartnerKey,JSON.stringify(data.partner_key));
    }

    const _setThirdPartyFields=(info)=>{
        setEmail(info.email);
        setName(info.full_name);
        setNumber(info.phone_number)
    }

    const _handleChecked=(event)=>{

        if(event === true){
            setClearData(true);
            setName('');
            setEmail('');
        }else{
            setName(thirdPartyData.full_name);
            setEmail(thirdPartyData.email);
        }
    }

    const handleChange = (newValue) => {
        let date = moment(newValue.$d).format('L');
        setDob(date);
    };

    const onChange = (date, dateString) => {};

    const handleSubmit=async()=>{
        setLoader(false)
        let data = {
            email: email.toString(),
            full_name: name.toString(),
            phone_number : number ? number.toString() : number,
            gender: gender.toString(),
            dob: dob,
            course_id: props?.detailData?.id,
        }

        let currentDate = moment("13/04/2008", "DD/MM/YYYY");
        // let result = moment(dob, "DD/MM/YYYY").diff(currentDate, 'days');
        // if(result > 5400){
        //     setError("Please Enter Date of Birth");
        //     return;
        // }

        let Schema = applyNowSchema;

        const isValid = await Schema.isValid(data);

        if (isValid) {
        let res = await axios.post(`${constant.API_URL.DEV}/userform/`,{
            'email': email.toString(),
            'full_name': name.toString(),
            'phone_number' : number.toString(),
            'gender': gender.toString(),
            'dob': dob,
            'course_id': props?.detailData?.id,
        }, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'key': 'credenc'
            }
          })
        .then(res => {
            if(res?.data?.status === true){
                let courseName = res.data.course
                props.closeApplyNowModal()
                props.openSuccessApplyModal(courseName)
                props?.handleAppliedStage(props?.detailData?.id)
                setLoader(true)
              return res.data;
            }else{
                setError(res?.data?.message)
            }
        })
        .catch(err => {
          // this.coursesApiStatus.current.failed();
          setLoader(true)
          setError(err?.data?.message)
          console.log(err);
        });
    }else{
        Schema.validate(data).catch(function (err) {
            setLoader(true)
            setError(err.errors[0])
        })
    }
    } 

    const handleName=(e)=>{
        let result = e.replace(/[^a-z ]/gi, '');
         setName(result)
    }

    const handleNumber=(e)=>{
        setError("")
        let result = e.replace(/[^0-9]/gi, '');
        setNumber(result)
    }

    const handleEmail=(e)=>{
        setEmail(e)
    }

    const onKeyDown = (e) => {
        e.preventDefault();
     };

    return(
        <>
         <div className='apply-modal-container' style={ window.innerWidth<=500 ? {width:'100%',height:'90vh'} : null }>
              <div className='apply-modal-content'>
                  <div className='apply-modal-header'>
                    <span className='header-1'>Enrolling for</span>
                    <span className='header-2'>{props?.courseName}</span>
                  </div>
                  <div className='apply-modal-banner'  style={ !isDesktopOrLaptop ? {width:'88%'} : null }>
                    <span className='banner-text'>
                    No more work for you! Just review your pre-filled application and get enrolled!
                    </span>
                  </div>
                  
                    {
                        error && error.length > 0 ? 
                        <div style={{marginTop: '15rem',padding: '10px 25px',width: '60%'}}>
                            <Alert message={`Error: ${error}`} type="error" showIcon />
                        </div> : null
                    }
                 
                  <div className='form-content' style={error && error.length > 0 ? {marginTop: -10} : {marginTop: '15rem'}}>
                      <div className='label-section'>
                          <div className='label-header'>
                          Student Details
                          </div>
                          <div className='check-section'>
                              <div>
                                    <Checkbox onChange={(e)=> _handleChecked(e.target.checked)} />
                              </div>
                              <div className='check-section-content'>
                                    Enrolling For Someone Else?
                              </div>
                          </div>
                      </div>
                   <div className='name-content'>
                    <span className='label-text'>
                       Full Name*
                    </span>
                    <span style={{width: '100%'}}>
                    <Input required={true} placeholder="Full Name" handleInput={(e)=>handleName(e)} value={name} type='text' />
                    </span>
                   </div>
                   <div className='contact-content' style={!isDesktopOrLaptop ? {display:"flex",flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',width:'100%'} : {display:"flex",width:'100%'}}>
                     <div className='mobile-content' style={window.innerWidth >  500 ? {width: '50%'} : {width:'100%'}}>
                        <span className='label-text'>
                        Mobile Number*
                        </span>
                        <Input placeholder='Mobile Number' handleInput={(e)=>handleNumber(e)} value={number} lenght={10} />
                     </div>
                     <div className='email-content' style={window.innerWidth >  500 ? {width: '50%'} : {width:'100%'}}>
                        <span className='label-text'>
                        Email ID*
                        </span>
                        <Input required={true} placeholder='Email Id' handleInput={(e)=>handleEmail(e)} value={email} type='text'/>
                     </div>
                   </div>
                   <div className='contact-content' style={!isDesktopOrLaptop ? {display:"flex",flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',width:'100%'} : {display:"flex",width:'100%'}}>
                     <div className='mobile-content' style={window.innerWidth >  500 ? {width: '50%'} : {width:'100%'}}>
                        <span className='label-text'>
                        Gender*
                        </span>
                        <div className="segment-container">
                            <SegmentedBar
                            items={Lists.genderTypes}
                            ref={genderTypeRef}
                            style={{
                                fontWeight: 600,
                                ontSize: '1.1rem',
                                lineHeight: '1.6rem',
                            }}
                            // theme={theme}
                            // bgColor='#16181A'
                            handleTabNumber={(i) => {
                                setGenderType(i)
                                if(i === 0){
                                    setGender('Male')
                                }else if(i === 1){
                                    setGender('Female')
                                }else{
                                    setGender('Others')
                                }
                                // callMixpanel(MixpanelStrings.COURSE_TYPE_SEGEMENT_TRIGGERED, Lists.courseTypes[i])
                            }}
                            selected={genderType}
                            />
                        </div>
                     </div>
                     <div className='email-content' style={{width: '50%'}}>
                        <span className='label-text'>
                        Date of Birth*
                        </span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3} style={{width:'100%'}}>
                                {
                                    !isDesktopOrLaptop ? 
                                    <MobileDatePicker
                                        inputFormat="MM-DD-YYYY"
                                        value={dob}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField disabled {...params} />}
                                    /> : 
                                    <DesktopDatePicker
                                    inputFormat="DD-MM-YYYY"
                                    value={dob}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField onKeyDown={onKeyDown} disabled {...params} />}
                                   />
                                }
                               
                            </Stack>
                        </LocalizationProvider>
                     </div>
                   </div>
                   
                  </div>
                  <div className='apply-now-footer'  
                       style={ 
                        window.innerWidth<=500 
                        ? 
                        {
                            width:'100%',
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:'flex-start',
                            alignItems:'flex-start',
                            background: '#F7F7F7',
                        } 
                        : null 
                        }
                   >

                   <div className='footer-content'>
                     <div className='image-content' style={{display: 'none'}}>
                        <Image src={whatsAppIcon} objectFit='cover'/>
                        <div className='call-icon-container'>
                            <Image src={callIcon} objectFit='cover'/>
                        </div>
                     </div>
                     <div className='button-content' onClick={()=>props?.openQueryModal()} style={{cursor:'pointer'}}>
                        <div 
                            className='button-container'
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '8px 24px',
                                gap: '10px',
                                borderRadius: '5px',
                                border: '1px solid var(--defaultPrimaryColor)',
                            }}
                            >
                                <span className='submit-footer-text' style={{color: '#000000'}}>
                                    Talk to Us
                                </span>
                        </div>
                    </div>

                   <div className='button-content' onClick={()=>handleSubmit()} style={{cursor:'pointer'}}>
                       <div 
                         className='button-container'
                         style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '8px 24px',
                            gap: '10px',
                            background: '#034FE2',
                            borderRadius: '5px'
                         }}
                         >
                             <span className='submit-footer-text'>
                                Submit Application
                             </span>
                       </div>
                   </div>

                  </div>
                  </div>
              </div> 
              {
                !isDesktopOrLaptop ? 
                <span className='apply-modal-close-icon' onClick={()=>props.closeApplyNowModal()}>
                    <Image src={closeIcon} objectFit='cover' height={20} width={20} />
                </span>
                : null
              }
              
         </div>
         {
                    !loader && <div style={spinnerContainer}>
                    <DotLoader
                        cssOverride={spinnerCSS}
                        size={100}
                        color={"#000000"}
                        loading={!loader}
                        speedMultiplier={1}
                    />
                    </div> 
         }
        </>
    )
}