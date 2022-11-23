import React,{useState,useEffect} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import axios from "axios";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {withStyles, Typography } from "@material-ui/core";
import Image from "next/image";
import bookmarkIcon from '../../assets/images/icons/bookmark.svg';
import upvoteIcon from '../../assets/images/icons/upvote.svg' 
import NewButton from '../../components/button/NewButton.js'
import clockIcon from '../../assets/images/icons/clockIcon.svg';
import calendarIcon from '../../assets/images/icons/calendarIcon.svg';
import onlineIcon from '../../assets/images/icons/onlineIcon.svg';
import chartIcon from '../../assets/images/icons/chartIcon.svg';
import costIcon from '../../assets/images/icons/costIcon.svg';
import benefitBullet from '../../assets/images/icons/benefitBullet.svg';
import tableBackground from '../../assets/images/icons/tableBackground.svg';
import questionDoodle from '../../assets/images/icons/questionDoodle.svg';
import arrowIcon from '../../assets/images/icons/arrowIcon.svg';
import moduleBullets from '../../assets/images/icons/moduleBullets.svg'
import moduleSquareBullets from '../../assets/images/icons/moduleSquareBullet.svg'
import moduleArrowBullets from '../../assets/images/icons/topicArrowBullet.svg'
import caretDown from '../../assets/images/icons/dropDown.svg'
import longWaveIcon from '../../assets/images/icons/longWaveIcon.svg'
import shortWaveIcon from '../../assets/images/icons/shortWaveIcon.svg'
import constantCurveIcon from '../../assets/images/icons/constantCurveIcon.svg'
import LinkedlnLogo from '../../assets/images/icons/linkedin-icon.svg';
import njIcon from '../../assets/images/icons/njIcon.svg';
import skribbleIcon from '../../assets/images/icons/skribbleIcon.svg'
import underlineSkribble from '../../assets/images/icons/underlineSkribble.svg'
import SlidingPanel from 'react-sliding-side-panel';
import DetailModal from '../../components/detailModal/DetailModal'
import 'react-sliding-side-panel/lib/index.css';
import ApplyNowModal from '../../components/applyNowModal/ApplyNowModal'
import CourseCard from '../../components/coursecard/CourseCard';
import constant from '../../config/constant';
import { useRouter } from 'next/router'
import LoginModalContainer from '../../components/loginModal/LoginModalContainer'
import ForgotPasswordModal from '../../components/forgotPasswordModal/ForgotPasswordModal'
import upvoteLogoDark from '../../assets/images/icons/thumbs-up-dark.svg'
import selectedBookmark from '../../assets/images/icons/selectedBookmark.svg'
import upvoteLogo from '../../assets/images/icons/upvote.svg'

const bookmarkKey = 'credenc-marketplace-bookmarks';
const UpvoteKey = 'credenc-edtech-upvote'

const styles = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${tableBackground.src})`,  
  };


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

export default function WebDetailPage(props){

    let router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [detailData,setDetailData] = useState({});
    const [detailModal,setDetailModal] = useState(false)
    const [applyNow, setApplyNow] = useState(false)
    const [cardActionTaken,setCardActionTaken] = useState(false)
    const [bookmarkVisible, setBookmarkVisible] = useState(null)
    const [upvoted,setUpvoted] = useState(null)
    const [toggleUpvote,setToggleUpvote] = useState(null)
    const [topicOpen,setTopicOpen] = useState({
        topicId: 0,
        topicShow: false,
        moduleId: 0,
        moduleShow: false,
    })

    const myLoader = ({ src, width, quality }) => {
        if(src && src.length > 0){
          return `${src}?w=${width}&q=${quality || 75}`
        }else{
            return '..'
        }
    }

    const breadcrumbs = [
        <Link underline="hover" key="1" color="#4F4F4F" href="/" onClick={handleClick} style={{fontSize: 13, fontFamily: 'Poppins', fontWeight: 400,}}>
          Home
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="#4F4F4F"
          href="/material-ui/getting-started/installation/"
          onClick={handleClick}
          style={{fontSize: 13, fontFamily: 'Poppins', fontWeight: 400,}}
        >
          Design
        </Link>,
        <CustomColor key="3">
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
                console.log(props?.detailData,"props?.detailData+++")
                setMounted(true)
                _handleLocalItems()
        }
       
      }, []);

      const _handleLocalItems = ()=>{
        if(props?.token && props?.token?.length > 0){
            _handleBookmarkData()
          }else{
            _retrieveBookmarks()
          }
          
          _handleUpvoteData()
      }
    
    
       const _retrieveBookmarks=()=>{
        let tempBookmarkData = JSON.parse(localStorage.getItem(bookmarkKey));
        if(tempBookmarkData && tempBookmarkData.length > 0){
          if (tempBookmarkData.includes(props?.data?.code)){
            setBookmarkVisible(true)
          }
          else
            setBookmarkVisible(false)
          }
        }  
    
       const _handleBookmarkData=()=>{
          if(props?.data?.bookmarked === true){
            setBookmarkVisible(true)
          }else{
            setBookmarkVisible(false)
          }
       }
    
       const _handleCardBookmark=(item)=>{
         if(bookmarkVisible === true){
          _onremoveToBookmark(item)
         }else{
          _onAddToBookmark(item)
         }
        }
    
       const _onremoveToBookmark=(item)=>{
       
        setBookmarkVisible(false)
        
        if(props?.token && props?.token.length > 0){
          removeBookmarkFromBackend(item.code)
          props?.removeLocalBookmarks()
        }else{
          let bookmarkArray = [];
          let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
          if(bookmarkItem && bookmarkItem.length > 0){
            bookmarkArray =  bookmarkItem.filter(data => data !== item.code )
          }
          props?.removeLocalBookmarks(bookmarkArray.length)
          localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
    
          if(router.pathname === "/bookmarks"){
            setTimeout(() => location.reload(), 100)
          }
        }
        
      }
      
      const _onAddToBookmark=(item)=>{
        setBookmarkVisible(true)
        if(props?.token && props?.token.length > 0){
          addBookmarkToBackend(item.code)
          props?.addLocalBookmarks()
        }else{
          let bookmarkArray = [];
          let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
          if(bookmarkItem && bookmarkItem.length > 0){
            bookmarkArray.push(...bookmarkItem)
          }
          bookmarkArray.push(item.code)
          props?.addLocalBookmarks(bookmarkArray.length)
          localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
        }
        
      }
    
      const addBookmarkToBackend = async (id) => {
        let res = await axios.post(`${constant.API_URL.DEV}/bookmark/`, {
          "id": [`${id}`],
        }, {
          headers: {
            'Authorization': `Bearer ${props?.token}`
          },
        })
          .then(res => {
            res.data
          })
          .catch(err => {
            console.log(err);
            setBookmarkVisible(false)
            // dispatchRemoveBookmark(id, bookmarks);
          })
        return res;
      }
    
      const removeBookmarkFromBackend = async (id) => {
        let res = await axios.post(`${constant.API_URL.DEV}/bookmark/remove/`, {
          "id": `${id}`,
        }, {
          headers: {
            'Authorization': `Bearer ${props?.token}`
          },
        })
          .then(res => {
            res.data
            if(router.pathname === "/bookmarks"){
              setTimeout(() => location.reload(), 100)
            }
          })
          .catch(err => {
            console.log(err);
            setBookmarkVisible(true)
            // dispatchAddBookmark(id, bookmarks);
          })
        return res;
      }

      const _handleUpvoteData=()=>{
        if(props?.data?.upvoted === true){
          setUpvoted(true)
        }else{
          setUpvoted(false)
        }
       }
    
       const _handleUpvote=(item)=>{
           console.log(item,props.token,"item++++")
         if(props?.token && props?.token?.length > 0){
          if(upvoted === true){
            _onRemoveToUpvote(item)
           }else{
            _onAddToUpvote(item)
           }
         }else{
           props?.openLoginModal()
         }
      
       }
    
       const _onAddToUpvote=(item)=>{
        setToggleUpvote(true)
        setUpvoted(true)
        let upvoteArray = [];
        let upvoteItem = JSON.parse(localStorage.getItem(UpvoteKey)) 
        if(upvoteItem && upvoteItem.length > 0){
          upvoteArray.push(...upvoteItem)
        }
        upvoteArray.push(item.id)
        localStorage.setItem(UpvoteKey,JSON.stringify(upvoteArray));
        upvote(item)
      }
    
      const _onRemoveToUpvote=(item)=>{
        setToggleUpvote(false)
        setUpvoted(false)
        let upvoteArray = [];
        let upvoteItem = JSON.parse(localStorage.getItem(UpvoteKey)) 
        if(upvoteItem && upvoteItem.length > 0){
          upvoteArray =  upvoteItem.filter(data => data !== item.id )
        }
        localStorage.setItem(UpvoteKey,JSON.stringify(upvoteArray));
        removeUpvote(item)
      }
    
      const upvote = async (item) => {
    
        await axios.post(`${constant.API_URL.DEV}/batch/upvote/add/`, {
            "batch_id": item?.id,
            "is_up_vote": "true"
        }, {
            headers: {
                'Authorization': `Bearer ${props?.token}`
            },
        })
        .then(res => {
            if (res?.data?.success)
            // handleFilteredData(false)
            //  Mixpanel.track(MixpanelStrings.COURSE_UPVOTED, {triggered_from: 'Course Card', ...item})
            return res;
        })
        .catch(err => {
            // setUpvoteButtonState({...States.upvoteButtonState.DEFAULT});
            // setUpvotes(item['up_votes'] || 0);
            console.log(err);
        })
    }
    
    const removeUpvote = async (item) => {
      await axios.post(`${constant.API_URL.DEV}/batch/upvote/remove/`, {
          "batch_id": item.id,
          "is_up_vote": "false"
      }, {
          headers: {
              'Authorization': `Bearer ${props?.token}`
          },
      })
      .then(res => {
          if (res?.data?.success) 
          // Mixpanel.track(MixpanelStrings.COURSE_UPVOTE_REMOVED, {triggered_from: 'Course Card', ...item})
          return res;
      })
      .catch(err => {
          // setUpvoteButtonState({...States.upvoteButtonState.UPVOTED});
          // setUpvotes(item['up_votes'] || 0);
          console.log(err);
      })
    }

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

      const handleButtonClick=()=>{
          console.log("coming+++")
          _openApplyNowModal()
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

    return(
        <>
        {
            mounted &&

        <div className='detail-page-web'>
           <div className='detail-page-web-breadcrumb'>
           <Breadcrumbs
                separator={<NavigateNextIcon fontSize="medium" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
           </div>
           <div className='detail-page-web-header'>
                <div className='detail-page-web-host'>
                <Image loader={myLoader} src={props?.detailData?.platform?.logo} alt='platform-icon' height={38} width={38} objectFit="contain" />
                   <div className='detail-page-web-platform' style={{flexDirection: 'column'}}>
                       <span className='detail-page-web-platform-heading'>
                         Hosted on
                       </span>
                       <span className='detail-page-web-platform-subHeading'>
                         {props?.detailData?.platform?.name}
                       </span>
                   </div>
                </div>
                <div className='detail-page-web-action-container'>
                   <div className='web-action-grey-container' onClick={()=>_handleCardBookmark(props?.detailData)} style={bookmarkVisible === true ? {background: "linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)",cursor:'pointer'} : {cursor: 'pointer'}}>
                    <Image src={bookmarkVisible === true  ? selectedBookmark : bookmarkIcon  } width={20} height={20} objectFit='contain' />
                   </div>
                   <div 
                     className='web-action-grey-container'
                     onClick={()=> _handleUpvote(props?.detailData)}
                     style={upvoted ? {background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)',cursor:'pointer'} : {cursor:'pointer'}}
                     >
                    <Image src={upvoted ? upvoteLogoDark : upvoteLogo} width={20} height={20} objectFit='contain' />
                   </div>
                   <div>
                    <NewButton 
                      width={'172px'} 
                      height={'44px'} 
                      linearGradient={'linear-gradient(94.15deg, #FF00DD 0%, #5100FF 99.97%)'}
                      text='Apply Now'
                      handleButtonClick={()=>handleButtonClick()}
                    />
                   </div>
                </div>
            </div>
           <div className='detail-page-web-course-data-container'>
                  <div className='course-data-left-container'>
                    <div className='detail-page-content-course-name'>
                            {props?.detailData?.course_name}
                    </div>
                    {
                        props?.detailData?.platform?.one_liner ? 
                            <span className='detail-page-content-one-liner' style={{marginTop: 10}}>
                            {props?.detailData?.platform?.one_liner}
                        </span> : null
                    }
                     <div className='detail-page-content-educator' style={{marginTop: 40}}>
                        <span className='detail-page-content-educator-heading'>
                            TAUGHT BY
                        </span>
                        <div className='detail-page-content-educator-container' style={{marginTop: 10}}>
                            {
                                props?.detailData?.educator && props?.detailData?.educator.length > 0 &&  props?.detailData?.educator.map((item,index)=>{
                                    return(
                                        <div key={index+1} className='detail-page-content-educator-list'>
                                            <Image loader={myLoader} src={item?.logo} priority={true} objectFit='contain' height={40} width={40} />
                                            <div className='detail-page-content-educator-name' style={{marginLeft: 6}}>{item?.name}</div>
                                        </div>
                                    )
                                    
                                })
                            }
                            
                        </div>
                    </div>
                    <div className='detail-page-content-educator' style={{marginTop: 40}}>
                        <span className='detail-page-content-educator-heading'>
                            PARTNERS
                        </span>
                        <div className='detail-page-content-educator-container' style={{marginTop: 10}}>
                            <div className='detail-page-content-educator-list'>
                                {
                                props?.detailData?.platform?.logo ?   <Image loader={myLoader} src={props?.detailData?.platform?.logo} priority={true} objectFit='contain' height={40} width={40} /> : null 
                                }
                                
                                <div className='detail-page-content-educator-name' style={{marginLeft: 6}}>{props?.detailData?.platform?.name}</div>
                            </div>
                            
                        </div>
                    </div>
                  </div>
                  <div className='course-data-right-container'>
                        <div className='detail-page-content-heading'>
                            {props?.detailData?.program_type}
                        </div> 
                        <div className='detail-page-info-container'>
                            <div className='detail-page-info-segement'>
                                <div className='detail-page-content-educator-details'>
                                    <div className='detail-page-content-educator-info'>
                                        <Image src={onlineIcon} height={28} width={28} objectFit='contain' />
                                        <div className='detail-page-content-educator-info-header'>MODE</div>
                                    </div>
                                    <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.class_modes && props?.detailData?.class_modes.length > 0 ? props?.detailData?.class_modes[0] : ''}</div>
                                </div>
                            </div>
                            <div className='detail-page-info-segement'>
                                <div className='detail-page-content-educator-details'>
                                    <div className='detail-page-content-educator-info'>
                                        <Image src={calendarIcon} height={28} width={28} objectFit='contain' />
                                        <div className='detail-page-content-educator-info-header'>DURATION</div>
                                    </div>
                                    <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.duration}</div>
                                </div>
                            </div>
                            <div className='detail-page-info-segement'>
                            <div className='detail-page-content-educator-details'>
                                <div className='detail-page-content-educator-info'>
                                        <Image src={clockIcon} height={28} width={28} objectFit='contain' />
                                        <div className='detail-page-content-educator-info-header'>PACE</div>
                                    </div>
                                    <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.pace}</div>
                                </div>
                            </div>
                            <div className='detail-page-info-segement'>
                            <div className='detail-page-content-educator-details'>
                                <div className='detail-page-content-educator-info'>
                                    <Image src={chartIcon} height={28} width={28} objectFit='contain' />
                                    <div className='detail-page-content-educator-info-header'>LEVEL</div>
                                </div>
                                <div className='detail-page-content-educator-info-subheader'>Intermediate - Advanced</div>
                            </div>
                            </div>
                            <div className='detail-page-info-segement'>
                            <div className='detail-page-content-educator-details'>
                                    <div className='detail-page-content-educator-info'>
                                        <Image src={costIcon} height={28} width={28} objectFit='contain' />
                                        <div className='detail-page-content-educator-info-header'>Starting Cost</div>
                                    </div>
                                    <div className='detail-page-content-educator-info-subheader' style={{textAlign:'right'}}>{props?.detailData?.finance_display && props?.detailData?.finance_display.length > 0 ? `₹${props?.detailData?.finance_display[0]}` : 'Unknown'}</div>
                                </div>
                            </div>
                        </div>
                  </div>
            </div>
            <div className='detail-page-web-course-grey-section' style={{flexDirection:'row'}}>
              <div className='detail-page-grey-left-content'>
                <div className='detail-page-mobile-intro-header'>
                    Introduction
                </div>
                <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 10,paddingRight: 50}}>
                    {props?.detailData?.description}
                </div>
              </div>
              <div className='detail-page-grey-right-content'>
                    {
                        props?.toolData?.usps &&  props?.toolData?.usps.length > 0 ? 

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

                        </div> : null
                    }
              </div>
            </div>
            {
               props?.detailData?.eligibility && props?.detailData?.eligibility.length > 0 ?
                <div style={styles}>
                                <div className='detail-page-mobile-intro-header' style={{marginTop: 40,fontSize: 22,display:'flex'}}>
                                    Am I Eligible<div style={{position:'relative'}}>
                                    &nbsp;?&nbsp;
                                        <div style={{position:'absolute',top: -12,left: 5}}>
                                            <Image src={questionDoodle} height={25} width={19} objectFit='contain' />
                                        </div>
                                        </div> Yes, If you have...
                                </div>
                                <div style={{marginTop: 16}}>
                                    {
                                        props?.detailData?.eligibility && props?.detailData?.eligibility.length > 0 && props?.detailData?.eligibility.map((content,index)=>{
                                            return(
                                            <div className='detail-page-mobile-intro-content' style={{marginTop: 10,display: 'flex',marginBottom: 10}} key={index}>
                                                <div>
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
                </div> : null
            }
            <div className='detail-page-web-course-grey-section' style={{gap: 0,marginTop: 0}}>
              <div className='detail-page-grey-left-content' style={{width: '50%'}}>
                <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
                  What you’ll learn
                  <div style={{position: 'absolute',top: 17}}>
                      <Image src={longWaveIcon} width={200} height={11} objectFit='contain' />
                  </div>
                </div>
                <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 16,marginBottom: 16}}>
                    This is the course structure and curriculum that will be followed over the coming weeks
                </div>
                {
                 props?.toolData?.curriculum && props?.toolData?.curriculum.length > 0 &&  props?.toolData?.curriculum.map((item,index)=>{
                        return(
                            <div style={{display: 'flex',flexDirection: 'column',width:'100%'}} key={index}>
                                <div className='detail-page-mobile-module-content' key={index} style={ item.id != topicOpen.topicId && topicOpen.topicShow ? {opacity: 0.5,width:'100%'} : {width: '100%'}}>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                        <div >
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
                                    <div style={{display:'flex',justifyContent:'flex-end',cursor:'pointer'}} onClick={()=>_handleTopicOpen(item)}>
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
                                                    <div style={{cursor:'pointer'}}>
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
                <div className='detail-page-grey-right-content' style={{marginLeft: 40}}>
                {
                props?.toolData?.skills && props?.toolData?.skills.length > 0 ? 
                <div>
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
                                <div className='detail-page-mobile-skill-content' key={index}>
                                    {item}
                               </div>
                            )
                        })
                    }
                </div>
            </div> : null
            }
                </div>
            </div>
            <div>
                {
                    props?.instructorData?.instructor && props?.instructorData?.instructor.length > 0 ? 
                    <div className='detail-page-web-course-grey-section' style={{flexDirection:'column',marginTop:0,gap: 0,flexWrap:'wrap',overflow:'auto'}}>
                    <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
                    Who will teach you?
                    <div style={{position: 'absolute',top: 10,left:-20}}>
                            <Image src={constantCurveIcon} width={224} height={8} objectFit='contain' />
                        </div>
                    </div>
                    <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 20}}>
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
                                    <div className='detail-page-mobile-instructor-card-designation'>
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
                </div>
                <div style={{...styles}}>
                <div className='detail-page-mobile-intro'>
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
                        <div className='detail-page-mobile-price-options-card'>
                        <div className='detail-page-mobile-price-options-card-header'>
                            <div className='detail-page-mobile-price-options-card-plan' style={{display:'flex'}}>
                            3 Month EMI
                            <div style={{position:'relative'}}>
                                &nbsp;EMI
                            <div style={{position:'absolute',top: -12,right: -16}}>
                                <Image src={questionDoodle} height={25} width={19} objectFit='contain' />
                            </div>
                            </div>
                            </div>
                            <div className='detail-page-mobile-price-options-card-recommendation'>
                                <div className='detail-page-mobile-price-options-card-recommendation-text'>Recommended!</div>
                            </div>
                        </div>
                        <div className='detail-page-mobile-price-options-card-description'>
                        Pay ₹ 22,500 per month for 3 months with no interest cost and only pay interest of ₹ 2,500 per intallment if you miss the payment.
                        </div>
                        <div className='detail-page-mobile-price-options-card-info'>
                        <div className='detail-page-mobile-price-options-card-info-heading'>
                            Monthly Installment
                        </div>
                        <div className='detail-page-mobile-price-options-card-info-subheading'>
                            ₹ 22,500
                        </div>
                        </div>
                        <div className='detail-page-mobile-price-options-card-info'>
                        <div className='detail-page-mobile-price-options-card-info-heading'>
                        No. Installment
                        </div>
                        <div className='detail-page-mobile-price-options-card-info-subheading'>
                        3
                        </div>
                        </div>
                        <div className='detail-page-mobile-price-options-card-info'>
                        <div className='detail-page-mobile-price-options-card-info-heading'>
                        Interest
                        </div>
                        <div className='detail-page-mobile-price-options-card-info-subheading'>
                            0
                        </div>
                        </div>
                        <div className='detail-page-mobile-price-options-card-info'>
                        <div className='detail-page-mobile-price-options-card-info-heading'>
                        Down Payment
                        </div>
                        <div className='detail-page-mobile-price-options-card-info-subheading'>
                            0
                        </div>
                        </div>
                        <div className='detail-page-mobile-price-options-card-info'>
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
                        </div>
                        <div className='detail-page-mobile-price-options-card-info' style={{marginTop:12}}>
                            <div style={{display:'flex',flexDirection:'column'}}>
                            <div className='detail-page-mobile-price-options-card-info-amount-header'>
                            Total Amount
                            </div>
                            <div className='detail-page-mobile-price-options-card-info-amount-text'>
                            ₹ 79,650/mo
                            </div>
                            </div>
                            <div className='detail-page-mobile-price-options-card-nocost-emi'>
                                <div className='detail-page-mobile-price-options-card-nocost-emi-text'>
                                NO COST EMI
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
               </div>
               </div>
               <div>
                    <div className='detail-page-mobile-intro'>
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
                            {/* <Button 
                                style={{ 
                                    color:'#FFFFFF',
                                    background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)',
                                    borderRadius: 5,
                                    width:'100%',
                                    height: 40
                                }}
                                linearGradient =''
                                classes='btn-primary'
                                text={'Apply Now'}
                                // leadingIcon={States.upvoteButtonState.UPVOTED.icon}
                                // onClick={() => console.log('remove upvote')}
                            /> */}
                            <NewButton 
                                width={'100%'} 
                                height={'44px'} 
                                linearGradient={'linear-gradient(94.15deg, #FF00DD 0%, #5100FF 99.97%)'}
                                text='Apply Now'
                                handleButtonClick={()=>handleButtonClick()}
                            />
                            </div>
                            </div>
                        </div>

                        {/* <div className='detail-page-mobile-batch-card-close' style={{marginTop: 8}}>
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
                        </div> */}
                        </div>
                    </div>
               </div>

               <div className='detail-page-mobile-intro' style={styles}>
                <div className='detail-page-mobile-intro-header' style={{fontSize: 24,display:'flex',flexDirection:'row'}}>
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
                <div className='detail-page-mobile-card-container' style={{display:'flex',marginTop: 20,gap: 20,overflow:'auto'}}>
                {props?.similarCourses.length > 0 && props?.similarCourses.map((item,index)=>{
                    return(
                      <div key={index}>
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

            {
                props?.loginModal ? 
                <div style={{width: '100%',height: '100%'}}>
                <LoginModalContainer
                    closeLoginModal={()=>props?.closeLoginModal()}
                    openForgotPasswordModal={()=>props?.openForgotPasswordModal()}
                    forgotPasswordModal={props?.forgotPasswordModal}
                    theme={props?.theme}
                    handleLogin={()=>props?.handleLogin()}
                /> 
                </div>
                : null
            }
            {
                props?.forgotPasswordModal ? 
                <ForgotPasswordModal
                handleForgotPasswordEnd={()=>props?.handleForgotPasswordEnd()}
                />
                : null
            }
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