import React,{useEffect,useState} from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from "react-responsive";
import DetailPageMobile from './mobileDetailPage'
import DetailPageWeb from './webDetailPage'
import axios from 'axios';
import constant from '../../config/constant';

export default function DetailPage(props){

    let location = useRouter();
    const [mounted, setMounted] = useState(false);
    const [detailData,setDetailData] = useState({})
    const [instructorData,setInstructorData] = useState({})
    const [priceOptions,setPriceOptions] = useState({})
    const [toolData,setToolData] = useState({})
    const [similarCourses,setSimilarCourses] = useState({})
    const [courseId,setCourseId] = useState(0);
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const isDesktopOrLaptop = useMediaQuery({
      query: "(min-width: 500px)",
    });

    useEffect(() => {
        _getCourseId()
      }, []);

    const _getCourseId=()=>{
        if(location.query && location.query !== 'null' && location.query !== 'undefined'){
            setCourseId(location.query.course_id)
            _getDetailData(location.query.course_id)
            _getInstructorData(location.query.course_id)
            _getpaymentDetails(location.query.course_id)
            _getToolData(location.query.course_id)
            _getCardData(location.query.course_id)
        }
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

    return(
    <>
    {
        mounted && 
        <>
        {isDesktopOrLaptop && 
          <DetailPageWeb />
        }
        {isMobile && 
          <DetailPageMobile 
                detailData={detailData} 
                instructorData={instructorData} 
                similarCourses={similarCourses} 
                priceOptions={priceOptions} 
                toolData={toolData} 
                addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                token={props?.token}
                openLoginModal={()=>props?.openLoginModal()}
           />
        }
        </>
    }
       
    </>
    )
}