import React, { useEffect, useState, useRef } from "react"
import { connect } from 'react-redux'
import {changeTheme} from '../../scripts/actions/index'
import CourseCard from '../../components/coursecard/CourseCard'
import constant from '../../config/constant.js'
import SlidingPanel from 'react-sliding-side-panel';
import DetailModal from '../../components/detailModal/DetailModal'
import 'react-sliding-side-panel/lib/index.css';
import { useRouter } from 'next/router'
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
import closeIcon from '../../assets/images/icons/close-icon-grey.svg';
import FloatActionButton from "../../components/floatActionButton/floatActionButton";
import Image from "next/image";
import LoginModalContainer from '../../components/loginModal/LoginModalContainer'
import ForgotPasswordModal from "../../components/forgotPasswordModal/ForgotPasswordModal"
import ApplyNowModal from '../../components/applyNowModal/ApplyNowModal'
import SubjectTab from '../../components/subjectTab/SubjectTab'
import Error from "../../components/error/Error"
import SearchMobile from '../../components/searchBarMobile/SearchBar'
import sortingIcon from '../../assets/images/icons/filterSortMobile.svg';
const compareKey = 'credenc-marketplace-compares';
const bookmarkKey = 'credenc-marketplace-bookmarks';
const subjectKey = 'credenc-edtech-subject';
const UpvoteKey = 'credenc-edtech-upvote'

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
  COURSE_TYPE: 'course_type',
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

function DashboardMobile(props) {

  const isMount = useIsMount();
  let location = useRouter();
  let nextURL=location?.asPath?.substring(2,location?.asPath?.length)
  let urlService = useRef(new UrlService(nextURL));

  const listTypes = States.listTypes;
  const filterList = Lists.filters;

  const [courseCardData,setCourseCardData]= useState([])
  const [detailData,setDetailData] = useState({});
  const [compareTextVisible,setCompareTextVisible] = useState('');
  const [detailModal,setDetailModal] = useState(false)
  const [filterModal, setFilterModal] = useState(false);
  const [selectedCategory,setSelectedCategory] = useState('');
  const [subCategory,setSubCategory] = useState([]);
  const [subjectData,setSubjectData] = useState([])
  const [selectedSubject,setSelectedSubject] = useState({})
  const coursesApiStatus = useRef(new ApiStatus());
  const [mounted, setMounted] = useState(false);
  const [courseType, setCourseType] = useState(getTabNumber(queries.COURSE_TYPE, urlService) || 4);
   
  const [courses, setCourses] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  const [classModeList, setClassModeList] = useState([...Lists.classModes]);
  const [coursePaceList, setCoursePaceList] = useState([...Lists.coursePaceList]);
  const [costList, setCostList] = useState([...Lists.costList]);
  const [costRange, setCostRange] = useState({ min: 0, max: maxPrice });
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

  const [courseTypesFloatState, setCourseTypesFloatState] = useState(4)
  const [mobileFilter, setMobileFilter] = useState(false)
  const [mobileFiltersState, setMobileFiltersState] = useState(false)
  let appliedFiltersCount = useRef(0);
  const [applyNow, setApplyNow] = useState(false)
  const [lastCourse, setLastCourse] = useState(null);
  const courseTypeRef = useRef(null);
  // const [compareTextVisible,setCompareTextVisible] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [cardActionTaken,setCardActionTaken] = useState(false)
  const cardRef = useRef();
  const prevScrollY = useRef(0);

  const [goingUp, setGoingUp] = useState(false);

  let observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting === true) {
          setPageNumber((pn) => pn > 0 ? pn + 1 : pn);
        }
      })
  );

  useEffect(() => {
    setMounted(true);
}, []);

  useEffect(()=>{
    // _getCardData()
    _getSubCategoryData()
    getDataFromBaseUrl()
  },[])


  const _getSubCategoryData=async()=>{
    const response = await fetch(`${constant.API_URL.DEV}/subsubject/search/`)
    const data = await response.json()
    let totalSubcategoryData = data?.data;

    totalSubcategoryData?.unshift(
      {
          "name": "All",
          "seo_ranks": 0,
          "id": 0
      }
      )
    setSubCategory(totalSubcategoryData)
  }

  const getDataFromBaseUrl=()=>{

    // let urlSubjectQuery = urlService.current.getValueFromEntry('domain')
    let urlSubCategoryQuery = urlService.current.getValueFromEntry('subject')
      if(urlSubCategoryQuery  && Object.keys(urlSubCategoryQuery).length !== 0){
        setSelectedCategory(urlSubCategoryQuery)
      }else{
        setSelectedCategory('All')
      }
     

      // getCardData()
    }

    const getCardData=()=>{

      updateBrowserUrl()
  
      if (pageNumber > 1) {
        setPageNumber(1);
      } else {
        coursesApiStatus.current.start();
        handleFilteredData();
      }
    }

  const _getCardData=async()=>{
    const response = await fetch(`${constant.API_URL.DEV}/course/search/`)
    const data = await response.json()
    setCourseCardData(data.data)
  }


 const updateQueryString = (i, filter, list) => {

  urlService.current.removeEntry(filter);

  list.forEach(item => {
    if (item['isApplied']) {
      urlService.current.addEntry(filter, item['filterValue']);
    }
  });

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

  // updateBrowserUrl()

  // exiting before updating
  if (mobileFiltersState) return;

  if (pageNumber > 1) {
    setPageNumber(1);
  } else {
    coursesApiStatus.current.start();
    handleFilteredData();
  }
}

const handleApplyButton = () => {
  if (pageNumber > 1) {
    setPageNumber(1);
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
  urlService.current.addEntry(queries.MIN_PRICE, costRange.min);
  urlService.current.addEntry(queries.MAX_PRICE, costRange.max);

}

const handleCostRange = (min, max) => {
  setCostRange({ min, max });
  urlService.current.changeEntry(queries.MIN_PRICE, min);
  urlService.current.changeEntry(queries.MAX_PRICE, max);
  
  if (window.innerWidth > 500) {
    if (pageNumber > 1) {
      setPageNumber(1)
    } else handleFilteredData();
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

const handleFilteredData = async (updatePageNumber = true) => {
  coursesApiStatus.current.start();
  urlService.current.removeEntry('search');

    if(props?.searchValue && props?.searchValue?.length > 0){
      urlService.current.addEntry('search', props?.searchValue);
    }

  let res = await handleSearchClicked();
  // if (forcePageNumber === 1) setForcePageNumber(0);
  if (pageNumber <= 1 || updatePageNumber === false) {
    // setCourses([...res.data]);
    setCourseCardData([...res.data])
  } else {
    // setCourses([...courseCardData, ...res.data]);
    setCourseCardData([...courseCardData, ...res.data])
  }
  setMaxPrice(Math.floor(parseFloat(res.max_price)));
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
  if (pageNumber !== 1)
    setPageNumber(1);

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

  setCostRange({ min: 0, max: maxPrice });

  appliedFiltersCount.current = 0;

  props?.closeFilterVisible()
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

useEffect(() => {
  coursesApiStatus.current.start();
  handleFilteredData();
  if (pageNumber === 1) {
    applyFilters();
  }
}, [pageNumber]);

useEffect( () => {
  if (location?.query && Object.keys(location?.query).length > 0) {
    // resetFilters(false);
    // urlService.current.changeEntry('subject', `${location.query}`);
    if(location.query.hasOwnProperty('subject') || location.query.hasOwnProperty('domain')){
      props?.closeFilterExpandedStage();
    }

    if (pageNumber > 1) {
      setPageNumber(1);
    } else {
      handleFilteredData(false);
    }
    // props.openFilterExpandedStage();
  }
}, [location?.query]);

useEffect(() => {
  if (!isMount) {
   
    urlService.current.removeEntry('course_type_sub');
    urlService.current.changeEntry(queries.COURSE_TYPE, Lists.courseTypes[courseType]);
    updateBrowserUrl();
    coursesApiStatus.current.start();

    if (pageNumber > 1) {
      setPageNumber(1);
    } else {
      handleFilteredData(false);
    }
  }
}, [courseType]);

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

useEffect(() => {
  if (!isMount) {
    Lists.sortByList.forEach((item) => {
      urlService.current.removeEntry(item['filterValue']);
    });
    urlService.current.changeEntry(Lists.sortByList[sortState]['filterValue'], 'true');
    coursesApiStatus.current.start();
    updateBrowserUrl();

    if (pageNumber > 1) {
      setPageNumber(1);
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
  // changeNavbarVisibility(shouldNavbarVisible());
  // if (token) {
  //   let res = await getDataFromUrl(`${constant.API_URL.DEV}/userupvotes/`, token);
  //   setUserUpvoteList(res);
  // }
  setPageLoadSortState(getSortStateFromUrl());
  // change tab number
  let tabNumber = getTabNumber(queries.COURSE_TYPE, urlService)
  courseTypeRef?.current?.changeTab(tabNumber);
}, []);

useEffect(()=>{
 getSubjectData()
},[])

const getSubjectData=async()=>{
  const response = await fetch(`${constant.API_URL.DEV}/subject/search/`)
  const data = await response.json()
  let totalSubjectCount = 0;
  data.data.forEach(item=>{
    totalSubjectCount += item.count
  })
  let totalSubjectData = data?.data;

  totalSubjectData.unshift(
  {
      "id": 0,
      "name": "All",
      "count": totalSubjectCount
  }
  )
  localStorage.setItem(subjectKey,JSON.stringify(totalSubjectData[0]))
  setSubjectData(totalSubjectData)
  getSubjectDataFromUrl(totalSubjectData)
}

const getSubjectDataFromUrl=(totalSubjectData)=>{
  if(location?.query?.hasOwnProperty('domain') ){
    let data = totalSubjectData?.filter(item=> {
      if(item.name === location?.query?.subject){
        return item
      }
     })
    setSelectedSubject(data)
    // getCardData(data)
  }else{

    let data = totalSubjectData?.filter(item=> {
     if(item.id === 0){
       return item
     }
    })
    setSelectedSubject(data)
    // getCardData()
  }
}

const selectSubject=(item)=>{
  setSelectedSubject(item)
  _getSubjectDetails(item)
}

const _getSubjectDetails=(item)=>{

  urlService.current.removeEntry('domain')
   
  if(item.name === "All"){
  
  }else{
    urlService.current.addEntry('domain', item.name);
  }
  
  getCardDetails(item)
}

const getCardDetails=(item)=>{
  // let URL = `${constant.API_URL.DEV}/batch/search/`
  // let subjectQuery="";
  // if(item !== null && item?.name && item?.name !== "All"){
  //   subjectQuery = `?subject=${item?.name}`
  //   URL=URL.concat(subjectQuery)
  // }
  // fetchCardData(URL)

  updateBrowserUrl()

    if (pageNumber > 1) {
      setPageNumber(1);
    } else {
      coursesApiStatus.current.start();
      handleFilteredData();
    }
}

const fetchCardData=async(URL)=>{
  const response = await fetch(URL)
  const data = await response.json()
  setCourseCardData(data?.data)
}

useEffect(()=>{
   
},[courseCardData])

const _handleFilterState=()=>{
  setMobileFiltersState(true)
  props?.openFilterVisible()
}

const _openApplyNowModal=(data)=>{
  setApplyNow(true)
  setDetailData(data)
}

const _closeApplyNowModal=()=>{
  setApplyNow(false)
}

const setSubCategoriesData=(item)=>{
  setSelectedCategory(item.name)
  _getSubCategoryDetails(item)
}

const _getSubCategoryDetails=(item)=>{

  urlService.current.removeEntry('subject')
  if(item?.id === 0){
    // urlService.current.addEntry('subject', item.name);
    urlService.current.removeEntry('subject')
  }else{
    urlService.current.addEntry('subject', item.name);
  }

  getCardData(item)
}

useEffect(() => {
  handleFilteredData(false)
  
 }, [props?.searchValue]);

 const closeDetailModal=(data)=>{
  setDetailModal(false)
  setDetailData(data);
  if(cardActionTaken === true){
    setTimeout(() => location.reload(), 100)
  }

}

const _handleCardActionTaken=()=>{
  setCardActionTaken(true)
}

const _openDetailModal = (data)=>{
  setDetailModal(true);
  setDetailData(data);
}

let filterValues = urlService.current.getEntries();

useEffect(() => {
  document.addEventListener("scroll", handleScroll, true);
  return () => document.removeEventListener("scroll", handleScroll, true);
}, [props?.goingUp]);

const handleScroll=(event)=>{
   if(cardRef && cardRef.current !== null){
    const currentScrollY = cardRef.current.getBoundingClientRect().y;
    if (prevScrollY.current < currentScrollY && props?.goingUp) {
      props?.setScrollDown();
    }
    if (prevScrollY.current > currentScrollY && !props?.goingUp) {
      props?.setScrollUp();
    }

    prevScrollY.current = currentScrollY;
   }
}

   return(
        <div className="dashboard-mobile">
          <div 
              className="course-page" 
              style={  mobileFiltersState ? {zIndex : 99999} : window.innerWidth <= 500 ? { marginTop : '2rem' } : null }
           > 
              {<div className={`${window.innerWidth > 500 ? 'filter-column' : 'filter-mobile'} ${window.innerWidth <= 500 && mobileFiltersState ? 'show-filter' : 'hide-filters'}`} style={window.innerWidth <= 500 ? {background: props.theme ==='dark' ? '#222222' : '#DEDEDE',zIndex:999,paddingBottom: '7.5rem'} : null}>
                <div 
                className="filter-head" 
                // style={window.innerWidth <= 500 ? {background: props.theme ==='dark' ? '#222222' : '#DEDEDE'} : null}
                >
                  {appliedFiltersCount.current === 0 ? 'No Filters Applied' : `${appliedFiltersCount.current} filter${appliedFiltersCount.current === 1 ? '' : 's'} applied`}
                  {appliedFiltersCount.current !== 0 && <span style={window.innerWidth > 500 ? { display: 'block' } : { display: 'none' }}><Button text="Reset" classes="btn-primary" style={{ borderRadius: '4px', padding: '1rem 2rem', fontStyle: 'normal' }} onClick={resetFilters} /></span>}
                  {window.innerWidth <= 500 && 
                  <span 
                  className='cross' 
                  onClick={() => {
                      let filterValues = urlService.current.getEntries();
                      if(filterValues && filterValues.length > 0){
                        handleApplyButton()
                      }
                      else{
                        setMobileFiltersState(false)
                        props?.toggleFilterVisible()
                      }
                   
                    }}>
                    <Image src={closeIcon} objectFit='cover' />
                    </span>}
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
                    min={0}
                    getRange={handleCostRange}
                    updateCostSlider={updateCostSlider}
                    setIsAppliedCostSlider={() => setIsAppliedCostSlider(true)}
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
                  <Filter
                    item={{ name: 'Finance Options', type: filterList.FINANCE_OPTIONS }}
                    filterState={financeOptionList}
                    updateFilterState={updateFilterState}
                    theme={theme}
                  />
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
              <div className="list-column">
                <div
                  className="filter-container" 
                  style={{ opacity: 1,zIndex: -1}}
                >
                  <div className="segment-container">
                    <SegmentedBar
                      items={Lists.courseTypes}
                      ref={courseTypeRef}
                      style={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: '1.6rem',
                      }}
                      theme={theme}
                      // bgColor='#16181A'
                      handleTabNumber={(i) => {
                        setCourseType(i)
                        // callMixpanel(MixpanelStrings.COURSE_TYPE_SEGEMENT_TRIGGERED, Lists.courseTypes[i])
                      }}
                      selected={courseType}
                    />
                  </div>
                  <SecondaryDropdown
                    heading={Lists.sortByList[sortState]['name']}
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
                      setPageLoadSortState(null)
                      setSortState(i)
                      // callMixpanel(MixpanelStrings.SORTING_DROPDOWN_TRIGGERED, Lists.sortByList[i].name)
                    }}
                  />
                  {/* <div style={{ flexGrow: 1 }}></div> */}
                  {/* <div className="text-container">Showing {totalCourses} Course{totalCourses === 1 ? '' : 's'}</div> */}
                </div>
                <div style={ props.searchValue.length > 0 ? {display: 'none'} : props.goingUp ? {display:'flex',flexDirection:'row',alignItems:"center",overflow:'scroll',background: '#FFFFFF',boxSizing: "border-box" ,boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',width:'100%',position:'fixed',top: '0rem',zIndex: 998} :  {display:'flex',flexDirection:'row',alignItems:"center",overflow:'scroll',background: '#FFFFFF',boxSizing: "border-box" ,boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',width:'100%',position:'fixed',top: '5rem',zIndex: 998}}>
                   <SubjectTab title={subCategory} selectedCategory={selectedCategory} setSubCategoriesData={setSubCategoriesData} theme={props.theme} />  
                </div>
                <div className="list-container" style={ window.innerWidth <= 500 ?  props.searchValue.length > 0 ? {marginTop: '5rem'} : null : null} ref={cardRef}>
                  <List
                    type={listTypes?.HORIZONTAL_CARDS}
                    list={courseCardData}
                    listApiStatus={coursesApiStatus}
                    openDetailModal={(item)=>_openDetailModal(item)} 
                    token={props?.token}
                    openApplyNowModal={(item)=> _openApplyNowModal(item)}
                    openLoginModal={()=>props?.openLoginModal()}
                    setLastElement={setLastCourse}
                  />
                </div>
               
                <div className='search-section-mobile' style={ props?.goingUp ? {position: "fixed",bottom: '0rem'} : props.searchValue.length > 0 ? {position: "fixed",top: 0,bottom: '100%'} : !props.searchValue && filterValues.length > 0 && (filterValues[0] === "subject" || filterValues[0] === "min_price" || filterValues[0] === "sort_by_relevance") ? {position: "fixed",bottom: '6rem'} : !props.searchValue && filterValues.length > 0 ? {position: "fixed",bottom: '0rem'} : null }>
                <div style={{width: '100%',boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',background: '#FFFFFF' }}>
                  <SearchMobile handleOpenMobileSearch={() => props?.handleOpenMobileSearch()} searchValue={props?.searchValue} clearSearch={()=>props?.clearSearch()} toggleFilterVisible={()=>props?.toggleFilterVisible()} openFilterVisible={()=>props?.openFilterVisible()}/>
                </div>
              </div>
              </div>
              {window.innerWidth <= 500 && 
              <div>
              <div className='mobile-view-actions' style={ props?.goingUp ? {position: "fixed",bottom: '7rem',padding: 0} : props.searchValue && props.searchValue.length > 0 ? {padding: 0,marginBottom: 10,position: 'fixed', bottom: '3rem'} : !props.searchValue && filterValues.length > 0 && (filterValues[0] === "subject" || filterValues[0] === "min_price" || filterValues[0] === "sort_by_relevance") ? {position: "fixed",bottom: '13rem',padding: 0} : !props.searchValue && filterValues.length > 0 ? {position: "fixed",bottom: '7rem',padding: 0} : {padding: 0,marginBottom: 10}}>
                <span className='filter' style={{marginLeft:12}}><Image src={sortingIcon} alt='filters' objectFit='cover' onClick={() =>_handleFilterState() } /></span>
                    <FloatActionButton
                      type='course type'
                      heading={Lists.courseTypesFloatList[courseTypesFloatState]['name']}
                      style={{
                        borderRadius: '10rem',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: '1.6rem',
                        color: '#FFFFFF',
                      }}
                      toggleFilterVisible={()=>props?.toggleFilterVisible()}
                      openFilterVisible={()=>props?.openFilterVisible()}
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
                      toggleFilterVisible={()=>props?.toggleFilterVisible()}
                      openFilterVisible={()=>props?.openFilterVisible()}
                      floatList={[...Lists.sortByList]}
                      selected={sortState}
                      onSelect={(item, i) => {
                        setPageLoadSortState(null)
                        setSortState(i)
                        // callMixpanel(MixpanelStrings.SORTING_DROPDOWN_TRIGGERED, Lists.sortByList[i].name)
                      }}
                    />
                  </div>
                </div>
                }
              </div>
            
         
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
           props?.subjectDropdownMobile ? 
           <FloatActionButton
                  type='subject type'
                  heading={null}
                  style={{
                    borderRadius: '10rem',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    lineHeight: '1.6rem',
                    color: '#313235',
                  }}
                  floatList={subjectData}
                  selected={selectedSubject}
                  onSelect={(item, i) => {
                    // setPageLoadSortState(null)
                    // setSortState(i)
                    // callMixpanel(MixpanelStrings.SORTING_DROPDOWN_TRIGGERED, Lists.sortByList[i].name)
                    selectSubject(item)
                    props.selectedSubject(item)
                    props.toggleSubjectDropdown()
                    props.toggleFilterVisible()
                  }}
                />
           : null
         }
         {
        props?.loginModal ? 
        <div style={{width: '100%',height: '100%'}}>
        <LoginModalContainer
          closeLoginModal={()=>props?.closeLoginModal()}
          openForgotPasswordModal={()=>props?.openForgotPasswordModal()}
          forgotPasswordModal={props?.forgotPasswordModal}
          handleLogout={props?.handleLogout}
          handleLogin={()=>props?.handleLogin()}
        /> 
        </div>
        : null
      }
      {
        props?.forgotPasswordModal ? 
        <ForgotPasswordModal
        handleForgotPasswordEnd={()=>props?.handleForgotPasswordEnd()}
        theme={props?.theme}
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMobile);