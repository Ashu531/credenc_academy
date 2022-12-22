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
import bookmarkIconFilled from '../../assets/images/icons/filledBookmark.svg'
const EdtechToken = 'credenc-edtech-authkey';

export default function Header(props){

  let router = useRouter();
  let nextURL=location?.asPath?.substring(2,location?.asPath?.length)
  let urlService = useRef(new UrlService(nextURL));

  const [token,setToken] = useState('')

  useEffect(()=>{
    _getAuthKey()
  },[localStorage.getItem(EdtechToken),props?.bookmarkCount])

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

    if(item.id === 1){
      // Mixpanel.track(MixpanelStrings.LOGOUT_TRIGGERED);
      props?.logoutUser()
      router.push('/')
      // dispatchLogout();
      // window.location.reload();
      return;
    }
  }
  }

  const navigateToProfilePage=(item)=>{
    router.push({
      pathname: `/profile`,
      state: item
    })
  }

  const _handleSearch=(e)=>{

    if(e.length === 0){
      props?.closeFilterExpandedStage()
      props?.hideSearchBar()
      }
    else {
      props?.openFilterExpandedStage()
    }
    props?.handleSearch(e) 
   
  }

  const _goToHome=()=>{
    props?.closeFilterExpandedStage()
    props?.handleSearch('') 
    props?.hideSearchBar()
    router.replace({
      pathname: '/',
      query: {},
   }).then(() => router.reload())  
  }

  const _openBookmarkTab=()=>{
    router.push({
      pathname: `/bookmarks`
    })
  }

  const _openMyCourseTab=()=>{
    // if(token && token.length > 0){
    //   router.push({
    //     pathname: `/my-courses`
    //   })
    // }else{
    //   props.openLoginModal(); 
    // }
    
  }
  
    return(
        <div className='navbar-wrapper'>
        
        <div className='navbar'>
         <div  style={{cursor:"pointer",paddingTop: 10,paddingBottom: 5}} onClick={()=>_goToHome()}>
            <Image src={credencAcademy} objectFit="cover" alt='credencLogo' />
            </div>
          {
            props?.showSearchBar && router.asPath !== '/privacy/' && router.asPath !== '/my-courses/' && router.asPath !== '/bookmarks/' ?
              <div style={props?.showSearchBar ? {width : '25%',zIndex: 99999,marginLeft: 30} : null} >
                <SearchBar showSearchBar={props?.showSearchBar} search={props?.searchValue} handleSearch={(e)=>_handleSearch(e)} />
              </div> 
          : null
          }
        
         <div className='user-elements'>
           <div className='header-text' onClick={()=>_openMyCourseTab()}>My Courses</div>
           <div className='icon-element' onClick={()=>_openBookmarkTab()} style={{position:"relative"}}>
           <Image src={ bookmarkIcon} height={25} width={25} objectFit="cover" alt='bookmarkIcon' />
           {
             props?.bookmarkCount >= 1 ? <span className="bookmark-count-container">
             <span className="bookmark-count">{ props?.bookmarkCount >= 1 ?  props?.bookmarkCount : null}</span>
            </span> : null
           }
           
           </div>
 
           {/* <div onClick={()=>props.toggleTheme()} style={{cursor:"pointer",paddingLeft:10}}>
            <span className='change-theme-text'>Change Theme</span>
          </div> */}
          <div className='profile-item' style={{zIndex: 9999999}}>
          {renderProfile()}
          </div>
         
          </div>
          </div>
      
      </div>
    )
}