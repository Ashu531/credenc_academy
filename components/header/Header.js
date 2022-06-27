import React, { useEffect, useRef, useState } from 'react';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg'
import projectorIcon from '../../assets/images/icons/projector.svg';
import credencLogo from '../../assets/images/logo/credencLogo.svg'
import Image from "next/image";

export default function Header(props){
  console.log(props,"rposp+++")
    return(
        <div className='navbar-wrapper'>
        
        <div className='navbar'>
         
          {/* <Link href='/' className='navbar-brand' onClick={() => Mixpanel.track(MixpanelStrings.HOME_BUTTON_CLICK)}> */}
            <Image src={credencLogo} objectFit="cover"/>
          {/* </Link> */}
         <div className='user-elements'>
         <div className='icon-element'>
           <Image src={projectorIcon} objectFit="cover"/>
           </div>
          {/* <Link href='bookmarks' className='nav-item bookmark' onClick={() => Mixpanel.track(MixpanelStrings.NAV_BOOKMARK_CLICKED)}> */}
           <div className='icon-element'>
           <Image src={bookmarkIcon} objectFit="cover"/>
           </div>
            
          {/* </Link> */}
          
          <div className='signin-button'>
          <span className='signin-text'>Sign In</span>
          </div>
          <div onClick={()=>props.toggleTheme()} style={{cursor:"pointer",paddingLeft:10}}>
            <span>Change Theme</span>
          </div>
          </div>
          </div>
      
      </div>
    )
}