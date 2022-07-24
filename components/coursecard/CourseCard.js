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
const compareKey = 'credenc-marketplace-compares';
const bookmarkKey = 'credenc-marketplace-bookmarks';

const getCompareText =(item)=>{
let CompareText = ""
  let tempCompareData = JSON.parse(localStorage.getItem(compareKey));

  if(tempCompareData && tempCompareData.length > 0){
    if (tempCompareData.includes(item?.id)) return "Go To Compare";
    else return "Add to Compare";
  }else{
    return CompareText = "Add To Compare"
  }
return CompareText
}

const getSavedBookmarks =(item)=>{
  let tempBookmarkData = JSON.parse(localStorage.getItem(bookmarkKey));

  if(tempBookmarkData && tempBookmarkData.length > 0){
    if (tempBookmarkData.includes(item?.id)) return true;
    else return false;
  }else{
    return false
  }

}

export default function CourseCard(props){
  const [mounted, setMounted] = useState(false);
  const [compareTextVisible,setCompareTextVisible] = useState(`${getCompareText(props.data)}`);
  const [compareButtonVisible, setCompareButtonVisible] = useState({display: 'none'});
  const [bookmarkVisible,setBookmarkVisible] = useState(`${getSavedBookmarks(props.data)}`)
  const [addToCompareButtonState, setAddToCompareButtonState] = useState({...States.addToCompareButtonState.DEFAULT});
  const [courseNameTooltip, setCourseNameTooltip] = useState(false)
  
  const [isCardOpen,setIsCardOpen] = useState(false)

  useEffect(() => {
    setMounted(true);
   }, []);

const onAddToCompare=(item)=>{
 let compareArray = [];
 let compareItem = JSON.parse(localStorage.getItem(compareKey)) 
 if(compareItem && compareItem.length > 0){
  compareArray.push(...compareItem)
 }
 compareArray.push(item.id)
 localStorage.setItem(compareKey,JSON.stringify(compareArray));
}




const _addToCompare=(item)=>{
  if(addToCompareButtonState.id === States.addToCompareButtonState.DEFAULT.id){
    setAddToCompareButtonState({...States.addToCompareButtonState.APPLIED});
    onAddToCompare(item);
    setCompareTextVisible("Go To Compare")
}
else {
    setAddToCompareButtonState({...States.addToCompareButtonState.DEFAULT});
    // onRemoveFromCompare(item);
}

return;
}

const _addToBookmark=(item)=>{
  if(bookmarkVisible === true){
    _onremoveToBookmark(item);
    setBookmarkVisible(false)
  }else{
    _onAddToBookmark(item);
    setBookmarkVisible(true)
  }
}

const _onremoveToBookmark=(item)=>{
  let bookmarkArray = [];
  let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
  if(bookmarkItem && bookmarkItem.length > 0){
    bookmarkArray =  bookmarkItem.filter(data => data !== item.id )
  }
  localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
}

const _onAddToBookmark=(item)=>{
  let bookmarkArray = [];
  let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
  if(bookmarkItem && bookmarkItem.length > 0){
    bookmarkArray.push(...bookmarkItem)
  }
  bookmarkArray.push(item.id)
  localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
}

 return(
      <>
      {
        mounted && 
        <div 
        className = {!isCardOpen ? "card-container" : "card-container card-container-open"}
        style={window.innerWidth <= 500 ? {width: "90%"} : !isCardOpen ? null : {padding:0} }
       
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
               <div className='grey-container' onClick={()=>_addToBookmark(props.data)} style={bookmarkVisible === true || bookmarkVisible === "true"  ? {background: "linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)" ,marginRight: 10} : {marginRight: 10}}>
                 <Image src={ bookmarkVisible === true || bookmarkVisible === "true" ? selectedBookmark : props.theme === 'dark' ? bookmarkIconDark : bookmarkIcon  } objectFit="contain" alt='selectedBookmark' height={20} width={20}/>
        </div>
        <div className='grey-container'>
         <span className='count-text'>{props?.data?.up_votes}</span>
          <Image src={ props.theme === 'dark' ? upvoteLogoDark : upvoteLogo} objectFit="cover" alt='upvoteLogo' height={20} width={20} />
     </div>
   
   </div>
   </div>
   <div  className = {!isCardOpen ? "card-image-content" : "card-image-content card-image-content-open"} >
   <Image src={instituteLogo} objectFit="cover"  height={!isCardOpen ? 82 : 60} width={!isCardOpen ? 82 : 60} alt='instituteLogo'/>
   <span className='institute-name'>Xavier School of Management </span>
   </div>
   <div className = {!isCardOpen ? "card-course-content" : "card-course-content open"} >
  
<div className='course-name' onMouseEnter={()=>setCourseNameTooltip(true)} onMouseLeave={()=>setCourseNameTooltip(false)}>
{props?.data?.name.length > 25 ? props?.data?.name.substring(0, 25) + '...' : props?.data?.name} 
</div>
{
 courseNameTooltip && props?.data?.name.length > 25 ?  <div className="course-name-tooltip">
<span className="course-name-tooltiptext">{props?.data?.name}</span>
</div> : null
}

<div style={{display:"flex",flexDirection:"row"}}>
{
  props?.data?.class_mode.map((item,index)=>{
  return (
    <h2 className='course-mode' key={index}>
       { index > 0 ? ", "+ item : item}
    </h2>
 )
  })
}
</div>

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
<div className='course-compare-buttton' onClick={()=>_addToCompare(props?.data)}>
<span className='add-to-compare-text'>
  {compareTextVisible}
</span>
</div>
<div className='course-detail-button'>
<span className='course-detail-text'>
  Details
  </span>
  <Image src={ props.theme === 'dark' ? arrowRightDark : arrowRight} objectFit="contain" alt='arrowRight'/>
</  div>
   </div> : null}




   { window.innerWidth<=500 ? 
   <div className='course-button-content-mobile'>
<div className='course-compare-buttton-mobile' onClick={()=>_addToCompare(props?.data)}>
  <span className='add-to-compare-text-mobile'>
  {compareTextVisible}
  </span>
</div>
<div className='course-detail-button-mobile'>
<span className='course-detail-text-mobile'>
  Details
  </span>
  <Image src={arrowRight} objectFit="contain" height={18} width={18} alt='arrowRight'/>
</div>
   </div> : null}
    </div>
      }
      </>
    )
}