import React,{useState,useEffect, useRef, useMemo} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import axios from "axios";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {withStyles, Typography } from "@material-ui/core";
import Image from "next/image";
// import upvoteIcon from '../../assets/images/icons/upvote.svg' 
import NewButton from '../../components/button/NewButton.js'
import clockIcon from '../../assets/images/icons/clockIcon.svg';
import calendarIcon from '../../assets/images/icons/calendarIcon.svg';
import onlineIcon from '../../assets/images/icons/onlineIcon.svg';
import chartIcon from '../../assets/images/icons/chartIcon.svg';
import costIcon from '../../assets/images/icons/costIcon.svg';
import benefitBullet from '../../assets/images/icons/benefitBullet.svg';
import tableBackground from '../../assets/images/icons/tableBackground.svg';
import questionDoodle from '../../assets/images/icons/questionDoodle.svg';
import arrowIcon from '../../assets/images/icons/arrowIcon.svg';
import moduleBullets from '../../assets/images/icons/moduleBullets.svg'
import moduleSquareBullets from '../../assets/images/icons/moduleSquareBullet.svg'
import moduleArrowBullets from '../../assets/images/icons/topicArrowBullet.svg'
import longWaveIcon from '../../assets/images/icons/longWaveIcon.svg'
import shortWaveIcon from '../../assets/images/icons/shortWaveIcon.svg'
import constantCurveIcon from '../../assets/images/icons/constantCurveIcon.svg'
import LinkedlnLogo from '../../assets/images/icons/linkedin-icon.svg';
import njIcon from '../../assets/images/icons/njIcon.svg';
import skribbleIcon from '../../assets/images/icons/skribbleIcon.svg'
import underlineSkribble from '../../assets/images/icons/underlineSkribble.svg'
import certificateIcon from '../../assets/images/icons/certificate-icon.svg'
import caretDown from '../../assets/images/icons/caret-down-purple.svg'
import caretRight from '../../assets/images/icons/caret-right-purple.svg'
import userIcon from '../../assets/images/icons/user.svg'
import filledStar from '../../assets/images/icons/star-filled.svg'
import halfStar from '../../assets/images/icons/star-filled-half.svg'
import emptyStar from '../../assets/images/icons/star-empty.svg'
import backgroundImage from '../../assets/images/icons/bannerImage.svg'
import hatIcon from '../../assets/images/icons/hat.svg'
import SlidingPanel from 'react-sliding-side-panel';
import DetailModal from '../../components/detailModal/DetailModal'
import 'react-sliding-side-panel/lib/index.css';
import ApplyNowModal from '../../components/applyNowModal/ApplyNowModal'
import InquiryModal from '../../components/inquiryModal/inquiryModal'
import CourseCard from '../../components/coursecard/CourseCard';
import constant from '../../config/constant';
import { useRouter } from 'next/router'
import LoginModalContainer from '../../components/loginModal/LoginModalContainer'
import ForgotPasswordModal from '../../components/forgotPasswordModal/ForgotPasswordModal'
import upvoteLogoDark from '../../assets/images/icons/thumbs-up-dark.svg'
import bookmarkIcon from '../../assets/images/icons/bookmark.svg';
import selectedBookmarkIcon from '../../assets/images/icons/selectedBookmark.svg'
// import upvoteLogo from '../../assets/images/icons/upvote.svg'
import Link from "next/link";
import SigninModalContainer from "../../components/forgotPasswordModal/SigninModalContainer";
import SuccessApplyModal from "../../components/successApplyModal/SuccessApplyModal"
import WebDetailSkeleton from '../../components/detailPageSkeletonWeb';
import credencAcademy from '../../assets/images/icons/credencAcademy.svg'
import Button from '../../components/button/Button';
import { border, color } from '@mui/system';
import QuerySuccessModal from '../../components/querySuccessModal/QuerySuccessModal';
import { number } from 'prop-types';
import DotLoader from "react-spinners/DotLoader";

const bookmarkKey = 'credenc-edtech-bookmarks';
const UpvoteKey = 'credenc-edtech-upvote'

const spinnerCSS = {
    display: "block",
    margin: "30rem auto",
  };

const spinnerContainer = {
   position: 'fixed',
   width: '100%',
   height: '100%',
   backgroundColor: 'rgba(0,0,0,0.5)',
   zIndex: 2,
}  

export default function WebDetailPage(props){

    let router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [detailData,setDetailData] = useState({});
    const [detailModal,setDetailModal] = useState(false)
    const [applyNow, setApplyNow] = useState(false)
    const [enquire, setEnquire] = useState(false)
    const [courseName,setCourseName] = useState('')
    const [successModal,setSuccessModal] = useState(false);
    const [cardActionTaken,setCardActionTaken] = useState(false)
    const [bookmarkVisible, setBookmarkVisible] = useState(null)
    const [upvoted,setUpvoted] = useState(null)
    const [toggleUpvote,setToggleUpvote] = useState(null)
    const [topicOpen,setTopicOpen] = useState({
        topicId: 0,
        topicShow: false,
        moduleId: 0,
        moduleShow: false,
    })
    const [userEmail,setUserEmail] = useState('')
    const [loginState,setLoginState]=useState(0);
    const [applied,setApplied] = useState({
      state: false,
      id: 0
    });
    const [loader,setLoader] = useState(true)


    useEffect(() => {
      window.onpopstate = () => {
        router.push('/')
     }
  }, [router]);

    const myLoader = ({ src, width, quality }) => {
        if(src && src.length > 0){
          return `${src}?w=${width}&q=${quality || 75}`
        }else{
            return '..'
        }
    }

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
        if( props?.detailData && props?.detailData != null ){
                _handleLocalItems()
        }
      }, []);

      const _handleLocalItems = ()=>{
        if(props?.token && props?.token?.length > 0){
            _handleBookmarkData()
          }else{
            _retrieveBookmarks()
          }
          
          _handleUpvoteData()
      }
    
    
       const _retrieveBookmarks=()=>{
        let tempBookmarkData = JSON.parse(localStorage.getItem(bookmarkKey));
        if(tempBookmarkData && tempBookmarkData.length > 0){
          if (tempBookmarkData.includes(props?.detailData?.code)){
           
            setBookmarkVisible(true)
          }
          else
            setBookmarkVisible(false)
          }
          setMounted(true)
        }  
    
       const _handleBookmarkData=()=>{
          if(props?.detailData?.bookmarked === true){
            setBookmarkVisible(true)
          }else{
            setBookmarkVisible(false)
          }
       }
    
       const _handleCardBookmark=(item)=>{
         if(bookmarkVisible === true){
          _onremoveToBookmark(item)
         }else{
          _onAddToBookmark(item)
         }
        }
    
       const _onremoveToBookmark=(item)=>{
       
        setBookmarkVisible(false)
        
        if(props?.token && props?.token.length > 0){
          removeBookmarkFromBackend(item.code)
          props?.removeLocalBookmarks()
        }else{
          let bookmarkArray = [];
          let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
          if(bookmarkItem && bookmarkItem.length > 0){
            bookmarkArray =  bookmarkItem.filter(data => data !== item.code )
          }
          props?.removeLocalBookmarks(bookmarkArray.length)
          localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
    
          if(router.pathname === "/bookmarks"){
            setTimeout(() => location.reload(), 100)
          }
        }
        
      }
      
      const _onAddToBookmark=(item)=>{
        setBookmarkVisible(true)
        if(props?.token && props?.token.length > 0){
          addBookmarkToBackend(item.code)
          props?.addLocalBookmarks()
        }else{
          let bookmarkArray = [];
          let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
          if(bookmarkItem && bookmarkItem.length > 0){
            bookmarkArray.push(...bookmarkItem)
          }
          bookmarkArray.push(item.code)
          props?.addLocalBookmarks(bookmarkArray.length)
          localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
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
            if(router.pathname === "/bookmarks"){
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

      const _handleUpvoteData=()=>{
        if(props?.data?.upvoted === true){
          setUpvoted(true)
        }else{
          setUpvoted(false)
        }
       }
    
       const _handleUpvote=(item)=>{
         if(props?.token && props?.token?.length > 0){
          if(upvoted === true){
            _onRemoveToUpvote(item)
           }else{
            _onAddToUpvote(item)
           }
         }else{
           props?.openLoginModal()
         }
      
       }
    
       const _onAddToUpvote=(item)=>{
        setToggleUpvote(true)
        setUpvoted(true)
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
        setToggleUpvote(false)
        setUpvoted(false)
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

      const _closeEnquireModal = () => {
        setEnquire(false)
      }

      const closeDetailModal=(data)=>{
        setDetailModal(false)
        setDetailData(data);
        if(cardActionTaken === true){
          setTimeout(() => location.reload(), 100)
        }
      
      }

      const handleButtonClick=()=>{
        if(props?.detailData?.is_mooc === false){
          if(props?.token && props?.token.length > 0){
            if(applied?.state === false){
              if((props?.detailData?.applied === false)){
                _openApplyNowModal(props?.detailData)
              }
            }else if(applied?.state === true && applied.id === props?.detailData.id){

            }else{
              _openApplyNowModal(props?.detailData)
            }
          }else{
            props?.openLoginModal()
          }
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

    const _setUserEmail=(data)=>{
      setUserEmail(data)
    }
  
    const _setUserLoginState=(data)=>{
      setLoginState(data)
    }

    const _openSuccessApplyModal=(data)=>{
      setSuccessModal(true)
      setCourseName(data)
    }

    let [querySuccessModal, setQuerySuccessModal] = useState(false)
    const _openQuerySuccessModal = () => {
      setQuerySuccessModal(true)
    }

    const _closeSuccessApplyModal=()=>{
      setSuccessModal(false);
    }

    const _handleAppliedStage=(courseId)=>{
      setApplied({
        state: true,
        id: courseId
      })
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
              setLoader(true);
              return res.data;
            })
            .catch(err => {
              // this.coursesApiStatus.current.failed();
              setLoader(true);
              console.log(err);
            });
        } else {
          setLoader(true);
          setError('Oh! Looks like you forgot to give us a rating')
        }
      }else{
        props?.openLoginModal()
      }
      
    }

    const handleNavStates = (navState) => {
      setNavActiveStates([...navState])
    }

    const overviewRef = useRef(null)
    const syllabusRef = useRef(null)
    const instructorRef = useRef(null)
    const pricingRef = useRef(null)
    const reviewsRef = useRef(null)

    const [ scrollY, setScrollY ] = useState()

    useEffect(() => {

      setScrollY(window.scrollY)
  
      window.addEventListener("scroll", () => setScrollY(window.scrollY));
      return () => {
        window.removeEventListener("scroll", () => setScrollY(window.scrollY));
      };
  
      
    }, []);

    const [isSyllabusIntersecting, setSyllabusIntersecting] = useState(false)
    const [isInstructorIntersecting, setInstructorIntersecting] = useState(false)
    const [isPricingIntersecting, setPricingIntersecting] = useState(false)
    const [isReviewsIntersecting, setReviewsIntersecting] = useState(false)

    const syllabusObserver = useMemo(() => new IntersectionObserver(
      ([entry]) => {
        setSyllabusIntersecting(entry.isIntersecting)
        if(entry.isIntersecting === true){
          setInstructorIntersecting(false)
          setPricingIntersecting(false)
          setReviewsIntersecting(false)
        }
      }
    ), [syllabusRef])

    const instructorObserver = useMemo(() => new IntersectionObserver(
      ([entry]) => {
        setInstructorIntersecting(entry.isIntersecting)
        if(entry.isIntersecting === true){
          setSyllabusIntersecting(false)
          setPricingIntersecting(false)
          setReviewsIntersecting(false)
        }
      }
    ), [instructorRef])

    const pricingObserver = useMemo(() => new IntersectionObserver(
      ([entry]) => {
        setPricingIntersecting(entry.isIntersecting)
        if(entry.isIntersecting === true){
          setInstructorIntersecting(false)
          setSyllabusIntersecting(false)
          setReviewsIntersecting(false)
        }
      }
    ), [pricingRef])

    const reviewsObserver = useMemo(() => new IntersectionObserver(
      ([entry]) => {
        setReviewsIntersecting(entry.isIntersecting)
        if(entry.isIntersecting === true){
          setInstructorIntersecting(false)
          setPricingIntersecting(false)
          setSyllabusIntersecting(false)
        }
      }
    ), [reviewsRef])

    useEffect(() => {
      if(syllabusRef.current){
        syllabusObserver.observe(syllabusRef.current)
      }

      if(instructorRef.current){
        instructorObserver.observe(instructorRef.current)
      }

      if(pricingRef.current){
        pricingObserver.observe(pricingRef.current)
      }

      if(reviewsRef.current){
        reviewsObserver.observe(reviewsRef.current)
      }

      return () => {
        syllabusRef.current && syllabusObserver.disconnect()
        instructorRef.current && instructorObserver.disconnect()
        pricingRef.current && pricingObserver.disconnect()
        reviewsRef.current && reviewsObserver.disconnect()
      }
    }, [scrollY])
    
    useEffect(()=>{
      if(props?.subjectData.search === true){
        router.push('/')
        props?.openFilterExpandedStage()  
      }
    },[props?.subjectData?.searchValue])

    return(
        <>
        { props?.detailData && props?.detailData != null &&
            // mounted && 

        <div className='detail-page-web'>
          <ul className='navbar'>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
              <li className={`nav-item ${!isSyllabusIntersecting && !isInstructorIntersecting && !isPricingIntersecting && !isReviewsIntersecting  ? 'active': ''}`} ><Link href="#" scroll={true}>Overview</Link></li>
              {curriculum.length > 0 && <li className={`nav-item ${isSyllabusIntersecting ? 'active': ''}`} ><Link href="#syllabus" scroll={true}>Syllabus</Link></li>}
              {props?.instructorData?.instructor?.length > 0 && <li className={`nav-item ${isInstructorIntersecting ? 'active': ''}`} ><Link href="#instructor" scroll={true}>Instructor</Link></li>}
              <li className={`nav-item ${isPricingIntersecting ? 'active': ''}`} ><Link href="#pricing" scroll={true}>Pricing</Link></li>
              <li className={`nav-item ${isReviewsIntersecting ? 'active': ''}`} ><Link href="#reviews" scroll={true}>Reviews</Link></li>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
              <li className='nav-item-right' style={{margin: '0 1rem 0 0'}} onClick={()=>_handleCardBookmark(props?.detailData)}><Image src={ bookmarkVisible ? selectedBookmarkIcon : bookmarkIcon} width={20} height={20} objectFit='contain' /></li>
              <li className='nav-item-right'><button style={{backgroundColor: 'transparent', color: '#000000', border: '1px solid #034FE2'}} onClick={() => setEnquire(true)}>Talk to Us</button></li>
              {
                (!props?.detailData.is_mooc && !(props?.detailData?.applied === true || (applied?.state === true && applied?.id === props?.detailData?.id)))  && <li className='nav-item-right'><button onClick={()=> handleButtonClick()}>{'Apply Now'}</button></li>
              }
              {
                (!props?.detailData.is_mooc && (props?.detailData?.applied === true || (applied?.state === true && applied?.id === props?.detailData?.id)))  && <li className='nav-item-right'><button onClick={() => _openDetailModal(props?.detailData)}>Track Application</button></li>
              }
              {
                !props?.detailData.is_mooc  && <a href={props?.detailData?.course_link} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}><li className='nav-item-right'><button>Go To Course</button></li></a>
              }
              
            </div>
          </ul>
          <div className='head-jumbotron' style={{background: 'rgba(235,241,255, 0.9)', backgroundImage: `url(${backgroundImage.src})`, backgroundSize: 'cover'}}>
            <div className='title'>{props?.courseName}</div>
            {props?.detailData?.program_type && <div className='subtitle'>
              <Image src={certificateIcon} width={20} height={20} objectFit='contain' />
              <span>&ensp;{props?.detailData?.program_type}</span>
            </div>}
            <div className='description' style={{textAlign: 'center', padding: '0 20rem'}}>
            {props?.detailData?.one_liner || props?.detailData?.description}
            </div>
            <div className='items'>
              {
                props?.detailData?.educator_list?.map((item, index) => {
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
                <div className='description' style={{width: '80%'}}>Our team of experts is here to help you. Contact us today and we&apos;re here to help you find clarity and move forward with confidence.</div>
              </div>
              <button style={{width: '21%'}} onClick={() => setEnquire(true)}>Talk to an Expert!</button>
            </div>
          </div>

          {curriculum.length > 0 && <div className='container' id='syllabus' ref={syllabusRef}>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '2rem'}}>
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
                              <div style={{padding: '2rem 2rem 2rem'}}>
                                <Image src={caretRight} width={15} height={15} objectFit='contain' style={{rotate: module.display === true ? '90deg' : '0deg'}} />
                              </div>
                              <div style={{width: '96%'}}>
                                <div className='item-content'>
                                  <div style={{fontSize: '1.7rem', fontWeight: '500', lineHeight: '2rem', color: '#000000'}}>{module.title}</div>
                                </div>
                                {
                                  module.display && module['sub_topics']?.map((topic, topicIndex) => {
                                    return(
                                      <div className='curriculum-item' key={topicIndex}>
                                        <div style={{width: '96%'}}>
                                          <div className='item-content'>
                                              <div style={{fontSize: '1.5rem', fontWeight: '400', lineHeight: '1.76rem', color: '#000000'}}>{topic}</div>
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

          {props?.instructorData?.instructor?.length > 0 && <div className='container' id='instructor' ref={instructorRef}>
            <div className='heading'>Instructors</div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', rowGap: '3.6rem', flexWrap: 'wrap', padding: '3.6rem 0 0 0'}}>
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

          <div className='container' id='pricing' ref={pricingRef}>
            {(props?.thirdPartyUser === constant.PARTNER_KEY.NJ || props?.priceOptions?.credenc_loan) && <div className='heading' style={{paddingBottom: '0.9rem'}}>Pricing</div>}
            {props?.thirdPartyUser === constant.PARTNER_KEY.NJ && <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
             <div>
                <div style={{fontSize: '1.4rem', fontWeight: '600', lineHeight: '1.6rem', color: '#222222'}}>EMI PLANS</div>
                <div style={{fontSize: '1.2rem', fontWeight: '400', lineHeight: '1.4rem', color: '#8F14CC'}}>Powered by NJ Capital</div>
              </div>
              <div>
                <div style={{fontSize: '1.2rem', fontWeight: '500', lineHeight: '1.4rem', color: '#717171'}}>Starts from</div>
                <div style={{fontSize: '2rem', fontWeight: '700', lineHeight: '2.3rem', color: '#034FE2'}}>₹{props?.startingCost.starting_cost}*</div>
              </div>
            </div>}

            {props?.thirdPartyUser === constant.PARTNER_KEY.NJ && <div className='confused-container' style={{width: '100%', justifyContent: 'flex-start', alignItems: 'center', padding: '1rem', margin: '1rem 0'}}>
                <Image src={njIcon} width={20} height={20} objectFit='contain' />
                &emsp;
                <div style={{fontSize: '1.2rem', fontWeight: '500', lineHeight: '1.4rem', color: '#000000'}}>You have a Pre-Approved Loan of Rs. 20 lacs from NJ Capital</div>
            </div>}

            {props?.priceOptions?.credenc_loan && <div className='confused-container' style={{width: '100%'}}>
              <div>
                <div className='heading' style={{marginBottom: '0.4rem'}}>Credenc Loan</div>
                <div className='description'>Avail an education loan quickly.</div>
              </div>
              <button onClick={() => setEnquire(true)}>Talk to Us!</button>
            </div>}
            {props?.priceOptions?.enquiry === true && <div className='confused-container' style={{width: '100%'}}>
              <div>
                <div className='heading' style={{marginBottom: '1.2rem'}}>Price?</div>
              </div>
              <button onClick={() => setEnquire(true)}>Inquire Now</button>
            </div>}

            {props?.priceOptions?.emi_options?.length > 0 && <div className='detail-page-mobile-price-options-container' style={{width: '100%'}}>
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
                <div className='detail-page-mobile-price-options-card-info'>
                <div className='detail-page-mobile-price-options-card-info-heading'>
                Down Payment
                </div>
                <div className='detail-page-mobile-price-options-card-info-subheading'>
                    {item.downPayment}
                </div>
                </div>
                <div className='detail-page-mobile-price-options-card-info' style={{marginTop:12}}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <div className='detail-page-mobile-price-options-card-info-amount-header'>
                    Total Amount
                    </div>
                    <div className='detail-page-mobile-price-options-card-info-amount-text'>
                    ₹ {item.financeAmount}
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
            </div>} 

            {props?.priceOptions?.price_options?.lumpsum?.length > 0 && <div className='detail-page-mobile-price-options-container'>
              {
                props?.priceOptions?.price_options?.lumpsum && props?.priceOptions?.price_options?.lumpsum.map((item,index)=>{
                  return(
                    <div className='detail-page-mobile-lumpsum-content' key={index}>
                      <div className='detail-page-mobile-lumpsum-header'>
                        LUMPSUM
                      </div>
                      <div className='detail-page-mobile-lumpsum-card'>
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
            </div>}
          </div>

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
            {reviews?.length > 0 && <div style={{width: '100%', display: 'flex', rowGap: '3.6rem', flexDirection: 'row', flexWrap: 'wrap', padding: '3.6rem 0 0 0'}}>
              {reviews.map(
                  (review, index) => {
                      return (<div className='feature' key={index}>
                        {
                          review?.review?.user?.profile_image && <Image src={review?.review?.user?.profile_image} width={100} height={100} objectFit='contain' loader={myLoader} />
                        }
                        <div style={{fontSize: '2.4rem', fontWeight: '400', lineHeight: '3.6rem', color: '#000000'}}>{review['review']['user']['full_name']}</div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                          {
                            [1, 2, 3, 4, 5].map(el => <Image key={el} src={review.rating / el >= 1 ? filledStar : (el - review.rating) >= 1 ? emptyStar : halfStar} width={12} height={12} objectFit='contain' />)
                          }
                          <div style={{fontSize: '1rem', fontWeight: '400', lineHeight: '1.4rem', color: '#8F14CC'}}>&ensp;{parseFloat(review.rating).toFixed(1)}</div>
                        </div>
                        <div style={{fontSize: '1.5rem', fontWeight: '400', lineHeight: '2.25rem', color: '#000000'}}>{review['review']['review']}</div>
                      </div>)
                  }
              )}
            </div>}
            <div className='leave-review'>
              <div style={{fontSize: '1.6rem', fontWeight: '500', lineHeight: '2.4rem', color: '#000000'}}>How was your experience with the course?</div>
              <div style={{fontSize: '1.4rem', fontWeight: '400', lineHeight: '1.6rem', color: '#000000', margin: '1rem 0 2rem 0'}}>Leave a review and help others in their learning journey!</div>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                {
                  [1, 2, 3, 4, 5].map(el => <Image key={el} src={userRating / el >= 1 ? filledStar : (el - userRating) >= 1 ? emptyStar : halfStar} width={30} height={30} objectFit='contain' onClick={() => setUserRating(el)}/>)
                }
              </div> 
              <div style={{color: 'var(--errorPrimaryColor)', margin: '1rem 0 2rem 0', fontSize: '1.3rem'}}>{error}</div>
              <textarea rows={8} placeholder="This course is amazing..." onChange={(e) => handleReviewChange(e.target.value)} value={reviewText}></textarea>
              <button 
                style={{cursor: 'pointer', backgroundColor: '#034FE2', padding: '1.6rem 2.4rem', margin: '1.6rem', border: 'none', borderRadius: '0.8rem', color: '#FFFFFF', fontSize: '1.6rem', fontFamily: 'Work Sans'}}
                onClick={()=>{
                  setLoader(false)
                  submitReview()
                }}
              >Leave a Review
              </button>
            </div>
          </div>

          <div style={{padding: '2rem 0 3rem 0', marginRight: 'auto', width: '100%'}}>
            <div className='heading' style={{paddingBottom: '0.9rem', padding: '0 0 0.9rem 3rem'}}>You Might Be Interested In</div>
            <div className='detail-page-mobile-card-container' style={{display:'flex',marginTop: 20,gap: 20,overflow:'auto'}}>
              {props?.similarCourses?.length > 0 && props?.similarCourses.map((item,index)=>{
                  return(
                    <div key={index} style={{margin: index === 0 ? '0 0 0 3rem' : index === props?.similarCourses?.length - 1 ? '0 3rem 0 0' : 'none'}}>
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
          

          {/* <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',padding: '0px 24px 0px 24px'}}>
           <div className='detail-page-web-breadcrumb'>
           <Breadcrumbs
                separator={<NavigateNextIcon fontSize="medium" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
           </div>
           <div className='detail-page-web-header'>
             {
              props?.detailData?.platform && props?.detailData?.platform?.logo !== null ? 
               <div className='detail-page-web-host'>
                <Image loader={myLoader} src={props?.detailData?.platform?.logo} alt='platform-icon' height={38} width={38} objectFit="contain" />
                   <div className='detail-page-web-platform' style={{flexDirection: 'column'}}>
                       <span className='detail-page-web-platform-heading'>
                         Hosted on
                       </span>
                       <span className='detail-page-web-platform-subHeading'>
                         {props?.detailData?.platform?.name}
                       </span>
                   </div>
                </div> : null
              }
                
                <div className='detail-page-web-action-container'>
                   <div className='web-action-grey-container' onClick={()=>_handleCardBookmark(props?.detailData)} style={bookmarkVisible === true ? {background: "linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)",cursor:'pointer'} : {cursor: 'pointer'}}>
                    <Image src={bookmarkVisible === true  ? selectedBookmark : bookmarkIcon  } width={20} height={20} objectFit='contain' />
                   </div>
                   <div 
                      className='web-action-grey-container'
                      onClick={()=> _handleUpvote(props?.detailData)}
                      style={upvoted ? { 
                        background: 'linear-gradient(94.29deg, #3399CC 0%, #00CB9C 100%)',
                        cursor:'pointer',
                        flexDirection: 'row',
                        gap: 0,
                        width: 42
                      } : {
                        cursor:'pointer',
                        flexDirection: 'row',
                        gap: 0,
                        width: 42
                      }}
                   >
                    <span className='count-text' style={upvoted ? {color: '#FFFFFF'} : null}>{toggleUpvote ? props?.detailData?.up_votes + 1 : props?.detailData?.up_votes}</span>
                    <Image src={upvoted ? upvoteLogoDark : upvoteLogo} width={20} height={20} objectFit='contain' />
                   </div>
                   {
                     props?.detailData?.is_mooc === true ? 
                        <a href={props?.detailData?.course_link} target="_blank" rel="noreferrer">
                          <div>
                            <NewButton 
                              width={'172px'} 
                              height={'44px'} 
                              linearGradient={'linear-gradient(94.15deg, #FF00DD 0%, #5100FF 99.97%)'}
                              text={"Go To Course"}
                              // handleButtonClick={()=> handleButtonClick()}
                            />
                          </div>
                        </a>
                        :
                        <div>
                          <NewButton 
                            width={'172px'} 
                            height={'44px'} 
                            linearGradient={'linear-gradient(94.15deg, #FF00DD 0%, #5100FF 99.97%)'}
                            text={((props?.detailData?.applied === true) || (applied?.state === true && applied?.id === props?.detailData?.id)) ? 'Applied' : 'Apply Now'}
                            handleButtonClick={()=> handleButtonClick()}
                          />
                        </div>
                   }
                   
                </div>
            </div>
            
            </div> */}
            {/* {
               props?.detailData?.preview ? 
               <div className='detail-page-mobile-banner' style={{display:'contents'}}>
                 <Image loader={myLoader} src={props?.detailData?.preview} height={277} width={'100%'} objectFit="contain" />
               </div> 
               : null
              } */}
           {/* <div className='detail-page-web-course-data-container'>
                  <div className='course-data-left-container'>
                    {
                      props?.detailData?.course_name && props?.detailData?.course_name.length > 0 ? 
                      <div className='detail-page-content-course-name'>
                            {props?.detailData?.course_name}
                      </div> :
                      null
                    }
                    
                    {
                      props?.detailData?.one_liner &&  props?.detailData?.one_liner.length > 0 ? 
                            <span className='detail-page-content-one-liner' style={{marginTop: 10}}>
                            {props?.detailData?.one_liner}
                        </span> : null
                    }
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
                    </div>
                  </div>
                  <div className='course-data-right-container'>
                    {
                      props?.detailData?.program_type && props?.detailData?.program_type.length > 0 ?
                      <div className='detail-page-content-heading'>
                            {props?.detailData?.program_type}
                        </div> :
                        null
                    }
                         
                        <div className='detail-page-info-container'>
                            <div className='detail-page-info-segement'>
                                <div className='detail-page-content-educator-details'>
                                    <div className='detail-page-content-educator-info'>
                                        <Image src={onlineIcon} height={28} width={28} objectFit='contain' />
                                        <div className='detail-page-content-educator-info-header'>MODE</div>
                                    </div>
                                    <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.class_modes && props?.detailData?.class_modes.length > 0 ? props?.detailData?.class_modes[0] : 'RECORDED'}</div>
                                </div>
                            </div>
                            <div className='detail-page-info-segement'>
                                <div className='detail-page-content-educator-details'>
                                    <div className='detail-page-content-educator-info'>
                                        <Image src={calendarIcon} height={28} width={28} objectFit='contain' />
                                        <div className='detail-page-content-educator-info-header'>DURATION</div>
                                    </div>
                                    <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.duration && props?.detailData?.duration.length > 0 ? props?.detailData?.duration : '-'}</div>
                                </div>
                            </div>
                            <div className='detail-page-info-segement'>
                            <div className='detail-page-content-educator-details'>
                                <div className='detail-page-content-educator-info'>
                                        <Image src={clockIcon} height={28} width={28} objectFit='contain' />
                                        <div className='detail-page-content-educator-info-header'>PACE</div>
                                    </div>
                                    <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.pace && props?.detailData?.pace.length > 0 ? props?.detailData?.pace : '-'}</div>
                                </div>
                            </div>
                            <div className='detail-page-info-segement'>
                            <div className='detail-page-content-educator-details'>
                                <div className='detail-page-content-educator-info'>
                                    <Image src={chartIcon} height={28} width={28} objectFit='contain' />
                                    <div className='detail-page-content-educator-info-header'>LEVEL</div>
                                </div>
                                <div className='detail-page-content-educator-info-subheader'>{props?.detailData?.start_level && props?.detailData?.start_level.length > 0 ? props?.detailData?.start_level : ''} - {props?.detailData?.end_level && props?.detailData?.end_level.length > 0 ? props?.detailData?.end_level : ''}</div>
                            </div>
                            </div>
                            <div className='detail-page-info-segement'>
                            <div className='detail-page-content-educator-details'>
                                    <div className='detail-page-content-educator-info'>
                                        <Image src={costIcon} height={28} width={28} objectFit='contain' />
                                        <div className='detail-page-content-educator-info-header'>{props?.thirdPartyUser === constant.PARTNER_KEY.NJ ? 'Starting Cost' : 'Base Price'}</div>
                                    </div>
                                    <div className='detail-page-content-educator-info-subheader' style={{textAlign:'right'}}>{ props?.startingCost?.starting_cost && props?.startingCost?.starting_cost.length > 0 ? `₹ ${props?.startingCost?.starting_cost[0]}` : props?.detailData?.finance_display && props?.detailData?.finance_display.length > 0 ? `₹${props?.detailData?.finance_display[0]}` : 'Unknown'}</div>
                                </div>
                            </div>
                        </div>
                  </div>
            </div> */}
            {/* <div className='detail-page-web-course-grey-section' style={{flexDirection:'row'}}>
                    {
                      props?.detailData?.description && props?.detailData?.description.length > 0 ?
                      <div className='detail-page-grey-left-content'>
                        <div className='detail-page-mobile-intro-header'>
                            Introduction
                        </div>
                        <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 10,paddingRight: 50}}>
                            {props?.detailData?.description}
                        </div>
                      </div> : null
                    }
              
              
                    {
                      props?.toolData?.usps &&  props?.toolData?.usps.length > 0 ? 
                      <div className='detail-page-grey-right-content'>
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
                    }
              
            </div> */}
            {/* {
               props?.detailData?.eligibility && props?.detailData?.eligibility.length > 0 ?
                <div style={styles}>
                                <div className='detail-page-web-intro-header' style={{marginTop: 40,fontSize: 22,display:'flex',marginLeft: 24}}>
                                    Am I Eligible<div style={{position:'relative'}}>
                                    &nbsp;?&nbsp;
                                        <div style={{position:'absolute',top: -12,left: 5}}>
                                            <Image src={questionDoodle} height={25} width={19} objectFit='contain' />
                                        </div>
                                        </div> Yes, If you have...
                                </div>
                                <div style={{marginTop: 16}}>
                                    {
                                        props?.detailData?.eligibility && props?.detailData?.eligibility.length > 0 && props?.detailData?.eligibility.map((content,index)=>{
                                            return(
                                            <div className='detail-page-web-intro-content' style={{marginTop: 10,display: 'flex',marginBottom: 10,marginLeft: 24}} key={index}>
                                                <div style={{marginTop: 5}}>
                                                <Image src={arrowIcon} height={12} width={19} objectFit='contain' />
                                                </div>
                                                <div className='detail-page-web-intro-subHeader' style={{marginLeft: 8}}>
                                                {content}
                                                </div>
                                            </div>
                                            )
                                        })
                                    }
                                </div>
                </div> : null
            } */}
            {/* <div className='detail-page-web-course-grey-section' style={{gap: 0,marginTop: 0}}>
              {
                props?.toolData?.curriculum && props?.toolData?.curriculum.length > 0 ?
                <div className='detail-page-grey-left-content' style={{width: '50%'}}>
                <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
                  What you’ll learn
                  <div style={{position: 'absolute',top: 17}}>
                      <Image src={longWaveIcon} width={200} height={11} objectFit='contain' />
                  </div>
                </div>
                <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 16,marginBottom: 16}}>
                    This is the course structure and curriculum that will be followed over the coming weeks
                </div>
                {
                 props?.toolData?.curriculum && props?.toolData?.curriculum.length > 0 &&  props?.toolData?.curriculum.map((item,index)=>{
                        return(
                            <div style={{display: 'flex',flexDirection: 'column',width:'100%'}} key={index}>
                                <div className='detail-page-mobile-module-content' key={index} style={ item.id != topicOpen.topicId && topicOpen.topicShow ? {opacity: 0.5,width:'100%'} : {width: '100%'}}>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                        <div >
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
                                              </div> 
                                              : null
                                            }
                                            
                                        </div>
                                    </div>
                                    {
                                      item.sub_module.length > 0 ? 
                                      <div style={{display:'flex',justifyContent:'flex-end',cursor:'pointer'}} onClick={()=> item.sub_module && item.sub_module.length > 0 ? _handleTopicOpen(item) : null}>
                                        <Image src={caretDown} width={15} height={12} objectFit='contain' style={item.id === topicOpen.topicId && topicOpen.topicShow ? {transform: "rotate(180deg)"} : null}/>
                                      </div> : null
                                    }
                                    
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
                                                            {data.title} {data?.sub_topics && data?.sub_topics.length === 1 ? `| ${data?.sub_topics[0]}` : ''}
                                                        </div>
                                                    </div>
                                                    {
                                                    data.sub_topics &&  data.sub_topics.length > 1 ?
                                                      <div style={{cursor:'pointer'}}>
                                                        <Image src={caretDown} width={15} height={12} objectFit='contain' onClick={()=>_handleModuleOpen(item,data)} style={data.id === topicOpen.moduleId && topicOpen.moduleShow ? {transform: "rotate(180deg)"} : null}/>
                                                      </div> 
                                                    : null
                                                    }
                                                    
                                                </div>
                                                {
                                                  topicOpen.topicShow && topicOpen.topicId === item.id && topicOpen.moduleShow && topicOpen.moduleId === data.id ?  
                                                   data.sub_topics.length > 1 && data.sub_topics.map((info,serial)=>{
                                                        return(
                                                          <div style={{display:'flex',flexDirection:'column'}} key={serial}>
                                                            <div className='detail-page-mobile-module-bullet-section-topic-text'>
                                                                {info}
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
              }
              
                <div className='detail-page-grey-right-content' style={{marginLeft: 40}}>
                {
                props?.toolData?.skills && props?.toolData?.skills.length > 0 ? 
                <div>
                <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
                 Skills You Will Master
                    <div style={{position: 'absolute',top: 10}}>
                      <Image src={shortWaveIcon} width={57} height={6} objectFit='contain' />
                  </div>
                </div>
                <div className='detail-page-mobile-skill-container' style={{marginTop: 24}}>
                    {
                        props?.toolData?.skills && props?.toolData?.skills.length > 0 && props?.toolData?.skills.map((item,index)=>{
                            return(
                                <div className='detail-page-mobile-skill-content' key={index}>
                                    {item}
                               </div>
                            )
                        })
                    }
                </div>
            </div> : null
            }
                </div>
            </div> */}
            {/* <div>
                {
                    props?.instructorData?.instructor && props?.instructorData?.instructor.length > 0 ? 
                    <div className='detail-page-web-course-grey-section' style={{flexDirection:'column',marginTop:0,gap: 0,flexWrap:'wrap',overflow:'auto'}}>
                    <div className='detail-page-mobile-intro-header' style={{position:'relative'}}>
                    Who will teach you?
                    <div style={{position: 'absolute',top: 10,left:-20}}>
                            <Image src={constantCurveIcon} width={224} height={8} objectFit='contain' />
                        </div>
                    </div>
                    <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 20}}>
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
                                    <div className='detail-page-mobile-instructor-card-designation'>
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
                }
                </div> */}
                {/* <div style={{...styles}}>

                  <div className='detail-page-mobile-intro'>
                  <div className='detail-page-mobile-intro-header' style={{fontSize: 22}}>
                  How Much Would You Pay?
                  </div>
                  <div className='detail-page-mobile-intro-subHeader' style={{marginTop: 10}}>
                  Explore your pre-approved Loan and EMI Options! Have your pick and pay at your own discretion!
                  </div>
                  {
                    props?.thirdPartyUser === constant.PARTNER_KEY.NJ ? 
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
                  </div> : <div />
                  }
                  {
                    props?.thirdPartyUser === constant.PARTNER_KEY.NJ ? 
                    <div className='detail-page-mobile-nj-section'>
                      <Image src={njIcon} objectFit='contain' height={21} width={23} />
                      <div className='detail-page-mobile-nj-section-text'>
                          You have a Pre-Approved Loan from NJ Capital
                      </div>
                  </div> : <div className='detail-page-mobile-nj-section'>
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
                    <div className='detail-page-mobile-price-options-card-info'>
                    <div className='detail-page-mobile-price-options-card-info-heading'>
                    Down Payment
                    </div>
                    <div className='detail-page-mobile-price-options-card-info-subheading'>
                        {item.downPayment}
                    </div>
                    </div>
                    <div className='detail-page-mobile-price-options-card-info' style={{marginTop:12}}>
                        <div style={{display:'flex',flexDirection:'column'}}>
                        <div className='detail-page-mobile-price-options-card-info-amount-header'>
                        Total Amount
                        </div>
                        <div className='detail-page-mobile-price-options-card-info-amount-text'>
                        ₹ {item.financeAmount}
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
                </div>  

                
                   <div className='detail-page-mobile-price-options-container'>
                   {
                     props?.priceOptions?.price_options?.lumpsum && props?.priceOptions?.price_options?.lumpsum.map((item,index)=>{
                       return(
                         <div className='detail-page-mobile-lumpsum-content' key={index}>
                           <div className='detail-page-mobile-lumpsum-header'>
                             LUMPSUM
                           </div>
                           <div className='detail-page-mobile-lumpsum-card'>
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
               </div> */}
               {/* <div>
                    <div className='detail-page-mobile-intro'>
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
                                linearGradient =''
                                classes='btn-primary'
                                text={'Apply Now'}
                                // leadingIcon={States.upvoteButtonState.UPVOTED.icon}
                                // onClick={() => console.log('remove upvote')}
                            />
                            <NewButton 
                                width={'100%'} 
                                height={'44px'} 
                                linearGradient={'linear-gradient(94.15deg, #FF00DD 0%, #5100FF 99.97%)'}
                                text='Apply Now'
                                handleButtonClick={()=>handleButtonClick()}
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
                    </div>
               </div> */}
              {/* {
                props?.similarCourses && props?.similarCourses.length > 0 ?
                    <div className='detail-page-mobile-intro' style={styles}>
                    <div className='detail-page-mobile-intro-header' style={{fontSize: 24,display:'flex',flexDirection:'row'}}>
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
                    <div className='detail-page-mobile-card-container' style={{display:'flex',marginTop: 20,gap: 20,overflow:'auto'}}>
                    {props?.similarCourses.length > 0 && props?.similarCourses.map((item,index)=>{
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
                </div> : null
              } */}
               

            {
                props?.loginModal ? 
                <div style={{width: '100%',height: '100%'}}>
                <LoginModalContainer
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
              <SigninModalContainer
                handleForgotPasswordEnd={()=>props?.handleForgotPasswordEnd()}
                closeForgotPasswordModal={()=>props?.closeForgotPasswordModal()}
                userEmail={userEmail}
                openLoginModal={()=>props?.openLoginModal()}
                loginState={loginState}
              />
              : null
            }
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
                    status={((props?.detailData?.applied === true) || (applied?.state === true && applied?.id === props?.detailData?.id)) ? true : false}
                />
            </SlidingPanel>
            <SlidingPanel
                type={'right'}
                isOpen={applyNow}
                backdropClicked={() => setApplyNow(false)}
                size={30}
            >
                <ApplyNowModal 
                  openQueryModal={() => setEnquire(true)}
                  closeApplyNowModal={()=>_closeApplyNowModal()} 
                  detailData={props?.detailData} courseName={props?.detailData?.course_name} 
                  openSuccessApplyModal={(courseName)=>_openSuccessApplyModal(courseName)}  
                  handleAppliedStage={(id)=>_handleAppliedStage(id)}
                />
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
                  openSuccessModal={()=>_openQuerySuccessModal()}
                />
           </SlidingPanel>
           <SlidingPanel
            type={'right'}
            isOpen={successModal}
            backdropClicked={() => setSuccessModal(false)}
            size={30}
          >
            <SuccessApplyModal closeSuccessApplyModal={()=>_closeSuccessApplyModal()} courseName={props?.detailData?.course_name} />
          </SlidingPanel>
          <SlidingPanel
            type={'right'}
            isOpen={querySuccessModal}
            backdropClicked={() => setQuerySuccessModal(false)}
            size={30}
          >
            <QuerySuccessModal closeSuccessQueryModal={()=>setQuerySuccessModal(false)} courseName={props?.detailData?.course_name} />
          </SlidingPanel>
          {
            !loader && <div style={spinnerContainer}>
            <DotLoader
                cssOverride={spinnerCSS}
                size={100}
                color={"#000000"}
                loading={!loader}
                speedMultiplier={1}
            />
            </div> 
          }
          
        </div>
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