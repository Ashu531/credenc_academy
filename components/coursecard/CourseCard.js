import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import courseLogo from '../../assets/images/logo/courseLogo.svg';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg'
import instituteLogo from '../../assets/images/logo/instituteLogo.svg'



export default function CourseCard(){
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
}, []);
  
    return(
      <>
      {
        mounted && 
        <div className='card-container' style={window.innerWidth <= 500 ? {width: "90%"} : null} >
        <div className='card-header'>
          <Image src={courseLogo} objectFit="cover"/>
             <div className='card-header-end-content'>
               <div className='grey-container' style={{marginRight: 10}}>
                 <Image src={bookmarkIcon} objectFit="cover"/>
        </div>
        <div className='grey-container'>
         <span className='count-text'>3.6k</span>
          <Image src={bookmarkIcon} objectFit="cover"/>
     </div>
   
   </div>
   </div>
   <div className='card-image-content'>
   <Image src={instituteLogo} objectFit="cover"/>
   <span className='institute-name'>Xavier School of Management </span>
   </div>
   <div className='card-course-content'>
<h1 className='course-name'>
Product design form scratch with to mentors
</h1>
<h2 className='course-mode'>
Online live
</h2>
<h2 className='course-duration'>
6 Month
</h2>
<span className='course-price-content'>
<span className='course-pay'>Pay Upfront</span>
<span className='course-price'>₹499</span>
</span>
   </div>
   { window.innerWidth<=500 ? <div className='course-button-content'>
<div className='course-compare-buttton'>
  <span className='add-to-compare-text'>
  Add to compare
  </span>
</div>
<div className='course-detail-button'>
<span className='course-detail-text'>
  Details
  </span>
  <Image src={bookmarkIcon} objectFit="contain" />
</div>
   </div> : null}
    </div>
      }
      </>
    )
}