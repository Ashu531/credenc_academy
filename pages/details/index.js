import React,{useEffect,useState,useRef} from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from "react-responsive";
import DetailPageMobile from './mobileDetailPage'
import DetailPageWeb from './webDetailPage'
import axios from 'axios';
import constant from '../../config/constant';
import UrlService from "../../helper/urlService";
import { NextPageContext } from "next";
const EdtechToken = 'credenc-edtech-authkey';

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
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const isDesktopOrLaptop = useMediaQuery({
      query: "(min-width: 500px)",
    });

    useEffect(() => {
      _getCourseId(location.query.course_id)
      _retrieveData()
    }, [location.query.course_id]); 

    const _retrieveData=()=>{
     const localToken = localStorage.getItem(EdtechToken)
     if(localToken && localToken.length > 0){
        setToken(localToken)
     }
    }

    const _getCourseId=(id)=>{
            _getDetailData(id)
            _getInstructorData(id)
            _getpaymentDetails(id)
            _getToolData(id)
            _getCardData(id)
            _getStartingCost(id)
    }  

    const _getDetailData=async(id)=>{
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

    const _getInstructorData=async(id)=>{
        let res = await axios.get(`${constant.API_URL.DEV}/course/instructor/${id}/`)
          .then(res => {
            // this.coursesApiStatus.current.success();
            setInstructorData(res.data.data)
            setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          }); 
    }

    const _getpaymentDetails=async(id)=>{
        let res = await axios.get(`${constant.API_URL.DEV}/course/price_options/${id}/`)
          .then(res => {
            // this.coursesApiStatus.current.success();
            setPriceOptions(res.data.data)
            setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          }); 
    }

    const _getToolData=async(id)=>{
        let res = await axios.get(`${constant.API_URL.DEV}/course/detail_two/${id}/`)
          .then(res => {
            // this.coursesApiStatus.current.success();
            setToolData(res.data.data)
            setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          });
    }

    const _getCardData=async(id)=>{
        let res = await axios.get(`${constant.API_URL.DEV}/course/similar/${id}/`)
          .then(res => {
            // this.coursesApiStatus.current.success();
            setSimilarCourses(res.data.data)
            setMounted(true);
            return res.data;
          })
          .catch(err => {
            // this.coursesApiStatus.current.failed();
            console.log(err);
          });
    }

    const _getStartingCost=async(id)=>{
      let res = await axios.get(`${constant.API_URL.DEV}/course/starting_cost/${id}/`)
        .then(res => {
          // this.coursesApiStatus.current.success();
          console.log(res.data,"res.data+++")
          setStartingCost(res.data)
          setMounted(true);
          return res.data;
        })
        .catch(err => {
          // this.coursesApiStatus.current.failed();
          console.log(err);
        });
  }

    return(
    <>
    {
        mounted && 
        <>
        {isDesktopOrLaptop && 
          <DetailPageWeb
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
          />
        }
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
           />
        }
        </>
    }
       
    </>
    )
}