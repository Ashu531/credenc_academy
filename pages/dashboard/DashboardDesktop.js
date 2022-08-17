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
import FloatActionButton from "../../components/floatActionButton/floatActionButton";
import LoginModalContainer from '../../components/loginModal/LoginModalContainer'
import ForgotPasswordModal from '../../components/forgotPasswordModal/ForgotPasswordModal'


const subjectKey = 'credenc-edtech-subject';
const compareKey = 'credenc-marketplace-compares';
const bookmarkKey = 'credenc-marketplace-bookmarks';
const upvoteKey = 'credenc-edtech-upvote'

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
  const [selectedCategory,setSelectedCategory] = useState(constant.COURSES.SUB_CATEGORIES[0].title);
  const [subjectData,setSubjectData] = useState([])
  const [selectedSubject,setSelectedSubject] = useState({})
  const [detailModal, setDetailModal] = useState(false);
  const [detailData,setDetailData] = useState({});
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
  const [userUpvoteList, setUserUpvoteList] = useState([]);
  const [updateCostSlider, setUpdateCostSlider] = useState(false)
  const [isAppliedCostSlider, setIsAppliedCostSlider] = useState(false);
  const [sortState, setSortState] = useState(0);
  const [pageLoadSortState, setPageLoadSortState] = useState(null);

  const [courseTypesFloatState, setCourseTypesFloatState] = useState(4)
  const [mobileFiltersState, setMobileFiltersState] = useState(false)
  let appliedFiltersCount = useRef(0);

  const [lastCourse, setLastCourse] = useState(null);
  const courseTypeRef = useRef(null);
  // const [compareTextVisible,setCompareTextVisible] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setMounted(true);
}, []);


  useEffect(()=>{
    getDataFromBaseUrl()
    getSubjectData()
  },[])
    
 const getDataFromBaseUrl=()=>{
    if(location?.query?.hasOwnProperty('subject') ){
     let data={
        name: location?.query?.subject
      }
      setSelectedCategory(location?.query?.sub_category)
      setSelectedSubject(data)
      getCardData(data)
    }else{
      let data={
        name: "All"
      }
      if(location.query.hasOwnProperty('sub_category')){
        setSelectedCategory(location?.query?.sub_category)
      }else{
        setSelectedCategory(constant.COURSES.SUB_CATEGORIES[0].title)
      }
     
      setSelectedSubject(data)
      getCardData()
    }
  }

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
  }

  const getCardData=(item)=>{
    let URL = `${constant.API_URL.DEV}/batch/search`
    let subjectQuery="";
    if(item !== null && item?.name && item?.name !== "All"){
      subjectQuery = `/?subject=${item?.name}`
      URL=URL.concat(subjectQuery)
    }
    let subCategory = `/?sub_category=${selectedCategory}`
    URL=URL.concat(subCategory)
    fetchCardData(URL)
  }

  const fetchCardData=async(URL)=>{
    const response = await fetch(URL)
    const data = await response.json()
    setCourseCardData(data?.data)
  }


  const _getSubjectDetails=(item)=>{
    
    if(item.name === "All"){
      location.push({
        pathname: "/",
        query: {
          sub_category: selectedCategory
        }
      })
    }else{
      location.push({
        pathname: "/",
        query: {
          subject: item.name,
          sub_category: selectedCategory
        }
      })
    }
    
    getCardData(item)
  }

  const _getSubCategoryDetails=(item)=>{
    console.log(item,"item")
    if(selectedSubject.name === "All"){
      location.push({
        pathname: "/",
        query: {
        sub_category: item.title,
       }
     })
    }else{
      location.push({
        pathname: "/",
        query: {
          subject: selectedSubject.name,
          sub_category: item.title
        }
      })
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
      setSelectedCategory(item.title)
      _getSubCategoryDetails(item)
    }

    const selectSubject=(item)=>{
      setSelectedSubject(item)
      _getSubjectDetails(item)
  }

  const openDetailModal = (data)=>{
    setDetailModal(true);
    setDetailData(data);
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
    let bookmarkArray = [];
    let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
    if(bookmarkItem && bookmarkItem.length > 0){
      bookmarkArray =  bookmarkItem.filter(data => data !== item.id )
    }
    localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
  }
  
  const _onAddToBookmark=(item)=>{
    let bookmarkArray = [];
    let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
    if(bookmarkItem && bookmarkItem.length > 0){
      bookmarkArray.push(...bookmarkItem)
    }
    bookmarkArray.push(item.id)
    localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
  }

  const _onAddToCompare=(item)=>{
    let compareArray = [];
    let compareItem = JSON.parse(localStorage.getItem(compareKey)) 
    if(compareItem && compareItem.length > 0){
        compareItem.forEach(data=>{
            if(data.id === item.id)
            return;
        })
     compareArray.push(...compareItem)
    }
    compareArray.push(item.id)
    localStorage.setItem(compareKey,JSON.stringify(compareArray));
    
   }
   
   
   const _addToCompare=(item)=>{
   let compare = JSON.parse(localStorage.getItem(compareKey)) 
   let compareAvailable = false;
   if(compare && compare.length > 0){
    compare.forEach(data=>{
       if(data === item.id){
        compareAvailable= true
         return 0;
       }
    })
    if(compareAvailable === false){
      _onAddToCompare(item);
    }
   }
   else{
    _onAddToCompare(item);
   }
}

   const _checkBookmarks=(item)=>{
    let bookmarkVisible = false;
    let tempBookmarkData = JSON.parse(localStorage.getItem(bookmarkKey));
    if(tempBookmarkData && tempBookmarkData.length > 0){
      if (tempBookmarkData.includes(item?.id))
      bookmarkVisible = true
      else
      bookmarkVisible = false
    }
    return bookmarkVisible;
   }

   const _checkCompareText=(item)=>{
    let compareText = 'Add to Compare';
    let tempCompareData = JSON.parse(localStorage.getItem(compareKey));
    if(tempCompareData && tempCompareData.length > 0){
      if (tempCompareData.includes(item?.id))
      compareText = 'Go to Compare'
      else
      compareText = 'Add to Compare'
    }
    return compareText;
   }

   const updateQueryString = (i, filter, list) => {

    urlService.current.removeEntry(filter);

    list.forEach(item => {
      if (item['isApplied']) {
        console.log(filter,item['filterValue'],"item['filterValue']+++")
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
let token = null;
    if (token === null || !token) {
      res = await axios.get(`${constant.API_URL.DEV}/batch/search/${getParams()}${pageNumber > 0 ? `&page_no=${pageNumber}` : ''}`)
        .then(res => {
          coursesApiStatus.current.success();
          return res.data;
        })
        .catch(err => {
          coursesApiStatus.current.failed();
          console.log(err);
        });
    } else {
      res = await axios.get(`${constant.API_URL.DEV}/batch/search/${getParams()}${pageNumber > 0 ? `&page_no=${pageNumber}` : ''}`, {
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
    let res = await handleSearchClicked();
    // if (forcePageNumber === 1) setForcePageNumber(0);
    if (pageNumber <= 1 || updatePageNumber === false) {
      setCourses([...res.data]);
      setCourseCardData([...res.data])
    } else {
      setCourses([...courses, ...res.data]);
      // setCourseCardData([...res.data])
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

      if (pageNumber > 1) {
        setPageNumber(1);
      } else {
        handleFilteredData(false);
      }
      if(!location.query.hasOwnProperty('subject') && !location.query.hasOwnProperty('sub_category')){
        props.openFilterExpandedStage();
      }
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
    setPageLoadSortState(getSortStateFromUrl());

    // change tab number
    let tabNumber = getTabNumber(queries.COURSE_TYPE, urlService)
    courseTypeRef?.current?.changeTab(tabNumber);
  }, []);


  const setUpvoteCount=(item)=>{
    if(props?.token && props?.token.length > 0){
      upvote(item)
    }
    else{
      console.log("User not signed in");
    }
    
  }

  const removeUpvoteCount=(item)=>{
   if(props?.token && props?.token.length > 0){
    removeUpvote(item)
    }else{
      console.log("User not signed in");
    }
  }

  const upvote = async (item) => {

    await axios.post(`${constant.API_URL.PROD}/batch/upvote/add`, {
        "batch_id": item.id,
        "is_up_vote": "true"
    }, {
        headers: {
            'Authorization': `Bearer ${props?.token}`
        },
    })
    .then(res => {
        if (res?.data?.success)
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
  await axios.post(`${constant.API_URL.PROD}/batch/upvote/remove/`, {
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

 

 return(
        <div>      
{
  props.filterExpandedStage ? 
      <div className="course-page"> 
      {<div className={`${window.innerWidth > 500 ? 'filter-column' : 'filter-mobile'} ${window.innerWidth <= 500 && mobileFiltersState ? 'show-filter' : 'hide-filters'}`}>
        <div className="filter-head">{appliedFiltersCount.current === 0 ? '' : `${appliedFiltersCount.current} filter${appliedFiltersCount.current === 1 ? '' : 's'} applied`}
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
          <Filter
            item={{ name: 'Work Experience', type: filterList.WORK_EXPERIENCE }}
            filterState={workExperienceList}
            updateFilterState={updateFilterState}
            theme={theme}
          />
          <Filter
            item={{ name: 'Finance Options', type: filterList.FINANCE_OPTIONS }}
            filterState={financeOptionList}
            updateFilterState={updateFilterState}
            theme={theme}
          />
          <Filter
            item={{ name: 'Course Language', type: filterList.COURSE_LANGUAGE }}
            filterState={languageList}
            updateFilterState={updateFilterState}
            theme={theme}
          />
        </div>
        <div className="filter-footer">
          <Link className='link' href={`/privacy`} target='_blank' rel='noopener noreferer'>Privacy policy & disclaimer</Link>
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
          <div style={{ flexGrow: 1 }}></div>
          <div className="text-container">Showing {totalCourses} Course{totalCourses === 1 ? '' : 's'}</div>
        </div>
        <div className="list-container">
          <List
            type={listTypes?.HORIZONTAL_CARDS}
            list={courses}
            listApiStatus={coursesApiStatus}
            // handleSignInClick={handleSignInClick}
            openDetailModal={(item)=>openDetailModal(item)} 
            addToCompare={(item)=>_addToCompare(item)} 
            addToBookmark={(item)=>_addToBookmark(item)}
            compareText={(item)=>_checkCompareText(item)}
            upvoteList={userUpvoteList}
            setUpvoteCount={(item)=> setUpvoteCount(item)}
            removeUpvoteCount={(item)=> removeUpvoteCount(item)}
            // compareTextVisible={compareTextVisible} 
          />
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
  : <div className="dashboard">
     <div className="dashboard-upper-section">
       
       <Banner />
       <div className="course-navbar">
       <Navbar 
       toggleFilterModal={openFilterModal} 
       openSubjectModal={openSubjectModal} 
       closeSubjectModal={closeSubjectModal} 
       subCategories={constant.COURSES.SUB_CATEGORIES} 
       selectedCategory={selectedCategory} 
       setSubCategoriesData={setSubCategoriesData} 
       subjectData={subjectData}
       selectedSubject={selectedSubject} 
       selectSubject={selectSubject}
       theme={props.newTheme}
       />
       </div>
       {/* <FilterModal filterModal={filterModal} toggleFilterModal={closeFilterModal}/> */}
       <div className="course-content">
       {/* <CategoryDropdown categories={categories}/> */}
       <div className="card-content">
       {/* <CategoryHeader  /> */}
       <div className="course-card-container" >
        {
           courseCardData?.map((item,index)=>{
            let bookmarkVisible = false;
            let tempBookmarkData = JSON.parse(localStorage.getItem(bookmarkKey));
            if(tempBookmarkData && tempBookmarkData.length > 0){
              if (tempBookmarkData.includes(item?.id)){
                bookmarkVisible = true
              }
             else
              bookmarkVisible = false
            }
            return(
               <CourseCard 
                 key={index} 
                 data={item} 
                 theme={props.newTheme} 
                 openDetailModal={()=>openDetailModal(item)} 
                 addToCompare={()=>_addToCompare(item)} 
                 addToBookmark={()=>_addToBookmark(item)}
                 compareText={_checkCompareText(item)}
                 bookmarkVisible={bookmarkVisible}
                 setUpvoteCount={()=> setUpvoteCount(item)}
                 removeUpvoteCount={()=> removeUpvoteCount(item)}
               />
             )
           })
         }
       </div>
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
                {<div className={`${window.innerWidth > 500 ? 'filter-column' : 'filter-mobile'} ${window.innerWidth <= 500 && mobileFiltersState ? 'show-filter' : 'hide-filters'}`}>
                    <div className="filter-head">
                      <span>{appliedFiltersCount.current === 0 ? '' : `${appliedFiltersCount.current} filter${appliedFiltersCount.current === 1 ? '' : 's'} applied`}</span>
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
                      <Filter
                        item={{ name: 'Work Experience', type: filterList.WORK_EXPERIENCE }}
                        filterState={workExperienceList}
                        updateFilterState={updateFilterState}
                        theme={theme}
                      />
                      <Filter
                        item={{ name: 'Finance Options', type: filterList.FINANCE_OPTIONS }}
                        filterState={financeOptionList}
                        updateFilterState={updateFilterState}
                        theme={theme}
                      />
                      <Filter
                        item={{ name: 'Course Language', type: filterList.COURSE_LANGUAGE }}
                        filterState={languageList}
                        updateFilterState={updateFilterState}
                        theme={theme}
                      />
                    </div>
                    <div className="filter-footer" style={{textAlign:"center", marginTop: 20}}>
                    <Link className='link' href={`/privacy`} target='_blank' rel='noopener noreferer'>Privacy policy & disclaimer</Link>
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
            </div>
        </SlidingPanel>

      <SlidingPanel
        type={'right'}
        isOpen={detailModal}
        backdropClicked={() => setDetailModal(false)}
        size={30}
      >
        <DetailModal 
        detailData={detailData} 
        addToCompare={()=>_addToCompare(detailData)} 
        addToBookmark={()=>_addToBookmark(detailData)}
        theme={props.theme} 
        setUpvoteCount={()=>setUpvoteCount(detailData)}
        removeUpvoteCount={()=>removeUpvoteCount(detailData)}
        />
      </SlidingPanel>
      {
        props?.loginModal ? 
        <div style={{width: '100%',height: '100%'}}>
        <LoginModalContainer
         closeLoginModal={()=>props?.closeLoginModal()}
         openForgotPasswordModal={()=>props?.openForgotPasswordModal()}
         forgotPasswordModal={props?.forgotPasswordModal}
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