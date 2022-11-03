import React, { useEffect, useRef, useState } from 'react';

import credencLogo from '../../assets/images/icons/credenc-logo.svg';
// import compareIcon from '../../../assets/compare-icon-white.svg';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg';
import profileIcon from '../../assets/images/icons/profile-icon.svg';
import backIcon from '../../assets/images/icons/back-arrow-icon.svg';

import Button from '../../button/Button';
import States from '../../config/states';
import SecondaryDropdown from '../../components/primaryDropdown/SecondaryDropdown';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Lists from '../../../values/lists';
import axios from 'axios';
import ApiStatus from '../../../values/ApiStatus';
import UrlService from '../../services/urlService';
import { Mixpanel } from '../../services/Mixpanel';
import MixpanelStrings from '../../../values/mixpanelStrings';
import { getLinkedinCode } from '../../services/getLinkedinCode';

export default function PrimaryNavbar({
  tokens,
  bookmarks,
  compares,
  dispatchLogout,
  handleSignInClick,
  dispatchAddBookmark,
}) {

  let location = useLocation();

  let navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);

  const handleSubjectDropdown = (item, i) => {
    Mixpanel.track(`"${subjects[i]['name']}" ${MixpanelStrings.SUBJECT_DROPDOWN_CLICK}`)
    setSelectedItem(i);
    navigateToCoursePage(item, i);
  }

  const navigateToCoursePage = (item, i) => {
    if(i === 0){
      navigate(`/courses/?`, {state: item['name']});
    } else {
      navigate(`/courses/?subject=${item['name']}`, {state: item['name']});
    }
    navigate(0);
  }

  const navigateToProfilePage = (endPoint) => {
    navigate(`/profile/${endPoint}`);
  }

  const handleProfileDropdownItemSelect = (item, i) => {
    if(item.id === 0){
      Mixpanel.track(MixpanelStrings.PROFILE_SETTINGS_TRIGGERED);
      navigateToProfilePage('edit');
      return;
    }

    if(item.id === 1){
      Mixpanel.track("Invite selected in profile dropdown!");
      navigateToProfilePage('invite');
      return;
    }

    if(item.id === 2){
      Mixpanel.track(MixpanelStrings.PRIVACY_POLICY_TRIGGERED);
      try {
        window.open(`${SKILLRUSH_URL}privacy`, '_blank');
      } catch (err) {
        console.log(err, "PRIVACY ERROR")
      }
      return;
    }

    if(item.id === 3){
      Mixpanel.track(MixpanelStrings.MY_REVIEWS_TRIGGERED);
      navigateToProfilePage('reviews');
      return;
    }

    if(item.id === 4){
      Mixpanel.track(MixpanelStrings.MY_UPVOTES_TRIGGERED);
      navigateToProfilePage('upvotes');
      return;
    }

    if(item.id === 5){
      Mixpanel.track(MixpanelStrings.LOGOUT_TRIGGERED);
      dispatchLogout();
      window.location.reload();
      return;
    }

  }

  const renderProfile = () => {
    // return (
    //   // <img src={profileIcon} style={{width: '3.2rem', height: '3.2rem'}}/>
    //   <SecondaryDropdown
    //       heading='Profile'
    //       onSelect={(item, i) => handleProfileDropdownItemSelect(item, i)}
    //       classes={{wrapper: 'position-left', content: 'content-sort'}}
    //       dropList={Lists.ProfileDropList}
    //   />
    // );
    if(tokens['accessToken']){
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
          onClick={() => {handleSignInClick(); Mixpanel.track(MixpanelStrings.NAV_SIGNIN_BUTTON_CLICK)}}
          text='Sign In'
          classes='btn-tertiary'
        />
      );
    }
  }

  const getSubjects = async () => {
    let res = axios.get(`${API_URL}/subject/search/`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err);
    });

    return res ? res : [];
  }

  const getCount = (subjects) =>  subjects.reduce((a,b) => ({'count': a.count + b.count})).count;
  
  const handleBack = () => {
    Mixpanel.track(MixpanelStrings.BACK_BUTTON_CLICK)
    navigate(-1)
  };

  // MIXPANEL IDETIFY USER

  const getProfileDetails = async () => {
    return await axios.get(`${API_URL}/profiles/`, {
      headers: {
          'Authorization': `Bearer ${tokens['accessToken']}`
      }
      })
      .then(res => res)
      .catch(err => {
          console.log(err);
      });
  }

  useEffect(async () => {
    if (!!tokens['accessToken']) {
      let res = await getProfileDetails();
      if (!!res?.data) {
        Mixpanel.identify(res?.data?.id);
        Mixpanel.people.set({
          email: res?.data?.email, 
          full_name: res?.data?.full_name
        });
      }
    }
  }, [])

  useEffect(() => {
    if(subjects.length > 0){
      let urlService = new UrlService(location.search);
      subjects.forEach((item, i) => {
        if(urlService.hasValue(item['name'])){
          setSelectedItem(i);
        }
      })
      if(urlService.hasEntry('subject') === false){
        setSelectedItem(0);
      }
    }
  }, [location.search, subjects]);

  useEffect(async () => {
    try{
      const subjects = await getSubjects();
      setSubjects([{'id': -1, 'name': 'All', 'count': `${getCount(subjects.data)}`} , ...subjects.data]);
    } catch(e){}
  }, []); 

  useEffect(async () => {
    // Linked URL Code
    // console.log(location.search, 'pathname <------------')
    // let linkedInCode = getLinkedinCode(location.search);
    // if (!!linkedInCode) {
    //   console.log(linkedInCode, "LinkedIn Code")
    //   let linekdInRes = await axios.post(`${API_URL}/linkedin/`, {
    //     'code': `${linkedInCode}`
    //   })
    //   .then(res => {
    //     console.log(res, "LINKEDIN RESPONSE")
    //     return res.data
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // }

    if (tokens.accessToken === null) return;
    let res = await axios.get(`${API_URL}/batch/bookmark/ids/`, {
      headers: {
        'Authorization' : `Bearer ${tokens.accessToken}`
      }
    })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err);
    });
    if (res.length > 0) {
      dispatchAddBookmark([...res], bookmarks)
    }
  }, [])

  const handlePostMessage = event => {
    if (event.data.type === 'code') {
      const { code } = event.data;
      // getUserCredentials(code);
    }
  };

  const getCodeFromWindowURL = url => {
    const popupWindowURL = new URL(url);
    return popupWindowURL.searchParams.get("code");
  };

  useEffect(() => {
    if (window.location.href.includes('privacy') || window.location.href.includes('disclaimer')) {
      return;
    }
    if (window.opener && window.opener !== window) {
      const code = getCodeFromWindowURL(window.location.href);
      window.opener.postMessage({'type': 'code', 'code': code}, '*')
      window.close();
    }
      window.addEventListener('message', handlePostMessage);


    return () => {
      window.removeEventListener('message', null);
    };
  }, []);

  return (
    <div className='navbar-wrapper'>
      <div className='navbar'>
        {(location.pathname !== '/' && location.pathname !== '/privacy' && location.pathname !== '/disclaimer') && <div className='nav-item back' onClick={handleBack}>
          <img src={backIcon} alt='Back' />
        </div>}
        <Link to='/' className='navbar-brand' onClick={() => Mixpanel.track(MixpanelStrings.HOME_BUTTON_CLICK)}>
          <img src={credencLogo}/>
          {/* <div style={{textDecoration: 'none', color: '#FFFFFF', fontSize: '21px'}}>BETA</div> */}
        </Link>
        <div className='nav-item' style={{margin: '0 auto 0 2rem'}}>
          <SecondaryDropdown
            heading='Subject'
            onSelect={handleSubjectDropdown}
            classes={{content: 'content-sort', wrapper: 'subject'}}
            dropList={subjects}
            selected={selectedItem}
            activeState={location.pathname.includes('courses') ? true : false}
          />
        </div>
        {/* <Link to='compare' className='nav-item'>
          <img src={compareIcon}/>
          {compares.length > 0 && <div className='badge'>{compares.length}</div>}
        </Link> */}
        <Link to='bookmarks' className='nav-item bookmark' onClick={() => Mixpanel.track(MixpanelStrings.NAV_BOOKMARK_CLICKED)}>
          <img src={bookmarkIcon}/>
          {bookmarks.length > 0 && <div className='badge'>{bookmarks.length}</div>}
        </Link>
        <div className='nav-item profile'>
          {renderProfile()}
        </div>
      </div>
    </div>
  )
}
