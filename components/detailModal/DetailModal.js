import React,{useEffect, useState} from 'react';
import Image from "next/image";
import courseLogo from '../../assets/images/logo/courseLogo.svg';
import axios from "axios";
import constant from '../../config/constant';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg'
import bookmarkIconDark from '../../assets/images/icons/bookmark-dark.svg'
import instituteLogo from '../../assets/images/logo/instituteLogo.svg'
import upvoteLogo from '../../assets/images/icons/upvote.svg'
import upvoteLogoDark from '../../assets/images/icons/thumbs-up-dark.svg'
import globeIcon from '../../assets/images/icons/globeLightIcon.svg';
import globeIconDark from '../../assets/images/icons/globe.svg';
import certificateIcon from '../../assets/images/icons/certificateIcon.svg';
import onlineIcon from '../../assets/images/icons/onlineIcon.svg';
import chartIcon from '../../assets/images/icons/chartIcon.svg';
import calendarIcon from '../../assets/images/icons/calendarIcon.svg';
import clockIcon from '../../assets/images/icons/clockIcon.svg';
import starIcon from '../../assets/images/icons/greenStarIcon.svg'
import instructorIcon from '../../assets/images/icons/instructorIcon.svg'
import goUpIcon from '../../assets/images/icons/caret-up-grey.svg'
import closeIcon from '../../assets/images/icons/close-icon-grey.svg'
import States from '../../values/states';
import selectedBookmark from '../../assets/images/icons/selectedBookmark.svg'
import profileIcon from '../../assets/images/icons/profile-icon.svg';
import moment from 'moment';
import defaultEducator from '../../assets/images/icons/defaultEducator.svg'
import defaultPlatform from '../../assets/images/icons/defaultPlatform.svg'
import DotLoader from "react-spinners/DotLoader";
const EdtechTheme = 'EdtechTheme';
const bookmarkKey = 'credenc-marketplace-bookmarks';
const UpvoteKey = 'credenc-edtech-upvote'

const spinnerCSS = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

const spinnerContainer = {
   position: 'absolute',
   top: '50%',
   right: '45%'
}  


export default function DetailModal(props){

    const [mounted, setMounted] = useState(false);
    const [detailFooter,setFooterModal] = useState(false);
    const[bookmarkVisible,setBookmarkVisible] = useState(false)
    const[upvoteVisible,setUpvoteVisible] = useState(false)
    const [theme,setTheme] = useState('')
    const [courseData, setCourseData] = useState({})
    const [toggleUpvote,setToggleUpvote] = useState(null)
    const [upvoteCount,setUpvoteCount] = useState(0)
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000000");

    const myLoader = ({ src, width, quality }) => {
        if(src && src.length > 0){
            return `${src}?w=${width}&q=${quality || 75}`
        }else{
            return '..'
        }
     }

     useEffect(()=>{
        setMounted(true);
     },[])

    useEffect(()=>{
        _handlePreviewData(props?.detailData)
    },[])

    const _handlePreviewData=async(item)=>{
        if(props?.token && props?.token.length > 0){
            let res = await axios.get(`${constant.API_URL.DEV}/course/preview/${item.id}/`,{
                headers: {
                  'Authorization': `Bearer ${props?.token}`
                },
              })
                .then(res => {
                  setCourseData(res.data.data)
                  getBookmarks(res.data.data)
                  getUpvotes(res.data.data)
                  setUpvoteCount(res.data.data.up_votes)
                  setMounted(true);
                  setLoading(false)
                })
                .catch(err => {
                  console.log(err);
                  // dispatchRemoveBookmark(id, bookmarks);
                })
        }else{
            let res = await axios.get(`${constant.API_URL.DEV}/course/preview/${item.id}/`)
                .then(res => {
                  setCourseData(res.data.data)
                  getBookmarks(res.data.data)
                  getUpvotes(res.data.data)
                  setUpvoteCount(res.data.data.up_votes)
                  setMounted(true);
                  setLoading(false)
                })
                .catch(err => {
                  console.log(err);
                  // dispatchRemoveBookmark(id, bookmarks);
                })
        }
       
    }

    const _retrieveData=(item)=>{
        let localTheme = localStorage.getItem(EdtechTheme)
        setTheme(localTheme)
        _retrieveBookmarks(item)
    }

    const _retrieveBookmarks=(item)=>{
            let tempBookmarkData = JSON.parse(localStorage.getItem(bookmarkKey));
            if(tempBookmarkData && tempBookmarkData.length > 0){
                if (tempBookmarkData.includes(item?.id))
                setBookmarkVisible(true)

                else
                setBookmarkVisible(false)
            }
    }

    const toggleModal =()=>{
        setFooterModal(!detailFooter);
    }

    const getUpvotes=(item)=>{
       
        if(item?.upvoted === true){
            setUpvoteVisible(true)
        }else{
            setUpvoteVisible(false)
        }
    }

    const getBookmarks=(item)=>{
        if(props?.token && props?.token?.length > 0){
            if(item?.bookmarked === true){
                setBookmarkVisible(true)
              }else{
                setBookmarkVisible(false)
            }
        }else{
            _retrieveData(item)
        }
    }

    const _handleBookmarksTrigger=(item)=>{
        if(bookmarkVisible === true){
            _onremoveToBookmark(item)
           }else{
            _onAddToBookmark(item)
        }
    }

    const _onremoveToBookmark=(item)=>{
      setBookmarkVisible(false)

      if(props?.token && props?.token.length > 0){
          removeBookmarkFromBackend(item.id)
        }else{
          let bookmarkArray = [];
          let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
          if(bookmarkItem && bookmarkItem.length > 0){
            bookmarkArray =  bookmarkItem.filter(data => data !== item.id )
          }
          localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
          props?.handleCardActionTaken()
        }
    
      }
      
      const _onAddToBookmark=(item)=>{
        setBookmarkVisible(true)
      
        if(props?.token && props?.token.length > 0){
          addBookmarkToBackend(item.id)
        }else{
          let bookmarkArray = [];
          let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
          if(bookmarkItem && bookmarkItem.length > 0){
            bookmarkArray.push(...bookmarkItem)
          }
          bookmarkArray.push(item.id)
          localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
          props?.handleCardActionTaken()
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
            props?.handleCardActionTaken()
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
            props?.handleCardActionTaken()
          })
          .catch(err => {
            console.log(err);
            setBookmarkVisible(true)
           
            // dispatchAddBookmark(id, bookmarks);
          })
        return res;
      }

    const _handleUpvoteTrigger=(item)=>{
        if(props?.token && props?.token?.length > 0){
            if(upvoteVisible === true){
              _onRemoveToUpvote(item)
             }else{
              _onAddToUpvote(item)
             }
           }else{
             props?.closeDetailModal()
             props?.openLoginModal()
           }
    }

    const _onAddToUpvote=(item)=>{
        setToggleUpvote(true)
        setUpvoteVisible(true)
        setUpvoteCount(upvoteCount+1)
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
        setUpvoteVisible(false)
        setUpvoteCount(upvoteCount-1)
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
            props?.handleCardActionTaken()
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
          props?.handleCardActionTaken()
          // Mixpanel.track(MixpanelStrings.COURSE_UPVOTE_REMOVED, {triggered_from: 'Course Card', ...item})
          return res;
      })
      .catch(err => {
          // setUpvoteButtonState({...States.upvoteButtonState.UPVOTED});
          // setUpvotes(item['up_votes'] || 0);
          console.log(err);
      })
    }

    const _handleApplyModal=()=>{
        props?.openDetailModal()
        props?.openApplyNowModal()
    }

    return(
        <>
        {
            mounted && !loading ?
       <div className='detail-modal-container' style={ window.innerWidth<=500 ? {width:'100%',height:'90vh'} : null }>
           
         <div className='detail-modal-content'>
          <div style={{display:"flex",flexDirection:'row',width:'100%'}}>
            <div className='detail-modal-header' style={window.innerWidth<=500 ? {width: '90%'} : {width: '90%'}}>
                <div className='header-school-content'>
                  <Image 
                  loader={myLoader}
                  src={courseData?.educator[0]?.logo && courseData?.educator[0]?.logo.length > 0 ? courseData?.educator[0]?.logo : defaultEducator}  
                  height={40} 
                  width={40} 
                  objectFit="contain" 
                  style={{borderRadius: '50%'}}
                  />
                  <div className='school-content'> 
                      <span className='heading1'>{courseData?.educator && courseData?.educator.length > 0 ? courseData?.educator[0].name : courseData?.platform?.name}</span>
                      <span className='heading2'>Course educator</span>
                  </div>
                </div>
                <div className='header-action-content'>
                        <div className='header-action-container' 
                            onClick={()=> _handleBookmarksTrigger(courseData)} 
                            style={ bookmarkVisible === true  ? {background: "linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)",cursor:"pointer"} : {cursor:"pointer"}}
                        >
                        <Image src={ bookmarkVisible === true ? selectedBookmark : theme === 'dark' ? bookmarkIconDark : bookmarkIcon}  
                            objectFit="contain" 
                            width={ window.innerWidth <= 500 ? 25 : 20 }
                            height={window.innerWidth <= 500 ? 25 : 20 }
                        />
                        </div>
                    <div 
                    className='header-action-container' 
                    style={upvoteVisible ? {marginLeft:8,background : 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)'} : {marginLeft:8}}  
                    onClick={()=> _handleUpvoteTrigger(courseData) }
                    >
                        <div className='upvote-container'>
                            <span className='upvote-text' style={ upvoteVisible ? window.innerWidth <= 500 ?  {marginTop:1,color: '#FFFFFF'} : {color: '#FFFFFF'} : null} >
                            {upvoteCount}
                            </span>
                            <Image 
                                src={upvoteVisible ? upvoteLogoDark : upvoteLogo}  
                                width={ window.innerWidth <= 500 ? 30 : 18 }
                                height={window.innerWidth <= 500 ? 30 : 18 }
                                objectFit="cover" 
                            />
                        </div>
                    </div>
                        <div className='header-action-container' style={{marginLeft:8}}>
                            <a href={courseData?.platform?.link} target='_blank' rel="noreferrer">
                                <Image 
                                    src={globeIcon}  
                                    width={ window.innerWidth <= 500 ? 25 : 18 }
                                    height={window.innerWidth <= 500 ? 25 : 18 }
                                    objectFit="cover" 
                                />
                            </a>
                        </div>
                </div>
            </div>
            <div style={{width: '100%',background: '#FFFFFF',flex: 1}} />
            </div>
            <div className='detail-modal-banner'  
            // style={ window.innerWidth <= 500 ? {width:'100%'} : null }
            >
                <span className='banner-text'>
                Next batch starts on {moment(courseData?.enrollment_start_date).format("MMM Do YY")}
                </span>
            </div>
            <div className='detail-modal-middle-section'>
              <div className='detail-modal-course-content'>
                <div className='detail-modal-course-container'>
                    <span className='heading1'>
                    {courseData?.course_name}
                    </span>
                    <span className='heading2'>
                    {courseData?.description}
                    </span>
                </div>
                <div className='detail-modal-course-overview'>
                    <Image loader={myLoader} src={courseData?.platform?.logo && courseData?.platform?.logo.length > 0 ? courseData?.platform?.logo : defaultPlatform} height={30} width={30} objectFit="cover" style={{borderRadius: '50%'}}/>
                    <div className='detail-modal-tutor-content'>
                        <span className='header1'>{courseData?.platform?.name}</span>
                        {
                            courseData?.platform?.one_liner && courseData?.platform?.one_liner.length > 0 ?
                            <span className='header2'>{courseData?.platform?.one_liner}</span> :
                            <span className='header2'>Course Platform</span>
                        }
                        
                    </div>
                </div>
              </div>
              <div className='divider' />
              <div className='detail-modal-course-info'>
                <span className='content-detail'>
                    <Image src={certificateIcon} objectFit="cover"/>
                    <span className='content-detail-text'>
                      {courseData?.program_type}
                    </span>    
                </span>
                <span className='content-detail'>
                    <Image src={onlineIcon} objectFit="cover"/>
                    {courseData?.class_modes && courseData?.class_modes.map((item,index)=>{
                        return(
                            <span className='content-detail-text' key={index}>
                            {item}
                            </span>
                        )
                    })}
                    
                </span>
                <span className='content-detail'>
                    <Image src={chartIcon} objectFit="cover"/>
                    <span className='content-detail-text'>
                    { courseData?.start_level.length > 0 && courseData?.end_level.length > 0 ? courseData?.start_level + 'to' + courseData?.end_level : "Level Unknown" }
                    </span>    
                </span>
                <span className='content-detail'>
                    <Image src={calendarIcon} objectFit="cover" />
                    <span className='content-detail-text'>
                    {courseData?.duration}
                    </span>    
                </span>
                <span className='content-detail'>
                    <Image src={clockIcon} objectFit="cover"/>
                    <span className='content-detail-text'>
                    6hrs/ week
                    </span>    
                </span>
            </div>
            {
              courseData?.skills && courseData?.skills.length > 0 ? 
              <div className='skill-container'>
              <div className='skill-header-content'>
                  <Image src={starIcon} objectFit="cover" />
                  <span className='skill-header'>
                  Top 8 Skills you will learn
                  </span>
              </div>
              <div className='skill-details'>
                  {
                    courseData?.skills && courseData?.skills.map((item,index)=>{
                         return(
                          <span className='skill-text-content' key={index}>
                          <span className='skill-text'>
                          {item}
                          </span>
                          </span>
                         )
                     }) 
                  }
                 
              </div>
              </div> : null
            }

            {
              courseData?.instructor && courseData?.instructor.length > 0 ? 
              <div className='instructor-container'>
                <div className='instructor-header'>
                    <Image src={instructorIcon} objectFit='cover' />
                    <span className='instructor-text'>Instructors</span>
                </div>
                <div className='avatar-container'>
                {
                   courseData?.instructor && courseData?.instructor.map((item,index)=>{
                       return( 
                       <span key={index} className="avatar-content" >
                            <Image loader={myLoader} src={item?.profile_photo ? item?.profile_photo : profileIcon} height={30} width={30} alt='avatar' style={{borderRadius: '50%'}} objectFit='contain'/>
                        </span>
                        )
                    })
                }
                </div>
             </div> : null
            }
           
            
            <div className='divider' style={{marginTop: 10,marginBottom: 15}}/>
            <div 
            className='content-footer'
            style={window.innerWidth <= 500 ? {paddingBottom : '4%'} : {paddingBottom: '3%'}}
            >
              <span className='content-date-text' style={{paddingLeft: 24}}>
              Last updated on: <span style={{fontWeight: 600}}>{moment(courseData?.date_modified).format("MMM Do YY")}</span>
              </span>
              <span style={{paddingRight: 24,cursor:"pointer"}} onClick={()=>toggleModal()}>
                  <span className='content-disclaimer-text'>
                      Disclaimer
                  </span>
                  <Image src={goUpIcon} objectFit="cover" style={!detailFooter ? {transform: 'rotate(180deg)'} : null} />
              </span>
            </div>
            {
               detailFooter ?  
                <div className='disclaimer-footer-content' 
                // style={window.innerWidth <= 500 ? detailFooter ? {marginBottom: '18%'} : null : null}
                >
                    <span className='footer-text'>
                    The information provided on our Platform is for general information purpose only and such informations are not investigated, monitored, or checked for accuracy, validity, and reliability by us. Your use of the Platform is solely at your own risk and we in no way shall have any liability whatsoever.
                    </span>
                </div> : null
            }
           
                </div>
            </div>
         <div 
         className='detail-modal-footer'  
         style={ 
             window.innerWidth<=500 
             ? 
             {width:'100%',
             display:"flex",
             flexDirection:"row",
             justifyContent:'flex-start',
             alignItems:'flex-start',
             background: '#F7F7F7',
            } 
             : null 
            }
         >
            <div className='detail-modal-footer-section-left'>
                <span className='price-text'>
                {courseData?.finance_display[0] > 0 ? `₹${courseData?.finance_display[0]}` : 'Price Unknown'}
                </span>
            </div>
            <div className='detail-modal-footer-section-right' 
            style={ window.innerWidth <= 500 ? {width:'88%'} : null } onClick={()=>_handleApplyModal()}>
                <span className='apply-now-button'>
                    <span className='apply-now-button-text'>
                        Apply Now
                    </span>
                </span>
             </div>
         </div>
         {/* {
             window.innerWidth <= 500 ?  */}
             <span 
                className='detail-modal-close-icon' 
                onClick={()=>props.closeDetailModal()} 
                style={
                   window.innerWidth < 500 ? {
                    position: 'absolute',
                    top: '1.5%',
                    right: '2.5%'
                }: {
                    position: 'absolute',
                    top: '1%',
                    right: '2.5%',
                    cursor: 'pointer'
                }}
            >
                 <Image src={closeIcon} objectFit='cover' height={20} width={20} />
             </span>
             : null
         {/* } */}
        </div>
         : 
         <div style={spinnerContainer}>
         <DotLoader
           cssOverride={spinnerCSS}
           size={100}
           color={"#000000"}
           loading={loading}
           speedMultiplier={1}
         />
       </div>
        }
        </>
    )
}