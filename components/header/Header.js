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

export default function Header(props) {

  const classes = useStyles();

  let router = useRouter();

  const [token, setToken] = useState('')
  const [subjectList, setSubjectList] = useState([])
  const [mounted,setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    _getAuthKey()
  }, [])

  useEffect(() => {
    _getSubjectData()
  }, [])

  const _getAuthKey = () => {
    let authKey = localStorage.getItem(EdtechToken);
    setToken(authKey)
  }

  const _getSubjectData = async () => {
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

  const handleChange = (e) => {
    let value = e.target.value
    router.push({
      pathname: '/search',
      query: {
        search: value
      }
    },
      undefined,
      {
        shallow: true
      })
    // props?.handleSubjectTab(value)
  }

  const renderProfile = () => {
    if (token && token.length > 0) {
      return (
        // <img src={profileIcon} style={{width: '3.2rem', height: '3.2rem'}}/>
        <SecondaryDropdown
          heading='Profile'
          icon={profileIcon}
          onSelect={(item, i) => handleProfileDropdownItemSelect(item, i)}
          classes={{ wrapper: 'position-left', content: 'content-sort' }}
          dropList={Lists.ProfileDropList}
          activeState={false}
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
        />
      );
    }
  }

  const handleProfileDropdownItemSelect = (item, i) => {
    if (window !== undefined) {


      if (item.id === 0) {
        // Mixpanel.track(MixpanelStrings.PROFILE_SETTINGS_TRIGGERED);
        navigateToProfilePage('edit');
        return;
      }

      if (item.id === 1) {
        // Mixpanel.track(MixpanelStrings.LOGOUT_TRIGGERED);
        props?.logoutUser()
        if (router.pathname === '/profile') {
          router.push({
            pathname: '/'
          })
        } else {
          router.reload();
        }
        return;
      }
    }
  }

  const navigateToProfilePage = (item) => {
    router.push({
      pathname: `/profile`,
      state: item
    })
  }

  const _handleSearch = (e) => {
    if (e?.course_id) {
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

  const _goToHome = () => {
    props?.closeFilterExpandedStage()
    props?.handleSearch('')
    props?.hideSearchBar()
    router.replace({
      pathname: '/',
      query: {},
    }).then(() => router.reload())
  }

  const _openBookmarkTab = () => {
    router.push({
      pathname: `/bookmarks`
    })
  }

  const _openMyCourseTab = () => {
    if (token && token.length > 0) {
      router.push({
        pathname: `/my-courses`
      })
    } else {
      props.openLoginModal();
    }

  }

  return (
    <>
    {mounted && 
    <div className='navbar-wrapper' style={ router.pathname === '/search' && window.innerWidth <= 500 ?  {display: 'none',visibility:'hidden'} : {}}> 
      <div className='navbar'>
        <Image src={credencAcademy} objectFit="contain" alt='credencLogo' onClick={() => _goToHome()} />
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
            style={{ borderRadius: 8, height: 40 }}
            onChange={handleChange}
            MenuProps={{ classes: { paper: classes.menuPaper } }}
          >
            {
              subjectList && subjectList.length > 0 && subjectList.map((item, index) => {
                return (
                  <MenuItem value={item.value} key={index}>{item.value}</MenuItem>
                )
              })
            }

          </Select>
        </FormControl>

        {
          (router?.pathname === '/search') || props?.showSearchBar ?
            <div className='hideOnMobile centerAlign' style={(router?.pathname === '/search') || (props?.showSearchBar) ? { width: '25%', zIndex: 99999, marginRight: 30 } : null} >
              <SearchBar
                showSearchBar={props?.showSearchBar}
                search={props?.searchValue}
                handleSearch={(e) => _handleSearch(e)}
                handleSearchQuery={() => props?.handleSearchQuery()}
                selectSearch={(e) => props?.selectSearch(e)}
                openFilterExpandedStage={() => props?.openFilterExpandedStage()}
              />
            </div>
            : null
        }

        <div className='header-text hideOnMobile alignRight' onClick={() => _openMyCourseTab()}>My Courses</div>
        <div className='icon-element hideOnMobile' onClick={() => _openBookmarkTab()}>
          <Image src={bookmarkIcon} height={22} width={22} objectFit="contain" alt='bookmarkIcon' />
          {
            props?.bookmarkCount >= 1 ? <span className="bookmark-count-container">
              <span className="bookmark-count">{props?.bookmarkCount >= 1 ? props?.bookmarkCount : null}</span>
            </span> : null
          }

        </div>

        {/* <div onClick={()=>props.toggleTheme()} style={{cursor:"pointer",paddingLeft:10}}>
            <span className='change-theme-text'>Change Theme</span>
          </div> */}
        <div className='profile-item hideOnMobile' style={{ zIndex: 9999999 }}>
          {renderProfile()}
        </div>

      </div>

    </div>
    }
    </>
  )
}