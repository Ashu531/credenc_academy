import React,{useEffect,useState,useRef} from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from "react-responsive";
import DetailPageMobile from './mobileDetailPage'
import DetailPageWeb from './webDetailPage'
import axios from 'axios';
import constant from '../../config/constant';
import UrlService from "../../helper/urlService";
import { NextPageContext } from "next";
import Head from 'next/head'
const EdtechToken = 'credenc-edtech-authkey';
const EdtechPartnerKey = 'credenc-edtech-partner-key';

export default function DetailPage(props){

    let location = useRouter();
    let nextURL=location?.asPath?.substring(1,location?.asPath?.length)
    let urlService = useRef(new UrlService(nextURL));
    const [mounted, setMounted] = useState(false);
    const [detailData,setDetailData] = useState({})
    const [instructorData,setInstructorData] = useState({})
    const [priceOptions,setPriceOptions] = useState({})
    const [toolData,setToolData] = useState({})
    const [similarCourses,setSimilarCourses] = useState({})
    const [token,setToken] = useState('')
    const [startingCost,setStartingCost] = useState({})
    const [thirdPartyUser,setThirdPartyUser] = useState({})
    const [rating, setRating] = useState({})
    const [reviews, setReviews] = useState([])
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const isDesktopOrLaptop = useMediaQuery({
      query: "(min-width: 500px)",
    });

    useEffect(() => {
      _retrieveData()
      
    }, [location.query.course_id]); 

    const _retrieveData=()=>{
     const localToken = localStorage.getItem(EdtechToken)
     if(localToken && localToken.length > 0){
        setToken(localToken)
     }

     let partnerKey = JSON.parse(localStorage.getItem(EdtechPartnerKey));
     if(partnerKey && partnerKey.length > 0){
      setThirdPartyUser(partnerKey)
     }
     
     _getCourseId(location?.query?.course_id,localToken)
    }

    const _getCourseId=(id,localToken)=>{
            _getDetailData(id,localToken)
            _getInstructorData(id)
            _getpaymentDetails(id)
            _getToolData(id)
            _getCardData(id,localToken)
            _getStartingCost(id,localToken)
            _getRating(id)
            _getReviews(id)
    }  

    const _getDetailData=async(id,localToken)=>{

      if(localToken && localToken.length > 0){
        let res = await axios.get(`${constant.API_URL.DEV}/course/detail_one/${id}/`, {
          headers: {
            'Authorization': `Bearer ${localToken}`
          }
        })
          .then(res => {
            // this.coursesApiStatus.current.success();
            setDetailData(res?.data?.data)
            setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          });
      }else{
        let res = await axios.get(`${constant.API_URL.DEV}/course/detail_one/${id}/`)
          .then(res => {
            // this.coursesApiStatus.current.success();
            setDetailData(res.data.data)
            setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          });
      }
      
        
    }

    const _getInstructorData=async(id)=>{
        let res = await axios.get(`${constant.API_URL.DEV}/course/instructor/${id}/`)
          .then(res => {
            // this.coursesApiStatus.current.success();
            setInstructorData(res.data.data)
            // setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          }); 
    }

    const _getpaymentDetails=async(id)=>{
      if(token && token.length > 0){
        let res = await axios.get(`${constant.API_URL.DEV}/course/price_options/${id}/`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'key': 'credenc'
          }
        })
        .then(res => {
          // this.coursesApiStatus.current.success();
          setPriceOptions(res.data.data)
          // setMounted(true);
          return res.data;
        })
        .catch(err => {
          // this.coursesApiStatus.current.failed();
          console.log(err);
        });
      }else{
        let res = await axios.get(`${constant.API_URL.DEV}/course/price_options/${id}/`,{
          headers: {
            'key': 'credenc'
          }
        })
          .then(res => {
            // this.coursesApiStatus.current.success();
            setPriceOptions(res.data.data)
            // setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          });
      }
         
    }

    const _getToolData=async(id)=>{
        let res = await axios.get(`${constant.API_URL.DEV}/course/detail_two/${id}/`, {
          headers: {
            'key': 'credenc'
          }
        })
          .then(res => {
            // this.coursesApiStatus.current.success();
            setToolData(res.data.data)
            // setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          });
    }

    const _getCardData=async(id,localToken)=>{
      if(localToken && localToken.length > 0){
        let res = await axios.get(`${constant.API_URL.DEV}/course/similar/${id}/`, {
          headers: {
            'Authorization': `Bearer ${localToken}`,
            'key': 'credenc'
          }
        })
        .then(res => {
          // this.coursesApiStatus.current.success();
          setSimilarCourses(res.data.data)
          // setMounted(true);
          return res.data;
        })
        .catch(err => {
          // this.coursesApiStatus.current.failed();
          console.log(err);
        });
      }else{
        let res = await axios.get(`${constant.API_URL.DEV}/course/similar/${id}/`,{
          headers: {
            'key': 'credenc'
          }
        })
          .then(res => {
            // this.coursesApiStatus.current.success();
            setSimilarCourses(res.data.data)
            // setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          });
      }
      }
        

    const _getStartingCost=async(id,localToken)=>{
      if(localToken && localToken.length > 0){

        let res = await axios.get(`${constant.API_URL.DEV}/course/starting_cost/${id}/`,{
          headers: {
            'Authorization': `Bearer ${localToken}`,
            'key': 'credenc'
          }
        })
          .then(res => {
            // this.coursesApiStatus.current.success();
            setStartingCost(res?.data?.data)
            // setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          });

      }else{
        let res = await axios.get(`${constant.API_URL.DEV}/course/starting_cost/${id}/`,{
          headers: {
            'key': 'credenc'
          }
        })
          .then(res => {
            // this.coursesApiStatus.current.success();
            setStartingCost(res?.data?.data)
            // setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          });
      }
     
  }

  const _getReviews = async(id) => {
      let res = await axios.get(`${constant.API_URL.DEV}/course/reviews/${id}/`)
        .then(res => {
          // this.coursesApiStatus.current.success();
          setReviews(res.data)
          // setMounted(true);
          return res.data;
        })
        .catch(err => {
          // this.coursesApiStatus.current.failed();
          console.log(err);
        }); 
  }

  const _getRating = async(id) => {
      let res = await axios.get(`${constant.API_URL.DEV}/course/ratingsavg/${id}/`)
        .then(res => {
          // this.coursesApiStatus.current.success();
          console.log(res)
          setRating(res.data)
          // setMounted(true);
          return res.data;
        })
        .catch(err => {
          // this.coursesApiStatus.current.failed();
          console.log(err);
        }); 
  }

    return(
    <>
    <Head>
      <title>Detail Page</title>
    </Head>
    {
        mounted && 
        <>
        {/* {isDesktopOrLaptop &&  */}
          <DetailPageWeb
            rating={rating}
            reviews={reviews}
            detailData={detailData} 
            instructorData={instructorData} 
            similarCourses={similarCourses} 
            priceOptions={priceOptions} 
            toolData={toolData} 
            token={token}
            startingCost={startingCost}
            openLoginModal={()=>props?.openLoginModal()}
            addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
            removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
            handleForgotPasswordEnd={()=>props?.handleForgotPasswordEnd()}
            closeLoginModal={()=>props?.closeLoginModal()}
            openForgotPasswordModal={()=>props?.openForgotPasswordModal()}
            forgotPasswordModal={props?.forgotPasswordModal}
            handleLogin={()=>props?.handleLogin()}
            closeForgotPasswordModal={()=>props?.closeForgotPasswordModal()}
            loginModal={props?.loginModal}
            thirdPartyUser={thirdPartyUser}
            {...props}
          />
        {/* }
        {isMobile && 
          <DetailPageMobile 
                detailData={detailData} 
                instructorData={instructorData} 
                similarCourses={similarCourses} 
                priceOptions={priceOptions} 
                toolData={toolData}
                startingCost={startingCost} 
                addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                token={token}
                openLoginModal={()=>props?.openLoginModal()}
                thirdPartyUser={thirdPartyUser}
           />
        } */}
        </>
    }
       
    </>
    )
}