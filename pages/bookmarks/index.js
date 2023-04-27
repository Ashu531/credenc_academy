import React, { useEffect, useRef, useState } from 'react'
import ApiStatus from '../../config/apiStatus';
import States from '../../config/states';
import List from '../../components/list/List';
import Image from "next/image";
import axios from 'axios';
import { useRouter } from 'next/router';
import constant from '../../config/constant';
import LoginModal from '../../components/loginModal/LoginModal'
import ForgotPasswordModal from '../../components/forgotPasswordModal/ForgotPasswordModal'
import DetailModal from '../../components/detailModal/DetailModal'
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import ApplyNowModal from '../../components/applyNowModal/ApplyNowModal'
import Head from 'next/head'
import { useMediaQuery } from 'react-responsive';
const bookmarkKey = 'credenc-edtech-bookmarks';
const UpvoteKey = 'credenc-edtech-upvote'
const EdtechAuthKey = 'credenc-edtech-authkey';

export default function Bookmarks(props){

    let location = useRouter();
    const bookmarkApiStatus = useRef(new ApiStatus());
    const [courses, setCourses] = useState([]);
    const [bookmarkCard, setBookmarkCard] = useState('')
    const [token, setToken] = useState('')
    const [detailModal, setDetailModal] = useState(false);
    const [detailData,setDetailData] = useState({});
    const [applyNow, setApplyNow] = useState(false)
    const [mounted, setMounted] = useState(false);
    const [cardActionTaken,setCardActionTaken] = useState(false)
    const [userEmail,setUserEmail] = useState('')
    const [loginState,setLoginState]=useState(0);

    const isDesktopOrLaptop = useMediaQuery({
      query: "(min-width: 500px)",
    });

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

          const res = await axios.get(`${constant.API_URL.DEV}/bookmark/list/?${getIds()}`,{
            headers: {
              'key': 'credenc'
            }
          })
            .then(res => {
              bookmarkApiStatus.current.success();
              setCourses(res.data.data);
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
              'Authorization': `Bearer ${authToken}`,
              'key': 'credenc'
            }
          })
            .then(res => {
              bookmarkApiStatus.current.success();
              setCourses(res.data.data);
              return res;
            })
            .catch(err => {
              bookmarkApiStatus.current.failed();
              console.log(err);
            });
          
            return res ? res : [];
        }
      }


  useEffect( () => {
        let authToken = localStorage.getItem(EdtechAuthKey);
        setToken(authToken)
        bookmarkApiStatus.current.start();
        getBookmarkedCourses(authToken);
        
      }, []);

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

  const closeDetailModal=()=>{
    setDetailModal(false)
    if(cardActionTaken === true){
      setTimeout(() => location.reload(), 100)
    }
  } 

  const _handleCardActionTaken=()=>{
    setCardActionTaken(true)
  }

  const _setUserEmail=(data)=>{
    setUserEmail(data)
  }

  const _setUserLoginState=(data)=>{
    setLoginState(data)
  }

  const toggleDetailModal=()=>{
    setDetailModal(!detailModal)
  }

    return(
      <> 
      <Head>
        <title>Bookmark Page</title>
      </Head>
      {
        mounted && 
        <div className='bookmark-container'>
            <div className='bookmark-content' style={!isDesktopOrLaptop ? {marginTop: '8rem'} : null}>
              {
                !isDesktopOrLaptop ?
                <div className='bookmark-header-mobile'>
                  <span className='bookmark-header-mobile' style={{paddingLeft: 20}}>
                        Showing all bookmarked courses
                    </span>
                </div>
                  : 
                  <div className='bookmark-header-web'>
                    <span className='bookmark-header' style={{paddingLeft: 60}}>
                        Bookmarks
                    </span>
                    <span className='bookmark-header' style={{paddingRight: 60}}>
                        Showing all bookmarked courses
                    </span>
                </div>
              }
                
                <div className='card-list-content' 
                style={ !isDesktopOrLaptop ? {marginTop: '2rem',gap: 10,padding: '0rem 1.6rem 8rem 1.6rem',display:'block'} : courses && courses.length > 0 ? {gap: 10, position: "absolute", top: '14rem', left: '60px', paddingBottom: '6rem'} : {gap: 10}}
                >
                  <List
                      type={States.listTypes.BOOKMARK_CARDS}
                      list={courses}
                      listApiStatus={bookmarkApiStatus}
                      openDetailModal={(item)=>openDetailModal(item)} 
                      openApplyNowModal={(item)=> _openApplyNowModal(item)}
                      bookmarkCard={bookmarkCard}
                      detailData={detailData} 
                      token={token}
                      openLoginModal={()=>props?.openLoginModal()} 
                      removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                      addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                      bookmarkCodes={props?.bookmarkCodes}
                  />
                </div>
            </div>
            <SlidingPanel
              type={'right'}
              isOpen={detailModal}
              backdropClicked={() => closeDetailModal()}
              size={30}
            >
              <DetailModal 
                detailData={detailData} 
                openDetailModal={()=>openDetailModal()}
                token={token}
                theme={props.theme}
                closeDetailModal={()=>closeDetailModal(detailData)}
                handleCardActionTaken={()=>_handleCardActionTaken()}
                toggleDetailModal={()=>toggleDetailModal()}
                bookmarkCodes={props?.bookmarkCodes}
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
              <LoginModal
              closeLoginModal={()=>props?.closeLoginModal()}
              openForgotPasswordModal={()=>props?.openForgotPasswordModal()}
              forgotPasswordModal={props?.forgotPasswordModal}
              theme={props?.theme}
              handleLogin={()=>props?.handleLogin()}
              setUserEmail={(data)=>_setUserEmail(data)}
              setUserLoginState={(data)=>_setUserLoginState(data)}
              /> 
              </div>
              : null
            }
            {
              props?.forgotPasswordModal ? 
              <ForgotPasswordModal
                handleForgotPasswordEnd={()=>props?.handleForgotPasswordEnd()}
                closeForgotPasswordModal={()=>props?.closeForgotPasswordModal()}
                userEmail={userEmail}
                openLoginModal={()=>props?.openLoginModal()}
                loginState={loginState}
              />
              : null
            }    
        </div>
      }
      </>
    )
}