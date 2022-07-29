import React, { useEffect, useRef, useState } from 'react';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg'
import bookmarkIconDark from '../../assets/images/icons/bookmark-dark.svg'
import projectorIcon from '../../assets/images/icons/projector.svg';
import credencLogo from '../../assets/images/logo/credencLogo.svg'
import Image from "next/image";
import Link from "next/link";

export default function Header(props){

    return(
        <div className='navbar-wrapper'>
        
        <div className='navbar'>
         
          <Link href='/' 
          // onClick={() => Mixpanel.track(MixpanelStrings.HOME_BUTTON_CLICK)}
         >
            <div  style={{cursor:"pointer"}}>
            <Image src={credencLogo} objectFit="cover" alt='credencLogo'/>
            </div>
        
          </Link>
         <div className='user-elements'>
           {/* <Link> */}
         <div 
         className='icon-element' 
         onClick={()=>props.openFilterExpandedStage()}
         >
           <Image src={projectorIcon} objectFit="cover" alt='projectorIcon' />
         </div>
         {/* </Link>  */}
          {/* <Link href='bookmarks' className='nav-item bookmark' onClick={() => Mixpanel.track(MixpanelStrings.NAV_BOOKMARK_CLICKED)}> */}
           <div className='icon-element'>
           <Image src={ props.theme === 'dark' ? bookmarkIconDark : bookmarkIcon} objectFit="cover" alt='bookmarkIcon' />
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