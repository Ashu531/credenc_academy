import React, { useEffect, useRef, useState } from 'react';
import projectorIcon from '../../assets/images/icons/projectorIcon.png';
import bookmarkIcon from '../../assets/images/icons/bookmarkIcon.png'
// import bookmarkIcon from '../../../assets/bookmark-icon-white.svg';
import Button from '../button/Button'

export default function Header(){
  
    return(
        <div className='navbar-wrapper'>
        
        <div className='navbar'>
         
          {/* <Link href='/' className='navbar-brand' onClick={() => Mixpanel.track(MixpanelStrings.HOME_BUTTON_CLICK)}> */}
            <img src={projectorIcon}/>
          {/* </Link> */}
         <div className='user-elements'>
         <div className='icon-element'>
           <img src={projectorIcon}/>
           </div>
          {/* <Link href='bookmarks' className='nav-item bookmark' onClick={() => Mixpanel.track(MixpanelStrings.NAV_BOOKMARK_CLICKED)}> */}
           <div className='icon-element'>
           <img src={bookmarkIcon}/>
           </div>
            
          {/* </Link> */}
          
          <div className='signin-button'>
          <span className='signin-text'>Sign In</span>
          </div>
          </div>
          </div>
      
      </div>
    )
}