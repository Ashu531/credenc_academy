import React, { useEffect, useState,useRef } from "react"
import { connect } from 'react-redux'
import {changeTheme} from '../../scripts/actions/index'
import Banner from '../../components/banner/Banner'
import CourseCard from '../../components/coursecard/CourseCard'
import Navbar from '../../components/navbar/Navbar'
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import constant from '../../config/constant.js'
import { useRouter } from 'next/router'
import DetailModal from '../../components/detailModal/DetailModal'
import { getDataFromUrl } from "../../helper/userService";
import Error from "../../components/error/Error"
import theme from "../../scripts/reducers/theme"
import States from '../../config/states';
import SegmentedBar from "../../components/segementedBar/SegmentedBar";
import SecondaryDropdown from "../../components/primaryDropdown/SecondaryDropdown";
import List from "../../components/list/List";
import Lists from "../../config/list";
import Filter from "../../components/filter/Filter";
import axios from "axios";
import ApiStatus from "../../config/apiStatus";
import UrlService from "../../helper/urlService";
import Button from "../../components/button/Button";
import Link from "next/link";
import { getTabNumber } from "../../helper/getTabNumber";
import filterIcon from '../../assets/images/icons/filter-icon-dark.svg';
import closeIcon from '../../assets/images/icons/close-icon-grey.svg';
import trendingIcon from '../../assets/images/icons/trendingIcon.svg';
import mostLikedIcon from '../../assets/images/icons/mostLikedIcon.svg';
import FloatActionButton from "../../components/floatActionButton/floatActionButton";
import LoginModalContainer from '../../components/loginModal/LoginModalContainer'
import ForgotPasswordModal from '../../components/forgotPasswordModal/ForgotPasswordModal'
import SearchBar from '../../components/searchBar/SearchBar'
import ApplyNowModal from '../../components/applyNowModal/ApplyNowModal'
import HomeSkeleton from "../../components/homePageSkeleton/homeSkeleton"
import Skeleton from '@mui/material/Skeleton';
import SuccessApplyModal from "../../components/successApplyModal/SuccessApplyModal"
import SigninModalContainer from "../../components/forgotPasswordModal/SigninModalContainer"
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from "next/image";
import CredencFeatures from "../../components/credencFeatures/credencFeatures"
import bannerImage from '../../assets/images/icons/bannerImage.svg'
import BrowseCategories from "../../components/browseCategory/Categories"
import CourseTrivia from "../../components/courseTrivia/CourseTrivia"
import QuerySuccessModal from "../../components/querySuccessModal/QuerySuccessModal"
import InquiryModal from "../../components/inquiryModal/inquiryModal"

const styles = {
    // width: "100%",
    height: "60%",
    backgroundImage: `url(${bannerImage.src})`,  
  };

const subjectKey = 'credenc-edtech-subject';

const queries = {
  PROFESSION: 'profession',
  COURSE_TYPE: 'course_type',
  SUB_CATEGORY: 'field',
  CATEGORY: 'subject',
  CLASS_MODE: 'class_mode',
  COURSE_PACE: 'course_pace',
  MIN_PRICE: 'min_price',
  MAX_PRICE: 'max_price',
  // EMI: 'emi',
  // INSTALLMENTS: 'installments',
  // NO_COST_EMI: 'no_cost_emi',
  // SUBSCRIPTION: 'subscription',
  // PAY_AFTER_PLACEMENT: 'pay_after_placement',
  DIFFICULTY: 'start_level',
  LANGUAGES: 'languages',
  // FREE: 'free',
  // PARTIALLY_FREE: 'partially_free',
  // PAID: 'fully_paid',
  PRICE_TYPE: 'price_type',
  SORT_BY_PRICE_HTL: 'sort_by_price_high',
  SORT_BY_PRICE_LTH: 'sort_by_price_low',
  SORT_BY_RELEVANCE: 'sort_by_relevance',
  SORT_BY_DATE: 'sort_by_date',
  FINANCE_OPTIONS: 'finance_options',
  PLATFORM: 'platform',
  EDUCATOR: 'educator'

};

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};



function DashboardDesktop(props) {

  const isMount = useIsMount();
  let location = useRouter();
  let nextURL=location?.asPath?.substring(2,location?.asPath?.length)
  let urlService = useRef(new UrlService(nextURL));

  const listTypes = States.listTypes;
  const filterList = Lists.filters;

  const [filterModal, setFilterModal] = useState(false);
  const [courseCardData,setCourseCardData]= useState([])
  const [selectedCategory,setSelectedCategory] = useState('');
  const [subjectData,setSubjectData] = useState([])
  const [subCategory,setSubCategory] = useState([])
  const [selectedSubject,setSelectedSubject] = useState({})
  const [detailModal, setDetailModal] = useState(false);
  const [detailData,setDetailData] = useState({});
  const coursesApiStatus = useRef(new ApiStatus());
  const [mounted, setMounted] = useState(false);
  const [courseType, setCourseType] = useState(getTabNumber(queries.COURSE_TYPE, urlService) || 0);

  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice,setMinPrice] = useState(0)
  const [totalCourses, setTotalCourses] = useState(0);

  const [classModeList, setClassModeList] = useState([...Lists.classModes]);
  const [coursePaceList, setCoursePaceList] = useState([...Lists.coursePaceList]);
  const [costList, setCostList] = useState([...Lists.costList]);
  const [costRange, setCostRange] = useState({ min: minPrice, max: maxPrice });
  const [difficultyList, setDifficultyList] = useState([...Lists.difficultyList]);
  const [workExperienceList, setWorkExperienceList] = useState([...Lists.workExperiences]);
  const [financeOptionList, setFinanceOptionList] = useState([...Lists.financeOptions]);
  const [languageList, setLanguageList] = useState([...Lists.languages]);
  const [platformList, setPlatformList] = useState([...Lists.platform])
  const [educatorList, setEducatorList] = useState([...Lists.educator])
  const [updateCostSlider, setUpdateCostSlider] = useState(false)
  const [isAppliedCostSlider, setIsAppliedCostSlider] = useState(false);
  const [sortState, setSortState] = useState(0);
  const [pageLoadSortState, setPageLoadSortState] = useState(null);
  const [courseTypesFloatState, setCourseTypesFloatState] = useState(0)
  const [mobileFiltersState, setMobileFiltersState] = useState(false)
  const searchRef = useRef();
  const [searchbarWidth, setSearchBarWidth] = useState("41.0919%");
  const [applyNow, setApplyNow] = useState(false)
  const [enquire, setEnquire] = useState(false)
  let appliedFiltersCount = useRef(0);
  const [lastCourse, setLastCourse] = useState(null);
  const courseTypeRef = useRef(null);
  const [cardApiSuccess,setCardApiSuccess] = useState(false)
  // const [compareTextVisible,setCompareTextVisible] = useState('');
  const navbarRef = useRef()
  const dashboardRef = useRef()
  const [cardActionTaken,setCardActionTaken] = useState(false)
  const [nextPage,setNextPage] = useState(true)
  const [successApplyModal,setSuccessApplyModal] = useState(false)
  const [userEmail,setUserEmail] = useState('')
  const [loginState,setLoginState]=useState(0);
  const [courseName,setCourseName] = useState('')
  const [trackStatus,setTrackStatus] = useState(false)
  const [applied,setApplied] = useState({
    state: false,
    id: 0
  });
  const [pageNumber,setPageNumber] = useState(1);
  const [mostLikedCourses,setMostLikedCourses] = useState([]);
  const [navbarTop,setNavbarTop] = useState(false);
  
  let observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting === true && nextPage === true) {
          setPageNumber((pn) => pn > 0 ? pn + 1 : pn);
        }
      })
  );

  

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(()=>{
    // getSubjectData()
    getSubCategoryData()
    getDataFromBaseUrl()
    getMostLikedCourses()
    getExternalUser()
    
  },[])

  useEffect(() => {
    if(nextPage === true){
      coursesApiStatus.current.start();
      handleFilteredData(true);
      if (pageNumber === 1) {
        applyFilters();
      }
    }
  }, [pageNumber]);

  useEffect(() => {
    
    const currentElement = lastCourse;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastCourse]);

  const getExternalUser=()=>{
    let externalUser = urlService.current.hasEntry("partner_key")
    if(nextURL && nextURL.length > 0 && props?.token === null){
      if(externalUser === true){
        props?.openLoginModal()
      }
    }
  }

  const getMostLikedCourses = async()=>{
    if(props?.token && props?.token.length > 0){
      let response = await axios.get(`${constant.API_URL.DEV}/mostliked/`,{
        headers: {
          'Authorization': `Bearer ${props?.token}`
        }
      })
        .then(res => {
          try{
          coursesApiStatus.current.success();
          setMostLikedCourses(res?.data.data)
          return res.data;
          }catch(e){
            console.log(e);
          }
        })
        .catch(err => {
          coursesApiStatus.current.failed();
          console.log(err);
        });
    }else{
      let response = await axios.get(`${constant.API_URL.DEV}/mostliked/`)
        .then(res => {
          try{
          coursesApiStatus.current.success();
          setMostLikedCourses(res?.data.data)
          return res.data;
          }catch(e){
            console.log(e);
          }
        })
        .catch(err => {
          coursesApiStatus.current.failed();
          console.log(err);
        });
    }
   
  }

  const getSubCategoryData=async()=>{
    const response = await fetch(`${constant.API_URL.DEV}/subsubject/search/`)
    const data = await response.json()
    let totalSubcategoryData = data?.data;

    totalSubcategoryData?.unshift(
      {
          "value": "All",
          "seo_ranks": 0,
          "label": 0
      }
      )
    setSubCategory(totalSubcategoryData)
  }
    
 const getDataFromBaseUrl=()=>{

  let urlSubCategoryQuery = urlService.current.getValueFromEntry('subject')

    if(urlSubCategoryQuery  && Object.keys(urlSubCategoryQuery).length !== 0){
      setSelectedCategory(urlSubCategoryQuery)
    }else{
      setSelectedCategory('All')
    }
   
    // setSelectedSubject(data)
    getCardData()
  }

  // const getSubjectData=async()=>{
  //   const response = await fetch(`${constant.API_URL.DEV}/subject/search/`)
  //   const data = await response.json()
  //   let totalSubjectCount = 0;
  //   data?.data?.forEach(item=>{
  //     totalSubjectCount += item.count
  //   })
  //   let totalSubjectData = data?.data;
  
  //   totalSubjectData?.unshift(
  //   {
  //       "id": 0,
  //       "name": "All",
  //       "count": totalSubjectCount
  //   }
  //   )
  //   localStorage.setItem(subjectKey,JSON.stringify(totalSubjectData[0]))
  //   setSubjectData(totalSubjectData)
  // }

  const getCardData=()=>{

    updateBrowserUrl()
    
    if(pageNumber > 1){
        setPageNumber(1)
    }
    handleCardData()
  }

  const handleCardData=()=>{
    coursesApiStatus.current.start();
    handleFilteredData(true);
  }

  const _getSubjectDetails=(item)=>{

    urlService.current.removeEntry('domain')
    
    if(item.name === "All"){
      // urlService.current.addEntry('subject', 'All');
    }else{
      urlService.current.addEntry('domain', item.value);
    }
    
    
    getCardData(item)
  }

  const _getSubCategoryDetails=(item)=>{

    urlService.current.removeEntry('subject')

    if(item.value === "All"){
      urlService.current.removeEntry('subject')
    }else{
      urlService.current.addEntry('subject', item.value);
    }
  
    getCardData(item)
  }

    const openFilterModal = async()=>{
      setFilterModal(true)
    } 

    const openSubjectModal = ()=>{
      setSubjectModalVisible(true)
    } 

    const closeSubjectModal = ()=>{
      setSubjectModalVisible(false)
    }

    const setSubCategoriesData=(item)=>{
      setSelectedCategory(item.value)
      _getSubCategoryDetails(item)
    }

    const selectSubject=(item)=>{
      setSelectedSubject(item)
      _getSubjectDetails(item)
  }

  const openDetailModal = (data)=>{
    // props?.openCoursePreviewModal()
    setDetailModal(true);
    setDetailData(data);
  }

  const closeDetailModal=async(data)=>{
    props?.closeCoursePreviewModal()
    setDetailModal(false)
    setDetailData(data);
    if(cardActionTaken === true){
      setTimeout(() => location.reload(), 100)
    }
  }
 

   const updateQueryString = (i, filter, list) => {

    urlService.current.removeEntry(filter);
    urlService.current.removeEntry('search');

    list.forEach(item => {
      if (item['isApplied']) {
        urlService.current.addEntry(filter, item['filterValue']);
      }
    });

    if(props?.searchValue && props?.searchValue?.length > 0){
     urlService.current.addEntry('search', props?.searchValue);
    }

  }


  const updateAppliedFiltersCount = (filter, isApplied, mixpanelFilterOblect) => {
    if (isApplied !== false) {
      appliedFiltersCount.current++;
      // Mixpanel.track(MixpanelStrings.FILTER_SELECTED, mixpanelFilterOblect);
    } else {
      appliedFiltersCount.current--;
      // Mixpanel.track(MixpanelStrings.FILTER_DESELECTED, mixpanelFilterOblect);
    }
  }


  const setFilter = (list, idx, isApplied, setFilterList) => {
    list[idx]['isApplied'] = isApplied;
    setFilterList([...list]);
  }

  const update = (filterList, appliedIndex, isApplied, updateFilterList, filterType, filterName) => {
    let list = [...filterList];

    if (filterType === Lists.filters.COURSE_PACE) {
      let count = 0;
      list.forEach((item, i) => {

        if (item['isApplied'] === true)
          count++;
        if (i === appliedIndex) {
          item['isApplied'] = true;
          count++;
        } else {
          item['isApplied'] = false;
        }

      });

      if (appliedIndex === null) {
        appliedFiltersCount.current--;
      } else if (count === 1) {
        appliedFiltersCount.current++;
      }

      updateFilterList([...list]);
    } else {
      setFilter(list, appliedIndex, isApplied, updateFilterList);
    }

    updateQueryString(filterType, filterName, list);
  }

  const updateFilterState = async (filter, isApplied, appliedIndex) => {
    let mixpanelFilterOblect;
    switch (filter) {
      case filterList.CLASS_MODE:
        update(
          classModeList,
          appliedIndex,
          isApplied,
          setClassModeList,
          filter,
          queries.CLASS_MODE
        );
        // mixpanelFilterOblect = { "filterType": 'CLASS MODE', ...classModeList[appliedIndex] };
        break;

      case filterList.COURSE_PACE:
        update(
          coursePaceList,
          appliedIndex,
          isApplied,
          setCoursePaceList,
          filter,
          queries.COURSE_PACE
        );
        // mixpanelFilterOblect = { "filterType": 'COURSE PACE', ...coursePaceList[appliedIndex] };
        break;

      case filterList.COST:
        update(
          costList,
          appliedIndex,
          isApplied,
          setCostList,
          filter,
          queries.PRICE_TYPE
        );
        // mixpanelFilterOblect = { "filterType": 'COST', ...costList[appliedIndex] };
        break;

      case filterList.DIFFICULTY_LEVEL:
        update(
          difficultyList,
          appliedIndex,
          isApplied,
          setDifficultyList,
          filter,
          queries.DIFFICULTY
        );
        // mixpanelFilterOblect = { "filterType": 'DIFFICULTY LEVEL', ...difficultyList[appliedIndex] };
        break;

      case filterList.WORK_EXPERIENCE:
        update(
          workExperienceList,
          appliedIndex,
          isApplied,
          setWorkExperienceList,
          filter,
          queries.PROFESSION
        );
        // mixpanelFilterOblect = { "filterType": 'WORK EXPERIENCE', ...workExperienceList[appliedIndex] };
        break;

      case filterList.FINANCE_OPTIONS:
        update(
          financeOptionList,
          appliedIndex,
          isApplied,
          setFinanceOptionList,
          filter,
          queries.FINANCE_OPTIONS
        );
        // mixpanelFilterOblect = { "filterType": 'FINANCE OPTIONS', ...financeOptionList[appliedIndex] };
        break;

      case filterList.COURSE_LANGUAGE:
        update(
          languageList,
          appliedIndex,
          isApplied,
          setLanguageList,
          filter,
          queries.LANGUAGES
        );
        // mixpanelFilterOblect = { "filterType": 'COURSE LANGUAGE', ...languageList[appliedIndex] };
        break;

      case filterList.PLATFORM:
          update(
            platformList,
            appliedIndex,
            isApplied,
            setPlatformList,
            filter,
            queries.PLATFORM
          );
          // mixpanelFilterOblect = { "filterType": 'COURSE LANGUAGE', ...languageList[appliedIndex] };
          break;

        case filterList.EDUCATOR:
            update(
              educatorList,
              appliedIndex,
              isApplied,
              setEducatorList,
              filter,
              queries.EDUCATOR
            );
            // mixpanelFilterOblect = { "filterType": 'COURSE LANGUAGE', ...languageList[appliedIndex] };
            break;

      default:
        break;
    }

    if (filter !== Lists.filters.COURSE_PACE) {
      updateAppliedFiltersCount(filter, isApplied, mixpanelFilterOblect);
    } else {
      // Mixpanel.track(MixpanelStrings.FILTER_SELECTED, mixpanelFilterOblect)
    }

    updateBrowserUrl()

    // exiting before updating
    if (mobileFiltersState) return;

    if (pageNumber > 1) {
      
      setPageNumber(1)
    } else {
      coursesApiStatus.current.start();
      handleFilteredData();
    }
  }

  const handleApplyButton = () => {
    if (pageNumber > 1) {
      
      setPageNumber(1)
    } else {
      coursesApiStatus.current.start();
      handleFilteredData();
    }
    setMobileFiltersState(false);
  }

  const updateBrowserUrl = () => {
    urlService.current.removeEntry(queries.MIN_PRICE);
    urlService.current.removeEntry(queries.MAX_PRICE);
    history.replaceState({}, null, '?' + urlService.current.getUpdatedUrl().replaceAll('+', ' '));
    // urlService.current.addEntry(queries.MIN_PRICE, costRange.min);
    // urlService.current.addEntry(queries.MAX_PRICE, costRange.max);

  }

  const handleCostRange = (min, max) => {
    setCostRange({ min, max });
    urlService.current.changeEntry(queries.MIN_PRICE, min);
    urlService.current.changeEntry(queries.MAX_PRICE, max);
    
    if (window.innerWidth > 500) {
      if (pageNumber > 1) {
        setPageNumber(1)
      } else {
        handleFilteredData();
      }
      
    }
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handleSearchClicked = async (forcePageNumber = 0) => {
    const getParams = () => {
      return `?${urlService.current.getUpdatedUrl()}`;
    }

    coursesApiStatus.current.makeApiCall();
    // await delay(5000);
    let res;
    let token = props?.token;
    if (token === null || !token) {
      res = await axios.get(`${constant.API_URL.DEV}/course/search/${getParams()}${pageNumber > 0 ? `&page_no=${pageNumber}` : ''}`)
        .then(res => {
          coursesApiStatus.current.success();
          return res.data;
        })
        .catch(err => {
          coursesApiStatus.current.failed();
          console.log(err);
        });
    } else {
      res = await axios.get(`${constant.API_URL.DEV}/course/search/${getParams()}${pageNumber > 0 ? `&page_no=${pageNumber}` : ''}`, {
        headers: {
          'Authorization': `Bearer ${!!token ? token : ''}`
        }
      })
        .then(res => {
          coursesApiStatus.current.success();
          return res.data;
        })
        .catch(err => {
          coursesApiStatus.current.failed();
          console.log(err);
        });
    }

    return res ? res : [];
  }

  const handleFilteredData = async (updatePageNumber = true,e) => {
    coursesApiStatus.current.start();
    setCardApiSuccess(false)
    urlService.current.removeEntry('search');

    if(e && e.length > 0){
      urlService.current.addEntry('search', e);
    }

    // if(props?.searchValue && props?.searchValue?.length > 0){
    //   urlService.current.addEntry('search', props?.searchValue);
    // }

    if(e?.courseType && e?.courseType.length > 0 && e?.subject && e?.subject.length > 0){
      urlService.current.addEntry('subject', e?.subject);
      urlService.current.addEntry('course_type', e?.courseType);
    } else if(e?.subject && e?.subject.length > 0){
      urlService.current.addEntry('subject', e?.subject);
    } else if(e?.courseType && e?.courseType.length > 0){
      urlService.current.addEntry('course_type', e?.courseType);
    }
   
    let res = await handleSearchClicked();
    // if (forcePageNumber === 1) setForcePageNumber(0);
    if(res?.next === true){
      setNextPage(true)
    }else{
      setNextPage(false)
    }

    if (pageNumber <= 1 || updatePageNumber === false) {
      // setCourses([...res.data]);
      setCardApiSuccess(true)
      setCourseCardData([...res.data])
    } else {
      // setCourses([...courseCardData, ...res.data]);
      setCardApiSuccess(true)
      setCourseCardData([...courseCardData, ...res.data])
    }

    setMaxPrice(Math.floor(parseFloat(res.max_price)));
    setMinPrice(Math.floor(parseFloat(res.min_price)));
    setTotalCourses(res.count);
    // handlePageNumber(res);
  }

  const setFiltersFromQuery = (indices, filterState, setFilter, reset) => {
    let newState = [...filterState];
    newState.forEach(filter => {
      filter['isApplied'] = false;
    });
    if (!reset) {
      indices.forEach(index => {
        newState[index]['isApplied'] = true;
      });
    }

    setFilter([...newState]);
  }
  const getAppliedIndices = (filters, type) => {
    
    let appliedIndices = [];
    filters.forEach((mode, i) => {
      const { filterValue } = mode;
      if (urlService.current.hasValue(filterValue)) {
        appliedIndices.push(i);
        updateAppliedFiltersCount(type, true);
      }
    });

    return appliedIndices;
  }
  const applyFilters =(reset = false) => {

    if (isAppliedCostSlider) {
      appliedFiltersCount.current = 1;
    } else appliedFiltersCount.current = 0;

    const classModeFilterIndices = getAppliedIndices(Lists.classModes, Lists.filters.CLASS_MODE);
    setFiltersFromQuery(classModeFilterIndices, classModeList, setClassModeList, reset);

    const coursePaceFilterIndices = getAppliedIndices(Lists.coursePaceList, Lists.filters.COURSE_PACE);
    setFiltersFromQuery(coursePaceFilterIndices, coursePaceList, setCoursePaceList, reset);

    const difficultyFilterIndices = getAppliedIndices(Lists.difficultyList, Lists.filters.DIFFICULTY_LEVEL);
    setFiltersFromQuery(difficultyFilterIndices, difficultyList, setDifficultyList, reset);

    const workExperienceFilterIndices = getAppliedIndices(Lists.workExperiences, Lists.filters.WORK_EXPERIENCE);
    setFiltersFromQuery(workExperienceFilterIndices, workExperienceList, setWorkExperienceList, reset);

    const languageFilterIndices = getAppliedIndices(Lists.languages, Lists.filters.COURSE_LANGUAGE);
    setFiltersFromQuery(languageFilterIndices, languageList, setLanguageList, reset);

    const costFilterIndices = getAppliedIndices(Lists.costList, Lists.filters.COST);
    setFiltersFromQuery(costFilterIndices, costList, setCostList, reset);

    const financeOptionFilterIndices = getAppliedIndices(Lists.financeOptions, Lists.filters.FINANCE_OPTIONS);
    setFiltersFromQuery(financeOptionFilterIndices, financeOptionList, setFinanceOptionList, reset);

    const platformFilterIndices = getAppliedIndices(Lists.platform, Lists.filters.PLATFORM);
    setFiltersFromQuery(platformFilterIndices, platformList, setPlatformList, reset);

    const educatorFilterIndices = getAppliedIndices(Lists.educator, Lists.filters.EDUCATOR);
    setFiltersFromQuery(educatorFilterIndices, educatorList, setEducatorList, reset);

  }

  const resetFilters = async (makeApiCall = true) => {
    // Mixpanel.track(MixpanelStrings.RESET_BUTTON_TRIGGERED, {
    //   'search-string': urlService.current.getUpdatedUrl()
    // })
    urlService.current.removeAll();
    updateBrowserUrl();
    if (pageNumber !== 1){
      setPageNumber(1)
    }
      

    else {
      if (makeApiCall) {
        handleFilteredData();
      }
      applyFilters(true);
    }

    setUpdateCostSlider(true);
    setTimeout(() => {
      setUpdateCostSlider(false)
    }, [100])
    setIsAppliedCostSlider(false)

    setCostRange({ min: minPrice, max: maxPrice });

    appliedFiltersCount.current = 0;
  }

  const getSortStateFromUrl = () => {
    const isEntryExists = (value) => {
      if (urlService.current.hasEntry(value)) return true;
      return false;
    }

    // console.log(urlService.current.hasEntry('sort_by_upvotes'), "sortstate")

    if (isEntryExists('sort_by_relevance')) {
      return 0;
    } else if (isEntryExists('sort_by_upvotes')) {
      return 1;
    } else if (isEntryExists('sort_by_price_high')) {
      return 2;
    } else if (isEntryExists('sort_by_price_low')) {
      return 3;
    }
  }
  useEffect(() => {
    if (maxPrice !== 0 && costRange.max === 0) {
      setCostRange({ ...costRange, max: maxPrice });
    }
  }, [maxPrice]);

  useEffect( () => {
    if(!location.isReady) return;
    if (location?.query && Object.keys(location?.query).length > 0) {
      // resetFilters(false);
      // urlService.current.changeEntry('subject', `${location.query}`);

      if(!location.query.hasOwnProperty('subject') && !location.query.hasOwnProperty('domain')){
        props?.openFilterExpandedStage();
      }

      if(location.query.hasOwnProperty('partner_key')){
        props?.closeFilterExpandedStage();
      }

      if(location.query.hasOwnProperty('search')){
        props?.handleSearch(location?.query?.search)
        props?._showSearchBar()
      }

      if (pageNumber > 1) {
        setPageNumber(1)
        handleFilteredData();
      }
   }
  }, [location.isReady]);

  useEffect(() => {
    if (!isMount) {
     
      urlService.current.removeEntry('course_type_sub');
      urlService.current.changeEntry(queries.COURSE_TYPE, Lists.courseTypes[courseType]);
      updateBrowserUrl();
      if (pageNumber > 1) {
        setPageNumber(1)
      }
      coursesApiStatus.current.start();
      handleFilteredData(false); 
      // setPageNumber(1);
      // handleCardData()
    }
  }, [courseType]);

  useEffect(() => {
    if (!isMount) {
      Lists.sortByList.forEach((item) => {
        urlService.current.removeEntry(item['filterValue']);
      });
      urlService.current.changeEntry(Lists.sortByList[sortState]['filterValue'], 'true');
      coursesApiStatus.current.start();
      updateBrowserUrl();

      if (pageNumber > 1) {
        setPageNumber(1)
      } else {
        handleFilteredData(false);
      }
    }
  }, [sortState]);

  useEffect(() => {
    if (!!isAppliedCostSlider) {
      appliedFiltersCount.current++;
    }
  }, [isAppliedCostSlider])

  useEffect(() => {
    setCourseType(courseTypesFloatState);
  }, [courseTypesFloatState])

  useEffect(() => {
    setPageLoadSortState(getSortStateFromUrl());

    // change tab number
    let tabNumber = getTabNumber(queries.COURSE_TYPE, urlService)
    setCourseType(tabNumber)
    // courseTypeRef?.current?.changeTab(tabNumber);
  }, []);

const onScroll = () => {
  if(searchRef && searchRef.current !== null){
    if (searchRef.current.getBoundingClientRect().y < 371) {
      setSearchBarWidth(
        `${(searchRef.current.getBoundingClientRect().y / 370) * 49 + 35}%`
      );
    }
    if (!props?.showSearchBar && searchRef.current.getBoundingClientRect().top < -80) {
      props?._showSearchBar()
    } else if (searchRef.current.getBoundingClientRect().top >= -80) {
      props?.hideSearchBar()
    }
  }
  // if(searchRef && searchRef.current !== null){
  //    if(searchRef.current.getBoundingClientRect().y <= -196){
  //      setFixHeader(true)
  //    }else if(searchRef.current.getBoundingClientRect().y > -196){
  //     setFixHeader(false)
  //    }
  // }
}

useEffect(() => {
    document.addEventListener("scroll", onScroll, true);
    return () => document.removeEventListener("scroll", onScroll, true);
}, []);

const _handleSearch=(e)=>{

  if(e?.course_id){
    location.push({
      pathname: '/details',
      query: { course_id: e?.course_id },
    })
    props?._showSearchBar()

  }

  if(e?.name && e?.name?.length > 0){
    props?.openFilterExpandedStage()
    props?._showSearchBar()
    if(e?.search === true){
      setPageNumber(1)
      handleFilteredData(true,e?.name)
    }
    if(e?.domain === true){
      urlService.current.addEntry('domain', e?.name);
      setPageNumber(1)
      // handleFilteredData(true,e)
    }
    props?.handleSearch(e?.name)
    }else{
      props?.handleSearch(e)
    }
  }

  const _openApplyNowModal=(data)=>{
    setApplyNow(true)
    setDetailData(data)
  }

  const _closeApplyNowModal=()=>{
    setApplyNow(false)
  }

  const _handleShowAllCourses=()=>{
    setFilterModal(false)
  }

  const _handleCardActionTaken=()=>{
    setCardActionTaken(true)
  }

  const _closeSuccessApplyModal=()=>{
    setSuccessApplyModal(false)
  }

  const _openSuccessApplyModal=(data)=>{
    setSuccessApplyModal(true)
    setCourseName(data)
  }

  const _closeEnquireModal = () => {
    setEnquire(false)
  }

  const _openEnquireModal = () => {
    setEnquire(true)
  }

  let [querySuccessModal, setQuerySuccessModal] = useState(false)
    const _openQuerySuccessModal = () => {
      setQuerySuccessModal(true)
    }

  const _setUserEmail=(data)=>{
    setUserEmail(data)
  }

  const _setUserLoginState=(data)=>{
    setLoginState(data)
  }

  const _enableTrackStatus=()=>{
    setTrackStatus(true);
  }

  const _handleAppliedStage=(courseId)=>{
    setApplied({
      state: true,
      id: courseId
    })
  }

  const handleScrollData=()=>{
    // setPageNumber(pageNumber.current+1)
    setPageNumber(pageNumber+1)
    handleFilteredData()
  }

  

  useEffect(()=>{
    if(props?.searchValue?.search === true){
      setPageNumber(1)
      handleFilteredData(true,props?.searchValue?.name)
    }
  },[props?.searchValue])

  const _handleTrivia=(data)=>{
    props?.openFilterExpandedStage()
    setPageNumber(1)
    if(data.courseType.length > 0 && data.subject.length > 0){

      handleFilteredData(true,data);
      let tabNumber = getTabNumber(queries.COURSE_TYPE, urlService)
      setCourseType(tabNumber)
    }
    else if(data.courseType && data.courseType.length > 0){

      handleFilteredData(true,data);
      let tabNumber = getTabNumber(queries.COURSE_TYPE, urlService)
      setCourseType(tabNumber)
    }else if(data.subject && data.subject.length > 0){

      handleFilteredData(true,data);
    }
  }

  useEffect(()=>{
    if(props?.subjectData.search === true){
      setPageNumber(1)
      handleFilteredData(true,props?.subjectData?.searchValue)
    }
  },[props?.subjectData?.searchValue])

  useEffect(()=>{
    if(dashboardRef && dashboardRef?.current !== null){
        if(dashboardRef?.current?.getBoundingClientRect().y <= -2563){
          setNavbarTop(true)
        }else{
          setNavbarTop(false)
        }
    }
  },[dashboardRef?.current?.getBoundingClientRect().y])

 return(
        <div>      
{
  props.filterExpandedStage ? 
      <div className="course-page"> 
      {<div className={`${window.innerWidth > 500 ? 'filter-column' : 'filter-mobile'} ${window.innerWidth <= 500 && mobileFiltersState ? 'show-filter' : 'hide-filters'}`} style={ window.innerWidth > 500 ? {minHeight: '80%'} : null}>
        <div className="filter-head">{appliedFiltersCount.current === 0 ? <span className="no-filter-text">No filters applied</span> : `${appliedFiltersCount.current} filter${appliedFiltersCount.current === 1 ? '' : 's'} applied`}
          {appliedFiltersCount.current !== 0 && <span style={window.innerWidth > 500 ? { display: 'block' } : { display: 'none' }}><Button text="Reset" classes="btn-primary" style={{ borderRadius: '4px', padding: '1rem 2rem', fontStyle: 'normal' }} onClick={resetFilters} /></span>}
          {window.innerWidth <= 500 && <span className='cross' onClick={() => setMobileFiltersState(false)}><img src={closeIcon} /></span>}
        </div>
        <div className='filters'>

          <Filter
            item={{ name: 'Class Mode', type: filterList.CLASS_MODE }}
            filterState={classModeList}
            updateFilterState={updateFilterState}
            theme={theme}
          />
          <Filter
            item={{ name: 'Course Pace', type: filterList.COURSE_PACE }}
            filterState={[...coursePaceList]}
            updateFilterState={updateFilterState}
            theme={theme}
          />
          <Filter
            item={{ name: 'Cost', type: filterList.COST }}
            filterState={costList}
            updateFilterState={updateFilterState}
            max={maxPrice}
            min={minPrice}
            getRange={handleCostRange}
            updateCostSlider={updateCostSlider}
            setIsAppliedCostSlider={() => setIsAppliedCostSlider(true)}
            isAppliedCostSlider={isAppliedCostSlider}
            theme={theme}
          />
          <Filter
            item={{ name: 'Difficulty Level', type: filterList.DIFFICULTY_LEVEL }}
            filterState={difficultyList}
            updateFilterState={updateFilterState}
            theme={theme}
          />
          {/* <Filter
            item={{ name: 'Work Experience', type: filterList.WORK_EXPERIENCE }}
            filterState={workExperienceList}
            updateFilterState={updateFilterState}
            theme={theme}
          /> */}
          {
            props?.thirdPartyUser != constant.PARTNER_KEY.NJ ? 
            <Filter
              item={{ name: 'Finance Options', type: filterList.FINANCE_OPTIONS }}
              filterState={financeOptionList}
              updateFilterState={updateFilterState}
              theme={theme}
            /> : null
          }
          
          {/* <Filter
            item={{ name: 'Course Language', type: filterList.COURSE_LANGUAGE }}
            filterState={languageList}
            updateFilterState={updateFilterState}
            theme={theme}
          /> */}
          <Filter
            item={{ name: 'Platform', type: filterList.PLATFORM }}
            filterState={platformList}
            updateFilterState={updateFilterState}
            theme={theme}
          />
          <Filter
            item={{ name: 'Educator', type: filterList.EDUCATOR }}
            filterState={educatorList}
            updateFilterState={updateFilterState}
            theme={theme}
          />
        </div>
        <div className="filter-footer">
          <a href='/privacy' target='_blank' style={{textDecoration: 'none'}}><span className='link' >Privacy policy & disclaimer</span></a>
          <div className='mobile-actions-container'>
            <div className='btn-container reset-button-wrapper'>
              <Button
                // disabled={true} 
                onClick={resetFilters}
                mobileButtonText='Reset'
                classes='btn-reset'
              />
            </div>
            <div className='btn-container'>
              <Button
                // disabled={true} 
                onClick={handleApplyButton}
                mobileButtonText='Apply'
                classes='btn-apply'
              />
            </div>
          </div>
        </div>
      </div>}
      <div className="list-column">
        <div className="filter-container" style={{ opacity: 1 }}>
          <div className="segment-container">
            <SegmentedBar
              items={Lists.courseTypes}
              ref={courseTypeRef}
              style={{
                fontWeight: 600,
                ontSize: '1.1rem',
                lineHeight: '1.6rem',
              }}
              theme={theme}
              // bgColor='#16181A'
              handleTabNumber={(i) => {
                setPageNumber(1)
                setCourseType(i)
                // callMixpanel(MixpanelStrings.COURSE_TYPE_SEGEMENT_TRIGGERED, Lists.courseTypes[i])
              }}
              selected={courseType}
            />
          </div>
          <SecondaryDropdown
            heading={Lists.sortByList[sortState]['label']}
            style={theme === 'dark' ? {
              background: '#141414',
              padding: '1.4rem',
              borderRadius: '0.8rem',
              fontWeight: 600,
              fontSize: '1.1rem',
              lineHeight: '1.6rem',
              color: '#FFFFFF'
            }: {
              background: '#F7F7F7',
              padding: '1.4rem',
              borderRadius: '0.8rem',
              fontWeight: 600,
              fontSize: '1.1rem',
              lineHeight: '1.6rem',
              color: '#000000'
            }}
            classes={{ 
              wrapper: 'no-padding', 
              content: 'content-sort' 
            }}
            dropList={[...Lists.sortByList]}
            selected={pageLoadSortState || sortState}
            onSelect={(item, i) => {
              setPageNumber(1)
              setPageLoadSortState(null)
              setSortState(i)
              // callMixpanel(MixpanelStrings.SORTING_DROPDOWN_TRIGGERED, Lists.sortByList[i].name)
            }}
          />
          <div style={{ flexGrow: 1 }}></div>
          <div className="text-container">Showing {totalCourses} Course{totalCourses === 1 ? '' : 's'}</div>
        </div>
        <div 
          className="list-container" 
          id="scrollableDiv"
          style={{padding: '10rem 2.4rem 2rem 0rem',height: 800, overflow: "auto"}}
          >
          {/* <List
            type={listTypes?.HORIZONTAL_CARDS}
            list={courseCardData}
            listApiStatus={coursesApiStatus}
            openDetailModal={(item)=>openDetailModal(item)} 
            openApplyNowModal={(item)=> _openApplyNowModal(item)}
            token={props?.token}
            openLoginModal={()=>props?.openLoginModal()} 
            setLastElement={setLastCourse}
            addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
            removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
            enableTrackStatus={()=>_enableTrackStatus()}
            applied={applied}
          /> */}
          <InfiniteScroll
                  dataLength={courseCardData.length} //This is important field to render the next data
                  next={handleScrollData}
                  hasMore={true}
                  // loader={<h4>Loading...</h4>}
                  style={{width: '100%',display:'flex',flexDirection:'row',gap: 10,flexWrap: 'wrap',overflow:'auto'}}
                  // onScroll={handleScroll}
                  scrollableTarget="scrollableDiv"
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                  // below props only if you need pull down functionality
                >
                 {
                 courseCardData.length > 0 ?
                 courseCardData && courseCardData.map((item,index)=>{
                    return(
                      <div key={index}>
                        <CourseCard 
                          index={index}
                          data={item} 
                          openDetailModal={()=>openDetailModal(item)}
                          openApplyNowModal={()=> _openApplyNowModal(item)}
                          token={props?.token}
                          openLoginModal={()=>props?.openLoginModal()}
                          addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                          removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                          enableTrackStatus={()=>_enableTrackStatus()}
                          applied={applied}
                        />
                      </div>
                    )
                 })
                :
                courseCardData.length === 0 && cardApiSuccess ?
                <Error type={ Lists.errorTypes.EMPTY } text={'No Result Found'} /> 
                : null
                }
                </InfiniteScroll>
        </div>
      </div>
      {window.innerWidth <= 500 && <div className='mobile-view-actions'>
        <span className='filter' onClick={() => setMobileFiltersState(true)}><img src={filterIcon} alt='filters' /></span>
        <FloatActionButton
          type='course type'
          heading={Lists.courseTypesFloatList[courseTypesFloatState]['name']}
          style={{
            borderRadius: '10rem',
            fontWeight: 600,
            fontSize: '1.1rem',
            lineHeight: '1.6rem',
            color: '#313235',
          }}
          floatList={[...Lists.courseTypesFloatList]}
          selected={courseTypesFloatState}
          onSelect={(item, i) => {
            // setPageLoadSortState(null)
            setCourseTypesFloatState(i)
            // callMixpanel(MixpanelStrings.COURSE_TYPE_SEGEMENT_TRIGGERED, Lists.courseTypesFloatList[i].name)
          }}
        />
        <FloatActionButton
          type='sort type'
          heading={null}
          style={{
            borderRadius: '10rem',
            fontWeight: 600,
            fontSize: '1.1rem',
            lineHeight: '1.6rem',
            color: '#313235',
          }}
          floatList={[...Lists.sortByList]}
          selected={sortState}
          onSelect={(item, i) => {
            setPageLoadSortState(null)
            setSortState(i)
            // callMixpanel(MixpanelStrings.SORTING_DROPDOWN_TRIGGERED, Lists.sortByList[i].name)
          }}
        />
      </div>}
      </div>
  : <div className="dashboard" style={ props?.loginModal ? {overflow: 'hidden'} : null} ref={dashboardRef}>
     <div className="dashboard-upper-section">
        <div className='banner' ref={searchRef} style={styles}> 
          <div className='text-content'>
          <h1 className='heading'>From Learners to Leaders</h1>
          <h2 className='sub-header'>Develop new skills with our hand-picked courses from across the world</h2>
          </div>
          <div
          style={{
            width: `${searchbarWidth}`,
            marginTop: 32,
            marginBottom: 40,
            zIndex: "1101",
            visibility: `${props.showSearchBar ? "hidden" : "visible"}`,
            transition: '10s ease-in ease-out',
            transform: 'translateY(0)',
          }}
          >
              <SearchBar searchbarWidth={searchbarWidth} search={props.searchValue} handleSearch={(e)=>_handleSearch(e)} selectSearch={(e)=>props?.selectSearch(e)} openFilterExpandedStage={()=>props?.openFilterExpandedStage()} token={props?.token}/>
          </div>
         </div> 

         <div style={{width: '100%',display:'flex',justifyContent:'center',alignItems: 'center'}}>
            <CredencFeatures />
         </div>  

         <div className="dashboard-courses-container">
            <div className="header-container">
              <div className="header-text">
                 Trending Courses
              </div>
              <div style={{marginLeft: 5,marginTop: 2}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#034FE2" viewBox="0 0 256 256"><path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path></svg>
              </div> 
              {/* <Image src={trendingIcon} alt="trendingIcon" width={36} height={36} objectFit="contain" style={{marginLeft: 5,marginTop: 2}}/> */}
            </div>  
            <div className='course-section'>
               {
                 mostLikedCourses && mostLikedCourses.length > 0 && mostLikedCourses.map((item,index)=>{
                  return(
                    <div key={index}>
                      <CourseCard 
                        index={index}
                        data={item} 
                        openDetailModal={()=>openDetailModal(item)}
                        openApplyNowModal={()=> _openApplyNowModal(item)}
                        token={props?.token}
                        openLoginModal={()=>props?.openLoginModal()}
                        addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                        removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                        enableTrackStatus={()=>_enableTrackStatus()}
                        applied={applied}
                      />
                    </div>
                  )
                 })
               }
            </div>
         </div>

         <div style={{width: '100%'}}>
           <BrowseCategories handleSearch={(e)=>_handleSearch(e)} searchItem={(e)=>props?.handleSearch(e)} />
         </div>

         <div className="dashboard-courses-container">
            <div className="header-container">
              <div className="header-text">
                 Most Liked
              </div>
              <div style={{marginLeft: 8,marginTop: 2}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#0345E2" viewBox="0 0 256 256"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path></svg>
              </div>  
            </div>  
            <div className='course-section'>
               {
                 mostLikedCourses && mostLikedCourses.length > 0 && mostLikedCourses.map((item,index)=>{
                  return(
                    <div key={index}>
                      <CourseCard 
                        index={index}
                        data={item} 
                        openDetailModal={()=>openDetailModal(item)}
                        openApplyNowModal={()=> _openApplyNowModal(item)}
                        token={props?.token}
                        openLoginModal={()=>props?.openLoginModal()}
                        addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                        removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                        enableTrackStatus={()=>_enableTrackStatus()}
                        applied={applied}
                      />
                    </div>
                  )
                 })
               }
            </div>
         </div>

         <div style={{width: '100%'}}>
            <CourseTrivia handleTrivia={(item)=>_handleTrivia(item)} />
         </div>  

         <div className="dashboard-courses-container" style={{borderBottom: '1px solid #DDDDDD',paddingBottom: 70}}>
            <div className="header-container">
              <div className="header-text">
                Get New skills
              </div>
              {/* <Image src={trendingIcon} alt="trendingIcon" width={36} height={36} objectFit="contain" style={{marginLeft: 5,marginTop: 2}}/> */}
            </div>  
            <div className='course-section'>
               {
                 mostLikedCourses && mostLikedCourses.length > 0 && mostLikedCourses.map((item,index)=>{
                  return(
                    <div key={index}>
                      <CourseCard 
                        index={index}
                        data={item} 
                        openDetailModal={()=>openDetailModal(item)}
                        openApplyNowModal={()=> _openApplyNowModal(item)}
                        token={props?.token}
                        openLoginModal={()=>props?.openLoginModal()}
                        addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                        removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                        enableTrackStatus={()=>_enableTrackStatus()}
                        applied={applied}
                      />
                    </div>
                  )
                 })
               }
            </div>
         </div>

       <div className="course-navbar" style={navbarTop ? { position: 'fixed',top: '8vh',background: '#FFFFFF',zIndex: 9999,boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',padding: '1rem 5rem 0rem 5rem'} : {padding: '0.8rem 5rem 0rem 5rem'}}>
        {
          subCategory && subCategory.length > 0 ?
            <Navbar 
              toggleFilterModal={openFilterModal} 
              openSubjectModal={openSubjectModal} 
              closeSubjectModal={closeSubjectModal} 
              subCategories={subCategory} 
              selectedCategory={selectedCategory} 
              setSubCategoriesData={setSubCategoriesData} 
              subjectData={subjectData}
              selectedSubject={selectedSubject} 
              selectSubject={selectSubject}
              theme={props.newTheme}
              appliedFiltersCount={appliedFiltersCount.current}
            /> :
          <div style={{display:'flex',justifyContent:'flex-start',padding: 24}}>
              {Array.from({length: 11}, (x, i) => {
                  return <div style={{marginRight: 30}}>
                            <Skeleton variant="rectangular" width={90} height={23} key={i}/>
                          </div>
              })}
          </div>
        }
        
       </div>
       {/* <FilterModal filterModal={filterModal} toggleFilterModal={closeFilterModal}/> */}
       <div className="course-content">
       {/* <CategoryDropdown categories={categories}/> */}
       <div className="card-content">

       {
         courseCardData && courseCardData.length > 0 ? 
         <div className="course-card-container" >
        {
           courseCardData?.map((item,i)=>{
            return i === courseCardData.length - 1 ? 
            <div key={`${item.id}:${i}`} ref={setLastCourse}>
               <CourseCard 
                 key={i} 
                 data={item} 
                 theme={props.newTheme} 
                 openDetailModal={()=>openDetailModal(item)} 
                 openApplyNowModal={()=> _openApplyNowModal(item)}
                 token={props?.token}
                 openLoginModal={()=>props?.openLoginModal()}
                 addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                 removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                 enableTrackStatus={()=>_enableTrackStatus()}
                 applied={applied}
               />
            </div> :
               <CourseCard 
                  key={i} 
                  data={item} 
                  theme={props.newTheme} 
                  openDetailModal={()=>openDetailModal(item)} 
                  openApplyNowModal={()=> _openApplyNowModal(item)}
                  token={props?.token}
                  openLoginModal={()=>props?.openLoginModal()}
                  addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
                  removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
                  enableTrackStatus={()=>_enableTrackStatus()}
                  applied={applied}
              />
             
           })
        }
         {/* <HomeSkeleton /> */}
       </div> : 
        courseCardData.length === 0 && cardApiSuccess ?
        <Error type={ Lists.errorTypes.EMPTY } text={'No Result Found'} /> :
        <div className="course-card-container">
          {Array.from({length: 4}, (x, i) => {
                  return <HomeSkeleton key={i} />;
          })}
        </div>
       }
       
       </div>
       </div>
       </div>
    </div>
  } 
      
        <SlidingPanel
        type={'left'}
        isOpen={filterModal}
        backdropClicked={() => setFilterModal(false)}
        size={30}
        >
          <div className='filter-sidebar-content'>
                {<div className={`${window.innerWidth > 500 ? 'filter-column' : 'filter-mobile'} ${window.innerWidth <= 500 && mobileFiltersState ? 'show-filter' : 'hide-filters'}`} style={window.innerWidth > 500 ? {minHeight : '95vh',overflow: 'scroll'} : null}>
                    <div className="filter-head">
                      <span>{appliedFiltersCount.current === 0 ? <span className="no-filter-text">No filters applied</span> : `${appliedFiltersCount.current} filter${appliedFiltersCount.current === 1 ? '' : 's'} applied`}</span>
                      {/* {appliedFiltersCount.current !== 0 && <span style={window.innerWidth > 500 ? { display: 'block' } : { display: 'none' }}><Button text="Reset" classes="btn-primary" style={{ borderRadius: '4px', padding: '1rem 2rem', fontStyle: 'normal' }} onClick={resetFilters} /></span>} */}
                      {window.innerWidth <= 500 && <span className='cross' onClick={() => setMobileFiltersState(false)}><img src={closeIcon} /></span>}
                    </div>
                    <div className='filters'>

                      <Filter
                        item={{ name: 'Class Mode', type: filterList.CLASS_MODE }}
                        filterState={classModeList}
                        updateFilterState={updateFilterState}
                        theme={theme}
                      />
                      <Filter
                        item={{ name: 'Course Pace', type: filterList.COURSE_PACE }}
                        filterState={[...coursePaceList]}
                        updateFilterState={updateFilterState}
                        theme={theme}
                      />
                      <Filter
                        item={{ name: 'Cost', type: filterList.COST }}
                        filterState={costList}
                        updateFilterState={updateFilterState}
                        max={maxPrice}
                        min={minPrice}
                        getRange={handleCostRange}
                        updateCostSlider={updateCostSlider}
                        setIsAppliedCostSlider={() => setIsAppliedCostSlider(true)}
                        isAppliedCostSlider={isAppliedCostSlider}
                        theme={theme}
                      />
                      <Filter
                        item={{ name: 'Difficulty Level', type: filterList.DIFFICULTY_LEVEL }}
                        filterState={difficultyList}
                        updateFilterState={updateFilterState}
                        theme={theme}
                      />
                      {/* <Filter
                        item={{ name: 'Work Experience', type: filterList.WORK_EXPERIENCE }}
                        filterState={workExperienceList}
                        updateFilterState={updateFilterState}
                        theme={theme}
                      /> */}
                      {
                        props?.thirdPartyUser != constant.PARTNER_KEY.NJ ? 
                        <Filter
                          item={{ name: 'Finance Options', type: filterList.FINANCE_OPTIONS }}
                          filterState={financeOptionList}
                          updateFilterState={updateFilterState}
                          theme={theme}
                        /> : null
                      }
                      
                      {/* <Filter
                        item={{ name: 'Course Language', type: filterList.COURSE_LANGUAGE }}
                        filterState={languageList}
                        updateFilterState={updateFilterState}
                        theme={theme}
                      /> */}
                      <Filter
                        item={{ name: 'Platform', type: filterList.PLATFORM }}
                        filterState={platformList}
                        updateFilterState={updateFilterState}
                        theme={theme}
                      />
                      <Filter
                        item={{ name: 'Educator', type: filterList.EDUCATOR }}
                        filterState={educatorList}
                        updateFilterState={updateFilterState}
                        theme={theme}
                      />
                    </div>
                    <div className="filter-footer" style={{textAlign:"center", marginTop: 20}}>
                    {/* <Link className='link' href={`/privacy`} target='_blank' rel='noopener noreferer'>Privacy policy & disclaimer</Link> */}
                    <div className='mobile-actions-container'>
                      <div className='btn-container reset-button-wrapper'>
                        <Button
                          // disabled={true} 
                          onClick={resetFilters}
                          mobileButtonText='Reset'
                          classes='btn-reset'
                        />
                      </div>
                      <div className='btn-container'>
                        <Button
                          // disabled={true} 
                          onClick={handleApplyButton}
                          mobileButtonText='Apply'
                          classes='btn-apply'
                        />
                      </div>
                    </div>
                  </div>
                 
            </div>}
            { window.innerWidth > 500 ?  <div className="detail-modal-footer">
                  <div className='modal-container'>
                    <div className='reset-button-container'>
                        <Button
                            disabled={false} 
                            onClick={resetFilters}
                            classes='btn-reset'
                            text= {appliedFiltersCount.current > 0 ? "Clear All" : "Reset"}
                          />
                      </div>
                     <div className='modal-button-wrapper'>
                          <Button
                            disabled={false} 
                            onClick={_handleShowAllCourses}
                            classes='btn-apply'
                            text= {totalCourses ? `Show ${totalCourses} Courses` : `No Courses`}
                            type="Show"
                          />
                      </div>
                      </div>
                  </div> : null}
            </div>
        </SlidingPanel>

      <SlidingPanel
        type={'right'}
        isOpen={detailModal}
        backdropClicked={()=>closeDetailModal(detailData)}
        size={30}
      >
        <DetailModal 
        detailData={detailData} 
        token={props?.token}
        theme={props?.theme}
        openApplyNowModal={()=> _openApplyNowModal(detailData)}
        closeDetailModal={()=>closeDetailModal(detailData)}
        openLoginModal={()=>props?.openLoginModal()}
        handleCardActionTaken={()=>_handleCardActionTaken()}
        openDetailModal={()=>openDetailModal()}
        status={trackStatus}
        openQueryModal={_openEnquireModal}
        />
      </SlidingPanel>
      <SlidingPanel
        type={'right'}
        isOpen={applyNow}
        backdropClicked={() => setApplyNow(false)}
        size={30}
      >
        <ApplyNowModal 
          openQueryModal={_openEnquireModal}
          detailData={detailData} 
          closeApplyNowModal={()=>_closeApplyNowModal()} 
          openSuccessApplyModal={(courseName)=>_openSuccessApplyModal(courseName)}
          handleAppliedStage={(id)=>_handleAppliedStage(id)}
          courseName={detailData?.course_name}
        />
      </SlidingPanel>
      <SlidingPanel
        type={'right'}
        isOpen={successApplyModal}
        backdropClicked={() => setSuccessApplyModal(false)}
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
            detailData={detailData} 
            courseName={detailData?.course_name} 
            openSuccessModal={()=>_openQuerySuccessModal()}
          />
        </SlidingPanel>
      <SlidingPanel
        type={'right'}
        isOpen={querySuccessModal}
        backdropClicked={() => setQuerySuccessModal(false)}
        size={30}
      >
        <QuerySuccessModal closeSuccessQueryModal={()=>setQuerySuccessModal(false)} courseName={detailData?.course_name} />
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
   
      </div>
       )
}

const mapStateToProps = (state) => {
    return {
      theme: state.theme
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      dispatchThemeChange: (theme) => {
        dispatch(changeTheme(theme))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDesktop);

// export async function getServerSideProps(context) {

//   const response = await fetch(`${constant.API_URL.DEV}/batch/search/`)
//   const data = await response.json()

//   // return {
//   //   props: {
//   //     courseCardData: data
//   //   },
//   // }
// }