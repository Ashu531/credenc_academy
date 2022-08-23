import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import courseLogo from '../../assets/images/logo/courseLogo.svg';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg'
import bookmarkIconDark from '../../assets/images/icons/bookmark-dark.svg'
import instituteLogo from '../../assets/images/logo/instituteLogo.svg'
import upvoteLogo from '../../assets/images/icons/upvote.svg'
import upvoteLogoDark from '../../assets/images/icons/thumbs-up-dark.svg'
import arrowRight from '../../assets/images/icons/arrowRight.svg'
import arrowRightDark from '../../assets/images/icons/arrow-right-dark.svg'
import States from '../../values/states';
import selectedBookmark from '../../assets/images/icons/selectedBookmark.svg'
// import theme from '../../scripts/reducers/theme';
const bookmarkKey = 'credenc-marketplace-bookmarks';

export default function CourseCard(props){
  const [mounted, setMounted] = useState(false);
  const [compareButtonVisible, setCompareButtonVisible] = useState({display: 'none'});
  const [courseNameTooltip, setCourseNameTooltip] = useState(false)
  const [isCardOpen,setIsCardOpen] = useState(false)
  const [bookmarkVisible, setBookmarkVisible] = useState(false)
  const [compareTextVisible, setCompareTextVisible] = useState('Add to Compare')

  useEffect(() => {
    setMounted(true);
   }, []);

   useEffect(()=>{
    setCompareTextVisible(props?.compareText)
   },[])


 return(
      <>
      {
        mounted && 
        <div 
        className = {!isCardOpen ? "card-container" : "card-container card-container-open"}
        style={window.innerWidth <= 500 ? {width: "100%"} : !isCardOpen ? null : {padding:0} }
       
        onMouseEnter={e => {
          setCompareButtonVisible({display: 'flex',flexDirection:"row"});
          setIsCardOpen(true)
          }} 
        onMouseLeave={e => {
          setCompareButtonVisible({display: 'none'})
          setIsCardOpen(false)
        }} 
          >
        <div className='card-header' style={!isCardOpen ? null : {paddingLeft:12,paddingRight: 12}}>
          <Image src={courseLogo} objectFit="cover" alt='courseLogo' style={{borderRadius: 6}} />
          <div className='card-header-end-content'>
              <div className='grey-container' onClick={()=>{
                      props.addToBookmark(props.data)
                      setBookmarkVisible(!bookmarkVisible)
                      }} style={props.bookmarkVisible === true || bookmarkVisible === true ? {background: "linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)" ,marginRight: 10} : {marginRight: 10}}>
                      <Image src={ props.bookmarkVisible === true || bookmarkVisible === true  ? selectedBookmark : props.theme === 'dark' ? bookmarkIconDark : bookmarkIcon  } objectFit="contain" alt='selectedBookmark' height={20} width={20}/>
              </div>
              <div 
              className='grey-container' 
              onClick={()=>{
                props?.data?.upvoted === false ? props?.setUpvoteCount() : props?.removeUpvoteCount()
              }}
              >
                  <span className='count-text'>{ props?.upvoteVisible === true ? props?.data?.up_votes+1 : props?.data?.up_votes}</span>
                  <Image src={ props.theme === 'dark' ? upvoteLogoDark : upvoteLogo} objectFit="cover" alt='upvoteLogo' height={20} width={20} />
              </div>
    
          </div>
        </div>
        <div  className = {!isCardOpen ? "card-image-content" : "card-image-content card-image-content-open"}  onClick={()=> props.openDetailModal() } >
            <Image src={instituteLogo} objectFit="cover"  height={!isCardOpen ? 82 : 60} width={!isCardOpen ? 82 : 60} alt='instituteLogo'/>
            <span className='institute-name'>Xavier School of Management </span>
        </div>
    <div className = {!isCardOpen ? "card-course-content" : "card-course-content open"} onClick={()=> props.openDetailModal() } >
  
      <div className='course-name' onMouseEnter={()=>setCourseNameTooltip(true)} onMouseLeave={()=>setCourseNameTooltip(false)}>
        {props?.data?.course_name.length > 25 ? props?.data?.course_name.substring(0, 25) + '...' : props?.data?.course_name} 
      </div>
      {
      courseNameTooltip && props?.data?.course_name.length > 25 ?  <div className="course-name-tooltip">
      <span className="course-name-tooltiptext">{props?.data?.course_name}</span>
      </div> : null
      }

      <h2 className='course-duration'>
      {props?.data?.duration}
      </h2>
      <span className='course-price-content' style={!isCardOpen ? null : {marginTop: 22,marginBottom: 14}}>
        {/* <span className='course-pay'>{props?.data?.finance_display[0]}</span> */}
        <span className='course-price'>{props?.data?.price === "Free" ? "Free" : ` ₹${props?.data?.price}` }</span>
      </span>
   </div>

    {  window.innerWidth > 500 ? 
    <div 
    className='course-button-content' style={{...compareButtonVisible,marginLeft:0}}>
      <div 
      className='course-compare-buttton' 
      onClick={()=>{
        props.addToCompare(props?.data)
        setCompareTextVisible('Go to Compare')
        }}
      >
        <span className='add-to-compare-text'>
          {compareTextVisible}
        </span>
      </div>
      <div className='course-detail-button' onClick={()=> props.openDetailModal() } >
          <span className='course-detail-text'>
            Details
          </span>
           <Image src={ props.theme === 'dark' ? arrowRightDark : arrowRight} objectFit="contain" alt='arrowRight'/>
      </  div>
      </div> : null}




      { window.innerWidth<=500 ? 
          <div className='course-button-content-mobile'>
              <div className='course-compare-buttton-mobile' onClick={()=>{
                props.addToCompare(props?.data)
                setCompareTextVisible('Go to Compare')
                }}>
                <span className='add-to-compare-text-mobile'>
                {compareTextVisible}
                </span>
              </div>
              <div className='course-detail-button-mobile' onClick={()=> props.openDetailModal()}>
              <span className='course-detail-text-mobile'>
                Details
                </span>
                <Image src={arrowRight} objectFit="contain" height={18} width={18} alt='arrowRight'/>
              </div>
          </div> : null
      }
    </div>
  }
  </>
    )
}