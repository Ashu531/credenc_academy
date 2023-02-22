import React,{useEffect, useState,useRef} from 'react';
import Image from "next/image";
import Link from "next/Link";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import successGif from '../../assets/json/successModal.json';
import closeIcon from '../../assets/images/icons/close-icon-grey.svg';
import njIcon from '../../assets/images/icons/njIcon.svg';
import reservedImage from '../../assets/images/icons/reservedImage.svg'
import chatIcon from '../../assets/images/icons/chatIcon.svg'
import {ChatWidget} from "@papercups-io/chat-widget";
const EdtechPartnerKey = 'credenc-edtech-partner-key';

export default function SuccessApplyModal(props){

  const [thirdPartyUser,setThirdPartyUser] = useState({})

  useEffect(()=>{
      _retrieveData()
  },[])

  const _retrieveData=()=>{
    let partnerKey = JSON.parse(localStorage.getItem(EdtechPartnerKey));
    setThirdPartyUser(partnerKey)
  }

    return(
        <>
         <div className='success-apply-modal-container' style={ window.innerWidth<=500 ? {width:'100%',height:'90vh'} : null }>
              <div className='closeIconContent' onClick={()=>props.closeSuccessApplyModal()}>
                <span className='success-apply-modal-close-icon' >
                    <Image src={closeIcon} objectFit='cover' height={20} width={20} />
                </span>
              </div>
              <div className='success-apply-modal-content' style={{marginTop: 200}}>
                {
                  thirdPartyUser === 'NJCRED01' ? 
                    <div className='success-apply-modal-gif'>
                      <Image src={reservedImage} width={150} height={68} objectFit='contain' />
                  </div>
                  : 
                  <div className='success-apply-modal-gif'>
                    <Player
                      autoplay
                      loop={true}
                      src={successGif}
                      style={{ height: '300px', width: '300px' }}
                      >
                      </Player>
                  </div>
                }

                {
                  thirdPartyUser === 'NJCRED01' ? 
                    <div className='success-apply-modal-section' style={{width: '100%'}}>
                      <div className='reserved-header-content'>
                          <div className='reserved-header'>
                            Seat Reservation Successful!
                          </div>
                          <div className='reserved-subheader'>
                          for {props?.courseName}.
                          </div>
                      </div>
                      <div className='nj-section'>
                        <Image src={njIcon} width={55} height={47} objectFit="contain" />
                        <div className='njText'>
                        Your selected loan partner, NJ Capital will be in touch with you shortly to complete the loan process. 
                        </div>
                      </div>
                      <div className='trackSection'>
                        <div className='trackText'>
                          You can track the real-time status of your application under the “My Courses” tab.
                        </div>
                      </div>
                  </div> 
                  : 
                         <div className='success-apply-modal-section'>
                              <div className='success-apply-modal-top-section'>
                                  <div className='success-apply-modal-congrats'>
                                  Congratulations!
                                  </div>
                                  <div className='success-apply-modal-course'>
                                    <div>
                                      Your application has been approved for
                                    </div>
                                    <div className='success-apply-modal-course-name'>
                                      Product Design from Scratch with Mentor Support.
                                    </div>
                                  </div>
                              </div>
                              <div className='success-apply-modal-bottom-section'>
                                  <div>
                                  The College Admission Cell will be in touch with you via mail or mobile number for further steps soon!
                                  <br />
                                  <br/>
                                  You can also track status of your application under My course tab.
                                  </div>
                                  <div>
                                      
                                  </div>
                              </div>
                          </div>

                } 
                  
                <div className='success-apply-now-footer'  
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
                        {/* <Image src={whatsAppIcon} objectFit='cover'/> */}
                        <div className='call-icon-container'>
                            {/* <Image src={callIcon} objectFit='cover'/> */}
                        </div>
                     </div>
                     <div className='button-content' style={{cursor:'pointer'}}>
                       {
                         thirdPartyUser === 'NJCRED0' ? 
                            <div className='button-container' 
                            style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      padding: '8px 24px',
                                      gap: '10px',
                                      // background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)',
                                      borderRadius: '5px',
                                      border:'1px solid #00CB9C'
                                  }}>
                                <Image src={chatIcon} width={20} height={20} objectFit="contain" />
                                <span className='submit-footer-text' style={{color: '#000000'}}>Chat with us</span>
                            </div>
                        : 
                        <Link href='/my-courses' style={{textDecoration: 'none',cursor: "pointer"}}>
                          <div 
                          className='button-container'
                          style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '8px 24px',
                              gap: '10px',
                              // background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)',
                              borderRadius: '5px',
                              border:'1px solid #00CB9C'
                          }}
                          >
                              <span className='submit-footer-text' style={{color: '#000000'}}>
                                  Go to my course
                              </span>
                          </div>
                        </Link>
                       }
                       
                       
                    </div>
                     <div className='button-content' style={{cursor:'pointer',paddingRight: '5rem'}}>
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
                                Apply for loan
                             </span>
                       </div>
                   </div>
                  </div>
                  </div>
              </div> 

             

              {
             window.innerWidth <= 500 ? 
             <span className='success-apply-modal-close-icon' onClick={()=>props.closeApplyNowModal()}>
                 {/* <Image src={closeIcon} objectFit='cover' height={20} width={20} /> */}
             </span>
             : null
         }
         </div>
        </>
    )
}