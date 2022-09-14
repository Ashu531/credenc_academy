import React, { useEffect, useRef, useState } from 'react'
import ApiStatus from '../../config/apiStatus';
import States from '../../config/states';
import List from '../../components/list/List';
import Image from "next/image";
import axios from 'axios';
import SearchMobile from '../../components/searchBarMobile/SearchBar'
import { useRouter } from 'next/router'
import constant from '../../config/constant';
import LoginModalContainer from '../../components/loginModal/LoginModalContainer'
import ForgotPasswordModal from '../../components/forgotPasswordModal/ForgotPasswordModal'
import DetailModal from '../../components/detailModal/DetailModal'
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import ApplyNowModal from '../../components/applyNowModal/ApplyNowModal'
const bookmarkKey = 'credenc-marketplace-bookmarks';
const UpvoteKey = 'credenc-edtech-upvote'
const EdtechAuthKey = 'credenc-edtech-authkey';

export default function Bookmarks(props){

    let location = useRouter();
    const bookmarkApiStatus = useRef(new ApiStatus());
    const [courses, setCourses] = useState([]);
    const [upvoteCard, setUpvoteCard] = useState('')
    const [bookmarkCard, setBookmarkCard] = useState('')
    const [token, setToken] = useState('')
    const [detailModal, setDetailModal] = useState(false);
    const [detailData,setDetailData] = useState({});
    const [applyNow, setApplyNow] = useState(false)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const getBookmarkedCourses = async (authToken) => {
        bookmarkApiStatus.current.makeApiCall();


        let storedBookmarks = localStorage.getItem(bookmarkKey) 
        let bookmark = [];
        if(storedBookmarks && storedBookmarks.length > 0){
          bookmark = JSON.parse(storedBookmarks)
         }
       
        const getIds = () => {
          return bookmark.map(id => `id=${id}`).join('&');
        }

        if (!authToken) {

          const res = await axios.get(`${constant.API_URL.DEV}/bookmark/list/?${getIds()}`)
            .then(res => {
              bookmarkApiStatus.current.success();
              console.log(res.data)
              setCourses(res.data);
              return res;
            })
            .catch(err => {
              bookmarkApiStatus.current.failed();
              console.log(err);
            });
          
            return res ? res : [];
        } else {
          const res = await axios.get(`${constant.API_URL.DEV}/bookmark/list/`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          })
            .then(res => {
              bookmarkApiStatus.current.success();
              setCourses(res.data);
              return res;
            })
            .catch(err => {
              bookmarkApiStatus.current.failed();
              console.log(err);
            });
          
            return res ? res : [];
        }
      }

      const addBookmarkToLocalStorage = (bookmarks) => {
        localStorage.setItem(bookmarkKey, bookmarks);
      }

    const removeBookmarkFromBackend = async (id) => {
        let res = await axios.post(`${constant.API_URL.DEV}/bookmark/remove/`, {
          "id": `${id}`,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(res => res.data)
        .catch(err => {
            console.log(err);    
            // dispatchAddBookmark(id, bookmarks);
        })
        return res;
      }


      useEffect( () => {
        let authToken = localStorage.getItem(EdtechAuthKey);
        setToken(authToken)
        bookmarkApiStatus.current.start();
        getBookmarkedCourses(authToken);
        
      }, []);

      const _addToUpvote=(item)=>{

        if(token && token.length > 0){
          let upvoteArray = localStorage.getItem(UpvoteKey) ? localStorage.getItem(UpvoteKey) : []
          
          let upvoteAvailable = false;
          if(upvoteArray && upvoteArray.length > 0){
            let upvote = JSON.parse(upvoteArray) 
            upvote.forEach(data=>{
              if(data === item.id){
                upvoteAvailable= true
                return 0;
              }
          })
    
          if(upvoteAvailable === true){
            _onRemoveToUpvote(item);
            }else{
            _onAddToUpvote(item);
           }
          
          }
    
          else{
            _onAddToUpvote(item);
          }
        
       }
        else{
          props?.openLoginModal()
        }
      }

      const _onAddToUpvote=(item)=>{
        setUpvoteCard('1')
        let upvoteArray = [];
        let upvoteItem = JSON.parse(localStorage.getItem(UpvoteKey)) 
        if(upvoteItem && upvoteItem.length > 0){
          upvoteArray.push(...upvoteItem)
        }
        upvoteArray.push(item.id)
        localStorage.setItem(UpvoteKey,JSON.stringify(upvoteArray));
        upvote(item)
      }
    
      const _onRemoveToUpvote=(item)=>{
        setUpvoteCard('0')
        let upvoteArray = [];
        let upvoteItem = JSON.parse(localStorage.getItem(UpvoteKey)) 
        if(upvoteItem && upvoteItem.length > 0){
          upvoteArray =  upvoteItem.filter(data => data !== item.id )
        }
        localStorage.setItem(UpvoteKey,JSON.stringify(upvoteArray));
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
          // Mixpanel.track(MixpanelStrings.COURSE_UPVOTE_REMOVED, {triggered_from: 'Course Card', ...item})
          return res;
      })
      .catch(err => {
          // setUpvoteButtonState({...States.upvoteButtonState.UPVOTED});
          // setUpvotes(item['up_votes'] || 0);
          console.log(err);
      })
    }

    const _addToBookmark=(item)=>{
      let bookmark = JSON.parse(localStorage.getItem(bookmarkKey)) 
      let bookmarkAvailable = false;
      if(bookmark && bookmark.length > 0){
        bookmark.forEach(data=>{
          if(data === item.id){
            bookmarkAvailable= true
            return 0;
          }
       })
       if(bookmarkAvailable === true){
        _onremoveToBookmark(item);
       }else{
        _onAddToBookmark(item);
       }
       
      }
      else{
        _onAddToBookmark(item);
      }
    }
    
    const _onremoveToBookmark=(item)=>{
      setBookmarkCard('0')
      let bookmarkArray = [];
      let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
      if(bookmarkItem && bookmarkItem.length > 0){
        bookmarkArray =  bookmarkItem.filter(data => data !== item.id )
      }
      localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
    }
    
    const _onAddToBookmark=(item)=>{
      setBookmarkCard('1')
      let bookmarkArray = [];
      let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
      if(bookmarkItem && bookmarkItem.length > 0){
        bookmarkArray.push(...bookmarkItem)
      }
      bookmarkArray.push(item.id)
      localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
    }

    const openDetailModal = (data)=>{
      setDetailModal(!detailModal);
      setDetailData(data);
    }


  const _openApplyNowModal=(data)=>{
    setApplyNow(true)
    setDetailData(data)
  }

  const _closeApplyNowModal=()=>{
    setApplyNow(false)
  }

    return(
      <> 
      {
        mounted && 
        <div className='bookmark-container'>
            <div className='bookmark-content'>
              {
                window.innerWidth < 500 ?
                <div className='bookmark-header-mobile'>
                  <span className='bookmark-header-mobile' style={{paddingLeft: 20}}>
                        Showing all bookmarked courses
                    </span>
                </div>
                  : 
                  <div className='bookmark-header-web'>
                    <span className='bookmark-header' style={{paddingLeft: 30}}>
                        Bookmarks
                    </span>
                    <span className='bookmark-header' style={{paddingRight: 30}}>
                        Showing all bookmarked courses
                    </span>
                </div>
              }
                
                <div className='card-list-content' style={ window.innerWidth < 500 ? {marginTop: '6rem',gap: 10,paddingBottom: '8rem'} : {gap: 10}}>
                  <List
                      type={States.listTypes.BOOKMARK_CARDS}
                      list={courses}
                      // onItemClick={navigateToDetailPage}
                      listApiStatus={bookmarkApiStatus}
                      addToBookmark={(item)=>_addToBookmark(item)}
                      addToUpvote={(item)=>_addToUpvote(item)}
                      openDetailModal={(item)=>openDetailModal(item)} 
                      openApplyNowModal={(item)=> _openApplyNowModal(item)}
                      bookmarkCard={bookmarkCard}
                      // handleSignInClick={handleSignInClick}
                  />
                </div>
            </div>
            <SlidingPanel
              type={'right'}
              isOpen={detailModal}
              backdropClicked={() => setDetailModal(false)}
              size={30}
            >
              <DetailModal 
                detailData={detailData} 
                addToBookmark={()=>_addToBookmark(detailData)}
                addToUpvote={()=>_addToUpvote(detailData)}
                openDetailModal={()=>openDetailModal()}
                token={props?.token}
                theme={props.theme}
              />
            </SlidingPanel>
            <SlidingPanel
              type={'right'}
              isOpen={applyNow}
              backdropClicked={() => setApplyNow(false)}
              size={30}
            >
              <ApplyNowModal detailData={detailData} closeApplyNowModal={()=>_closeApplyNowModal()} />
            </SlidingPanel>
            {
              props?.loginModal ? 
              <div style={{width: '100%',height: '100%'}}>
              <LoginModalContainer
              closeLoginModal={()=>props?.closeLoginModal()}
              openForgotPasswordModal={()=>props?.openForgotPasswordModal()}
              forgotPasswordModal={props?.forgotPasswordModal}
              theme={props?.theme}
              handleLogin={()=>props?.handleLogin()}
              /> 
              </div>
              : null
            }
            {
              props?.forgotPasswordModal ? 
              <ForgotPasswordModal
              handleForgotPasswordEnd={()=>props?.handleForgotPasswordEnd()}
              />
              : null
            }    
        </div>
      }
      </>
    )
}