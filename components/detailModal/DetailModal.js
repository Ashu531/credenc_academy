import React,{useEffect, useState} from 'react';
import Image from "next/image";
import courseLogo from '../../assets/images/logo/courseLogo.svg';
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
import States from '../../values/states';
import selectedBookmark from '../../assets/images/icons/selectedBookmark.svg'
const bookmarkKey = 'credenc-marketplace-bookmarks';



export default function DetailModal(props){
    console.log(props,"props")
    const [detailFooter,setFooterModal] = useState(false);
    const[bookmarkVisible,setBookmarkVisible] = useState(false)

    useEffect(()=>{
        _getBookmarks()
    },[])

    const _getBookmarks=()=>{
        let tempBookmarkData = JSON.parse(localStorage.getItem(bookmarkKey));
        if(tempBookmarkData && tempBookmarkData.length > 0){
          if (tempBookmarkData.includes(props?.detailData?.id))
          setBookmarkVisible(true)
          else
          setBookmarkVisible(false)
        }
    }

    const toggleModal =()=>{
        setFooterModal(!detailFooter);
    }

    const _handleBookmarksTrigger=()=>{
        props.addToBookmark(props?.detailData)
        setBookmarkVisible(!bookmarkVisible)
    }

    return(
       <div className='detail-modal-container'>
         <div className='detail-modal-content'>
            <div className='detail-modal-header'>
                <div className='header-school-content'>
                  <Image 
                  src={instituteLogo}  
                  height={40} 
                  width={40} 
                  objectFit="contain" 
                  />
                  <div className='school-content'> 
                      <span className='heading1'>Xavier School of Management </span>
                      <span className='heading2'>Course educator</span>
                  </div>
                </div>
                <div className='header-action-content'>
                        <div className='header-action-container' 
                        onClick={()=> _handleBookmarksTrigger()} 
                        style={ bookmarkVisible === true  ? {background: "linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)",cursor:"pointer"} : {cursor:"pointer"}}
                        >
                        <Image src={ bookmarkVisible === true ? selectedBookmark : props.theme === 'dark' ? bookmarkIconDark : bookmarkIcon}  
                        objectFit="cover" 
                        height={20} width={20}
                        />
                        </div>
                    <div className='header-action-container' style={{marginLeft:8}}>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <span className='upvote-text'>{props?.detailData?.up_votes}</span>
                        <Image 
                        src={upvoteLogo}  
                        width={18}
                        height={18}
                        objectFit="cover" 
                        />
                        </div>
                    </div>
                        <div className='header-action-container' style={{marginLeft:8}}>
                        <Image 
                        src={globeIcon}  
                        objectFit="cover" 
                        />
                        </div>
                </div>
            </div>
            <div className='detail-modal-banner'>
                <span className='banner-text'>
                Next batch starts on June 12th, 2022
                </span>
            </div>
            <div className='detail-modal-course-content'>
                <div className='detail-modal-course-container'>
                    <span className='heading1'>
                    B.Des-UX in collaboration with ImaginXP
                    </span>
                    <span className='heading2'>
                    Users come and go, Bruh! But this course will stay!! So do it Now!!!
                    </span>
                </div>
                <div className='detail-modal-course-overview'>
                    <Image src={courseLogo} height={30} width={30} objectFit="cover"/>
                    <div className='detail-modal-tutor-content'>
                        <span className='header1'>Upgrad</span>
                        <span className='header2'>{props?.detailData?.class_mode}</span>
                    </div>
                </div>
            </div>
            <div className='detail-modal-course-info'>
                <span className='content-detail'>
                    <Image src={certificateIcon} objectFit="cover"/>
                    <span className='content-detail-text'>
                      {props?.detailData?.program_type}
                    </span>    
                </span>
                <span className='content-detail'>
                    <Image src={onlineIcon} objectFit="cover"/>
                    {props?.detailData?.class_mode.map((item,index)=>{
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
                    {props?.detailData?.start_level} to {props?.detailData?.end_level}
                    </span>    
                </span>
                <span className='content-detail'>
                    <Image src={calendarIcon} objectFit="cover" />
                    <span className='content-detail-text'>
                    {props?.detailData?.duration}
                    </span>    
                </span>
                <span className='content-detail'>
                    <Image src={clockIcon} objectFit="cover"/>
                    <span className='content-detail-text'>
                    6hrs/ week
                    </span>    
                </span>
            </div>
            <div className='skill-container'>
                <div className='skill-header-content'>
                    <Image src={starIcon} objectFit="cover" />
                    <span className='skill-header'>
                    Top 8 Skills you will learn
                    </span>
                </div>
                <div className='skill-details'>
                    {
                      props?.detailData?.skills && props?.detailData?.skills.map((item,index)=>{
                           return(
                            <span className='skill-text-content' key={index}>
                            <span className='skill-text'>
                            {item.name}
                            </span>
                            </span>
                           )
                       }) 
                    }
                   
                </div>
            </div>
            <div className='instructor-container'>
                <div className='instructor-header'>
                    <Image src={instructorIcon} objectFit='cover' />
                    <span className='instructor-text'>Instructors</span>
                </div>
                <div className='avatar-container'>
                {
                   props?.detailData?.tutor && props?.detailData?.tutor.map((item,index)=>{
                       return( 
                       <span key={index} className="avatar-content" >
                            <Image src={item?.profile_photo} height={30} width={30} alt='avatar' style={{borderRadius: '50%'}}/>
                        </span>
                        )
                    })
                }
                </div>
            <div>
                 
            </div>
            </div>
            <div className='content-footer'>
              <span className='content-date-text' style={{paddingLeft: 24}}>
              Last updated on: <span style={{fontWeight: 600}}>12 JAN 2020</span>
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
                <div className='disclaimer-footer-content'>
                    <span className='footer-text'>
                    The information provided on our Platform is for general information purpose only and such informations are not investigated, monitored, or checked for accuracy, validity, and reliability by us. Your use of the Platform is solely at your own risk and we in no way shall have any liability whatsoever.
                    </span>
                </div> : null
            }
           
         </div>
         <div className='detail-modal-footer'>
            <div className='detail-modal-footer-section-left'>
                <span className='price-text'>
                {props?.detailData?.price}
                </span>
            </div>
            <div className='detail-modal-footer-section-right'>
                <span className='compare-button' onClick={()=>props.addToCompare(props?.detailData)} > 
                    <span className='compare-button-text'>
                    {props.compareTextVisible}
                    </span>
                </span>
                <span className='apply-now-button'>
                    <span className='apply-now-button-text'>
                        Apply Now
                    </span>
                </span>
             </div>
         </div>
        </div>
    )
}