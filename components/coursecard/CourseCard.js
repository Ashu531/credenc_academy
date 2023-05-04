import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import axios from "axios";
import bookmarkIcon from '../../assets/images/icons/bookmark.svg'
import arrowRight from '../../assets/images/icons/arrowRight.svg'
import arrowRightDark from '../../assets/images/icons/arrow-right-dark.svg'
import selectedBookmark from '../../assets/images/icons/selectedBookmark.svg'
import defaultPlatform from '../../assets/images/icons/defaultPlatform.svg'
import constant from '../../config/constant';
import { useRouter } from 'next/router'
const bookmarkKey = 'credenc-edtech-bookmarks';
const UpvoteKey = 'credenc-edtech-upvote'

export default function CourseCard(props) {

  let router = useRouter();
  const [courseNameTooltip, setCourseNameTooltip] = useState(false)
  const [bookmarkVisible, setBookmarkVisible] = useState(false)
  const [upvoted, setUpvoted] = useState(null)
  const [toggleUpvote, setToggleUpvote] = useState(null)
  const [courseName, setCourseName] = useState('')

  const myLoader = ({ src, width, quality }) => {
    if (src && src.length > 0) {
      return `${src}?w=${width}&q=${quality || 75}`
    } else {
      return '..'
    }
  }

  useEffect(() => {
    if (props?.token && props?.token?.length > 0) {
      _handleBookmarkData()
    } else {
      _retrieveBookmarks()
    }

    _handleUpvoteData()
    _handleCourseName()
  }, []);

  const _handleCourseName = () => {
    let str = props?.data?.course_name.replace(
      /\p{L}+/gu,
      function (txt) {
        if (props?.data?.course_name.indexOf(txt) !== 0) {
          return txt.toLowerCase();
        }
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    )

    setCourseName(str)
  }


  const _retrieveBookmarks = () => {
    let tempBookmarkData = JSON.parse(localStorage.getItem(bookmarkKey));
    if (tempBookmarkData && tempBookmarkData.length > 0) {
      if (tempBookmarkData.includes(props?.data?.code)) {
        props?.addLocalBookmarks(tempBookmarkData.length)
      }
    }
  }

  const _handleBookmarkData = () => {
    if (props?.data?.bookmarked === true) {
      setBookmarkVisible(true)
    } else {
      setBookmarkVisible(false)
    }
  }

  const _handleCardBookmark = (item) => {
    if (props?.bookmarkCodes?.includes(props?.data.id)) {
      _onremoveToBookmark(item)
    } else {
      _onAddToBookmark(item)
    }
  }

  const _onremoveToBookmark = (item) => {

    setBookmarkVisible(false)

    if (props?.token && props?.token.length > 0) {
      removeBookmarkFromBackend(item.id)
      let bookmarkArray = [];
      let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey))
      if (bookmarkItem && bookmarkItem.length > 0) {
        bookmarkArray = bookmarkItem.filter(data => data !== item.id)
      }
      
      localStorage.setItem(bookmarkKey, JSON.stringify(bookmarkArray));
      props?.removeLocalBookmarks(bookmarkArray.length)

      if (router.pathname === "/bookmarks") {
        setTimeout(() => location.reload(), 100)
      }
    } else {
      let bookmarkArray = [];
      let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey))
      if (bookmarkItem && bookmarkItem.length > 0) {
        bookmarkArray = bookmarkItem.filter(data => data !== item.id)
      }
      
      localStorage.setItem(bookmarkKey, JSON.stringify(bookmarkArray));
      props?.removeLocalBookmarks(bookmarkArray.length)

      if (router.pathname === "/bookmarks") {
        setTimeout(() => location.reload(), 100)
      }
    }

  }

  const _onAddToBookmark = (item) => {
    setBookmarkVisible(true)
    console.log(item)
    if (props?.token && props?.token.length > 0) {
      addBookmarkToBackend(item.id)
      let bookmarkArray = [];
      let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey))
      if (bookmarkItem && bookmarkItem.length > 0) {
        bookmarkArray = [...bookmarkItem]
      }
      bookmarkArray.push(item.id)
      localStorage.setItem(bookmarkKey, JSON.stringify(bookmarkArray));
      props?.addLocalBookmarks(bookmarkArray.length)
    } else {
      let bookmarkArray = [];
      let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey))
      if (bookmarkItem && bookmarkItem.length > 0) {
        bookmarkArray = [...bookmarkItem]
      }
      bookmarkArray.push(item.id)
      localStorage.setItem(bookmarkKey, JSON.stringify(bookmarkArray));
      props?.addLocalBookmarks(bookmarkArray.length)
    }

  }

  const addBookmarkToBackend = async (id) => {
    let res = await axios.post(`${constant.API_URL.DEV}/bookmark/`, {
      "id": [`${id}`],
    }, {
      headers: {
        'Authorization': `Bearer ${props?.token}`
      },
    })
      .then(res => {
        res.data
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
        'Authorization': `Bearer ${props?.token}`
      },
    })
      .then(res => {
        res.data
        if (router.pathname === "/bookmarks") {
          setTimeout(() => location.reload(), 100)
        }
      })
      .catch(err => {
        console.log(err);
        setBookmarkVisible(true)
        // dispatchAddBookmark(id, bookmarks);
      })
    return res;
  }

  const _handleUpvoteData = () => {
    if (props?.data?.upvoted === true) {
      setUpvoted(true)
    } else {
      setUpvoted(false)
    }
  }

  const _handleUpvote = (item) => {
    if (props?.token && props?.token?.length > 0) {
      if (upvoted === true) {
        _onRemoveToUpvote(item)
      } else {
        _onAddToUpvote(item)
      }
    } else {
      props?.openLoginModal()
    }

  }

  const _onAddToUpvote = (item) => {
    setToggleUpvote(true)
    setUpvoted(true)
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
    setUpvoted(false)
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
        'Authorization': `Bearer ${props?.token}`
      },
    })
      .then(res => {
        if (res?.data?.success)
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
        'Authorization': `Bearer ${props?.token}`
      },
    })
      .then(res => {
        if (res?.data?.success)
          // Mixpanel.track(MixpanelStrings.COURSE_UPVOTE_REMOVED, {triggered_from: 'Course Card', ...item})
          return res;
      })
      .catch(err => {
        // setUpvoteButtonState({...States.upvoteButtonState.UPVOTED});
        // setUpvotes(item['up_votes'] || 0);
        console.log(err);
      })
  }

  const _goToDetailPage = (id) => {
    if (props?.detailPage === true) {
      router.replace({
        pathname: `/details/`,
        query: { course_id: id }
      }).then(() => router.reload())
    } else {
      router.push({
        pathname: `/details/`,
        query: { course_id: id }
      })
    }

  }

  // const _handleApplyAction = () => {
  //   let token = localStorage.getItem(EdtechToken)
  //   if (props?.data?.is_mooc === false) {
  //     if (token && token.length > 0) {
  //       if (props?.applied?.id != props?.data?.id) {
  //         props?.openApplyNowModal()
  //       }

  //     } else {
  //       if (!isDesktopOrLaptop && router?.pathname === '/details') {
  //         router.push({
  //           pathname: `/`,
  //         })
  //         props?.openLoginModal()
  //       } else {
  //         props?.openLoginModal()
  //       }

  //     }
  //   }


  // }

  // const _handleTrackItem = () => {
  //   if (props?.data?.is_mooc === false) {
  //     props?.enableTrackStatus()
  //     props?.openDetailModal()
  //   }

  // }

  return (
    <>
      <div className="card-container" >
        <div className='card-header'>
          <Image loader={myLoader} src={props?.data?.platform?.logo ? props?.data?.platform?.logo : defaultPlatform} height={36} width={36} alt='courseLogo' style={{ borderRadius: '50%' }} objectFit="contain" />
          <div className='card-header-end-content'>
            <div className='grey-container'
              onClick={() => _handleCardBookmark(props?.data)}
            >
              <Image src={props?.bookmarkCodes?.includes(props?.data.id) ? selectedBookmark : bookmarkIcon} objectFit="contain" alt='selectedBookmark' height={24} width={24} />
            </div>
            {/* <div 
              className='grey-container' 
              onClick={()=> _handleUpvote(props?.data)}
              style={upvoted ? {background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)'} : null}
              >
                  <span className='count-text' style={upvoted ? {color: '#FFFFFF'} : null}>{toggleUpvote ? props?.data.up_votes + 1 : props?.data.up_votes}</span>
                  <Image src={ upvoted ? upvoteLogoDark : upvoteLogo} objectFit="contain" alt='upvoteLogo' height={20} width={20} />
              </div> */}
          </div>
        </div>
        <div className="card-course-content" onClick={() => _goToDetailPage(props?.data?.id)}>
          <div className='course-name' onMouseEnter={() => setCourseNameTooltip(true)} onMouseLeave={() => setCourseNameTooltip(false)}>
            {props?.data?.course_name && props?.data?.course_name.length > 44 ? props?.data?.course_name.substring(0, 44) + '...' : props?.data?.course_name}
          </div>
          {
            courseNameTooltip && props?.data?.course_name.length > 22 ? <div className="course-name-tooltip">
              <span className="course-name-tooltiptext">{props?.data?.course_name}</span>
            </div> : null
          }
          <div className='course-detail-container'>
            {
              props?.data?.class_modes?.length > 0 && <div className='content-container'>
                <h2 className='course-duration'>
                  {
                    props?.data?.class_modes?.length > 0 ? props?.data?.class_modes.map((item, index) => {
                      return (
                        <>
                          {item}&nbsp;
                        </>
                      )
                    }) : props?.data?.class_modes
                  }
                </h2>
              </div>
            }

            {
              props?.data?.duration === 'Duration Unavailable' ? <div /> :
                <div className='content-container' style={{ marginLeft: 4 }}>
                  <h2 className='course-duration'>
                    {props?.data?.duration}
                  </h2>
                </div>
            }

            {
              props?.data?.start_level?.length > 0 ?
                <div className='content-container' style={{ marginLeft: 4 }}>
                  <h2 className='course-duration'>
                    {props?.data?.start_level}
                  </h2>
                </div> : <div />
            }

          </div>
          <div className='content-description'>
            {props?.data?.one_liner && props?.data?.one_liner.length > 80 ? props?.data?.one_liner.substring(0, 80) + '...' : props?.data?.one_liner}
          </div>
        </div>

        <div className='course-button-content'>
          <div className='price-card-content'>
            {
              props?.data?.price_list?.length > 0 ?
                <div className='price-label'>
                  {props?.data?.price_list[0]}
                </div>
                :
                <div className='price-label'>
                  Price Model
                </div>
            }

            {
              props?.data?.final_pricing && props?.data?.final_pricing.length > 0 ?
                <div className='price-amount'>
                  {props?.data?.final_pricing?.length > 0 ? `₹${props?.data?.final_pricing}*` : 'Free'}
                </div> :
                <div className='price-amount'>
                  {props?.data?.finance_display[0].length > 0 ? `${props?.data?.finance_display[0]}` : 'Free'}
                </div>
            }

          </div>
          <div className='course-detail-button' onClick={() => props?.openDetailModal()} style={{ flexDirection: 'row' }}>
            <span className='course-detail-text'>
              Quick View
            </span>
            <Image src={props.theme === 'dark' ? arrowRightDark : arrowRight} objectFit="contain" alt='arrowRight' />
          </div>
        </div>

      </div>
    </>
  )
}