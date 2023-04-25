import React, { useEffect, useState, useRef } from "react"
import CourseCard from '../../components/coursecard/CourseCard'
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import constant from '../../config/constant.js'
import { useRouter } from 'next/router'
import DetailModal from '../../components/detailModal/DetailModal'
import Error from "../../components/error/Error"
import SegmentedBar from "../../components/segementedBar/SegmentedBar";
import SecondaryDropdown from "../../components/primaryDropdown/SecondaryDropdown";
import Lists from "../../config/list";
import Filter from "../../components/filter/Filter";
import axios from "axios";
import ApiStatus from "../../config/apiStatus";
import UrlService from "../../helper/urlService";
import Button from "../../components/button/Button";
import { getTabNumber } from "../../helper/getTabNumber";
import filterIcon from '../../assets/images/icons/filter-icon-dark.svg';
import closeIcon from '../../assets/images/icons/close-icon-grey.svg';
import FloatActionButton from "../../components/floatActionButton/floatActionButton";
import LoginModal from '../../components/loginModal/LoginModal'
import ApplyNowModal from '../../components/applyNowModal/ApplyNowModal'
import SuccessApplyModal from "../../components/successApplyModal/SuccessApplyModal"
import ForgotPasswordModal from "../../components/forgotPasswordModal/ForgotPasswordModal"
import InfiniteScroll from 'react-infinite-scroll-component';
import QuerySuccessModal from "../../components/querySuccessModal/QuerySuccessModal"
import InquiryModal from "../../components/inquiryModal/inquiryModal"
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import SearchBar from '../../components/searchBar/SearchBar';

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

const categories = [
  {
    id: 1,
    name: 'Marketing'
  },
  {
    id: 2,
    name: 'Technology'
  },
  {
    id: 3,
    name: 'Design'
  },
  {
    id: 4,
    name: 'Business'
  },
]

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};



export default function SearchDesktop(props) {

  const isMount = useIsMount();
  let location = useRouter();
  let nextURL = `?${location?.asPath?.split('?')[1]}`
  let urlService = useRef(new UrlService(nextURL));

  const filterList = Lists.filters;

  const [filterModal, setFilterModal] = useState(false);
  const [courseCardData, setCourseCardData] = useState([])
  const [detailModal, setDetailModal] = useState(false);
  const [detailData, setDetailData] = useState({});
  const coursesApiStatus = useRef(new ApiStatus());
  const [courseType, setCourseType] = useState(getTabNumber(queries.COURSE_TYPE, urlService) || 0);

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
  const [pageLoadSortState, setPageLoadSortState] = useState(null);
  const [courseTypesFloatState, setCourseTypesFloatState] = useState(0)
  const [mobileFiltersState, setMobileFiltersState] = useState(false)
  const [applyNow, setApplyNow] = useState(false)
  const [enquire, setEnquire] = useState(false)
  let appliedFiltersCount = useRef(0);
  const courseTypeRef = useRef(null);
  const [cardApiSuccess, setCardApiSuccess] = useState(false)
  const [cardActionTaken, setCardActionTaken] = useState(false)
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
  const [emptyState, setEmptyState] = useState(true)
  const [mounted, setMounted] = useState(false)


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
    // urlService.current.removeEntry('search');
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

  const handleSearchClicked = async (forcePageNumber = 0) => {

    const getParams = () => {
      if(appliedFiltersCount.current > 0){
        return `?${urlService.current.getUpdatedUrl()}`;
      }else{
        return `?${location?.asPath.substring(9,location?.asPath.length)}`;
      }
    }

    coursesApiStatus.current.makeApiCall()
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

  const handleFilteredData = async (updatePageNumber = true) => {
    coursesApiStatus.current.start();
    setCardApiSuccess(false)

    let res = await handleSearchClicked();
    // if (forcePageNumber === 1) setForcePageNumber(0);

    // if (pageNumber <= 1 || updatePageNumber === false) {
    //   // setCourses([...res.data]);
    //   setCardApiSuccess(true)
    //   if (res?.data)
    //     setCourseCardData([...res.data])
    // } else {
    //   // setCourses([...courseCardData, ...res.data]);
    //   setCardApiSuccess(true)
    //   setCourseCardData([...courseCardData, ...res.data])
    // }

    setCardApiSuccess(true)

    if(res.data){
      if(pageNumber === 1){
        setCourseCardData([...res.data])
      } else {
        setCourseCardData([...courseCardData, ...res.data])
      }
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
    // Mixpanel.track(MixpanelStrings.RESET_BUTTON_TRIGGERED, {
    //   'search-string': urlService.current.getUpdatedUrl()
    // })
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

  useEffect(()=>{
    setMounted(true)
  },[])

  useEffect(() => {
    if (maxPrice !== 0 && costRange.max === 0) {
      setCostRange({ ...costRange, max: maxPrice });
    }
  }, [maxPrice]);


  useEffect(() => {
    if (!isMount) {

      urlService.current.removeEntry('course_type_sub');
      urlService.current.changeEntry(queries.COURSE_TYPE, Lists.courseTypes[courseType]);
      updateBrowserUrl();

      setPageNumber(1)
      coursesApiStatus.current.start();
      handleFilteredData(false);
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

      setPageNumber(1)
      handleFilteredData(false);
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

  const handleScrollData = () => {
    setPageNumber(pageNumber + 1)
    handleFilteredData(true)
  }

  useEffect(() => {
    if (!location.isReady) return;
    if (location?.query && Object.keys(location?.query).length > 0) {
      if (location?.query?.search?.length > 0) {
        _handleSearchQuery(location?.query?.search)
        setEmptyState(false)
      }
      if (location?.query?.domain?.length > 0 || location?.query?.course_type?.length) {
        setEmptyState(false)
      }
    }
  }, [location.isReady])

  useEffect(() => {
    setPageNumber(1)
    handleFilteredData()
  }, [location?.query?.search])

  const handleReload=()=>{
    setTimeout(() => location.reload(), 100)
  }

  const _handleSearchQuery = (event) => {

    location.push({
      pathname: '/search',
      query: {
        search: event
      }
    },
      undefined,
      {
        shallow: true
      })
    setPageNumber(1)
    handleFilteredData()
  }

  const _handleSearch = (event) => {
    setEmptyState(false)
    if (event?.course_id) {
      location.push({
        pathname: '/details',
        query: { course_id: event?.course_id },
      })
      props?._showSearchBar()

    } else {
      urlService.current.removeAll()
      urlService.current.addEntry('search', event)
      setPageNumber(1)
      handleFilteredData()
    }
    // props?.handleSearch(event)
  }

  return (
    <>
      {
        mounted &&
        <div>
          <div className="course-page">
            {
              <div className={`${window.innerWidth > 500 ? 'filter-column' : 'filter-mobile'} ${!window.innerWidth <= 500 && mobileFiltersState ? 'show-filter' : 'hide-filters'}`} style={window.innerWidth > 500 ? { minHeight: '80%' } : null}>
                <div className="filter-head">{appliedFiltersCount.current === 0 ? <span className="no-filter-text">No filters applied</span> : `${appliedFiltersCount.current} filter${appliedFiltersCount.current === 1 ? '' : 's'} applied`}
                  {appliedFiltersCount.current !== 0 && <span style={window.innerWidth > 500 ? { display: 'block' } : { display: 'none' }}><Button text="Reset" classes="btn-primary" style={{ borderRadius: '4px', padding: '1rem 2rem', fontStyle: 'normal' }} onClick={resetFilters} /></span>}
                  <span className='cross' onClick={() => setMobileFiltersState(false)}><Image src={closeIcon} width={14} height={14} alt='closeIcon' /></span>
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
                <div className="filter-footer">
                  {/* <a href='/privacy' target='_blank' style={{ textDecoration: 'none' }}><span className='link' >Privacy policy & disclaimer</span></a> */}
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
            <div className="searchbar hideOnDesktop">
              <SearchBar
                search={props?.searchValue}
                handleSearch={(e) => _handleSearch(e)}
                selectSearch={(e) => props?.selectSearch(e)}
                token={props?.token}
                showSearchBar={props?.showSearchBar}
              />
            </div>
            {
              emptyState ?
                <div className='empty-state hideOnDesktop'>
                  <div className='category-section'>
                    <div className='category-header'>
                      Categories
                    </div>
                    <div className='category-container'>
                      {
                        categories.length > 0 && categories.map((item, index) => {
                          return (
                            <div className='category-content' onClick={() => _handleSearch(item.name)} key={index}>
                              <div className='category-text'>
                                {item.name}
                              </div>
                            </div>
                          )
                        })
                      }

                    </div>
                  </div>
                </div>
                :
                <>
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
                        style={{
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
                      {
                        window.innerWidth > 500 ? 
                        <div className="text-container">Showing {totalCourses} Course{totalCourses === 1 ? '' : 's'}</div> : null
                      }
                      
                    </div>
                    <div
                      className="list-container"
                      id="scrollableDiv"
                      style={{height: 950,overflow: 'auto'}}
                    >
                      <InfiniteScroll
                        dataLength={courseCardData.length} //This is important field to render the next data
                        next={handleScrollData}
                        hasMore={true}
                        height={950}
                        // loader={<h4>Loading...</h4>}
                        style={
                          window.innerWidth > 500 ? {
                            width: '100%', 
                            display: 'flex', 
                            flexDirection: 'row', 
                            justifyContent: 'flex-start', 
                            gap: 10, 
                            flexWrap: 'wrap', 
                            overflow: 'auto',
                            marginTop: '2rem',
                            marginBottom: '6rem'
                          } :
                          { width: '100%', 
                            display: 'flex', 
                            flexDirection: 'row', 
                            justifyContent: 'center', 
                            gap: 10, 
                            flexWrap: 'wrap', 
                            overflow: 'auto' }
                          }
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
                            courseCardData && courseCardData.map((item, index) => {
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
                            :
                            courseCardData.length === 0 && cardApiSuccess ?
                              <Error type={Lists.errorTypes.EMPTY} text={'No Result Found'} />
                              : null
                        }
                      </InfiniteScroll>
                    </div>
                  </div>
                  <div className='mobile-view-actions'>
                    <span className='filter' onClick={() => setMobileFiltersState(true)}><Image src={filterIcon} alt='filters' height={22} width={22} /></span>
                    <FloatActionButton
                      type='course type'
                      heading={Lists.courseTypesFloatList[courseTypesFloatState]['name']}
                      style={{
                        borderRadius: '10rem',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: '1.6rem',
                        color: '#ffffff',
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
                  </div>
                </>
            }
          </div>

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
      }
    </>
  )
}