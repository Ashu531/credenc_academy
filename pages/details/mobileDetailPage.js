import React,{useEffect,useState} from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import arrowIcon from '../../assets/images/icons/arrowIcon.svg';
import clockIcon from '../../assets/images/icons/clockIcon.svg';
import calendarIcon from '../../assets/images/icons/calendarIcon.svg';
import onlineIcon from '../../assets/images/icons/onlineIcon.svg';
import chartIcon from '../../assets/images/icons/chartIcon.svg';
import costIcon from '../../assets/images/icons/costIcon.svg';
import LinkedlnLogo from '../../assets/images/icons/linkedin-icon.svg';
import njIcon from '../../assets/images/icons/njIcon.svg';
import Button from '../../components/button/Button';
import CourseCard from '../../components/coursecard/CourseCard';
import tableBackground from '../../assets/images/icons/tableBackground.svg'
import benefitBullet from '../../assets/images/icons/benefitBullet.svg'
import moduleBullets from '../../assets/images/icons/moduleBullets.svg'
import moduleSquareBullets from '../../assets/images/icons/moduleSquareBullet.svg'
import moduleArrowBullets from '../../assets/images/icons/topicArrowBullet.svg'
import SlidingPanel from 'react-sliding-side-panel';
import DetailModal from '../../components/detailModal/DetailModal'
import 'react-sliding-side-panel/lib/index.css';
import ApplyNowModal from '../../components/applyNowModal/ApplyNowModal'
import questionDoodle from '../../assets/images/icons/questionDoodle.svg'
import longWaveIcon from '../../assets/images/icons/longWaveIcon.svg'
import shortWaveIcon from '../../assets/images/icons/shortWaveIcon.svg'
import constantCurveIcon from '../../assets/images/icons/constantCurveIcon.svg'
import skribbleIcon from '../../assets/images/icons/skribbleIcon.svg'
import underlineSkribble from '../../assets/images/icons/underlineSkribble.svg'
import titleFrame from '../../assets/images/icons/titleFrame.svg'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {withStyles, Typography } from "@material-ui/core";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import SuccessApplyModal from "../../components/successApplyModal/SuccessApplyModal"
// import Link from '@mui/material/Link';
import Link from "next/link";
import MobileDetailSkeleton from '../../components/detailPageSkeletonMobile';
import credencAcademy from '../../assets/images/icons/credencAcademy.svg';
import constant from '../../config/constant';

import certificateIcon from '../../assets/images/icons/certificate-icon.svg'
import caretDown from '../../assets/images/icons/caret-down-purple.svg'
import caretRight from '../../assets/images/icons/caret-right-purple.svg'
import userIcon from '../../assets/images/icons/user.svg'
import filledStar from '../../assets/images/icons/star-filled.svg'
import halfStar from '../../assets/images/icons/star-filled-half.svg'
import emptyStar from '../../assets/images/icons/star-empty.svg'
import backgroundImage from '../../assets/images/icons/bannerImage.svg'
import hatIcon from '../../assets/images/icons/hat.svg'
import axios from 'axios';
import QuerySuccessModal from '../../components/querySuccessModal/QuerySuccessModal';
import InquiryModal from '../../components/inquiryModal/inquiryModal';

const styles = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${tableBackground.src})`,  
  };

export default function DetailPageMobile(props){

    const myLoader = ({ src, width, quality }) => {
        if(src && src.length > 0){
          return `${src}?w=${width}&q=${quality || 75}`
        }else{
            return '..'
        }
      }

    let location = useRouter();
    const [mounted, setMounted] = useState(false);
    const [detailData,setDetailData] = useState({});
    const [detailModal,setDetailModal] = useState(false)
    const [applyNow, setApplyNow] = useState(false)
    const [enquire, setEnquire] = useState(false)
    const [courseName,setCourseName] = useState('')
    const [successModal,setSuccessModal] = useState(false);
    const [cardActionTaken,setCardActionTaken] = useState(false)
    const [topicOpen,setTopicOpen] = useState({
        topicId: 0,
        topicShow: false,
        moduleId: 0,
        moduleShow: false,
    })
    const [applied,setApplied] = useState({
      state: false,
      id: 0
    });

    const breadcrumbs = [
      <Link key="1" href="/">
        <span style={{fontSize: 13, fontFamily: 'Work Sans', fontWeight: 400,color: '#4F4F4F',cursor: 'pointer'}}>
        Home
        </span>
      </Link>,
      <CustomColor key="2">
        {props?.detailData?.subject}
      </CustomColor>,
    ];

    useEffect(() => {
        if( props?.detailData && props?.detailData != null 
            && props?.instructorData && props?.instructorData != null 
            && props?.similarCourses && props?.similarCourses != null
            && props?.priceOptions && props?.priceOptions != null
            && props?.toolData && props?.toolData != null
            ){
                setMounted(true);
        }
       
      }, []);

      const _handleCardActionTaken=()=>{
        setCardActionTaken(true)
      }
      
      const _openDetailModal = (data)=>{
        setDetailModal(true);
        setDetailData(data);
      }

      const _openApplyNowModal=(data)=>{
        setApplyNow(true)
        setDetailData(data)
      }
      
      const _closeApplyNowModal=()=>{
        setApplyNow(false)
      }

      const closeDetailModal=(data)=>{
        setDetailModal(false)
        setDetailData(data);
        if(cardActionTaken === true){
          setTimeout(() => location.reload(), 100)
        }
      
      }

      const _handleTopicOpen=(data)=>{
          if(data.id === topicOpen.topicId){
            setTopicOpen({
                topicId: data.id,
                topicShow: !topicOpen.topicShow
            })
          }else{
            setTopicOpen({
                topicId: data.id,
                topicShow: true
            })
          }
        
      }

      const _handleModuleOpen=(item,data)=>{
          if(data.id === topicOpen.moduleId){
            setTopicOpen({
                topicId: item.id,
                topicShow: true,
                moduleId: data.id,
                moduleShow: !topicOpen.moduleShow
            })
          }else{
            setTopicOpen({
                topicId: item.id,
                topicShow: true,
                moduleId: data.id,
                moduleShow: true
            })
          }
         
      }

      const _openSuccessApplyModal=(data)=>{
        setSuccessModal(true)
        setCourseName(data)
      }
  
      const _closeSuccessApplyModal=()=>{
        setSuccessModal(false);
      }

    //   const handleButtonClick=()=>{
    //     _openApplyNowModal()
    // }

    const _closeEnquireModal = () => {
      setEnquire(false)
    }

    let [querySuccessModal, setQuerySuccessModal] = useState(false)
    const _openQuerySuccessModal = () => {
      setQuerySuccessModal(true)
    }

    let [curriculum, setCurriculum] = useState([]);
    let [userRating, setUserRating] = useState(0)
    let [reviewText, setReviewText] = useState('')
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState({})
    let [error, setError] = useState('')

    useEffect(() => {
      setReviews([...props?.reviews])
      setRating(props?.rating)
    }, [props?.reviews, props?.rating])

    useEffect(() => {
      
        let newCurriculumState = props['toolData']['curriculum'];

        if(newCurriculumState !== undefined && newCurriculumState !== null && newCurriculumState.length > 0){
          try{
            for(let i = 0; i < newCurriculumState?.length; i++){
              newCurriculumState[i]['display'] = false
              
              for(let j = 0; j < newCurriculumState[i]['sub_module'].length; j++){
                newCurriculumState[i]['sub_module'][j]['display'] = false
              }
            }
  
            setCurriculum([...newCurriculumState])
          }catch(e){
              console.log(e)
          }
          
        }

    }, [props?.toolData.curriculum])

    const handleCurriculumDisplay = (event, i, j) => {

      event.stopPropagation()

      let newCurriculumState = [...curriculum]

      if(j >= 0){
        newCurriculumState[i]['sub_module'][j]['display'] = !newCurriculumState[i]['sub_module'][j]['display']
      }

      else if(i >= 0){
        newCurriculumState[i]['display'] = !newCurriculumState[i]['display']
      }

      setCurriculum([...newCurriculumState])

    }

    const _getReviews = async(id) => {
        let res = await axios.get(`${constant.API_URL.DEV}/course/reviews/${props?.id}/`)
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
        let res = await axios.get(`${constant.API_URL.DEV}/course/ratingsavg/${props?.id}/`)
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

    const handleReviewChange = (val) => {
      setReviewText(val)
      setError('')
    }


    const submitReview = async () => {
      if(props?.token && props?.token.length > 0){
        if(userRating > 0){
          let res = await axios.post(`${constant.API_URL.DEV}/course/review/`, {
            "course_id": props?.id,
            "review" : reviewText,
            "rating" : userRating
        }, {
            headers: {
              'Authorization': `Bearer ${props?.token}`
            }
          })
            .then(res => {
              _getReviews()
              _getRating()
              handleReviewChange('')
              return res.data;
            })
            .catch(err => {
              // this.coursesApiStatus.current.failed();
              console.log(err);
            });
        } else {
          setError('Oh! Looks like you forgot to give us a rating')
        }
      }else{
        console.log("coming+++")
        props?.openLoginModal()
      }
      
    }

    return(
      <>
      { 
      props?.detailData && props?.detailData != null ?
      //  mounted &&
        <div className='detail-page-mobile'>

          <div className='head-jumbotron' style={{backgroundImage: `linear-gradient(rgba(245, 248, 255, 0.3), rgba(245, 248, 255, 0.3)), url(${backgroundImage.src})`, backgroundSize: 'cover'}}>
            <div className='title'>{props?.detailData?.course_name}</div>
            {props?.detailData?.program_type && <div className='subtitle'>
              <Image src={certificateIcon} width={20} height={20} objectFit='contain' />
              <span>&ensp;{props?.detailData?.program_type}</span>
            </div>}
            <div className='description' style={{textAlign: 'center'}}>
            {props?.detailData?.one_liner || props?.detailData?.description}
            </div>
            <div className='items'>
              {
                props?.detailData?.educator_list.map((item, index) => {
                  return (
                    <div className='item' key={index}>
                      <Image src={item['logo'] || hatIcon} width={34} height={34} objectFit='contain' loader={myLoader} style={{borderRadius: '50%'}} />
                      <div>
                        <div className='head'>{item['text']}</div>
                        <div className='sub'>{item['name']}</div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div style={{fontWeight: '600', fontSize: '2.4rem', lineHeight: '2.8rem', color: '#034FE2'}}>
              {props?.startingCost?.starting_cost && '₹' + props?.startingCost?.starting_cost[0]}
            </div>
            <div style={{fontWeight: '400', fontSize: '1.2rem', lineHeight: '1.4rem', color: '#717171'}}>
              {props?.startingCost?.starting_cost && 'Starting Cost'}
            </div>
          </div>

          <div className='container' style={{rowGap: '3.6rem', flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              props?.detailData?.grid.map(
                (feature, index) => {
                    return (<div className='feature' key={index}>
                      <Image src={feature?.icon} width={20} height={20} objectFit='contain' loader={myLoader} />
                      <div className='value'>{feature.value}</div>
                      <div className='key'>{feature.key}</div>
                    </div>)
                }
                )
            }
          </div>

          <div className='container'>
            <div className='heading' style={{margin: '0 0 1.6rem 0'}}>Introduction</div>
            <div className='description'>{props?.detailData?.description}</div>
          </div>

          {props?.detailData?.eligibility?.length > 0 && <div className='container'>
            <div className='heading' style={{margin: '0 0 1.6rem 0'}}>Pre-Requisites</div>
            {
              props?.detailData?.eligibility.map(
                (item, index) => {
                  return (<div 
                    className='description' 
                    style={{padding: '0.2rem 0.8rem', margin: '1.2rem 0', borderLeft: '1px solid #034FE2'}}
                    key={index}
                    >
                      {item}
                    </div>)
                }
              )
            }
          </div>}

          <div className='container'>
            <div className='confused-container'>
              <div>
                <div className='heading' style={{marginBottom: '1.2rem'}}>Still Confused?</div>
                <div className='description' style={{width: '100%'}}>Our team of experts is here to help you. Contact us today and we&apos;re here to help you find clarity and move forward with confidence.</div>
              </div>
              <button onClick={() => setEnquire(true)}>Talk to an Expert!</button>
            </div>
          </div>

          {curriculum.length > 0 && <div className='container' id='syllabus'>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start', marginBottom: '2rem'}}>
              <div className='heading'>Syllabus</div>
            </div>
            {
              curriculum.map((item, index) => {
                return(
                  <div className='curriculum-item' onClick={event => handleCurriculumDisplay(event, index, -1)} key={index}>
                    <div style={{padding: '2.1rem 0 0'}}>
                      <Image src={caretRight} width={15} height={15} objectFit='contain' style={{rotate: item.display === true ? '90deg' : '0deg'}} />
                    </div>
                    <div style={{width: '96%'}}>
                      <div className='item-content'>
                        <div>
                          <div style={{fontSize: '1.8rem', fontWeight: '600', lineHeight: '2.1rem', color: '#000000', padding: '0 0 0.4rem'}}>{item['title_sub'] === '' ? item['heading'] : item['heading'] === '' ? item['title_sub'] : item['title_sub'] + " | " + item['heading']}</div>
                        </div>
                      </div>
                      {
                        item.display && item['sub_module'].map((module, moduleIndex) => {
                          return(
                            <div className='curriculum-item' onClick={event => handleCurriculumDisplay(event, index, moduleIndex)} key={moduleIndex}>
                              <div style={{padding: '2rem 0 0'}}>
                                <Image src={caretRight} width={15} height={15} objectFit='contain' style={{rotate: module.display === true ? '90deg' : '0deg'}} />
                              </div>
                              <div style={{width: '96%'}}>
                                <div className='item-content'>
                                  <div style={{fontSize: '1.7rem', fontWeight: '500', lineHeight: '2rem', color: '#434343'}}>{module.title}</div>
                                </div>
                                {
                                  module.display && module['sub_topics']?.map((topic, topicIndex) => {
                                    return(
                                      <div className='curriculum-item' key={topicIndex}>
                                        <div style={{width: '96%'}}>
                                          <div className='item-content'>
                                              <div style={{fontSize: '1.5rem', fontWeight: '400', lineHeight: '1.76rem', color: '#717171'}}>{topic}</div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div> 
                  </div>
                )
              })
            }
          </div>}

          {props?.instructorData?.instructor?.length > 0 && <div style={{padding: '2rem 0 3rem 0', marginRight: 'auto', width: '100%'}}>
            <div className='heading' style={{paddingBottom: '0.9rem', padding: '0 0 0.9rem 2rem'}}>Instructors</div>
            <div className='people' style={{padding : '0 0 0 2rem'}}>
              {props?.instructorData?.instructor?.map(
                  (inst, index) => {
                      return (<div className='feature' key={index}>
                        <Image src={inst?.profile_photo} width={100} height={100} style={{borderRadius: '1.2rem'}} objectFit='contain' loader={myLoader} />
                        <div style={{fontSize: '1.8rem', fontWeight: '400', lineHeight: '2.1rem', color: '#000000', padding: '1.2rem 0'}}>{inst['name']}</div>
                        <div style={{fontSize: '1.5rem', fontWeight: '400', lineHeight: '1.8rem', color: '#000000', padding: '0.4rem 0 1.2rem 0'}}>{inst['designation']}</div>
                        {/* <div style={{fontSize: '1.5rem', fontWeight: '400', lineHeight: '2.25rem', color: '#000000'}}>{inst.desc}</div> */}
                      </div>)
                  }
              )}
            </div>
          </div>}

          <div className='container' id='reviews'>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <div className='heading'>Reviews</div>
              { rating['avg'] && !isNaN(rating['avg']) && <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                {
                  [1, 2, 3, 4, 5].map(el => <Image key={el} src={rating['avg'] / el >= 1 ? filledStar : (el - rating['avg']) >= 1 ? emptyStar : halfStar} width={20} height={20} objectFit='contain' />)
                }
                <div style={{fontSize: '2rem', fontWeight: '400', lineHeight: '2.4rem', color: '#8F14CC'}}>&ensp;{parseFloat(rating['avg']).toFixed(1)}</div>
              </div>}
            </div>
            {reviews?.length > 0 && <div style={{width: '100%', display: 'flex', rowGap: '1rem', flexDirection: 'row', flexWrap: 'wrap', padding: '3.6rem 0 0 0'}}>
              {reviews.map(
                  (review, index) => {
                      return (<div className='feature' key={index}>
                        {
                          review?.review?.user?.profile_image && <Image src={review?.review?.user?.profile_image} width={100} height={100} objectFit='contain' loader={myLoader} />
                        }
                        <div style={{fontSize: '1.8rem', fontWeight: '400', lineHeight: '2.1rem', color: '#000000'}}>{review['review']['user']['full_name']}</div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                          {
                            [1, 2, 3, 4, 5].map(el => <Image key={el} src={review.rating / el >= 1 ? filledStar : (el - review.rating) >= 1 ? emptyStar : halfStar} width={12} height={12} objectFit='contain' />)
                          }
                          <div style={{fontSize: '1rem', fontWeight: '400', lineHeight: '1.4rem', color: '#8F14CC'}}>&ensp;{parseFloat(review.rating).toFixed(1)}</div>
                        </div>
                        <div style={{fontSize: '1.5rem', fontWeight: '400', lineHeight: '2.25rem', color: '#000000', padding: '1rem 0 0 0'}}>{review['review']['review']}</div>
                      </div>)
                  }
              )}
            </div>}
            <div className='leave-review'>
              <div style={{fontSize: '1.6rem', fontWeight: '500', lineHeight: '2.4rem', color: '#000000', fontFamily: 'Poppins'}}>How was your experience with the course?</div>
              <div style={{fontSize: '1.4rem', fontWeight: '400', lineHeight: '1.6rem', color: '#000000', fontFamily: 'Poppins', margin: '0.8rem 0 1rem 0'}}>Leave a review and help others in their learning journey!</div>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                {
                  [1, 2, 3, 4, 5].map(el => <Image key={el} src={userRating / el >= 1 ? filledStar : (el - userRating) >= 1 ? emptyStar : halfStar} width={30} height={30} objectFit='contain' onClick={() => setUserRating(el)}/>)
                }
              </div> 
              <div style={{color: 'var(--errorPrimaryColor)', margin: '0.6rem 0 1rem 0', fontSize: '1.3rem'}}>{error}</div>
              <textarea rows={8} placeholder="This course is amazing..." onChange={(e) => handleReviewChange(e.target.value)} value={reviewText}></textarea>
              <button 
                style={{cursor: 'pointer', backgroundColor: '#034FE2', padding: '1.6rem 6rem', margin: '1.6rem', border: 'none', borderRadius: '0.8rem', color: '#FFFFFF', fontSize: '1.8rem', fontWeight: '600', fontFamily: 'Work Sans'}}
                onClick={submitReview}
              >Leave a Review
              </button>
            </div>
          </div>

          <div style={{padding: '2rem 0 3rem 0', marginRight: 'auto', width: '100%'}}>
            <div className='heading' style={{paddingBottom: '0.9rem', padding: '0 0 0.9rem 2rem'}}>You Might Be Interested In</div>
            <div className='detail-page-mobile-card-container'>
              {props?.similarCourses?.length > 0 && props?.similarCourses.map((item,index)=>{
                  return(
                    <div key={index}>
                      <CourseCard 
                        index={index}
                        data={item} 
                        openDetailModal={()=>_openDetailModal(item)}
                        openApplyNowModal={()=> _openApplyNowModal(item)}
                        token={props?.token}
                        openLoginModal={()=>props?.openLoginModal()}
                        addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                        removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                        applied={applied}
                        detailPage={true}
                      />
                    </div>
                  )
              })}
            </div>
          </div>

          {/* <div className='detail-page-web-breadcrumb' style={{marginTop: '6rem',padding: 24}}>
           <Breadcrumbs
                separator={<NavigateNextIcon fontSize="medium" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
           </div>
            {
              props?.detailData?.platform &&  props?.detailData?.platform?.logo !== null ?  
                <div className='detail-page-header-mobile-container'>
                  <div className='detail-page-mobile-header'>
                    <Image loader={myLoader} src={props?.detailData?.platform?.logo} alt='platform-icon' height={38} width={38} objectFit="contain" />
                    <div className='detail-page-mobile-platform'>
                        <span className='detail-page-mobile-platform-heading'>
                          Hosted on
                        </span>
                        <span className='detail-page-mobile-platform-subHeading'>
                          {props?.detailData?.platform?.name}
                        </span>
                    </div>
                  </div>
              </div> : null
            }
           {
               props?.detailData?.preview ? 
               <div className='detail-page-mobile-banner' style={{display:'contents'}}>
                 <Image loader={myLoader} src={props?.detailData?.preview} height={227} width={'100%'} objectFit="contain" />
               </div> : null
           } */}
           
            {/* <div className='detail-page-content-mobile'> */}
            {/* <div style={{position:'relative'}}>
                <div style={{width: }}>
                    <Image src={titleFrame} height={32} width={100} objectFit='contain' />
                </div>
                
            </div> */}
            {/* {
              props?.detailData?.program_type && props?.detailData?.program_type.length > 0 ?
              <div className='detail-page-content-heading'>
                    {props?.detailData?.program_type}
              </div> : null
            }
             
                  
              {
                props?.detailData?.course_name && props?.detailData?.course_name.length > 0 ?
                <div className='detail-page-content-course-name' style={{paddingTop: 10,fontSize: 28}}>
                 {props?.detailData?.course_name}
               </div> : null
              }
               
               {
                props?.detailData?.one_liner ? 
                    <span className='detail-page-content-one-liner' style={{marginTop: 10}}>
                    {props?.detailData?.one_liner}
                </span> : null
               }
               {
                 props?.detailData?.educator && props?.detailData?.educator.length > 0 ?
                    <div className='detail-page-content-educator' style={{marginTop: 40}}>
                        <span className='detail-page-content-educator-heading'>
                            TAUGHT BY
                        </span>
                        <div className='detail-page-content-educator-container' style={{marginTop: 10}}>
                            {
                              props?.detailData?.educator && props?.detailData?.educator.length > 0 &&  props?.detailData?.educator.map((item,index)=>{
                                    return(
                                      <div key={index+1} className='detail-page-content-educator-list'>
                                          {
                                            item?.logo !== null ? 
                                            <Image loader={myLoader} src={item?.logo} priority={true} objectFit='contain' height={40} width={40} /> : null
                                          }
                                          <div className='detail-page-content-educator-name' style={{marginLeft: 6}}>{item?.name}</div>
                                      </div>
                                    )
                                  
                                })
                            }
                          
                        </div>
                      </div> : null
               } */}
               
               
               {/* <div style={{marginTop: 36}}>
                   <div className='divider' />
               <div className='detail-page-content-educator-details'>
                   <div className='detail-page-content-educator-info'>
                       <Image src={onlineIcon} height={28} width={28} objectFit='contain' />
                       <div className='detail-page-content-educator-info-header'>MODE</div>
                   </div>
                   <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.class_modes && props?.detailData?.class_modes.length > 0 ? props?.detailData?.class_modes[0] : 'RECORDED'}</div>
               </div>
               <div className='divider' />
               <div className='detail-page-content-educator-details'>
                   <div className='detail-page-content-educator-info'>
                       <Image src={calendarIcon} height={28} width={28} objectFit='contain' />
                       <div className='detail-page-content-educator-info-header'>DURATION</div>
                   </div>
                   <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.duration}</div>
               </div>
               <div className='divider' />
               <div className='detail-page-content-educator-details'>
                   <div className='detail-page-content-educator-info'>
                       <Image src={clockIcon} height={28} width={28} objectFit='contain' />
                       <div className='detail-page-content-educator-info-header'>PACE</div>
                   </div>
                   <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.pace}</div>
               </div>
               <div className='divider' />
               <div className='detail-page-content-educator-details'>
                   <div className='detail-page-content-educator-info'>
                       <Image src={chartIcon} height={28} width={28} objectFit='contain' />
                       <div className='detail-page-content-educator-info-header'>LEVEL</div>
                   </div>
                   <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.start_level} - {props?.detailData?.end_level}</div>
               </div>
               <div className='divider' />
               <div className='detail-page-content-educator-details'>
                   <div className='detail-page-content-educator-info'>
                       <Image src={costIcon} height={28} width={28} objectFit='contain' />
                       <div className='detail-page-content-educator-info-header'>Starting Cost</div>
                   </div>
                   <div className='detail-page-content-educator-info-subheader' style={{textAlign:'right'}}>{ props?.startingCost?.starting_cost && props?.startingCost?.starting_cost.length > 0 ? `₹ ${props?.startingCost?.starting_cost[0]}` : props?.detailData?.finance_display && props?.detailData?.finance_display.length > 0 ? `₹${props?.detailData?.finance_display[0]}` : 'Unknown'}</div>
               </div>
               </div> */}
            {/* </div> */}
            {/* {
                props?.detailData.eligibility && props?.detailData?.eligibility.length > 0 ? 
                <div className='detail-page-mobile-intro'>
                <div className='detail-page-mobile-intro-header'>
                  Introduction
                </div>
                <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 10}}>
                  {props?.detailData?.description}
                </div>
                <div className='detail-page-mobile-intro-header' style={{marginTop: 40,fontSize: 22,flexDirection:'row !important'}}>
                  Am I Eligible<div style={{position:'relative'}}>
                  &nbsp;?&nbsp;
                      <div style={{position:'absolute',top: -12,left: 5}}>
                          <Image src={questionDoodle} height={25} width={19} objectFit='contain' />
                      </div>
                      </div> Yes, If you have...
                </div>
                <div style={{marginTop: 16}}>
                {
                  props?.detailData.eligibility && props?.detailData?.eligibility.length > 0 && props?.detailData?.eligibility.map((content,index)=>{
                        return(
                      <div className='detail-page-mobile-intro-content' style={{marginTop: 10}} key={index}>
                          <div style={{marginTop: 5}}>
                          <Image src={arrowIcon} height={12} width={19} objectFit='contain' />
                          </div>
                          <div className='detail-page-mobile-intro-subHeader' style={{marginLeft: 8}}>
                          {content}
                          </div>
                      </div>
                        )
                    })
                }
                </div>
                
              </div> : null
            } */}
            
            {/* {
              props?.toolData.usps &&  props?.toolData?.usps.length > 0 ? 
              <div style={styles}>
              { <div style={{display:'contents'}}>
              <Image src={tableBackground} height={'100%'} width={'100%'} objectFit='contain' />
              </div> }
             <div className='detail-page-mobile-benefit-section'>
               <div className='detail-page-mobile-benefit-content'>
                  <div className='detail-page-mobile-benefit-content-header'>
                      The Benefits You Will Get
                  </div>
                  {
                    props?.toolData.usps &&  props?.toolData?.usps.length > 0 && props?.toolData?.usps.map((item,index)=>{
                        return(
                          <div className='detail-page-mobile-benefit-info' key={index}>
                              <Image src={benefitBullet} width={17} height={20} objectFit='contain' />
                              <div className='detail-page-mobile-benefit-info-header'>
                                  {item}
                              </div>
                          </div>
                      )
                         
                      })
                  }
               </div>
              </div>
             </div> : null
            } */}
           
          {/* {
            props?.toolData?.curriculum && props?.toolData?.curriculum.length > 0 ?
            <div className='detail-page-mobile-intro'>
                <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
                  What you’ll learn
                  <div style={{position: 'absolute',top: 17}}>
                      <Image src={longWaveIcon} width={200} height={11} objectFit='contain' />
                  </div>
                </div>
                <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 16}}>
                This is the course structure and curriculum that will be followed over the coming weeks
                </div>
                <div className='divider' />
                {
                 props?.toolData?.curriculum && props?.toolData?.curriculum.length > 0 &&  props?.toolData?.curriculum.map((item,index)=>{
                        return(
                            <div style={{display: 'flex',flexDirection: 'column',width: '100%'}} key={index}>
                                <div className='detail-page-mobile-module-content' key={index} style={ item.id != topicOpen.topicId && topicOpen.topicShow ? {opacity: 0.5,width:'100%'} : {width: '100%'}}>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',width: '95%'}}>
                                        <div style={{width: '5%'}}>
                                        <Image src={moduleBullets} height={12} width={12} objectFit='contain' />
                                        </div>
                                        <div style={{display:'flex',flexDirection: 'column', justifyContent:'flex-start',alignItems:'flex-start',marginLeft: 16}}>
                                            <div className='detail-page-mobile-module-content-header'>
                                                {item.title_sub} | {item.heading}
                                            </div>
                                            {
                                              item.sub_module.length > 0 ? 
                                                <div className='detail-page-mobile-module-content-subheader'>
                                                  {item.sub_module.length} Modules{item.duration ? item.duration : ''}
                                              </div> : null
                                            }
                                            
                                        </div>
                                    </div>
                                    <div style={{width:'5%',display:'flex',justifyContent:'flex-end'}} onClick={()=>_handleTopicOpen(item)}>
                                      <Image src={caretDown} width={15} height={12} objectFit='contain' style={item.id === topicOpen.topicId && topicOpen.topicShow ? {transform: "rotate(180deg)"} : null}/>
                                    </div>
                                </div> 
                                {
                                   topicOpen.topicShow && topicOpen.topicId === item.id ? 
                                    item.sub_module.map((data,point)=>{
                                        return(
                                            <div style={{display:'flex',flexDirection:'column',margin: '12px 0px'}} key={point} >
                                                <div className='detail-page-mobile-module-bullet-section'>
                                                    <div className='detail-page-mobile-module-bullet-section-header'>
                                                        <Image src={moduleSquareBullets} height={12} width={12} objectFit='contain' />
                                                        <div className='detail-page-mobile-module-bullet-section-header-text'>
                                                        {data.title} | {data.sub_topics.length === 1 ? data.sub_topics[0] : ''}
                                                        </div>
                                                    </div>
                                                    {
                                                      data.sub_topics.length > 1 ? 
                                                      <div>
                                                        <Image src={caretDown} width={15} height={12} objectFit='contain' onClick={()=>_handleModuleOpen(item,data)} style={data.id === topicOpen.moduleId && topicOpen.moduleShow ? {transform: "rotate(180deg)"} : null}/>
                                                      </div> : null
                                                    }
                                                   
                                                </div>
                                                {
                                                  topicOpen.topicShow && topicOpen.topicId === item.id && topicOpen.moduleShow && topicOpen.moduleId === data.id ?  
                                                  data.sub_topics.length > 1 && data.sub_topics.map((info,serial)=>{
                                                    return(
                                                      <div style={{display:'flex',flexDirection:'column',margin: '12px 0px'}} key={serial}>
                                                        { <div className='detail-page-mobile-module-topic-section'>
                                                            <Image src={moduleArrowBullets} height={12} width={12} objectFit='contain' />
                                                            <div className='detail-page-mobile-module-bullet-section-header-text'>
                                                                Topic 1
                                                            </div>
                                                        </div> }
                                                          <div className='detail-page-mobile-module-bullet-section-topic-text'>
                                                              {info.title}
                                                          </div>
                                                      </div>
                                                    )
                                                  })
                                                     : null
                                                }
                                                  
                                           </div>
                                        )
                                    }) : null
                                }
                                
                               
                            </div> 
                        )
                    })
                }
                

            </div> : null
          } */}
            
            

            {/* <div className='detail-page-mobile-intro'>
                <div className='detail-page-mobile-intro-header'>
                    Your Tool Stack
                </div>
                <div className='detail-page-mobile-intro-subHeader'>
                    The tools that will be taught in this course
                </div>
                <div className='detail-page-mobile-intro-tool-container' style={{marginTop: 30}}>
                    {
                      props?.toolData?.skills && props?.toolData?.skills.length > 0 && props?.toolData?.skills.map((item,index)=>{
                          {console.log(item,"items+++")}
                            return(
                                <div className='detail-page-mobile-intro-tool-content' key={index}>
                                    <div className='detail-page-mobile-intro-tool-content-text'>
                                     {item}
                                   </div>
                                </div>
                            )
                        })
                    }
                      
                </div>
            </div> */}

            {/* {
                props?.toolData?.skills && props?.toolData?.skills.length > 0 ? 
                <div className='detail-page-mobile-intro'>
                <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
                Skills You Will Master
                <div style={{position: 'absolute',top: 10}}>
                      <Image src={shortWaveIcon} width={57} height={6} objectFit='contain' />
                  </div>
                </div>
                <div 
                  className='detail-page-skill-container' 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 15,
                    marginTop: 16
                  }}
                  
                  >
                    {
                        props?.toolData?.skills && props?.toolData?.skills.length > 0 && props?.toolData?.skills.map((item,index)=>{
                            return(
                                <div 
                                  className='detail-page-mobile-skill-content' 
                                  key={index} 
                                  style={{
                                    borderRadius: 3,
                                    padding: '6px 8px',
                                    fontFamily: 'Work Sans',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: 14,
                                    // lineHeight: 21,
                                    color: '#0A0A0A',
                                    background: '#FFFFFF',
                                    borderRadius: 3,
                                    padding: '6px 10px',
                                    width: 'max-content',
                                  }} >
                                {item}
                               </div>
                            )
                        })
                    }
                </div>
            </div> : null
            } */}

         {/* {
             props?.instructorData?.instructor && props?.instructorData?.instructor.length > 0 ? 
             <div className='detail-page-mobile-intro'>
             <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
               Who will teach you?
               <div style={{position: 'absolute',top: 10,left:-20}}>
                     <Image src={constantCurveIcon} width={224} height={8} objectFit='contain' />
                 </div>
             </div>
             <div className='detail-page-mobile-intro-subHeader'>
               Meet your instructors who will be teaching you the skills required to excel in this course
             </div>
             <div className='detail-page-mobile-instructor-card-container'>
             { props?.instructorData?.instructor && props?.instructorData?.instructor.length > 0 && props?.instructorData?.instructor.map((item,index)=>{
                 return(
                    <div className='detail-page-mobile-instructor-card' key={index} style={index > 0 ? {marginLeft: 15} : null}>
                            <Image loader={myLoader} src={item?.profile_photo} width={90} height={90} objectFit='contain' />
                            <div className='detail-page-mobile-instructor-card-name'>
                                {item?.name}
                            </div>
                            <div className='detail-page-mobile-instructor-card-designation' style={{marginTop: -10}}>
                                {item?.designation}
                            </div>
                            <div className='linkedlinLogoMobile'>
                                <Image src={LinkedlnLogo} height={24} width={24} objectFit='contain' />
                            </div>
                   </div>
                 )
             })}
                  </div> 
           </div> : null
         } */}

          {/* <div className='detail-page-mobile-intro' style={{background: '#FFFFFF'}}>
             <div className='detail-page-mobile-intro-header' style={{fontSize: 22}}>
             How Much Would You Pay?
             </div>
             <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 10}}>
             Explore your pre-approved Loan and EMI Options! Have your pick and pay at your own discretion!
             </div>
             <div className='detail-page-mobile-emi-content' style={{marginTop: 30}}>
                 <div className='detail-page-mobile-emi-section'>
                     <div className='detail-page-mobile-emi-section-header'>
                     EMI PLANS
                     </div>
                     <div className='detail-page-mobile-emi-section-nj-text'>
                     Powered by NJ Capital
                     </div>
                 </div>
                 <div className='detail-page-mobile-emi-section' style={{alignItems:'flex-start'}}>
                 <div className='detail-page-mobile-emi-section-start-text' style={{display:'flex'}}>
                 Starts <div style={{position:'relative'}}>
                 &nbsp;from
                     <div style={{position:'absolute',top: -12,right: -16}}>
                       <Image src={questionDoodle} height={25} width={19} objectFit='contain' />
                   </div>
                     </div>
                    
                   </div>
                   <div className='detail-page-mobile-emi-section-price-text'>
                   ₹{props?.startingCost?.starting_cost && props?.startingCost?.starting_cost.length > 0 ?  props?.startingCost?.starting_cost[0] : 'Unknown'}
                   </div>
                 </div>
             </div>
             {
               props?.thirdPartyUser === constant.PARTNER_KEY.NJ ?
               <div className='detail-page-mobile-nj-section'>
                  <Image src={njIcon} objectFit='contain' height={21} width={23} />
                  <div className='detail-page-mobile-nj-section-text'>
                    You have a Pre-Approved Loan from NJ Capital
                  </div>
               </div> :
               <div className='detail-page-mobile-nj-section'>
                  <Image src={credencAcademy} objectFit='contain' height={31} width={63} />
                      <div className='detail-page-mobile-nj-section-text'>
                          Credenc Loan is available for this course
                      </div>
              </div>
             }
             
             <div className='detail-page-mobile-price-options-container'>
             
               {
                 props?.priceOptions?.emi_options && props?.priceOptions?.emi_options.map((item,index)=>{ 
                   return(
                     <div className='detail-page-mobile-price-options-card' key={index}>
                         <div className='detail-page-mobile-price-options-card-header'>
                           <div className='detail-page-mobile-price-options-card-plan' style={{display:'flex'}}>
                           {item.noOfInstallment} Month
                           <div style={{position:'relative'}}>
                             &nbsp;EMI
                           <div style={{position:'absolute',top: -12,right: -16}}>
                             <Image src={questionDoodle} height={25} width={19} objectFit='contain' />
                           </div>
                         </div>
                           </div>
                           {
                             index === 0 ?
                             <div className='detail-page-mobile-price-options-card-recommendation'>
                               <div className='detail-page-mobile-price-options-card-recommendation-text'>Recommended!</div>
                             </div> : null
                           }
                           
                       </div>
                       <div className='detail-page-mobile-price-options-card-description'>
                         Pay ₹ {item.emiAmount} per month for {item.noOfInstallment} months with no interest cost.
                       </div>
                       <div className='detail-page-mobile-price-options-card-info'>
                         <div className='detail-page-mobile-price-options-card-info-heading'>
                           Monthly Installment
                         </div>
                         <div className='detail-page-mobile-price-options-card-info-subheading'>
                           ₹ {item.emiAmount}
                         </div>
                       </div>
                         <div className='detail-page-mobile-price-options-card-info'>
                           <div className='detail-page-mobile-price-options-card-info-heading'>
                           No. Installment
                           </div>
                           <div className='detail-page-mobile-price-options-card-info-subheading'>
                           {item.noOfInstallment}
                           </div>
                         </div>
                         { <div className='detail-page-mobile-price-options-card-info'>
                           <div className='detail-page-mobile-price-options-card-info-heading'>
                           Interest
                           </div>
                           <div className='detail-page-mobile-price-options-card-info-subheading'>
                             0
                           </div>
                         </div> }
                         <div className='detail-page-mobile-price-options-card-info'>
                           <div className='detail-page-mobile-price-options-card-info-heading'>
                           Down Payment
                           </div>
                           <div className='detail-page-mobile-price-options-card-info-subheading'>
                           {item.downPayment}
                           </div>
                         </div>
                         { <div className='detail-page-mobile-price-options-card-info'>
                           <div className='detail-page-mobile-price-options-card-info-heading'>
                           GST@18
                           </div>
                           <div className='detail-page-mobile-price-options-card-info-subheading'>
                           ₹ 12,125
                           </div>
                         </div>
                         <div className='detail-page-mobile-price-options-card-info'>
                           <div className='detail-page-mobile-price-options-card-info-heading'>
                           Discount
                           </div>
                           <div className='detail-page-mobile-price-options-card-info-subheading'>
                             10%
                           </div>
                         </div> }
                         <div className='detail-page-mobile-price-options-card-info' style={{marginTop:12}}>
                           <div style={{display:'flex',flexDirection:'column'}}>
                             <div className='detail-page-mobile-price-options-card-info-amount-header'>
                             Total Amount
                             </div>
                             <div className='detail-page-mobile-price-options-card-info-amount-text'>
                             ₹ {item.financeAmount}/mo
                             </div>
                           </div>
                           <div className='detail-page-mobile-price-options-card-nocost-emi'>
                               <div className='detail-page-mobile-price-options-card-nocost-emi-text'>
                               NO COST EMI
                               </div>
                           </div>
                         </div>
                      </div>
                   )
                 })
               }
             <div className='detail-page-mobile-price-options-container'>
                   {
                     props?.priceOptions?.price_options?.lumpsum && props?.priceOptions?.price_options?.lumpsum.map((item,index)=>{
                       return(
                         <div className='detail-page-mobile-lumpsum-content' key={index}>
                           <div className='detail-page-mobile-lumpsum-header'>
                             LUMPSUM
                           </div>
                           <div className='detail-page-mobile-lumpsum-card'>
                              { <div className='detail-page-mobile-lumpsum-card-header'>
                                *First 7 days free trial or any sort of disclaimer comes here. 
                              </div> }
                              <div className='detail-page-mobile-lumpsum-card-detail'>
                                <div className='detail-page-mobile-lumpsum-card-detail-label'>
                                  Base Price
                                </div>
                                <div className='detail-page-mobile-lumpsum-card-detail-amount'>
                                ₹{item.amount}
                                </div>
                              </div>
                              <div className='detail-page-mobile-lumpsum-card-detail'>
                                <div className='detail-page-mobile-lumpsum-card-detail-label'>
                                Discount
                                </div>
                                <div className='detail-page-mobile-lumpsum-card-detail-amount'>
                                ₹0
                                </div>
                              </div>
                              <div className='detail-page-mobile-lumpsum-card-detail'>
                                <div className='detail-page-mobile-lumpsum-card-detail-label'>
                                Tax@18%
                                </div>
                                <div className='detail-page-mobile-lumpsum-card-detail-amount'>
                                  Included in Base Price
                                </div>
                              </div>
                              <div className='detail-page-mobile-lumpsum-total-amount-header'>
                                Total Amount
                              </div>
                              <span className='detail-page-mobile-lumpsum-total-amount'>
                              ₹{item.amount}
                              </span>
                           </div>
                         </div>
                       )
                     })
                   } 
                  </div>
              </div>
            </div>  */}
           
            
            {/* <div className='detail-page-mobile-intro'>
                <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
                Batch you can enrol in
                <div style={{position: 'absolute',top: 10}}>
                      <Image src={skribbleIcon} width={71} height={6} objectFit='contain' />
                  </div>
                </div>
                <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 10}}>
                These are the other batches available for the same course structure
                </div>
                <div className='detail-page-mobile-batch-card-container'>
                   <div className='detail-page-mobile-batch-card'>
                      <div className='detail-page-mobile-batch-card-heading'>
                        BATCH 1
                      </div>
                      <div className='detail-page-mobile-batch-card-content'>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Enrolment Opens
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        7 Mar, 2022
                        </div>
                      </div>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Enrolment Closes
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        7 Mar, 2022
                        </div>
                      </div>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Starts on
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        7 Mar, 2022
                        </div>
                      </div>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Days
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        Mon, Tue & Fri
                        </div>
                      </div>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Time
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        9:00am - 12:00pm
                        </div>
                      </div>
                      <div className='detail-page-mobile-batch-card-info'>
                        <div className='detail-page-mobile-batch-card-info-header'>
                        Seats
                        </div>
                        <div className='detail-page-mobile-batch-card-info-subheader'>
                        24
                        </div>
                      </div>
                      <div style={{marginTop: 12,width: '100%'}}>
                      <Button 
                        style={{ 
                            color:'#FFFFFF',
                            background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)',
                            borderRadius: 5,
                            width:'100%',
                            height: 40
                         }}
                        classes='btn-primary'
                        text={'Apply Now'}
                        // leadingIcon={States.upvoteButtonState.UPVOTED.icon}
                        // onClick={() => console.log('remove upvote')}
                      />
                      </div>
                      </div>
                   </div>

                   <div className='detail-page-mobile-batch-card-close' style={{marginTop: 8}}>
                    <div className='detail-page-mobile-batch-card-heading'>
                        BATCH 2
                    </div>
                    <div style={{display:'flex',justifyContent:'flex-start'}}>
                        <div className='detail-page-mobile-batch-card-heading' style={{marginRight: 10}}>
                        21 Mar, 2022
                        </div>
                        <Image src={caretDown} width={15} height={12} objectFit='contain' />
                    </div>
                   </div>
                   <div className='detail-page-mobile-batch-card-close' style={{marginTop: 8}}>
                    <div className='detail-page-mobile-batch-card-heading'>
                        BATCH 3
                    </div>
                    <div style={{display:'flex',justifyContent:'flex-start'}}>
                        <div className='detail-page-mobile-batch-card-heading' style={{marginRight: 10}}>
                        4 APR, 2022
                        </div>
                        <Image src={caretDown} width={15} height={12} objectFit='contain' />
                    </div>
                   </div>
                </div>
            </div> */}
            {/* {
             props?.similarCourses && props?.similarCourses.length > 0 ?
             <div className='detail-page-mobile-intro' style={{background: '#FFFFFF'}}>
             <div className='detail-page-mobile-intro-header' style={{fontSize: 24,display:'flex'}}>
                 Other 
                 <div style={{position:'relative'}}>
                 &nbsp;courses&nbsp;
                     <div style={{position: 'absolute',top: 10}}>
                   <Image src={underlineSkribble} width={71} height={6} objectFit='contain' />
                 </div>
                     </div> you can take
                 
             </div>
             <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 10}}>
                 You can find other available options for the course and enroll according to your availability
             </div>
                <div className='detail-page-mobile-card-container'>
                  {props?.similarCourses.length > 0 && props?.similarCourses.map((item,index)=>{
                      return(
                        <div key={index} style={{marginLeft: '-2.5rem',minWidth:'max-content'}}>
                          <CourseCard 
                            index={index}
                            data={item} 
                            openDetailModal={()=>_openDetailModal(item)}
                            openApplyNowModal={()=> _openApplyNowModal(item)}
                            token={props?.token}
                            openLoginModal={()=>props?.openLoginModal()}
                            addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                            removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                            applied={applied}
                          />
                        </div>
                      )
                    })}
                  </div>
              </div> : null
            } */}
            
            <SlidingPanel
                type={'right'}
                isOpen={detailModal}
                backdropClicked={() => setDetailModal(false)}
                size={30}
            >
           <DetailModal
            detailData={detailData} 
            theme={props?.theme} 
            openDetailModal={()=>_openDetailModal()}
            openApplyNowModal={(item)=> _openApplyNowModal(item)}
            closeDetailModal={()=>closeDetailModal(detailData)}
            handleCardActionTaken={()=>_handleCardActionTaken()}
            openLoginModal={()=>props?.openLoginModal()}
            token={props?.token}
            openQueryModal={() => setEnquire(true)}
           />
         </SlidingPanel>
         <SlidingPanel
            type={'right'}
            isOpen={applyNow}
            backdropClicked={() => setApplyNow(false)}
            size={30}
          >
             <ApplyNowModal openQueryModal={() => setEnquire(true)} detailData={detailData} closeApplyNowModal={()=>_closeApplyNowModal()} />
           </SlidingPanel>
           <SlidingPanel
            type={'right'}
            isOpen={successModal}
            backdropClicked={() => setSuccessModal(false)}
            size={30}
          >
            <SuccessApplyModal closeSuccessApplyModal={()=>_closeSuccessApplyModal()} courseName={courseName} />
          </SlidingPanel>
          <SlidingPanel
                type={'right'}
                isOpen={enquire}
                backdropClicked={_closeEnquireModal}
                size={30}
            >
                <InquiryModal 
                  closeInquiryModal={_closeEnquireModal} 
                  detailData={props?.detailData} courseName={props?.detailData?.course_name} 
                  openSuccessModal={_openQuerySuccessModal}
                />
           </SlidingPanel>
          <SlidingPanel
            type={'right'}
            isOpen={querySuccessModal}
            backdropClicked={() => setQuerySuccessModal(false)}
            size={30}
          >
            <QuerySuccessModal closeSuccessQueryModal={()=>setQuerySuccessModal(false)} courseName={props?.detailData?.course_name} />
          </SlidingPanel>
        </div> :
        <MobileDetailSkeleton />
        }
        </>

    )
}


const CustomColor = withStyles({
  root: {
    fontSize: 13,
    fontFamily: 'Work Sans',
    fontWeight: 400,
  //   lineHeight: 20,
    background: "-webkit-linear-gradient(94.15deg, #8F14CC 0%, #6602FC 99.97%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
})(Typography);