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

export default function ApplyNowModal(props){

    const [genderType, setGenderType] = useState(0);
    const genderTypeRef = useRef(null);
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [number,setNumber] = useState('')
    const [gender,setGender] = useState('')
    const [dob,setDob] = useState(new Date())

    const handleChange = (newValue) => {
        let date = moment(newValue.$d).format('L');
        setDob(date);
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
      };

    const handleSubmit=async()=>{
        let res = await axios.post(`${constant.API_URL.DEV}/userform/`, {
            'email': email.toString(),
            'full_name': name.toString(),
            'phone_number' : number.toString(),
            'gender': gender.toString(),
            'dob': dob,
            'course_id': props?.detailData?.id,
          })
        .then(res => {
          console.log(res.data,"response++")
          return res.data;
        })
        .catch(err => {
          // this.coursesApiStatus.current.failed();
          console.log(err);
        });
    } 

    const handleName=(e)=>{
     setName(e)
    }

    const handleNumber=(e)=>{
        setNumber(e)
    }

    const handleEmail=(e)=>{
        setEmail(e)
    }

    return(
        <>
         <div className='apply-modal-container'>
              <div className='apply-modal-content'>
                  <div className='apply-modal-header'>
                    <span className='header-1'>Enrolling for</span>
                    <span className='header-2'>Product design from scratch with mentor support</span>
                  </div>
                  <div className='apply-modal-banner'  style={ window.innerWidth <= 500 ? {width:'88%'} : null }>
                    <span className='banner-text'>
                    No more work for you! Just review your pre-filled application and get enrolled!
                    </span>
                  </div>
                  <div className='form-content'>
                   <div className='name-content'>
                    <span className='label-text'>
                       Full Name*
                    </span>
                    <span style={{width: '100%'}}>
                    <Input placeholder="Full Name" handleInput={(e)=>handleName(e)} value={name} />
                    </span>
                   </div>
                   <div className='contact-content' style={{display:"flex",width:'100%'}}>
                     <div className='mobile-content' style={{width: '50%'}}>
                        <span className='label-text'>
                        Mobile Number*
                        </span>
                        <Input placeholder='Mobile Number' handleInput={(e)=>handleNumber(e)} value={number} />
                     </div>
                     <div className='email-content' style={{width: '50%'}}>
                        <span className='label-text'>
                        Email ID*
                        </span>
                        <Input placeholder='Email Id' handleInput={(e)=>handleEmail(e)} value={email}/>
                     </div>
                   </div>
                   <div className='contact-content' style={{display:"flex",width:'100%'}}>
                     <div className='mobile-content' style={{width: '50%'}}>
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
                                <DesktopDatePicker
                                    inputFormat="DD/MM/YYYY"
                                    value={dob}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                     </div>
                   </div>
                  </div>
                  <div className='apply-now-footer'>

                   <div className='footer-content'>
                     <div className='image-content'>
                        <Image src={whatsAppIcon} objectFit='cover'/>
                        <div className='call-icon-container'>
                            <Image src={callIcon} objectFit='cover'/>
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
                            background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)',
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

             
             
            </div>
        </>
    )
}