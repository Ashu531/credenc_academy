import React, { useEffect, useRef, useState } from 'react';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg'
import bookmarkIconDark from '../../assets/images/icons/bookmark-dark.svg'
import projectorIcon from '../../assets/images/icons/projector.svg';
import credencLogo from '../../assets/images/logo/credencLogo.svg'
import credencLogoLight from '../../assets/images/icons/credenc-logo.svg'
import Image from "next/image";
import Link from "next/link";
import SecondaryDropdown from '../primaryDropdown/SecondaryDropdown';
import Button from '../button/Button';
import profileIcon from '../../assets/images/icons/profile-icon.svg';
import Lists from '../../config/list'
import SearchBar from '../searchBar/SearchBar'
import UrlService from "../../helper/urlService";
import { useRouter } from 'next/router'
import credencAcademy from '../../assets/images/icons/credencAcademy.svg'
const EdtechToken = 'credenc-edtech-authkey';

export default function Header(props){

  let location = useRouter();

  const [token,setToken] = useState('')

  useEffect(()=>{
    _getAuthKey()
  },[localStorage.getItem(EdtechToken)])

  const _getAuthKey=()=>{
    let authKey = localStorage.getItem(EdtechToken);
    setToken(authKey)
  }

  const renderProfile=()=>{
    if(token && token.length > 0){
      return (
        // <img src={profileIcon} style={{width: '3.2rem', height: '3.2rem'}}/>
        <SecondaryDropdown
            heading='Profile'
            icon={profileIcon}
            onSelect={(item, i) => handleProfileDropdownItemSelect(item, i)}
            classes={{wrapper: 'position-left', content: 'content-sort'}}
            dropList={Lists.ProfileDropList}
            activeState= {false}
        />
      );
    } else {
      return (
        <Button
          // disabled={true} 
          onClick={() => {
            props.openLoginModal(); 
            // Mixpanel.track(MixpanelStrings.NAV_SIGNIN_BUTTON_CLICK)
          }}
          text='Sign In'
          classes='btn-tertiary'
          theme={props?.theme}
        />
      );
    }
  }

  const handleProfileDropdownItemSelect = (item, i) => {
    if(window !== undefined){

    
    if(item.id === 0){
      // Mixpanel.track(MixpanelStrings.PROFILE_SETTINGS_TRIGGERED);
      navigateToProfilePage('edit');
      return;
    }

    // if(item.id === 2){
    //   // Mixpanel.track(MixpanelStrings.PRIVACY_POLICY_TRIGGERED);
    //   try {
    //     window.open(`/privacy`, '_blank');
    //   } catch (err) {
    //     console.log(err, "PRIVACY ERROR")
    //   }
    //   return;
    // }

    // if(item.id === 3){
    //   // Mixpanel.track(MixpanelStrings.MY_REVIEWS_TRIGGERED);
    //   // navigateToProfilePage('reviews');
    //   return;
    // }

    // if(item.id === 4){
    //   // Mixpanel.track(MixpanelStrings.MY_UPVOTES_TRIGGERED);
    //   // navigateToProfilePage('upvotes');
    //   return;
    // }

    if(item.id === 1){
      // Mixpanel.track(MixpanelStrings.LOGOUT_TRIGGERED);
      props?.logoutUser()
      location.push('/')
      // dispatchLogout();
      // window.location.reload();
      return;
    }
  }
  }

  const navigateToProfilePage=(item)=>{
    location.push({
      pathname: `/profile`,
      state: item
    })
  }

  const _handleSearch=(e)=>{

    if(e.length === 0){
      props?.closeFilterExpandedStage()
      props?.hideSearchBar()
      }
    props?.handleSearch(e) 
   
  }

  const _goToHome=()=>{
    props?.closeFilterExpandedStage()
    props?.handleSearch('') 
  }

    return(
        <div className='navbar-wrapper'>
        
        <div className='navbar'>
         
          <Link 
           href='/' 
           // onClick={() => Mixpanel.track(MixpanelStrings.HOME_BUTTON_CLICK)}
          >
            <div  style={{cursor:"pointer",paddingTop: 10,paddingBottom: 5}} onClick={()=>_goToHome()}>
            <Image src={credencAcademy} objectFit="cover" alt='credencLogo' />
            </div>
        
          </Link>
          {
            props?.showSearchBar && location.asPath !== '/privacy/' ?
              <div style={props?.showSearchBar ? {width : '25%'} : null}>
                <SearchBar showSearchBar={props?.showSearchBar} search={props?.searchValue} handleSearch={(e)=>_handleSearch(e)} />
              </div> 
          : null
          }
        
         <div className='user-elements'>
           {/* <Link> */}
         {/* <div 
         className='icon-element' 
         onClick={()=>props?.toggleFilterExpandedStage()}
         >
           <Image src={projectorIcon} objectFit="cover" alt='projectorIcon' />
         </div> */}
         {/* </Link>  */}
          {/* <Link href='bookmarks' className='nav-item bookmark' onClick={() => Mixpanel.track(MixpanelStrings.NAV_BOOKMARK_CLICKED)}> */}
           {/* <div className='icon-element'>
           <Image src={ props?.theme === 'dark' ? bookmarkIconDark : bookmarkIcon} objectFit="cover" alt='bookmarkIcon' />
           </div> */}
 
           {/* <div onClick={()=>props.toggleTheme()} style={{cursor:"pointer",paddingLeft:10}}>
            <span className='change-theme-text'>Change Theme</span>
          </div> */}
          <div className='profile-item'>
          {renderProfile()}
          </div>
         
          </div>
          </div>
      
      </div>
    )
}