import React,{useEffect, useState,useRef} from 'react';
import Image from "next/image";
import Link from "next/Link";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import successGif from '../../assets/json/successModal.json';
import closeIcon from '../../assets/images/icons/close-icon-grey.svg';
import njIcon from '../../assets/images/icons/njIcon.svg';
import reservedImage from '../../assets/images/icons/query-img.svg'
import chatIcon from '../../assets/images/icons/chatIcon.svg'
import {ChatWidget} from "@papercups-io/chat-widget";
import constant from '../../config/constant';
import credencAcademy from '../../assets/images/icons/credencAcademy.svg'
import { useMediaQuery } from 'react-responsive';
const EdtechPartnerKey = 'credenc-edtech-partner-key';

export default function QuerySuccessModal(props){

  const [thirdPartyUser,setThirdPartyUser] = useState({})

  useEffect(()=>{
      _retrieveData()
  },[])

  const _retrieveData=()=>{
    let partnerKey = JSON.parse(localStorage.getItem(EdtechPartnerKey));
    setThirdPartyUser(partnerKey)
  }

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });

    return(
        <>
         <div className='success-query-modal-container' style={ window.innerWidth<=500 ? {width:'100%',height:'90vh'} : null }>
              <div className='closeIconContent' onClick={()=>props.closeSuccessQueryModal()}>
                <span className='success-apply-modal-close-icon' >
                    <Image src={closeIcon} objectFit='cover' height={20} width={20} />
                </span>
              </div>
              <div className='success-apply-modal-content' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                {
                  <div className='success-apply-modal-gif'>
                      <Image src={reservedImage} width={150} height={68} objectFit='contain' />
                  </div>
                }

                {/* {
                  thirdPartyUser === constant.PARTNER_KEY.NJ ? 
                    <div className='success-apply-modal-section' style={{width: '100%'}}>
                      <div className='reserved-header-content'>
                          <div className='reserved-header'>
                            Query Sent!
                          </div>
                          <div className='reserved-subheader'>
                            {props?.courseName}.
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
                          A counsellor will soon be in touch with you to address your query and answer any questions!
                        </div>
                      </div>
                  </div> 
                  :  */}
                  <div className='success-apply-modal-section' style={{width: '100%'}}>
                  <div className='reserved-header-content'>
                      <div className='reserved-header'>
                        Query Sent!
                      </div>
                      <div className='reserved-subheader'>
                        {props?.courseName}.
                      </div>
                  </div>
                  {/* <div className='nj-section'>
                    <Image src={njIcon} width={55} height={47} objectFit="contain" />
                    <div className='njText'>
                    Your selected loan partner, NJ Capital will be in touch with you shortly to complete the loan process. 
                    </div>
                  </div> */}
                  <div className='trackSection'>
                    <div className='trackText'>
                      A counsellor will soon be in touch with you to address your query and answer any questions!
                    </div>
                  </div>
              </div>

                {/* }  */}
                  
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
                       {/* {
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
                        :  */}
                        <div 
                          onClick={() => props.closeSuccessQueryModal()}
                          className='button-container'
                          style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '8px 24px',
                              gap: '10px',
                              background: 'var(--defaultPrimaryColor)',
                              borderRadius: '5px',
                          }}
                          >
                              <span className='submit-footer-text' style={{color: '#FFFFFF'}}>
                                  Keep Browsing
                              </span>
                        </div>
                       {/* } */}
                       
                       
                    </div>
                  </div>
                  </div>
              </div> 

             

              {
             !isDesktopOrLaptop ? 
             <span className='success-apply-modal-close-icon' onClick={()=>props.closeApplyNowModal()}>
                 {/* <Image src={closeIcon} objectFit='cover' height={20} width={20} /> */}
             </span>
             : null
         }
         </div>
        </>
    )
}