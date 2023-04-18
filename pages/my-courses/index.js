import React, { useEffect, useRef, useState } from 'react'
import ApiStatus from '../../config/apiStatus';
import States from '../../config/states';
import List from '../../components/list/List';
import Image from "next/image";
import axios from 'axios';
import SearchMobile from '../../components/searchBarMobile/SearchBar';
import { useRouter } from 'next/router';
import constant from '../../config/constant';
import LoginModal from '../../components/loginModal/LoginModal'
import ForgotPasswordModal from '../../components/forgotPasswordModal/ForgotPasswordModal'
import DetailModal from '../../components/detailModal/DetailModal'
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import ApplyNowModal from '../../components/applyNowModal/ApplyNowModal'
import MyCourseCard from '../../components/my-courses-card/My-Courses-Card'
import Head from 'next/head'
import { useMediaQuery } from 'react-responsive';
const bookmarkKey = 'credenc-edtech-bookmarks';
const UpvoteKey = 'credenc-edtech-upvote'
const EdtechAuthKey = 'credenc-edtech-authkey';

export default function MyCourses(props){

    let location = useRouter();
    const coursesApiStatus = useRef(new ApiStatus());
    const listTypes = States.listTypes;
    const [courses, setCourses] = useState([]);
    const [token, setToken] = useState('')
    const [detailModal, setDetailModal] = useState(false);
    const [detailData,setDetailData] = useState({});
    const [applyNow, setApplyNow] = useState(false)
    const [mounted, setMounted] = useState(false);
    const [cardActionTaken,setCardActionTaken] = useState(false)

    const isDesktopOrLaptop = useMediaQuery({
      query: "(min-width: 500px)",
    });

    useEffect(() => {
      setMounted(true);
    }, []);

    const getMyCourses = async (authToken) => {
        coursesApiStatus.current.makeApiCall();

         const res = await axios.get(`${constant.API_URL.DEV}/my_courses/`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          })
            .then(res => {
              coursesApiStatus.current.success();
              setCourses(res.data.data);
               return res;
            })
            .catch(err => {
              coursesApiStatus.current.failed();
              console.log(err);
            });
          
            return res ? res : [];
        
      }


  useEffect( () => {
        let authToken = localStorage.getItem(EdtechAuthKey);
        setToken(authToken)
        coursesApiStatus.current.start();
        getMyCourses(authToken);
    }, []);

  const _openDetailModal = (data)=>{
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

    return(
      <>
      <Head>
        <title>Course Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> 
      {
        mounted && 
        <div className='my-course-container'>
            <div className='my-course-content'>
              {
                !isDesktopOrLaptop ?
                <div className='my-course-header-mobile'>
                  <span className='my-course-header-mobile' style={{paddingLeft: 20}}>
                  My Courses
                    </span>
                </div>
                  : 
                  <div className='my-course-header-web'>
                    <span className='my-course-header' style={{paddingLeft: 60}}>
                        My Courses
                    </span>
                    <span className='my-course-header' style={{paddingRight: 60}}>
                    Click on the course to know about application status
                    </span>
                </div>
              }
                
                <div className='card-list-content' 
                style={ !isDesktopOrLaptop ? {marginTop: '6rem',gap: 10,padding: '0rem 0rem 8rem 0rem',display:'block'} : courses && courses.length > 0 ? {gap: 10, position: "absolute", top: '14rem', left: '60px', paddingBottom: '6rem'} : {gap: 10}}
                >
                  {/* <List
                      type={listTypes?.HORIZONTAL_CARDS}
                      list={courses}
                      listApiStatus={coursesApiStatus}
                      openDetailModal={(item)=>openDetailModal(item)} 
                      openApplyNowModal={(item)=> _openApplyNowModal(item)}
                      detailData={detailData} 
                      token={token}
                      openLoginModal={()=>props?.openLoginModal()} 
                      removeLocalBookmarks={()=>props?.removeLocalBookmarks()}
                  /> */}
                   {courses && courses.map((item,index)=>{
                    return(
                      <div key={index}>
                        <MyCourseCard 
                          index={index}
                          data={item} 
                          openDetailModal={()=>_openDetailModal(item)}
                          openApplyNowModal={()=> _openApplyNowModal(item)}
                          token={props?.token}
                          openLoginModal={()=>props?.openLoginModal()}
                          addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                          removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                        />
                      </div>
                    )
                 })}
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
                status={true}
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