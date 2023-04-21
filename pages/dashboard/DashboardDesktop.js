import React, { useEffect, useState, useRef } from "react"
import CourseCard from '../../components/coursecard/CourseCard'
import Navbar from '../../components/navbar/Navbar'
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import constant from '../../config/constant.js'
import { useRouter } from 'next/router'
import DetailModal from '../../components/detailModal/DetailModal'
import Error from "../../components/error/Error"
import Lists from "../../config/list";
import Filter from "../../components/filter/Filter";
import axios from "axios";
import ApiStatus from "../../config/apiStatus";
import UrlService from "../../helper/urlService";
import Button from "../../components/button/Button";
import closeIcon from '../../assets/images/icons/close-icon-grey.svg';
import LoginModal from '../../components/loginModal/LoginModal'
import SearchBar from '../../components/searchBar/SearchBar'
import ApplyNowModal from '../../components/applyNowModal/ApplyNowModal'
import HomeSkeleton from "../../components/homePageSkeleton/homeSkeleton"
import Skeleton from '@mui/material/Skeleton';
import SuccessApplyModal from "../../components/successApplyModal/SuccessApplyModal"
import ForgotPasswordModal from "../../components/forgotPasswordModal/ForgotPasswordModal"
import CredencFeatures from "../../components/credencFeatures/credencFeatures"
import bannerImage from '../../assets/images/icons/bannerImage.svg'
import BrowseCategories from "../../components/browseCategory/Categories"
import CourseTrivia from "../../components/courseTrivia/CourseTrivia"
import QuerySuccessModal from "../../components/querySuccessModal/QuerySuccessModal"
import InquiryModal from "../../components/inquiryModal/inquiryModal"
import { useMediaQuery } from "react-responsive";
import InfiniteScroll from 'react-infinite-scroll-component';
import FooterModal from "../../components/footerModal/FooterModal";

const styles = {
  // width: "100%",
  height: "60%",
  backgroundImage: `url(${bannerImage.src})`,
};

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



export default function DashboardDesktop(props) {

  const isMount = useIsMount();
  let location = useRouter();
  let nextURL = location?.asPath?.substring(2, location?.asPath?.length)
  let urlService = useRef(new UrlService(nextURL));

  const filterList = Lists.filters;

  const [filterModal, setFilterModal] = useState(false);
  const [courseCardData, setCourseCardData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subjectData, setSubjectData] = useState([])
  const [subCategory, setSubCategory] = useState(props?.subCategoryData)
  const [selectedSubject, setSelectedSubject] = useState({})
  const [detailModal, setDetailModal] = useState(false);
  const [detailData, setDetailData] = useState({});
  const coursesApiStatus = useRef(new ApiStatus());

  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0)
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
  const [mobileFiltersState, setMobileFiltersState] = useState(false)
  const searchRef = useRef();
  const [searchbarWidth, setSearchBarWidth] = useState("41.0919%");
  const [applyNow, setApplyNow] = useState(false)
  const [enquire, setEnquire] = useState(false)
  let appliedFiltersCount = useRef(0);
  const [lastCourse, setLastCourse] = useState(null);
  const [cardApiSuccess, setCardApiSuccess] = useState(false)
  const dashboardRef = useRef()
  const [cardActionTaken, setCardActionTaken] = useState(false)
  const [nextPage, setNextPage] = useState(true)
  const [successApplyModal, setSuccessApplyModal] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [loginState, setLoginState] = useState(0);
  const [courseName, setCourseName] = useState('')
  const [trackStatus, setTrackStatus] = useState(false)
  const [applied, setApplied] = useState({
    state: false,
    id: 0
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [mostLikedCourses, setMostLikedCourses] = useState(props.trendingData);
  const [navbarTop, setNavbarTop] = useState(false);

  // let observer = useRef(
  //   new IntersectionObserver(
  //     (entries) => {
  //       const first = entries[0];
  //       if (first.isIntersecting === true && nextPage === true) {
  //         setPageNumber((pn) => pn > 0 ? pn + 1 : pn);
  //       }
  //     })
  // );

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });


  useEffect(() => {
    // getSubCategoryData()
    // getMostLikedCourses()
    getExternalUser()
    setMostLikedCourses(props.trendingData)
    setSubCategory(props.subCategoryData)
    setCourseCardData(props.courseData.data)
  }, [])

  useEffect(() => {
    if(pageNumber > 1){
      if (nextPage === true) {
        coursesApiStatus.current.start();
        handleFilteredData(true);
        if (pageNumber === 1) {
          applyFilters();
        }
      }
    }
  }, [pageNumber]);

  // useEffect(() => {

  //   const currentElement = lastCourse;
  //   const currentObserver = observer.current;
  //   if (currentElement) {
  //     currentObserver.observe(currentElement);
  //   }

  //   return () => {
  //     if (currentElement) {
  //       currentObserver.unobserve(currentElement);
  //     }
  //   };
  // }, [lastCourse]);

  const getExternalUser = () => {
    let externalUser = urlService.current.hasEntry("partner_key")
    if (nextURL && nextURL.length > 0 && props?.token === null) {
      if (externalUser === true) {
        props?.openLoginModal()
      }
    }
  }

  const _getSubjectDetails = (item) => {

    urlService.current.removeEntry('domain')

    if (item.name === "All") {
      // urlService.current.addEntry('subject', 'All');
    } else {
      urlService.current.addEntry('domain', item.value);
    }

    setPageNumber(1)
    handleCardData()
  }

  const _getSubCategoryDetails = (item) => {

    urlService.current.removeEntry('subject')

    if (item.value === "All") {
      urlService.current.removeEntry('subject')
    } else {
      urlService.current.addEntry('subject', item.value);
    }
    setPageNumber(1)
    handleCardData()
  }

  const handleCardData=()=>{
    coursesApiStatus.current.start();
    handleFilteredData(true);
  }


  const openFilterModal = async () => {
    setFilterModal(true)
  }

  const openSubjectModal = () => {
    setSubjectModalVisible(true)
  }

  const closeSubjectModal = () => {
    setSubjectModalVisible(false)
  }

  const setSubCategoriesData = (item) => {
    setSelectedCategory(item.value)
    _getSubCategoryDetails(item)
  }

  const selectSubject = (item) => {
    setSelectedSubject(item)
    _getSubjectDetails(item)
  }

  const openDetailModal = (data) => {
    // props?.openCoursePreviewModal()
    setDetailModal(true);
    setDetailData(data);
  }

  const closeDetailModal = async (data) => {
    props?.closeCoursePreviewModal()
    setDetailModal(false)
    setDetailData(data);
    if (cardActionTaken === true) {
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

    if (props?.searchValue && props?.searchValue?.length > 0) {
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

  }

  const handleCostRange = (min, max) => {
    setCostRange({ min, max });
    urlService.current.changeEntry(queries.MIN_PRICE, min);
    urlService.current.changeEntry(queries.MAX_PRICE, max);

    if (isDesktopOrLaptop) {
      if (pageNumber > 1) {
        setPageNumber(1)
      } else {
        handleFilteredData();
      }

    }
  }


  const handleSearchClicked = async (forcePageNumber = 0) => {
    const getParams = () => {
      return `?${urlService.current.getUpdatedUrl()}`;
    }

    coursesApiStatus.current.makeApiCall();
    // await delay(5000);
    let res;
    let token = props?.token;
    if (token === null || !token) {
      res = await axios.get(`${constant.API_URL.DEV}/course/search/${getParams()}${pageNumber > 0 ? `&page_no=${pageNumber}` : ''}`, {
        headers: {
          'key': 'credenc'
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
    } else {
      res = await axios.get(`${constant.API_URL.DEV}/course/search/${getParams()}${pageNumber > 0 ? `&page_no=${pageNumber}` : ''}`, {
        headers: {
          'Authorization': `Bearer ${!!token ? token : ''}`,
          'key': 'credenc'
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

  const handleFilteredData = async (updatePageNumber = true, e) => {
    coursesApiStatus.current.start();
    setCardApiSuccess(false)

    let res = await handleSearchClicked();
    // if (forcePageNumber === 1) setForcePageNumber(0);
    if (res?.next === true) {
      setNextPage(true)
    } else {
      setNextPage(false)
    }

    // if (pageNumber <= 1 || updatePageNumber === false) {
    //   // setCourses([...res.data]);
    //   setCardApiSuccess(true)
    //   if (res?.data)
    //     setCourseCardData([...res.data])
    // } else {
      // setCourses([...courseCardData, ...res.data]);
      setCardApiSuccess(true)
      setCourseCardData([...courseCardData, ...res.data])
    // }

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
  const applyFilters = (reset = false) => {

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
    urlService.current.removeAll();
    updateBrowserUrl();
    if (pageNumber !== 1) {
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

  useEffect(() => {
    if (maxPrice !== 0 && costRange.max === 0) {
      setCostRange({ ...costRange, max: maxPrice });
    }
  }, [maxPrice]);

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

  const onScroll = () => {
    if (searchRef && searchRef.current !== null) {
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
  }

  useEffect(() => {
    document.addEventListener("scroll", onScroll, true);
    return () => document.removeEventListener("scroll", onScroll, true);
  }, []);

  const _handleSearch = (event) => {
    if (event?.course_id) {
      location.push({
        pathname: '/details',
        query: { course_id: event?.course_id },
      })
      props?._showSearchBar()
    }
    props?.handleSearch(event)
  }

  const _handleCategories=(event)=>{
    location.push({
      pathname: '/search',
      query: {
        domain: event
      }
    },
    undefined,
    {
      shallow: true
    })
  }

  const _openApplyNowModal = (data) => {
    setApplyNow(true)
    setDetailData(data)
  }

  const _closeApplyNowModal = () => {
    setApplyNow(false)
  }

  const _handleShowAllCourses = () => {
    setFilterModal(false)
  }

  const _handleCardActionTaken = () => {
    setCardActionTaken(true)
  }

  const _closeSuccessApplyModal = () => {
    setSuccessApplyModal(false)
  }

  const _openSuccessApplyModal = (data) => {
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

  const _setUserEmail = (data) => {
    setUserEmail(data)
  }

  const _setUserLoginState = (data) => {
    setLoginState(data)
  }

  const _enableTrackStatus = () => {
    setTrackStatus(true);
  }

  const _handleAppliedStage = (courseId) => {
    setApplied({
      state: true,
      id: courseId
    })
  }

  const _handleTrivia = (data) => {
    if (data.courseType.length > 0 && data.subject.length > 0) {
      location.push({
        pathname: '/search',
        query: {
          course_type: data.courseType,
          subject: data.subject,
        }
      },
      undefined,
      {
        shallow: true
      })
    }
    else if (data.courseType && data.courseType.length > 0) {

      location.push({
        pathname: '/search',
        query: {
          course_type: data.courseType,
        }
      },
      undefined,
      {
        shallow: true
      })

    } else if (data.subject && data.subject.length > 0) {
      
      location.push({
        pathname: '/search',
        query: {
          subject: data.subject,
        }
      },
      undefined,
      {
        shallow: true
      })
    }
  }

  useEffect(() => {
    if (dashboardRef && dashboardRef?.current !== null) {
      if (dashboardRef?.current?.getBoundingClientRect().y <= -2563) {
        setNavbarTop(true)
      } else {
        setNavbarTop(false)
      }
    }
  }, [dashboardRef?.current?.getBoundingClientRect().y])

  const handleScrollData = () => {
    // setPageNumber(pageNumber.current+1)
    setPageNumber(pageNumber + 1)
    handleFilteredData()
  }

  return (
    <div>
      <div className="dashboard" style={props?.loginModal ? { overflow: 'hidden' } : null} ref={dashboardRef}>
          <div className='banner' ref={searchRef} style={styles}>
            <div className='text-content'>
              <h1 className='heading'>From Learners to Leaders</h1>
              <h2 className='sub-header'>Develop new skills with our hand-picked courses from across the world</h2>
            </div>
            <div
              className="searchbar"
              style={{
                width: `${searchbarWidth}`,
                marginTop: 32,
                zIndex: "1101",
                visibility: `${props.showSearchBar ? "hidden" : "visible"}`,
                transition: '10s ease-in ease-out',
                transform: 'translateY(0)',
              }}
            >
              <SearchBar 
               searchbarWidth={searchbarWidth} 
               search={props?.searchValue} 
               handleSearch={(e) => _handleSearch(e)} 
               selectSearch={(e) => props?.selectSearch(e)} 
               token={props?.token} 
               showSearchBar={props?.showSearchBar}
              />
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
            <CredencFeatures />
          </div>

          <div className="dashboard-courses-container">
            <div className="header-container">
              <div className="header-text">
                Trending Courses
              </div>
              <div style={{ marginLeft: 5, marginTop: 2 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#034FE2" viewBox="0 0 256 256"><path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path></svg>
              </div>
              {/* <Image src={trendingIcon} alt="trendingIcon" width={36} height={36} objectFit="contain" style={{marginLeft: 5,marginTop: 2}}/> */}
            </div>
            <div className='course-section'>
              {
                props?.trendingData && props?.trendingData.length > 0 && props?.trendingData.map((item, index) => {
                  return (
                    <div key={index}>
                      <CourseCard
                        index={index}
                        data={item}
                        openDetailModal={() => openDetailModal(item)}
                        openApplyNowModal={() => _openApplyNowModal(item)}
                        token={props?.token}
                        openLoginModal={() => props?.openLoginModal()}
                        addLocalBookmarks={(count) => props?.addLocalBookmarks(count)}
                        removeLocalBookmarks={(count) => props?.removeLocalBookmarks(count)}
                        enableTrackStatus={() => _enableTrackStatus()}
                        applied={applied}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <BrowseCategories handleSearch={(e) => _handleCategories(e)} />
          </div>

          <div className="dashboard-courses-container">
            <div className="header-container">
              <div className="header-text">
                Most Liked
              </div>
              <div style={{ marginLeft: 8, marginTop: 2 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#0345E2" viewBox="0 0 256 256"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path></svg>
              </div>
            </div>
            <div className='course-section'>
              {
                mostLikedCourses && mostLikedCourses.length > 0 && mostLikedCourses.map((item, index) => {
                  return (
                    <div key={index}>
                      <CourseCard
                        index={index}
                        data={item}
                        openDetailModal={() => openDetailModal(item)}
                        openApplyNowModal={() => _openApplyNowModal(item)}
                        token={props?.token}
                        openLoginModal={() => props?.openLoginModal()}
                        addLocalBookmarks={(count) => props?.addLocalBookmarks(count)}
                        removeLocalBookmarks={(count) => props?.removeLocalBookmarks(count)}
                        enableTrackStatus={() => _enableTrackStatus()}
                        applied={applied}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <CourseTrivia handleTrivia={(item) => _handleTrivia(item)} />
          </div>

          <div className="dashboard-courses-container" style={{ borderBottom: '1px solid #DDDDDD', paddingBottom: 70 }}>
            <div className="header-container">
              <div className="header-text">
                Get New skills
              </div>
              {/* <Image src={trendingIcon} alt="trendingIcon" width={36} height={36} objectFit="contain" style={{marginLeft: 5,marginTop: 2}}/> */}
            </div>
            <div className='course-section'>
              {
                mostLikedCourses && mostLikedCourses.length > 0 && mostLikedCourses.map((item, index) => {
                  return (
                    <div key={index}>
                      <CourseCard
                        index={index}
                        data={item}
                        openDetailModal={() => openDetailModal(item)}
                        openApplyNowModal={() => _openApplyNowModal(item)}
                        token={props?.token}
                        openLoginModal={() => props?.openLoginModal()}
                        addLocalBookmarks={(count) => props?.addLocalBookmarks(count)}
                        removeLocalBookmarks={(count) => props?.removeLocalBookmarks(count)}
                        enableTrackStatus={() => _enableTrackStatus()}
                        applied={applied}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className="course-navbar" 
            style={
            { position: 'sticky', 
              top: '8rem', 
              background: '#FFFFFF', 
              zIndex: 9999, 
              boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)', 
              }}
            >
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
                  appliedFiltersCount={appliedFiltersCount.current}
                /> :
                <div style={{ display: 'flex', justifyContent: 'flex-start', padding: 24 }}>
                  {Array.from({ length: 11 }, (x, i) => {
                    return <div style={{ marginRight: 30 }}>
                      <Skeleton variant="rectangular" width={90} height={23} key={i} />
                    </div>
                  })}
                </div>
            }
          </div>
          {/* <FilterModal filterModal={filterModal} toggleFilterModal={closeFilterModal}/> */}
          {/* <div className="course-content">
            { <CategoryDropdown categories={categories}/> }
            <div className="card-content">

              {
                courseCardData && courseCardData.length > 0 ?
                  <div className="course-card-container" >
                    {
                      courseCardData?.map((item, i) => {
                        return i === courseCardData.length - 1 ?
                          <div key={`${item.id}:${i}`} ref={setLastCourse}>
                            <CourseCard
                              key={i}
                              data={item}
                              openDetailModal={() => openDetailModal(item)}
                              openApplyNowModal={() => _openApplyNowModal(item)}
                              token={props?.token}
                              openLoginModal={() => props?.openLoginModal()}
                              addLocalBookmarks={(count) => props?.addLocalBookmarks(count)}
                              removeLocalBookmarks={(count) => props?.removeLocalBookmarks(count)}
                              enableTrackStatus={() => _enableTrackStatus()}
                              applied={applied}
                            />
                          </div> :
                          <CourseCard
                            key={i}
                            data={item}
                            openDetailModal={() => openDetailModal(item)}
                            openApplyNowModal={() => _openApplyNowModal(item)}
                            token={props?.token}
                            openLoginModal={() => props?.openLoginModal()}
                            addLocalBookmarks={(count) => props?.addLocalBookmarks(count)}
                            removeLocalBookmarks={(count) => props?.removeLocalBookmarks(count)}
                            enableTrackStatus={() => _enableTrackStatus()}
                            applied={applied}
                          />

                      })
                    }
                    { <HomeSkeleton /> }
                  </div> :
                  courseCardData.length === 0 && cardApiSuccess ?
                    <Error type={Lists.errorTypes.EMPTY} text={'No Result Found'} /> :
                    <div className="course-card-container">
                      {Array.from({ length: 4 }, (x, i) => {
                        return <HomeSkeleton key={i} />;
                      })}
                    </div>
              }

            </div>
          </div> */}
          <div className="card-content">

          <InfiniteScroll
            dataLength={courseCardData.length} //This is important field to render the next data
            next={handleScrollData}
            hasMore={nextPage}
          >
            {
              courseCardData?.map((item, i) => {
                return <div key={`${item.id}:${i}`}>
                    <CourseCard
                      key={i}
                      data={item}
                      openDetailModal={() => openDetailModal(item)}
                      openApplyNowModal={() => _openApplyNowModal(item)}
                      token={props?.token}
                      openLoginModal={() => props?.openLoginModal()}
                      addLocalBookmarks={(count) => props?.addLocalBookmarks(count)}
                      removeLocalBookmarks={(count) => props?.removeLocalBookmarks(count)}
                      enableTrackStatus={() => _enableTrackStatus()}
                      applied={applied}
                    />
                  </div>
              })
            }
          </InfiniteScroll>

          </div>
          
      </div>

      <SlidingPanel
        type={'left'}
        isOpen={filterModal}
        backdropClicked={() => setFilterModal(false)}
        size={30}
      >
        <div className='filter-sidebar-content'>
          {<div className={`${isDesktopOrLaptop ? 'filter-column' : 'filter-mobile'} ${!isDesktopOrLaptop && mobileFiltersState ? 'show-filter' : 'hide-filters'}`} style={isDesktopOrLaptop ? { minHeight: '95vh', overflow: 'scroll' } : null}>
            <div className="filter-head">
              <span>{appliedFiltersCount.current === 0 ? <span className="no-filter-text">No filters applied</span> : `${appliedFiltersCount.current} filter${appliedFiltersCount.current === 1 ? '' : 's'} applied`}</span>
              {/* {appliedFiltersCount.current !== 0 && <span style={isDesktopOrLaptop ? { display: 'block' } : { display: 'none' }}><Button text="Reset" classes="btn-primary" style={{ borderRadius: '4px', padding: '1rem 2rem', fontStyle: 'normal' }} onClick={resetFilters} /></span>} */}
              {!isDesktopOrLaptop && <span className='cross' onClick={() => setMobileFiltersState(false)}><img src={closeIcon} /></span>}
            </div>
            <div className='filters'>

              <Filter
                item={{ name: 'Class Mode', type: filterList.CLASS_MODE }}
                filterState={classModeList}
                updateFilterState={updateFilterState}
              />
              <Filter
                item={{ name: 'Course Pace', type: filterList.COURSE_PACE }}
                filterState={[...coursePaceList]}
                updateFilterState={updateFilterState}
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
              />
              <Filter
                item={{ name: 'Difficulty Level', type: filterList.DIFFICULTY_LEVEL }}
                filterState={difficultyList}
                updateFilterState={updateFilterState}
              />
              {/* <Filter
                        item={{ name: 'Work Experience', type: filterList.WORK_EXPERIENCE }}
                        filterState={workExperienceList}
                        updateFilterState={updateFilterState}
      
                      /> */}
              {
                props?.thirdPartyUser != constant.PARTNER_KEY.NJ ?
                  <Filter
                    item={{ name: 'Finance Options', type: filterList.FINANCE_OPTIONS }}
                    filterState={financeOptionList}
                    updateFilterState={updateFilterState}
                  /> : null
              }

              {/* <Filter
                        item={{ name: 'Course Language', type: filterList.COURSE_LANGUAGE }}
                        filterState={languageList}
                        updateFilterState={updateFilterState}
      
                      /> */}
              <Filter
                item={{ name: 'Platform', type: filterList.PLATFORM }}
                filterState={platformList}
                updateFilterState={updateFilterState}
              />
              <Filter
                item={{ name: 'Educator', type: filterList.EDUCATOR }}
                filterState={educatorList}
                updateFilterState={updateFilterState}
              />
            </div>
            <div className="filter-footer" style={{ textAlign: "center", marginTop: 20 }}>
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
          {isDesktopOrLaptop ? <div className="detail-modal-footer">
            <div className='modal-container'>
              <div className='reset-button-container'>
                <Button
                  disabled={false}
                  onClick={resetFilters}
                  classes='btn-reset'
                  text={appliedFiltersCount.current > 0 ? "Clear All" : "Reset"}
                />
              </div>
              <div className='modal-button-wrapper'>
                <Button
                  disabled={false}
                  onClick={_handleShowAllCourses}
                  classes='btn-apply'
                  text={totalCourses ? `Show ${totalCourses} Courses` : `No Courses`}
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
        backdropClicked={() => closeDetailModal(detailData)}
        size={30}
      >
        <DetailModal
          detailData={detailData}
          token={props?.token}
          openApplyNowModal={() => _openApplyNowModal(detailData)}
          closeDetailModal={() => closeDetailModal(detailData)}
          openLoginModal={() => props?.openLoginModal()}
          handleCardActionTaken={() => _handleCardActionTaken()}
          openDetailModal={() => openDetailModal()}
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
          closeApplyNowModal={() => _closeApplyNowModal()}
          openSuccessApplyModal={(courseName) => _openSuccessApplyModal(courseName)}
          handleAppliedStage={(id) => _handleAppliedStage(id)}
          courseName={detailData?.course_name}
        />
      </SlidingPanel>
      <SlidingPanel
        type={'right'}
        isOpen={successApplyModal}
        backdropClicked={() => setSuccessApplyModal(false)}
        size={30}
      >
        <SuccessApplyModal closeSuccessApplyModal={() => _closeSuccessApplyModal()} courseName={courseName} />
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
          openSuccessModal={() => _openQuerySuccessModal()}
        />
      </SlidingPanel>
      <SlidingPanel
        type={'right'}
        isOpen={querySuccessModal}
        backdropClicked={() => setQuerySuccessModal(false)}
        size={30}
      >
        <QuerySuccessModal closeSuccessQueryModal={() => setQuerySuccessModal(false)} courseName={detailData?.course_name} />
      </SlidingPanel>
      {
        props?.loginModal ?
          <div style={{ width: '100%', height: '100%' }}>
            <LoginModal
              closeLoginModal={() => props?.closeLoginModal()}
              openForgotPasswordModal={() => props?.openForgotPasswordModal()}
              forgotPasswordModal={props?.forgotPasswordModal}
              handleLogin={() => props?.handleLogin()}
              setUserEmail={(data) => _setUserEmail(data)}
              setUserLoginState={(data) => _setUserLoginState(data)}
            />
          </div>
          : null
      }
      {
        props?.forgotPasswordModal ?
          <ForgotPasswordModal
            handleForgotPasswordEnd={() => props?.handleForgotPasswordEnd()}
            closeForgotPasswordModal={() => props?.closeForgotPasswordModal()}
            userEmail={userEmail}
            openLoginModal={() => props?.openLoginModal()}
            loginState={loginState}
          />
          : null
      }

    </div>
  )
}