import React,{useEffect,useState} from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import arrowIcon from '../../assets/images/icons/arrowIcon.svg';
import clockIcon from '../../assets/images/icons/clockIcon.svg';
import calendarIcon from '../../assets/images/icons/calendarIcon.svg';
import onlineIcon from '../../assets/images/icons/onlineIcon.svg';
import chartIcon from '../../assets/images/icons/chartIcon.svg';
import costIcon from '../../assets/images/icons/costIcon.svg';
import LinkedlnLogo from '../../assets/images/icons/linkedin-icon.svg';
import njIcon from '../../assets/images/icons/njIcon.svg';
import Button from '../../components/button/Button';
import caretDown from '../../assets/images/icons/dropDown.svg'
import CourseCard from '../../components/coursecard/CourseCard';
import tableBackground from '../../assets/images/icons/tableBackground.svg'
import benefitBullet from '../../assets/images/icons/benefitBullet.svg'
import moduleBullets from '../../assets/images/icons/moduleBullets.svg'
import moduleSquareBullets from '../../assets/images/icons/moduleSquareBullet.svg'
import moduleArrowBullets from '../../assets/images/icons/topicArrowBullet.svg'
import SlidingPanel from 'react-sliding-side-panel';
import DetailModal from '../../components/detailModal/DetailModal'
import 'react-sliding-side-panel/lib/index.css';
import ApplyNowModal from '../../components/applyNowModal/ApplyNowModal'
import questionDoodle from '../../assets/images/icons/questionDoodle.svg'
import longWaveIcon from '../../assets/images/icons/longWaveIcon.svg'
import shortWaveIcon from '../../assets/images/icons/shortWaveIcon.svg'
import constantCurveIcon from '../../assets/images/icons/constantCurveIcon.svg'
import skribbleIcon from '../../assets/images/icons/skribbleIcon.svg'
import underlineSkribble from '../../assets/images/icons/underlineSkribble.svg'
import titleFrame from '../../assets/images/icons/titleFrame.svg'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {withStyles, Typography } from "@material-ui/core";
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import Link from "next/link";

const styles = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${tableBackground.src})`,  
  };

export default function DetailPageMobile(props){

    const myLoader = ({ src, width, quality }) => {
        if(src && src.length > 0){
          return `${src}?w=${width}&q=${quality || 75}`
        }else{
            return '..'
        }
      }

    let location = useRouter();
    const [mounted, setMounted] = useState(false);
    const [detailData,setDetailData] = useState({});
    const [detailModal,setDetailModal] = useState(false)
    const [applyNow, setApplyNow] = useState(false)
    const [cardActionTaken,setCardActionTaken] = useState(false)
    const [topicOpen,setTopicOpen] = useState({
        topicId: 0,
        topicShow: false,
        moduleId: 0,
        moduleShow: false,
    })

    const breadcrumbs = [
      <Link key="1" href="/">
        <span style={{fontSize: 13, fontFamily: 'Poppins', fontWeight: 400,color: '#4F4F4F',cursor: 'pointer'}}>
        Home
        </span>
      </Link>,
      <CustomColor key="2">
        Product Design
      </CustomColor>,
    ];

    useEffect(() => {
        if( props?.detailData && props?.detailData != null 
            && props?.instructorData && props?.instructorData != null 
            && props?.similarCourses && props?.similarCourses != null
            && props?.priceOptions && props?.priceOptions != null
            && props?.toolData && props?.toolData != null
            ){
                setMounted(true);
        }
       
      }, []);

      const _handleCardActionTaken=()=>{
        setCardActionTaken(true)
      }
      
      const _openDetailModal = (data)=>{
        setDetailModal(true);
        setDetailData(data);
      }

      const _openApplyNowModal=(data)=>{
        setApplyNow(true)
        setDetailData(data)
      }
      
      const _closeApplyNowModal=()=>{
        setApplyNow(false)
      }

      const closeDetailModal=(data)=>{
        setDetailModal(false)
        setDetailData(data);
        if(cardActionTaken === true){
          setTimeout(() => location.reload(), 100)
        }
      
      }

      const _handleTopicOpen=(data)=>{
          if(data.id === topicOpen.topicId){
            setTopicOpen({
                topicId: data.id,
                topicShow: !topicOpen.topicShow
            })
          }else{
            setTopicOpen({
                topicId: data.id,
                topicShow: true
            })
          }
        
      }

      const _handleModuleOpen=(item,data)=>{
          if(data.id === topicOpen.moduleId){
            setTopicOpen({
                topicId: item.id,
                topicShow: true,
                moduleId: data.id,
                moduleShow: !topicOpen.moduleShow
            })
          }else{
            setTopicOpen({
                topicId: item.id,
                topicShow: true,
                moduleId: data.id,
                moduleShow: true
            })
          }
         
      }

    //   const handleButtonClick=()=>{
    //     _openApplyNowModal()
    // }

    return(
      <>
      { 
       mounted &&
        <div className='detail-page-mobile'>
          <div className='detail-page-web-breadcrumb' style={{marginTop: '6rem',padding: 24}}>
           <Breadcrumbs
                separator={<NavigateNextIcon fontSize="medium" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
           </div>
            {
                props?.detailData?.platform?.logo !== null ?  
                <div className='detail-page-header-mobile-container'>
                <div className='detail-page-mobile-header'>
                   <Image loader={myLoader} src={props?.detailData?.platform?.logo} alt='platform-icon' height={38} width={38} objectFit="contain" />
                   <div className='detail-page-mobile-platform'>
                       <span className='detail-page-mobile-platform-heading'>
                         Hosted on
                       </span>
                       <span className='detail-page-mobile-platform-subHeading'>
                         {props?.detailData?.platform?.name}
                       </span>
                   </div>
                </div>
            </div> : null
            }
           {
               props?.detailData?.preview ? 
               <div className='detail-page-mobile-banner' style={{display:'contents'}}>
                 <Image loader={myLoader} src={props?.detailData?.preview} height={227} width={'100%'} objectFit="contain" />
               </div> : null
           }
           
            <div className='detail-page-content-mobile'>
            {/* <div style={{position:'relative'}}>
                <div style={{width: }}>
                    <Image src={titleFrame} height={32} width={100} objectFit='contain' />
                </div>
                
            </div> */}
            <div className='detail-page-content-heading'>
                    {props?.detailData?.program_type}
            </div> 
                  
              
               <div className='detail-page-content-course-name' style={{paddingTop: 10,fontSize: 28}}>
                 {props?.detailData?.course_name}
               </div>
               {
                props?.detailData?.one_liner ? 
                    <span className='detail-page-content-one-liner' style={{marginTop: 10}}>
                    {props?.detailData?.one_liner}
                </span> : null
               }
               {
                 props?.detailData?.educator && props?.detailData?.educator.length > 0 ?
                    <div className='detail-page-content-educator' style={{marginTop: 40}}>
                        <span className='detail-page-content-educator-heading'>
                            TAUGHT BY
                        </span>
                        <div className='detail-page-content-educator-container' style={{marginTop: 10}}>
                            {
                              props?.detailData?.educator && props?.detailData?.educator.length > 0 &&  props?.detailData?.educator.map((item,index)=>{
                                    return(
                                      <div key={index+1} className='detail-page-content-educator-list'>
                                          {/* <Image loader={myLoader} src={item?.logo} priority={true} objectFit='contain' height={40} width={40} /> */}
                                          {
                                            item?.logo !== null ? 
                                            <Image loader={myLoader} src={item?.logo} priority={true} objectFit='contain' height={40} width={40} /> : null
                                          }
                                          <div className='detail-page-content-educator-name' style={{marginLeft: 6}}>{item?.name}</div>
                                      </div>
                                    )
                                  
                                })
                            }
                          
                        </div>
                      </div> : null
               }

               {/* {
                 props?.detailData?.platform && props?.detailData?.platform.length > 0 ? 

                    <div className='detail-page-content-educator' style={{marginTop: 40}}>
                      <span className='detail-page-content-educator-heading'>
                          PARTNERS
                      </span>
                      <div className='detail-page-content-educator-container' style={{marginTop: 10}}>
                        <div className='detail-page-content-educator-list'>
                            {
                              props?.detailData?.platform?.logo ?   <Image loader={myLoader} src={props?.detailData?.platform?.logo} objectFit='contain' height={40} width={40} /> : null 
                            }
                            
                            <div className='detail-page-content-educator-name' style={{marginLeft: 6}}>{props?.detailData?.platform?.name}</div>
                        </div>
                        
                      </div>
                    </div> : null
               } */}
               
               
               <div style={{marginTop: 36}}>
                   <div className='divider' />
               <div className='detail-page-content-educator-details'>
                   <div className='detail-page-content-educator-info'>
                       <Image src={onlineIcon} height={28} width={28} objectFit='contain' />
                       <div className='detail-page-content-educator-info-header'>MODE</div>
                   </div>
                   <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.class_modes && props?.detailData?.class_modes.length > 0 ? props?.detailData?.class_modes[0] : ''}</div>
               </div>
               <div className='divider' />
               <div className='detail-page-content-educator-details'>
                   <div className='detail-page-content-educator-info'>
                       <Image src={calendarIcon} height={28} width={28} objectFit='contain' />
                       <div className='detail-page-content-educator-info-header'>DURATION</div>
                   </div>
                   <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.duration}</div>
               </div>
               <div className='divider' />
               <div className='detail-page-content-educator-details'>
                   <div className='detail-page-content-educator-info'>
                       <Image src={clockIcon} height={28} width={28} objectFit='contain' />
                       <div className='detail-page-content-educator-info-header'>PACE</div>
                   </div>
                   <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.pace}</div>
               </div>
               <div className='divider' />
               <div className='detail-page-content-educator-details'>
                   <div className='detail-page-content-educator-info'>
                       <Image src={chartIcon} height={28} width={28} objectFit='contain' />
                       <div className='detail-page-content-educator-info-header'>LEVEL</div>
                   </div>
                   <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.start_level} - {props?.detailData?.end_level}</div>
               </div>
               <div className='divider' />
               <div className='detail-page-content-educator-details'>
                   <div className='detail-page-content-educator-info'>
                       <Image src={costIcon} height={28} width={28} objectFit='contain' />
                       <div className='detail-page-content-educator-info-header'>Starting Cost</div>
                   </div>
                   <div className='detail-page-content-educator-info-subheader' style={{textAlign:'right'}}>{ props?.startingCost ? `₹ ${props?.startingCost?.starting_cost?.amount}` : props?.detailData?.finance_display && props?.detailData?.finance_display.length > 0 ? `₹${props?.detailData?.finance_display[0]}` : 'Unknown'}</div>
               </div>
               </div>
            </div>
            <div className='detail-page-mobile-intro'>
              <div className='detail-page-mobile-intro-header'>
                Introduction
              </div>
              <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 10}}>
                {props?.detailData?.description}
              </div>
              <div className='detail-page-mobile-intro-header' style={{marginTop: 40,fontSize: 22,flexDirection:'row !important'}}>
                Am I Eligible<div style={{position:'relative'}}>
                &nbsp;?&nbsp;
                    <div style={{position:'absolute',top: -12,left: 5}}>
                        <Image src={questionDoodle} height={25} width={19} objectFit='contain' />
                    </div>
                    </div> Yes, If you have...
              </div>
              <div style={{marginTop: 16}}>
              {
                props?.detailData.eligibility && props?.detailData?.eligibility.length > 0 && props?.detailData?.eligibility.map((content,index)=>{
                      return(
                    <div className='detail-page-mobile-intro-content' style={{marginTop: 10}} key={index}>
                        <div style={{marginTop: 5}}>
                        <Image src={arrowIcon} height={12} width={19} objectFit='contain' />
                        </div>
                        <div className='detail-page-mobile-intro-subHeader' style={{marginLeft: 8}}>
                         {content}
                        </div>
                    </div>
                      )
                  })
              }
              </div>
              
            </div>
            {
              props?.toolData.usps &&  props?.toolData?.usps.length > 0 ? 
              <div style={styles}>
              {/* <div style={{display:'contents'}}>
              <Image src={tableBackground} height={'100%'} width={'100%'} objectFit='contain' />
              </div> */}
             <div className='detail-page-mobile-benefit-section'>
               <div className='detail-page-mobile-benefit-content'>
                  <div className='detail-page-mobile-benefit-content-header'>
                      The Benefits You Will Get
                  </div>
                  {
                    props?.toolData.usps &&  props?.toolData?.usps.length > 0 && props?.toolData?.usps.map((item,index)=>{
                        return(
                          <div className='detail-page-mobile-benefit-info' key={index}>
                              <Image src={benefitBullet} width={17} height={20} objectFit='contain' />
                              <div className='detail-page-mobile-benefit-info-header'>
                                  {item}
                              </div>
                          </div>
                      )
                         
                      })
                  }
               </div>
              </div>
             </div> : null
            }
           

            <div className='detail-page-mobile-intro'>
                <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
                  What you’ll learn
                  <div style={{position: 'absolute',top: 17}}>
                      <Image src={longWaveIcon} width={200} height={11} objectFit='contain' />
                  </div>
                </div>
                <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 16}}>
                This is the course structure and curriculum that will be followed over the coming weeks
                </div>
                <div className='divider' />
                {
                 props?.toolData?.curriculum && props?.toolData?.curriculum.length > 0 &&  props?.toolData?.curriculum.map((item,index)=>{
                        return(
                            <div style={{display: 'flex',flexDirection: 'column',width: '100%'}} key={index}>
                                <div className='detail-page-mobile-module-content' key={index} style={ item.id != topicOpen.topicId && topicOpen.topicShow ? {opacity: 0.5,width:'100%'} : {width: '100%'}}>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',width: '95%'}}>
                                        <div style={{width: '5%'}}>
                                        <Image src={moduleBullets} height={12} width={12} objectFit='contain' />
                                        </div>
                                        <div style={{display:'flex',flexDirection: 'column', justifyContent:'flex-start',alignItems:'flex-start',marginLeft: 16}}>
                                            <div className='detail-page-mobile-module-content-header'>
                                                {item.title_sub}
                                            </div>
                                            <div className='detail-page-mobile-module-content-subheader'>
                                                {item.sub_module.length} Modules{item.duration ? item.duration : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{width:'5%',display:'flex',justifyContent:'flex-end'}} onClick={()=>_handleTopicOpen(item)}>
                                    <Image src={caretDown} width={15} height={12} objectFit='contain' style={item.id === topicOpen.topicId && topicOpen.topicShow ? {transform: "rotate(180deg)"} : null}/>
                                    </div>
                                </div> 
                                {
                                   topicOpen.topicShow && topicOpen.topicId === item.id ? 
                                    item.sub_module.map((data,point)=>{
                                        return(
                                            <div style={{display:'flex',flexDirection:'column',margin: '12px 0px'}} key={point} >
                                                <div className='detail-page-mobile-module-bullet-section'>
                                                    <div className='detail-page-mobile-module-bullet-section-header'>
                                                        <Image src={moduleSquareBullets} height={12} width={12} objectFit='contain' />
                                                        <div className='detail-page-mobile-module-bullet-section-header-text'>
                                                            Module {point+1}
                                                        </div>
                                                    </div>
                                                    <div>
                                                    <Image src={caretDown} width={15} height={12} objectFit='contain' onClick={()=>_handleModuleOpen(item,data)} style={data.id === topicOpen.moduleId && topicOpen.moduleShow ? {transform: "rotate(180deg)"} : null}/>
                                                    </div>
                                                </div>
                                                {
                                                  topicOpen.topicShow && topicOpen.topicId === item.id && topicOpen.moduleShow && topicOpen.moduleId === data.id ?  
                                                   <div style={{display:'flex',flexDirection:'column',margin: '12px 0px'}}>
                                                    <div className='detail-page-mobile-module-topic-section'>
                                                        <Image src={moduleArrowBullets} height={12} width={12} objectFit='contain' />
                                                        <div className='detail-page-mobile-module-bullet-section-header-text'>
                                                            Topic 1
                                                        </div>
                                                    </div>
                                                    <div className='detail-page-mobile-module-bullet-section-topic-text'>
                                                        {data.title}
                                                    </div>
                                                   </div>  : null
                                                }
                                                  
                                           </div>
                                        )
                                    }) : null
                                }
                                
                               
                            </div> 
                        )
                    })
                }
                

            </div>
            

            {/* <div className='detail-page-mobile-intro'>
                <div className='detail-page-mobile-intro-header'>
                    Your Tool Stack
                </div>
                <div className='detail-page-mobile-intro-subHeader'>
                    The tools that will be taught in this course
                </div>
                <div className='detail-page-mobile-intro-tool-container' style={{marginTop: 30}}>
                    {
                      props?.toolData?.skills && props?.toolData?.skills.length > 0 && props?.toolData?.skills.map((item,index)=>{
                          {console.log(item,"items+++")}
                            return(
                                <div className='detail-page-mobile-intro-tool-content' key={index}>
                                    <div className='detail-page-mobile-intro-tool-content-text'>
                                     {item}
                                   </div>
                                </div>
                            )
                        })
                    }
                      
                </div>
            </div> */}

            {
                props?.toolData?.skills && props?.toolData?.skills.length > 0 ? 
                <div className='detail-page-mobile-intro'>
                <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
                Skills You Will Master
                <div style={{position: 'absolute',top: 10}}>
                      <Image src={shortWaveIcon} width={57} height={6} objectFit='contain' />
                  </div>
                </div>
                <div className='detail-page-mobile-skill-container' style={{marginTop: 24}}>
                    {
                        props?.toolData?.skills && props?.toolData?.skills.length > 0 && props?.toolData?.skills.map((item,index)=>{
                            return(
                                // <svg width="107" height="42" viewBox="0 0 107 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                // <path d="M1.46094 7.19753C17.2755 4.69933 59.7636 0.700514 103.199 4.6908" stroke="url(#paint0_linear_9426_43551)" stroke-width="1.75" stroke-linecap="round"/>
                                // <path d="M4.48148 3C3.59976 8.44054 2.18842 23.0573 3.59675 38" stroke="url(#paint1_linear_9426_43551)" stroke-width="1.75" stroke-linecap="round"/>
                                // <path d="M100.483 1.83594C102.1 7.8234 104.687 23.9095 102.105 40.3544" stroke="url(#paint2_linear_9426_43551)" stroke-width="1.75" stroke-linecap="round"/>
                                // <path d="M105.629 38C89.4366 36.2145 45.9338 33.3565 1.46093 36.2084" stroke="url(#paint3_linear_9426_43551)" stroke-width="1.75" stroke-linecap="round"/>
                                // <defs>
                                // <linearGradient id="paint0_linear_9426_43551" x1="1.46094" y1="3" x2="28.082" y2="49.8553" gradientUnits="userSpaceOnUse">
                                // <stop stop-color="#FF00DD"/>
                                // <stop offset="1" stop-color="#5100FF"/>
                                // </linearGradient>
                                // <linearGradient id="paint1_linear_9426_43551" x1="3" y1="3" x2="19.3278" y2="12.5173" gradientUnits="userSpaceOnUse">
                                // <stop stop-color="#FF00DD"/>
                                // <stop offset="1" stop-color="#5100FF"/>
                                // </linearGradient>
                                // <linearGradient id="paint2_linear_9426_43551" x1="103.199" y1="1.83594" x2="82.5572" y2="21.8797" gradientUnits="userSpaceOnUse">
                                // <stop stop-color="#FF00DD"/>
                                // <stop offset="1" stop-color="#5100FF"/>
                                // </linearGradient>
                                // <linearGradient id="paint3_linear_9426_43551" x1="105.629" y1="35" x2="90.4484" y2="73.2772" gradientUnits="userSpaceOnUse">
                                // <stop stop-color="#FF00DD"/>
                                // <stop offset="1" stop-color="#5100FF"/>
                                // </linearGradient>
                                // </defs>
                                // </svg>
                                <div className='detail-page-mobile-skill-content' key={index}>
                                {item}
                               </div>
                            )
                        })
                    }
                </div>
            </div> : null
            }

         {
             props?.instructorData?.instructor && props?.instructorData?.instructor.length > 0 ? 
             <div className='detail-page-mobile-intro'>
             <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
               Who will teach you?
               <div style={{position: 'absolute',top: 10,left:-20}}>
                     <Image src={constantCurveIcon} width={224} height={8} objectFit='contain' />
                 </div>
             </div>
             <div className='detail-page-mobile-intro-subHeader'>
               Meet your instructors who will be teaching you the skills required to excel in this course
             </div>
             <div className='detail-page-mobile-instructor-card-container'>
             { props?.instructorData?.instructor && props?.instructorData?.instructor.length > 0 && props?.instructorData?.instructor.map((item,index)=>{
                 return(
                    <div className='detail-page-mobile-instructor-card' key={index} style={index > 0 ? {marginLeft: 15} : null}>
                            <Image loader={myLoader} src={item?.profile_photo} width={90} height={90} objectFit='contain' />
                            <div className='detail-page-mobile-instructor-card-name'>
                                {item?.name}
                            </div>
                            <div className='detail-page-mobile-instructor-card-designation' style={{marginTop: -10}}>
                                {item?.designation}
                            </div>
                            <div className='linkedlinLogoMobile'>
                                <Image src={LinkedlnLogo} height={24} width={24} objectFit='contain' />
                            </div>
                   </div>
                 )
             })}
                  </div> 
           </div> : null
         }

           
            <div className='detail-page-mobile-intro' style={{background: '#FFFFFF'}}>
              <div className='detail-page-mobile-intro-header' style={{fontSize: 22}}>
              How Much Would You Pay?
              </div>
              <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 10}}>
              Explore your pre-approved Loan and EMI Options! Have your pick and pay at your own discretion!
              </div>
              <div className='detail-page-mobile-emi-content' style={{marginTop: 30}}>
                  <div className='detail-page-mobile-emi-section'>
                      <div className='detail-page-mobile-emi-section-header'>
                      EMI PLANS
                      </div>
                      <div className='detail-page-mobile-emi-section-nj-text'>
                      Powered by NJ Capital
                      </div>
                  </div>
                  <div className='detail-page-mobile-emi-section' style={{alignItems:'flex-start'}}>
                  <div className='detail-page-mobile-emi-section-start-text' style={{display:'flex'}}>
                  Starts <div style={{position:'relative'}}>
                  &nbsp;from
                      <div style={{position:'absolute',top: -12,right: -16}}>
                        <Image src={questionDoodle} height={25} width={19} objectFit='contain' />
                    </div>
                      </div>
                     
                    </div>
                    <div className='detail-page-mobile-emi-section-price-text'>
                    ₹10,423/mo*
                    </div>
                  </div>
              </div>
              <div className='detail-page-mobile-nj-section'>
              <Image src={njIcon} objectFit='contain' height={21} width={23} />
              <div className='detail-page-mobile-nj-section-text'>
                You have a Pre-Approved Loan of Rs. 20 lacs from NJ Capital
              </div>
              </div>
              <div className='detail-page-mobile-price-options-container'>
              
                {
                  props?.priceOptions?.emi_options && props?.priceOptions?.emi_options.map((item,index)=>{ 
                    return(
                      <div className='detail-page-mobile-price-options-card'>
                          <div className='detail-page-mobile-price-options-card-header'>
                            <div className='detail-page-mobile-price-options-card-plan' style={{display:'flex'}}>
                            {item.noOfInstallment} Month EMI
                            <div style={{position:'relative'}}>
                              &nbsp;EMI
                            <div style={{position:'absolute',top: -12,right: -16}}>
                              <Image src={questionDoodle} height={25} width={19} objectFit='contain' />
                            </div>
                          </div>
                            </div>
                            {
                              index === 0 ?
                              <div className='detail-page-mobile-price-options-card-recommendation'>
                                <div className='detail-page-mobile-price-options-card-recommendation-text'>Recommended!</div>
                              </div> : null
                            }
                            
                        </div>
                        <div className='detail-page-mobile-price-options-card-description'>
                          Pay ₹ {item.emiAmount} per month for {item.noOfInstallment} months with no interest cost.
                        </div>
                        <div className='detail-page-mobile-price-options-card-info'>
                          <div className='detail-page-mobile-price-options-card-info-heading'>
                            Monthly Installment
                          </div>
                          <div className='detail-page-mobile-price-options-card-info-subheading'>
                            ₹ {item.emiAmount}
                          </div>
                        </div>
                          <div className='detail-page-mobile-price-options-card-info'>
                            <div className='detail-page-mobile-price-options-card-info-heading'>
                            No. Installment
                            </div>
                            <div className='detail-page-mobile-price-options-card-info-subheading'>
                            {item.noOfInstallment}
                            </div>
                          </div>
                          {/* <div className='detail-page-mobile-price-options-card-info'>
                            <div className='detail-page-mobile-price-options-card-info-heading'>
                            Interest
                            </div>
                            <div className='detail-page-mobile-price-options-card-info-subheading'>
                              0
                            </div>
                          </div> */}
                          <div className='detail-page-mobile-price-options-card-info'>
                            <div className='detail-page-mobile-price-options-card-info-heading'>
                            Down Payment
                            </div>
                            <div className='detail-page-mobile-price-options-card-info-subheading'>
                            {item.downPayment}
                            </div>
                          </div>
                          {/* <div className='detail-page-mobile-price-options-card-info'>
                            <div className='detail-page-mobile-price-options-card-info-heading'>
                            GST@18
                            </div>
                            <div className='detail-page-mobile-price-options-card-info-subheading'>
                            ₹ 12,125
                            </div>
                          </div>
                          <div className='detail-page-mobile-price-options-card-info'>
                            <div className='detail-page-mobile-price-options-card-info-heading'>
                            Discount
                            </div>
                            <div className='detail-page-mobile-price-options-card-info-subheading'>
                              10%
                            </div>
                          </div> */}
                          <div className='detail-page-mobile-price-options-card-info' style={{marginTop:12}}>
                            <div style={{display:'flex',flexDirection:'column'}}>
                              <div className='detail-page-mobile-price-options-card-info-amount-header'>
                              Total Amount
                              </div>
                              <div className='detail-page-mobile-price-options-card-info-amount-text'>
                              ₹ {item.financeAmount}/mo
                              </div>
                            </div>
                            <div className='detail-page-mobile-price-options-card-nocost-emi'>
                                <div className='detail-page-mobile-price-options-card-nocost-emi-text'>
                                NO COST EMI
                                </div>
                            </div>
                          </div>
                       </div>
                    )
                  })
                }
              
              </div>
            </div>
            
            {/* <div className='detail-page-mobile-intro'>
                <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
                Batch you can enrol in
                <div style={{position: 'absolute',top: 10}}>
                      <Image src={skribbleIcon} width={71} height={6} objectFit='contain' />
                  </div>
                </div>
                <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 10}}>
                These are the other batches available for the same course structure
                </div>
                <div className='detail-page-mobile-batch-card-container'>
                   <div className='detail-page-mobile-batch-card'>
                      <div className='detail-page-mobile-batch-card-heading'>
                        BATCH 1
                      </div>
                      <div className='detail-page-mobile-batch-card-content'>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Enrolment Opens
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        7 Mar, 2022
                        </div>
                      </div>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Enrolment Closes
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        7 Mar, 2022
                        </div>
                      </div>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Starts on
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        7 Mar, 2022
                        </div>
                      </div>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Days
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        Mon, Tue & Fri
                        </div>
                      </div>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Time
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        9:00am - 12:00pm
                        </div>
                      </div>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Seats
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        24
                        </div>
                      </div>
                      <div style={{marginTop: 12,width: '100%'}}>
                      <Button 
                        style={{ 
                            color:'#FFFFFF',
                            background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)',
                            borderRadius: 5,
                            width:'100%',
                            height: 40
                         }}
                        classes='btn-primary'
                        text={'Apply Now'}
                        // leadingIcon={States.upvoteButtonState.UPVOTED.icon}
                        // onClick={() => console.log('remove upvote')}
                      />
                      </div>
                      </div>
                   </div>

                   <div className='detail-page-mobile-batch-card-close' style={{marginTop: 8}}>
                    <div className='detail-page-mobile-batch-card-heading'>
                        BATCH 2
                    </div>
                    <div style={{display:'flex',justifyContent:'flex-start'}}>
                        <div className='detail-page-mobile-batch-card-heading' style={{marginRight: 10}}>
                        21 Mar, 2022
                        </div>
                        <Image src={caretDown} width={15} height={12} objectFit='contain' />
                    </div>
                   </div>
                   <div className='detail-page-mobile-batch-card-close' style={{marginTop: 8}}>
                    <div className='detail-page-mobile-batch-card-heading'>
                        BATCH 3
                    </div>
                    <div style={{display:'flex',justifyContent:'flex-start'}}>
                        <div className='detail-page-mobile-batch-card-heading' style={{marginRight: 10}}>
                        4 APR, 2022
                        </div>
                        <Image src={caretDown} width={15} height={12} objectFit='contain' />
                    </div>
                   </div>
                </div>
            </div> */}

            <div className='detail-page-mobile-intro' style={{background: '#FFFFFF'}}>
                <div className='detail-page-mobile-intro-header' style={{fontSize: 24,display:'flex'}}>
                    Other 
                    <div style={{position:'relative'}}>
                    &nbsp;courses&nbsp;
                        <div style={{position: 'absolute',top: 10}}>
                      <Image src={underlineSkribble} width={71} height={6} objectFit='contain' />
                    </div>
                        </div> you can take
                    
                </div>
                <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 10}}>
                    You can find other available options for the course and enroll according to your availability
                </div>
                <div className='detail-page-mobile-card-container'>
                {props?.similarCourses.length > 0 && props?.similarCourses.map((item,index)=>{
                    return(
                      <div key={index} style={{marginLeft: '-2.5rem',minWidth:'max-content'}}>
                        <CourseCard 
                          index={index}
                          data={item} 
                          openDetailModal={()=>_openDetailModal(item)}
                          openApplyNowModal={()=> _openApplyNowModal(item)}
                          token={props?.token}
                          openLoginModal={()=>props?.openLoginModal()}
                          addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                          removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                        />
                      </div>
                    )
                 })}
                </div>
            </div>
            <SlidingPanel
                type={'right'}
                isOpen={detailModal}
                backdropClicked={() => setDetailModal(false)}
                size={30}
            >
           <DetailModal
            detailData={detailData} 
            theme={props?.theme} 
            openDetailModal={()=>_openDetailModal()}
            openApplyNowModal={(item)=> _openApplyNowModal(item)}
            closeDetailModal={()=>closeDetailModal(detailData)}
            handleCardActionTaken={()=>_handleCardActionTaken()}
            openLoginModal={()=>props?.openLoginModal()}
            token={props?.token}
           />
         </SlidingPanel>
         <SlidingPanel
            type={'right'}
            isOpen={applyNow}
            backdropClicked={() => setApplyNow(false)}
            size={30}
          >
             <ApplyNowModal detailData={detailData} closeApplyNowModal={()=>_closeApplyNowModal()} />
           </SlidingPanel>
        </div>
        }
        </>

    )
}


const CustomColor = withStyles({
  root: {
    fontSize: 13,
    fontFamily: 'Poppins',
    fontWeight: 400,
  //   lineHeight: 20,
    background: "-webkit-linear-gradient(94.15deg, #8F14CC 0%, #6602FC 99.97%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
})(Typography);