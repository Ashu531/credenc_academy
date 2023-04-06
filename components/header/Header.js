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
// import { Select} from 'antd';
import axios from "axios";
import constant from '../../config/constant'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
const EdtechToken = 'credenc-edtech-authkey';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  menuPaper: {
    maxHeight: '30% !important',
  }
}));

export default function Header(props){

  const classes = useStyles();

  let router = useRouter();
  let nextURL=location?.asPath?.substring(2,location?.asPath?.length)
  let urlService = useRef(new UrlService(nextURL));

  const [token,setToken] = useState('')
  const [subjectList,setSubjectList] = useState([])

  useEffect(()=>{
    _getAuthKey() 
  },[localStorage.getItem(EdtechToken),props?.bookmarkCount])

  useEffect(()=>{
    _getSubjectData()
  },[])

  const _getAuthKey=()=>{
    let authKey = localStorage.getItem(EdtechToken);
    setToken(authKey)
  }

  const _getSubjectData=async()=>{
    let res = await axios.get(`${constant.API_URL.DEV}/subsubject/search/`, {
      headers: {
        'key': 'credenc'
      }
    })
    .then(res => {
      setSubjectList(res?.data?.data);
      res.data
    })
    .catch(err => {
        console.log(err);
    })
    return res;
  }

  const handleChange=(e)=>{
      let value = e.target.value
      props?.openFilterExpandedStage()
      props?.handleSubjectTab(value)
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
      if(router.pathname === '/profile'){
        router.push({
          pathname: '/'
        })
      }else{
        router.reload();
      }
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
    if(e?.course_id){
      router.push({
        pathname: '/details',
        query: { course_id: e?.course_id },
      })
    }
    // else if(e.length === 0){
    //   props?.closeFilterExpandedStage()
    //   props?.hideSearchBar()
    //   }

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
    if(token && token.length > 0){
      router.push({
        pathname: `/my-courses`
      })
    }else{
      props.openLoginModal(); 
    }
    
  }
  
    return(
        <div className='navbar-wrapper'>
        
        <div className='navbar'>
         <div  style={{cursor:"pointer",paddingTop: 10,paddingBottom: 5,display:'flex',position:'relative'}} >
            <Image src={credencAcademy} objectFit="contain" alt='credencLogo' onClick={()=>_goToHome()} />
            <FormControl fullWidth style={{
              width: 180,
              marginLeft: 20,
              // background: '#034FE2',
              borderRadius: 8,
            }}>
              <InputLabel style={{
                fontFamily: 'Work Sans',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: 12,
                marginTop: -5,
                // color: '#FFFFFF',
              }}>Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder='Subject'
                label="Subject"
                style={{borderRadius: 8,height: 40}}
                onChange={handleChange}
                MenuProps={{ classes: { paper: classes.menuPaper } }}
              >
                {
                  subjectList && subjectList.length > 0 && subjectList.map((item,index)=>{
                    return(
                      <MenuItem value={item.value} key={index}>{item.value}</MenuItem>
                    )
                  })
                }
                
              </Select>
            </FormControl>
            </div>
            
          {
            props?.showSearchBar && router.asPath !== '/privacy/' && router.asPath !== '/my-courses/' && router.asPath !== '/bookmarks/' && router.pathname !== '/details' ?
              <div style={props?.showSearchBar ? {width : '25%',zIndex: 99999,marginRight: 30} : null} >
                <SearchBar showSearchBar={props?.showSearchBar} search={props?.searchValue} handleSearch={(e)=>_handleSearch(e)} selectSearch={(e)=>props?.selectSearch(e)} openFilterExpandedStage={()=>props?.openFilterExpandedStage()} />
              </div> 
          : null
          }
        
         <div className='user-elements'>
           <div className='header-text' onClick={()=>_openMyCourseTab()}>My Courses</div>
           <div className='icon-element' onClick={()=>_openBookmarkTab()} style={{position:"relative"}}>
           <Image src={ bookmarkIcon} height={22} width={22} objectFit="contain" alt='bookmarkIcon' />
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