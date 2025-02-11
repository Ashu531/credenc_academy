import React, { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import courseLogo from '../../assets/images/logo/courseLogo.svg';
import axios from "axios";
import constant from '../../config/constant';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg'
import bookmarkIconDark from '../../assets/images/icons/bookmark-dark.svg'
import instituteLogo from '../../assets/images/logo/instituteLogo.svg'
// import upvoteLogo from '../../assets/images/icons/upvote.svg'
import upvoteLogoDark from '../../assets/images/icons/thumbs-up-dark.svg'
import globeIcon from '../../assets/images/icons/globeLightIcon.svg';
import globeIconDark from '../../assets/images/icons/globe.svg';
import certificateIcon from '../../assets/images/icons/certificateIcon.svg';
import onlineIcon from '../../assets/images/icons/onlineIcon.svg';
import chartIcon from '../../assets/images/icons/chartIcon.svg';
import calendarIcon from '../../assets/images/icons/calendarIcon.svg';
import clockIcon from '../../assets/images/icons/clockIcon.svg';
import starIcon from '../../assets/images/icons/greenStarIcon.svg'
import instructorIcon from '../../assets/images/icons/instructorIcon.svg'
import goUpIcon from '../../assets/images/icons/caret-up-grey.svg'
import closeIcon from '../../assets/images/icons/close-icon-grey.svg'
import States from '../../values/states';
import selectedBookmark from '../../assets/images/icons/selectedBookmark.svg'
import profileIcon from '../../assets/images/icons/profile-icon.svg';
import moment from 'moment';
import defaultEducator from '../../assets/images/icons/defaultEducator.svg'
import defaultPlatform from '../../assets/images/icons/defaultPlatform.svg'
import DotLoader from "react-spinners/DotLoader";
import LinkedlnLogo from '../../assets/images/icons/linkedin-icon.svg';
import approvedIcon from '../../assets/images/icons/approvedIcon.svg'
import stopWatchIcon from '../../assets/images/icons/stopWatchIcon.svg'
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
const EdtechTheme = 'EdtechTheme';
const bookmarkKey = 'credenc-edtech-bookmarks';
const UpvoteKey = 'credenc-edtech-upvote'
const EdtechPartnerKey = 'credenc-edtech-partner-key';
const EdtechToken = 'credenc-edtech-authkey';

const spinnerCSS = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const spinnerContainer = {
  position: 'absolute',
  top: '50%',
  right: '45%'
}


export default function DetailModal(props) {

  const [mounted, setMounted] = useState(false);
  const [detailFooter, setFooterModal] = useState(false);
  const [bookmarkVisible, setBookmarkVisible] = useState(false)
  const [upvoteVisible, setUpvoteVisible] = useState(false)
  const [theme, setTheme] = useState('')
  const [courseData, setCourseData] = useState({})
  const [toggleUpvote, setToggleUpvote] = useState(null)
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [instructorContent, setIntructorContent] = useState({
    show: false,
    data: {}
  })
  const [leftCardAlign, setLeftAlign] = useState(false);
  const [thirdPartyUser, setThirdPartyUser] = useState(false);
  let [loading, setLoading] = useState(true);
  const [courseName, setCourseName] = useState('');
  const [token, setToken] = useState('')
  const [seeMore, setSeeMore] = useState(false)
  const modalRef = useRef();
  const cardRef = useRef();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });

  const myLoader = ({ src, width, quality }) => {
    if (src && src.length > 0) {
      return `${src}?w=${width}&q=${quality || 75}`
    } else {
      return '..'
    }
  }

  useEffect(() => {
    _retrievePartnerKey()

  }, [])



  const _retrievePartnerKey = () => {

    let partnerKey = JSON.parse(localStorage.getItem(EdtechPartnerKey));
    if (partnerKey && partnerKey.length > 0) {
      setThirdPartyUser(partnerKey)
    }

    const localToken = localStorage.getItem(EdtechToken)
    if (localToken && localToken.length > 0) {
      setToken(localToken)
    }
    _handlePreviewData(props?.detailData, localToken)
    setMounted(true);

  }

  useEffect(() => {
    _handlePreviewData(props?.detailData)
  }, [])

  const _handlePreviewData = async (item, token) => {
    if (token && token.length > 0) {
      let res = await axios.get(`${constant.API_URL.DEV}/course/preview/${item?.id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'key': 'credenc'
        },
      })
        .then(res => {
          setCourseData(res.data.data)
          _handleCourseName(res.data.data.course_name)
          getBookmarks(res.data.data)
          getUpvotes(res.data.data)
          setUpvoteCount(res.data.data.up_votes)
          setMounted(true);
          setLoading(false)
        })
        .catch(err => {
          console.log(err);
          // dispatchRemoveBookmark(id, bookmarks);
        })
    } else {
      let res = await axios.get(`${constant.API_URL.DEV}/course/preview/${item?.id}/`, {
        headers: {
          'key': 'credenc'
        },
      })
        .then(res => {
          setCourseData(res.data.data)
          _handleCourseName(res.data.data.course_name)
          getBookmarks(res.data.data)
          getUpvotes(res.data.data)
          setUpvoteCount(res.data.data.up_votes)
          setMounted(true);
          setLoading(false)
        })
        .catch(err => {
          console.log(err);
          // dispatchRemoveBookmark(id, bookmarks);
        })
    }

  }

  const _handleCourseName = (course_name) => {
    let str = course_name.replace(
      /\p{L}+/gu,
      function (txt) {
        if (course_name.indexOf(txt) !== 0) {
          return txt.toLowerCase();
        }
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    )

    setCourseName(str)
  }

  const _retrieveData = (item) => {
    let localTheme = localStorage.getItem(EdtechTheme)
    setTheme(localTheme)
    _retrieveBookmarks(item)
  }

  const _retrieveBookmarks = (item) => {
    let tempBookmarkData = JSON.parse(localStorage.getItem(bookmarkKey));
    if (tempBookmarkData && tempBookmarkData.length > 0) {
      if (tempBookmarkData.includes(item?.code))
        setBookmarkVisible(true)

      else
        setBookmarkVisible(false)
    }
  }

  const toggleModal = () => {
    setFooterModal(!detailFooter);
  }

  const getUpvotes = (item) => {

    if (item?.upvoted === true) {
      setUpvoteVisible(true)
    } else {
      setUpvoteVisible(false)
    }
  }

  const getBookmarks = (item) => {
    if (token && token?.length > 0) {
      if (item?.bookmarked === true) {
        setBookmarkVisible(true)
      } else {
        setBookmarkVisible(false)
      }
    } else {
      _retrieveData(item)
    }
  }

  const _handleBookmarksTrigger = (item) => {
    if (bookmarkVisible || props?.bookmarkCodes?.includes(props?.detailData.id)) {
      _onremoveToBookmark(item)
    } else {
      _onAddToBookmark(item)
    }
  }

  const _onremoveToBookmark = (item) => {
    setBookmarkVisible(false)

    if (token && token.length > 0) {
      removeBookmarkFromBackend(item.id)
      let bookmarkArray = [];
      let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey))
      if (bookmarkItem && bookmarkItem.length > 0) {
        bookmarkArray = bookmarkItem.filter(data => data !== item.id)
      }
      localStorage.setItem(bookmarkKey, JSON.stringify(bookmarkArray));
      props?.removeLocalBookmarks(bookmarkArray.length)
    } else {
      let bookmarkArray = [];
      let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey))
      if (bookmarkItem && bookmarkItem.length > 0) {
        bookmarkArray = bookmarkItem.filter(data => data !== item.id)
      }
      localStorage.setItem(bookmarkKey, JSON.stringify(bookmarkArray));
      props?.removeLocalBookmarks(bookmarkArray.length)
      props?.handleCardActionTaken()
    }

  }

  const _onAddToBookmark = (item) => {
    setBookmarkVisible(true)

    if (token && token.length > 0) {
      addBookmarkToBackend(item.id)
      let bookmarkArray = [];
      let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey))
      if (bookmarkItem && bookmarkItem.length > 0) {
        bookmarkArray.push(...bookmarkItem)
      }
      bookmarkArray.push(item.id)
      localStorage.setItem(bookmarkKey, JSON.stringify(bookmarkArray));
      props?.addLocalBookmarks(bookmarkArray.length)
    } else {
      let bookmarkArray = [];
      let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey))
      if (bookmarkItem && bookmarkItem.length > 0) {
        bookmarkArray.push(...bookmarkItem)
      }
      bookmarkArray.push(item.id)
      localStorage.setItem(bookmarkKey, JSON.stringify(bookmarkArray));
      props?.addLocalBookmarks(bookmarkArray.length)
      props?.handleCardActionTaken()
    }

  }

  const addBookmarkToBackend = async (id) => {
    let res = await axios.post(`${constant.API_URL.DEV}/bookmark/`, {
      "id": [`${id}`],
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        res.data
        props?.handleCardActionTaken()
      })
      .catch(err => {
        console.log(err);
        setBookmarkVisible(false)

        // dispatchRemoveBookmark(id, bookmarks);
      })
    return res;
  }

  const removeBookmarkFromBackend = async (id) => {
    let res = await axios.post(`${constant.API_URL.DEV}/bookmark/remove/`, {
      "id": `${id}`,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        res.data
        props?.handleCardActionTaken()
      })
      .catch(err => {
        console.log(err);
        setBookmarkVisible(true)

        // dispatchAddBookmark(id, bookmarks);
      })
    return res;
  }

  const _handleUpvoteTrigger = (item) => {
    if (token && token?.length > 0) {
      if (upvoteVisible === true) {
        _onRemoveToUpvote(item)
      } else {
        _onAddToUpvote(item)
      }
    } else {
      props?.closeDetailModal()
      props?.openLoginModal()
    }
  }

  const _onAddToUpvote = (item) => {
    setToggleUpvote(true)
    setUpvoteVisible(true)
    setUpvoteCount(upvoteCount + 1)
    let upvoteArray = [];
    let upvoteItem = JSON.parse(localStorage.getItem(UpvoteKey))
    if (upvoteItem && upvoteItem.length > 0) {
      upvoteArray.push(...upvoteItem)
    }
    upvoteArray.push(item.id)
    localStorage.setItem(UpvoteKey, JSON.stringify(upvoteArray));
    upvote(item)
  }

  const _onRemoveToUpvote = (item) => {
    setToggleUpvote(false)
    setUpvoteVisible(false)
    setUpvoteCount(upvoteCount - 1)
    let upvoteArray = [];
    let upvoteItem = JSON.parse(localStorage.getItem(UpvoteKey))
    if (upvoteItem && upvoteItem.length > 0) {
      upvoteArray = upvoteItem.filter(data => data !== item.id)
    }
    localStorage.setItem(UpvoteKey, JSON.stringify(upvoteArray));
    removeUpvote(item)
  }

  const upvote = async (item) => {

    await axios.post(`${constant.API_URL.DEV}/batch/upvote/add/`, {
      "batch_id": item?.id,
      "is_up_vote": "true"
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        if (res?.data?.success)
          props?.handleCardActionTaken()
        // handleFilteredData(false)
        //  Mixpanel.track(MixpanelStrings.COURSE_UPVOTED, {triggered_from: 'Course Card', ...item})
        return res;
      })
      .catch(err => {
        // setUpvoteButtonState({...States.upvoteButtonState.DEFAULT});
        // setUpvotes(item['up_votes'] || 0);
        console.log(err);
      })
  }

  const removeUpvote = async (item) => {
    await axios.post(`${constant.API_URL.DEV}/batch/upvote/remove/`, {
      "batch_id": item.id,
      "is_up_vote": "false"
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => {
        if (res?.data?.success)
          props?.handleCardActionTaken()
        // Mixpanel.track(MixpanelStrings.COURSE_UPVOTE_REMOVED, {triggered_from: 'Course Card', ...item})
        return res;
      })
      .catch(err => {
        // setUpvoteButtonState({...States.upvoteButtonState.UPVOTED});
        // setUpvotes(item['up_votes'] || 0);
        console.log(err);
      })
  }

  const _handleApplyModal = () => {
    console.log(token)
    if (token && token?.length > 0) {
      if (isDesktopOrLaptop) {
        props?.openApplyNowModal()
      } else {
        props?.toggleDetailModal()
        props?.openApplyNowModal()
      }

    } else {
      if (isDesktopOrLaptop) {
        props?.openLoginModal()
      } else {
        props?.toggleDetailModal()
        props?.openLoginModal()
      }

    }

  }

  const _handleIntructorHover = (data) => {
    setIntructorContent({
      show: true,
      data: data
    })
    // getCardAlignment()
  }

  const _handleIntructorHoverHide = () => {
    setIntructorContent({
      show: true,
      data: {}
    })
  }

  const getCardAlignment = () => {
    if (cardRef && cardRef.current !== null) {
      if (cardRef?.current?.getBoundingClientRect().left > modalRef?.current?.getBoundingClientRect().width / 3) {
        setLeftAlign(true)
      }
      else {
        setLeftAlign(false)
      }
    }
  }

  useEffect(() => {
    setCourseData({ ...props?.detailData })
  }, [props?.detailData])

  const _toggleSeeMore=()=>{
    setSeeMore(!seeMore)
  }

  return (
    <>
      {
        mounted && !loading ?
          <div className='detail-modal-container' style={window.innerWidth <= 500 ? { width: '100%' } : null} ref={modalRef}>

            <div className='detail-modal-content'>
              <div style={{ display: "flex", flexDirection: 'row', width: '100%' }}>
                <div className='detail-modal-header'>
                  <div className='header-school-content'>
                    <Image
                      loader={myLoader}
                      src={courseData?.educator[0]?.logo && courseData?.educator[0]?.logo.length > 0 ? courseData?.educator[0]?.logo : defaultEducator}
                      height={40}
                      width={40}
                      objectFit="contain"
                      style={{ borderRadius: '50%' }}
                    />
                    <div className='school-content'>
                      <span className='heading1'>{courseData?.educator && courseData?.educator.length > 0 ? courseData?.educator[0].name : courseData?.platform?.name}</span>
                      <span className='heading2'>Course educator</span>
                    </div>
                  </div>
                  <div className='header-action-content'>
                    <div className='header-action-container'
                      onClick={() => _handleBookmarksTrigger(courseData)}
                      style={{ cursor: "pointer" }}
                    >
                      <Image src={bookmarkVisible || props?.bookmarkCodes?.includes(props?.detailData.id) ? selectedBookmark : theme === 'dark' ? bookmarkIconDark : bookmarkIcon}
                        objectFit="contain"
                        width={!isDesktopOrLaptop ? 25 : 24}
                        height={!isDesktopOrLaptop ? 25 : 24}
                      />
                    </div>
                    {/* <div 
                    className='header-action-container' 
                    style={upvoteVisible ? {marginLeft:8,background : 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)'} : {marginLeft:8}}  
                    onClick={()=> _handleUpvoteTrigger(courseData) }
                    >
                        <div className='upvote-container'>
                            <span className='upvote-text' style={ upvoteVisible ? !isDesktopOrLaptop ?  {marginTop:1,color: '#FFFFFF'} : {color: '#FFFFFF'} : null} >
                            {upvoteCount}
                            </span>
                            <Image 
                                src={upvoteVisible ? upvoteLogoDark : upvoteLogo}  
                                width={ !isDesktopOrLaptop ? 30 : 18 }
                                height={!isDesktopOrLaptop ? 30 : 18 }
                                objectFit="cover" 
                            />
                        </div>
                    </div> */}
                    <div className='header-action-container' style={{ marginLeft: 8 }}>
                      <a href={courseData?.course_link} target='_blank' rel="noreferrer">
                        <Image
                          src={globeIcon}
                          width={!isDesktopOrLaptop ? 25 : 24}
                          height={!isDesktopOrLaptop ? 25 : 24}
                          objectFit="cover"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div style={{ width: '100%', background: '#FFFFFF', flex: 1 }} />
              </div>

              {
                props?.status === true ?
                  <div className='application-status-content'>
                    <div className='application-status-header'>
                      <div className='application-status-text'>
                        Application Status
                      </div>
                    </div>
                    <div className='application-status-section'>
                      <div className='application-status-stripe'>
                        <div className='application-image-content'>
                          <Image src={approvedIcon} width={20} height={20} objectFit="contain" />
                          <div className='label-text'>
                            Applied
                          </div>
                        </div>
                        <div className='sublabel-text'>
                          {moment(courseData?.applied?.enroll_date).format("MMM Do YY")}
                        </div>
                      </div>
                      {
                        thirdPartyUser === constant.PARTNER_KEY.NJ ?
                          <div className='application-status-stripe'>
                            <div className='application-image-content'>
                              <Image src={stopWatchIcon} width={18} height={18} objectFit="contain" />
                              <div className='label-text'>
                                Loan Processing
                              </div>
                            </div>
                            <div className='sublabel-text' style={{ color: '#138808' }}>
                              In Progress
                            </div>
                          </div> : <div />
                      }


                      <div className='application-status-stripe'>
                        <div className='application-image-content'>
                          <Image src={stopWatchIcon} width={18} height={18} objectFit="contain" />
                          <div className='label-text'>
                            Enrollment
                          </div>
                        </div>
                        {
                          thirdPartyUser === constant.PARTNER_KEY.NJ ?
                            <div className='sublabel-text' style={{ color: '#E12D2B' }}>
                              Pending
                            </div> :
                            <div className='sublabel-text' style={{ color: '#E12D2B' }}>
                              In Progress
                            </div>
                        }

                      </div>
                    </div>
                  </div> :
                  null
              }

              {
                courseData?.next_batch &&
                <div className='detail-modal-banner'
                >
                  {courseData?.enrollment_start_date && courseData?.enrollment_start_date.length > 0 ?
                    <span className='banner-text'>
                      Next batch starts on {moment(courseData?.enrollment_start_date).format("MMM Do YY")}
                    </span> :
                    <span className='banner-text'>
                      Next batch starts on soon
                    </span>
                  }
                </div>
              }


              <div className='detail-modal-middle-section' style={props?.status ? { height: '70%' } : null}>
                <div className='detail-modal-course-content'
                // style={props?.status === true ? null : {marginTop: '6rem'}}
                >
                  <div className='detail-modal-course-container'>
                    <div className='heading1'>
                      {courseName}
                    </div>
                    {
                      !seeMore ? 
                        <div className='heading2'>
                          {courseData?.description?.substring(0,250)+'...'}
                          <span className='see-more' onClick={()=>_toggleSeeMore()}> Show More</span>
                        </div> :
                        <div className='heading2'>
                          {courseData?.description}
                          <span className='see-more' onClick={()=>_toggleSeeMore()}> Show Less</span>
                        </div>
                        
                    }

                  </div>
                  <div className='detail-modal-course-overview'>
                    <Image loader={myLoader} src={courseData?.platform?.logo && courseData?.platform?.logo.length > 0 ? courseData?.platform?.logo : defaultPlatform} height={30} width={30} objectFit="cover" style={{ borderRadius: '50%' }} />
                    <div className='detail-modal-tutor-content'>
                      <span className='header1'>{courseData?.platform?.name}</span>
                      {
                        courseData?.platform?.one_liner && courseData?.platform?.one_liner.length > 0 ?
                          <span className='header2'>{courseData?.platform?.one_liner}</span> :
                          <span className='header2'>Course Platform</span>
                      }

                    </div>
                  </div>
                </div>
                <div className='divider' />
                <div className='detail-modal-course-info'>
                  {courseData?.grid?.map((item, index) => {
                    return (
                      <span key={index} className='content-detail'>
                        <Image src={item.icon} loader={myLoader} width={24} height={24} objectFit="cover" />
                        <span className='content-detail-text'>
                          {item.value}
                        </span>
                      </span>
                    )
                  })}
                </div>
                {
                  courseData?.skills && courseData?.skills.length > 0 ?
                    <div className='skill-container'>
                      <div className='skill-header-content'>
                        <Image src={starIcon} objectFit="cover" />
                        <span className='skill-header'>
                          Top {courseData?.skills?.length} Skills you will learn
                        </span>
                      </div>
                      <div className='skill-details'>
                        {
                          courseData?.skills && courseData?.skills.map((item, index) => {
                            return (
                              <span className='skill-text-content' key={index}>
                                <span className='skill-text'>
                                  {item}
                                </span>
                              </span>
                            )
                          })
                        }

                      </div>
                    </div> : null
                }

                {
                  courseData?.instructor && courseData?.instructor.length > 0 ?
                    <div className='instructor-container'>
                      <div className='instructor-header'>
                        <Image src={instructorIcon} objectFit='cover' />
                        <span className='instructor-text'>Instructors</span>
                      </div>
                      <div className='avatar-container' style={!isDesktopOrLaptop ? { gap: 20, width: '100%', overflow: "auto" } : null}>
                        {
                          courseData?.instructor && courseData?.instructor.map((item, index) => {
                            return (
                              <span key={index} className="avatar-content" >
                                {
                                  isDesktopOrLaptop ?
                                    <div style={{ width: 40, height: 40, position: "relative", cursor: "pointer" }} onMouseEnter={() => _handleIntructorHover(item)} onMouseLeave={() => _handleIntructorHoverHide()} >
                                      <a
                                        href={item?.linkedin_link?.length > 0 ? item?.linkedin_link : ''}
                                        target="_blank" rel="noreferrer"
                                      >
                                        <div style={instructorContent?.show && item?.id === instructorContent?.data?.id ? { width: 45, height: 45, position: 'relative', zIndex: 9, border: '1.5px solid #00CB9C', borderRadius: '50%', transition: 'all 0.07s ease-out' } : { width: 40, height: 40, position: 'relative' }}>
                                          <Image loader={myLoader} src={item?.profile_photo ? item?.profile_photo : profileIcon} layout='fill' alt='avatar' style={{ borderRadius: '50%' }} objectFit='contain' />
                                        </div>
                                      </a>
                                      {
                                        instructorContent?.show && item?.id === instructorContent?.data?.id ?
                                          <a
                                            href={item?.linkedin_link?.length > 0 ? item?.linkedin_link : ''}
                                            target="_blank" rel="noreferrer"
                                          >
                                            <div className='instructor-hover-container' ref={cardRef} style={index > 6 ? { position: 'fixed', right: 0 } : null}>
                                              <div className='instructor-hover-content' style={{ width: '80%' }}>
                                                <span className="instructor-hover-name">{item?.name.length > 22 ? item?.name.substring(0, 22) + '...' : item?.name}</span>
                                                <span className="instructor-hover-designation">{item?.designation}</span>
                                              </div>
                                              <div style={{ width: '10%' }}>
                                                <Image src={LinkedlnLogo} height={40} width={40} objectFit="contain" />
                                              </div>
                                            </div>
                                          </a>
                                          : null
                                      }
                                    </div>

                                    :
                                    <a
                                      href={item?.linkedin_link}
                                      target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                                      <div className="instructor-content">
                                        <div className='instructor-info-container'>
                                          <div className="instructor-info-image">
                                            <Image loader={myLoader} src={item?.profile_photo ? item?.profile_photo : profileIcon} height={57} width={57} alt='avatar' objectFit='cover' style={{ borderRadius: '50%' }} />
                                          </div>
                                          <div className="instructor-image-content">
                                            <span className="instructor-info-name">{item?.name}</span>
                                            <span className="instructor-info-designation">{item?.designation}</span>
                                            {
                                              item?.role_in_course && item?.role_in_course.length > 0 ?
                                                <span className="instructor-info-role">{item?.role_in_course}</span> : null
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                }
                              </span>
                            )
                          })
                        }
                      </div>
                    </div> : null
                }


                <div className='divider' style={{ marginTop: 16, marginBottom: 15 }} />
                <div
                  className='content-footer'>
                  <span className='content-date-text' style={{ paddingLeft: 24 }}>
                    Last updated on: <span style={{ fontWeight: 600 }}>{moment(courseData?.date_modified).format("MMM Do YY")}</span>
                  </span>
                  <span style={{ paddingRight: 24, cursor: "pointer" }} onClick={() => toggleModal()}>
                    <span className='content-disclaimer-text'>
                      Disclaimer
                    </span>
                    <Image src={goUpIcon} objectFit="cover" style={!detailFooter ? { transform: 'rotate(180deg)' } : null} />
                  </span>
                </div>
                {
                  detailFooter ?
                    <div className='disclaimer-footer-content'
                    // style={!isDesktopOrLaptop ? detailFooter ? {marginBottom: '18%'} : null : null}
                    >
                      <span className='footer-text'>
                        The information provided on our Platform is for general information purpose only and such informations are not investigated, monitored, or checked for accuracy, validity, and reliability by us. Your use of the Platform is solely at your own risk and we in no way shall have any liability whatsoever.
                      </span>
                    </div> : null
                }

              </div>
            </div>
            <div
              className='detail-modal-footer'
              style={
                window.innerWidth <= 500
                  ?
                  {
                    width: '100%',
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    background: '#F7F7F7',
                  }
                  : null
              }
            >
              <div className='detail-modal-footer-section-left' style={!isDesktopOrLaptop ? { width: '51%' } : null}>
                {
                  courseData?.final_pricing && courseData?.final_pricing.length > 0 ?
                    <span className='price-text'>
                      {courseData?.final_pricing.length > 0 ? `${courseData?.final_pricing}` : 'Free'}
                    </span>
                    :
                    <span className='price-text'>
                      {courseData?.finance_display[0].length > 0 ? `${courseData?.finance_display[0]}` : 'Free'}
                    </span>
                }

              </div>

              <div className='detail-modal-footer-section-right'
                style={{ width: !isDesktopOrLaptop ? '88%' : '', padding: '0 2.4rem 0 0' }} onClick={() => props?.openQueryModal()}>
                <span className='apply-now-button' style={{ background: 'transparent', border: '1px solid var(--defaultPrimaryColor)' }}>
                  <span className='apply-now-button-text' style={{ color: '#000000' }}>
                    Talk to Us
                  </span>
                </span>
              </div>

              {
                props?.status === true || courseData?.applied === true ?
                  <div /> :

                  courseData?.can_apply !== true ?
                    <a href={courseData?.course_link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className='detail-modal-footer-section-right'
                        style={!isDesktopOrLaptop ? { width: '88%' } : null}>
                        <span className='apply-now-button'>
                          <span className='apply-now-button-text'>
                            Go To Course
                          </span>
                        </span>
                      </div>
                    </a> :

                    <div className='detail-modal-footer-section-right'
                      style={!isDesktopOrLaptop ? { width: '88%' } : null} onClick={() => _handleApplyModal()}>
                      <span className='apply-now-button'>
                        <span className='apply-now-button-text'>
                          Apply Now
                        </span>
                      </span>
                    </div>
              }

            </div>

            <span
              className='detail-modal-close-icon'
              onClick={() => props.closeDetailModal()}
              style={
                !isDesktopOrLaptop ? {
                  position: 'absolute',
                  top: '1.5%',
                  right: '2.5%'
                } : {
                  position: 'absolute',
                  top: '1%',
                  right: '2.5%',
                  cursor: 'pointer'
                }}
            >
              <Image src={closeIcon} objectFit='cover' height={20} width={20} />
            </span>

          </div>
          :
          <div style={spinnerContainer}>
            <DotLoader
              cssOverride={spinnerCSS}
              size={100}
              color={"#000000"}
              loading={loading}
              speedMultiplier={1}
            />
          </div>
      }
    </>
  )
}