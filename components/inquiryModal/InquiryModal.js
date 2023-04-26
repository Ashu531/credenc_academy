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
import { set } from 'react-ga';
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

export default function InquiryModal(props){

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
    const [query, setQuery] = useState('')
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

        if(query.trim().length < 10){
            setError("Query is too short. Please Provide more information")
            setLoader(true)
            return
        }

        let data = {
            email: email.toString(),
            full_name: name.toString(),
            phone_number : number ? number.toString() : number,
            course_id: props?.detailData?.id,
        }

        let Schema = applyNowSchema;

        const isValid = await Schema.isValid(data);

        if (isValid) {
        let res = await axios.post(`${constant.API_URL.DEV}/enquiry/`,{
            'email': email.toString(),
            'full_name': name.toString(),
            'phone_number' : number.toString(),
            'course_id': props?.detailData?.id,
            'enquiry': query.toString()
        }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        .then(res => {
            if(res?.data?.status === true){
                props.closeInquiryModal()
                props.openSuccessModal()
                setLoader(true)
              return res.data;
            }else{
                setLoader(true)
                setError(res?.data?.message)
            }
        })
        .catch(err => {
          // this.coursesApiStatus.current.failed();
          setLoader(true)
          setError(err?.data?.message)
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

    const handleQuery=(e)=>{
         setQuery(e)
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
         <div className='query-modal-container' style={ window.innerWidth<=500 ? {width:'100%',height:'90vh'} : null }>
              <div className='apply-modal-content'>
                  <div className='apply-modal-header'>
                    <span className='header-1'>Inquiring about</span>
                    <span className='header-2'>{props?.courseName}</span>
                  </div>
                  <div className='apply-modal-banner'>
                    <span className='banner-text'>
                        Have any questions for us? Ask us here!
                    </span>
                  </div>
                  
                    {
                        error && error.length > 0 ? 
                        <div style={{marginTop: '15rem',padding: '10px 25px',width: '60%'}}>
                            <Alert message={`Error: ${error}`} type="error" showIcon />
                        </div> : null
                    }
                 
                  <div className='form-content' style={error && error.length > 0 ? {marginTop: -10} : {marginTop: '15rem'}}>
                      {/* <div className='label-section'>
                          <div className='label-header'>
                          Student Details
                          </div>
                      </div> */}
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

                   <div className='name-content'>
                    <span className='label-text'>
                        Inquire about anything!
                    </span>
                    <span style={{width: '100%'}}>
                    <textarea rows={8} placeholder="I want to know that..." onChange={(e) => handleQuery(e.target.value)} value={query}></textarea>
                    </span>
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
                     <div onClick={()=>handleSubmit()} style={{cursor:'pointer'}}>
                       <div 
                         className='button-container'
                         style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '8px 24px',
                            gap: '10px',
                            background: 'var(--defaultPrimaryColor)',
                            borderRadius: '5px'
                         }}
                         >
                             <span className='submit-footer-text'>
                                Submit
                             </span>
                       </div>
                   </div>
                  </div>
                  </div>
              </div> 
              {
                !isDesktopOrLaptop ? 
                <span className='apply-modal-close-icon' onClick={()=>props.closeInquiryModal()}>
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