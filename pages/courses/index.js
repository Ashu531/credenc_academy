import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { useRouter } from 'next/router'
import List from "../../components/list/List";
import SegmentedBar from "../../components/segementedBar/SegmentedBar";
import SecondaryDropdown from "../../components/primaryDropdown/SecondaryDropdown";
import States from "../../config/states";
import Lists from "../../config/list";
import Filter from "../../components/filter/Filter";
import axios from "axios";
import ApiStatus from "../../config/apiStatus";
import UrlService from "../../helper/urlService";
import Button from "../../components/button/Button";
import { getDataFromUrl } from "../../helper/userService";
import Link from "next/link";
// import { Mixpanel } from "../../services/Mixpanel";
// import MixpanelStrings from "../../../values/mixpanelStrings";
import { getTabNumber } from "../../helper/getTabNumber";
// import { shouldNavbarVisible } from "../../services/shouldNavbarVisible";
import filterIcon from '../../assets/images/icons/filter-icon-dark.svg';
import closeIcon from '../../assets/images/icons/close-icon-grey.svg';
import FloatActionButton from "../../components/floatActionButton/floatActionButton";
import constant from '../../config/constant'

const bookmarkKey = 'credenc-marketplace-bookmarks';
const authKey = 'credenc-marketplace-authkey';

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

const CoursePage = ({
  bookmarks,
  dispatchAddBookmark,
  dispatchRemoveBookmark,
  dispatchAddToCompare,
  dispatchRemoveFromCompare,
  token,
  handleSignInClick,
  changeNavbarVisibility,
}) => {

  const isMount = useIsMount();
  let location = useRouter();
  let urlService = useRef(new UrlService(location.pathname));

  // const navigate = useNavigate();

  const listTypes = States.listTypes;
  const filterList = Lists.filters;

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

  const [updateCostSlider, setUpdateCostSlider] = useState(false)
  const [isAppliedCostSlider, setIsAppliedCostSlider] = useState(false);

  const [userUpvoteList, setUserUpvoteList] = useState([]);

  const [sortState, setSortState] = useState(0);
  const [pageLoadSortState, setPageLoadSortState] = useState(null);

  const [courseTypesFloatState, setCourseTypesFloatState] = useState(4)

  const [mobileFiltersState, setMobileFiltersState] = useState(false)

  let appliedFiltersCount = useRef(0);

  const [lastCourse, setLastCourse] = useState(null);
  const courseTypeRef = useRef();
  // let observer = useRef(
  //   new IntersectionObserver(
  //     (entries) => {
  //       const first = entries[0];
  //       if (first.isIntersecting === true) {
  //         setPageNumber((pn) => pn > 0 ? pn + 1 : pn);
  //       }
  //     })
  // );
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setMounted(true);
}, []);

  const updateAppliedFiltersCount = (filter, isApplied, mixpanelFilterOblect) => {
    if (isApplied !== false) {
      appliedFiltersCount.current++;
      // Mixpanel.track(MixpanelStrings.FILTER_SELECTED, mixpanelFilterOblect);
    } else {
      appliedFiltersCount.current--;
      // Mixpanel.track(MixpanelStrings.FILTER_DESELECTED, mixpanelFilterOblect);
    }
  }

  const updateQueryString = (i, filter, list) => {

    urlService.current.removeEntry(filter);

    list.forEach(item => {
      if (item['isApplied']) {
        urlService.current.addEntry(filter, item['filterValue']);
      }
    });

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
      console.log(urlService.current, "URL SERVICE")
      return `?${urlService.current.getUpdatedUrl()}`;
    }

    coursesApiStatus.current.makeApiCall();

    // await delay(5000);
    let res;

    if (token === null) {
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

  const navigateToDetailPage = (course) => {
    location.push(`/course/${course['name'].replaceAll('/', ' ')}-id-${course['id']}`,
      {
        state: {
          id: course['id'],
          name: course['name'],
        }
      });
  }

  const handleFilteredData = async (updatePageNumber = true) => {
    coursesApiStatus.current.start();
    let res = await handleSearchClicked();
    // if (forcePageNumber === 1) setForcePageNumber(0);
    if (pageNumber <= 1 || updatePageNumber === false) {
      // setCourses([...res.data]);
    } else {
      setCourses([...courses, ...res.data]);
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
  }

  const handlePageNumber = (res) => {
    if (res.next === true) {
      setPageNumber(res.next_page);
    } else {
      setPageNumber(0);
    }
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

  const addBookmarkToBackend = async (id) => {
    let res = await axios.post(`${constant.API_URL.DEV}/bookmark/`, {
      "id": [`${id}`],
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
        dispatchRemoveBookmark(id, bookmarks);
      })
    return res;
  }

  const removeBookmarkFromBackend = async (id) => {
    let res = await axios.post(`${constant.API_URL.DEV}/bookmark/remove/`, {
      "id": `${id}`,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
        dispatchAddBookmark(id, bookmarks);
      })
    return res;
  }

  const addBookmarkToLocalStorage = (bookmarks) => {
    localStorage.setItem(bookmarkKey, bookmarks);
  }

  const handleAddItemToBookmark = async (id) => {

    dispatchAddBookmark(id, bookmarks);

    if (token === null) {
      let currentBookmarks = localStorage.getItem(bookmarkKey);
      if (currentBookmarks === null) {
        addBookmarkToLocalStorage();
        currentBookmarks = [];
      } else {
        currentBookmarks = currentBookmarks.split(',');
      }
      if (!currentBookmarks.find(bookmark => bookmark == id.toString())) {
        currentBookmarks = [...currentBookmarks, id];
        addBookmarkToLocalStorage(currentBookmarks);
      }
    } else {
      let res = await addBookmarkToBackend(id);
      if (!res?.status) {
        dispatchRemoveBookmark(id, bookmarks);
        return false;
      };
    }
    return true;
  }

  const handleRemoveItemFromBookmark = async (id) => {

    dispatchRemoveBookmark(id, bookmarks);

    if (token === null) {
      let currentBookmarks = localStorage.getItem(bookmarkKey);
      currentBookmarks = currentBookmarks.split(',').filter(item => item != id.toString());
      if (currentBookmarks.length > 0) {
        addBookmarkToLocalStorage(currentBookmarks);
      }
      else {
        localStorage.removeItem(bookmarkKey);
        currentBookmarks = [];
      }
    } else {
      let res = await removeBookmarkFromBackend(id);
      if (!res?.status) {
        dispatchAddBookmark(id, bookmarks);
        return false;
      };
    }
    return true;
  }

  const callMixpanel = (eventText, type) => {
    let eventType;
    // if (eventText === MixpanelStrings.COURSE_TYPE_SEGEMENT_TRIGGERED) {
    //   Mixpanel.track(eventText, {
    //     selectedCourseType: type,
    //   })
    // } else {
    //   Mixpanel.track(eventText, {
    //     selectedSortingDropdown: type,
    //   })
    // }
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

  useEffect(async () => {
    if (location.state) {
      resetFilters(false);
      urlService.current.changeEntry('subject', `${location.state}`);

      if (pageNumber > 1) {
        setPageNumber(1);
      } else {
        handleFilteredData(false);
      }
    }
  }, [location.state]);

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

  useEffect(async () => {
    // changeNavbarVisibility(shouldNavbarVisible());
    if (token) {
      let res = await getDataFromUrl(`${constant.API_URL.DEV}/userupvotes/`, token);
      setUserUpvoteList(res);
    }
    setPageLoadSortState(getSortStateFromUrl());

    // change tab number
    let tabNumber = getTabNumber(queries.COURSE_TYPE, urlService)
    // courseTypeRef.current.changeActiveTab(tabNumber);
  }, []);

  return (
    <>
    {
      mounted && 
    <div className="course-page"> 
      {<div className={`${window.innerWidth > 500 ? 'filter-column' : 'filter-mobile'} ${window.innerWidth <= 500 && mobileFiltersState ? 'show-filter' : 'hide-filters'}`}>
        <div className="filter-head">{appliedFiltersCount.current === 0 ? 'No Filters Applied' : `${appliedFiltersCount.current} filter${appliedFiltersCount.current === 1 ? '' : 's'} applied`}
          {appliedFiltersCount.current !== 0 && <span style={window.innerWidth > 500 ? { display: 'block' } : { display: 'none' }}><Button text="Reset" classes="btn-primary" style={{ borderRadius: '4px', padding: '1rem 2rem', fontStyle: 'normal' }} onClick={resetFilters} /></span>}
          {window.innerWidth <= 500 && <span className='cross' onClick={() => setMobileFiltersState(false)}><img src={closeIcon} /></span>}
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
            min={0}
            getRange={handleCostRange}
            updateCostSlider={updateCostSlider}
            setIsAppliedCostSlider={() => setIsAppliedCostSlider(true)}
          />
          <Filter
            item={{ name: 'Difficulty Level', type: filterList.DIFFICULTY_LEVEL }}
            filterState={difficultyList}
            updateFilterState={updateFilterState}
          />
          <Filter
            item={{ name: 'Work Experience', type: filterList.WORK_EXPERIENCE }}
            filterState={workExperienceList}
            updateFilterState={updateFilterState}
          />
          <Filter
            item={{ name: 'Finance Options', type: filterList.FINANCE_OPTIONS }}
            filterState={financeOptionList}
            updateFilterState={updateFilterState}
          />
          <Filter
            item={{ name: 'Course Language', type: filterList.COURSE_LANGUAGE }}
            filterState={languageList}
            updateFilterState={updateFilterState}
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
              style={{
                fontWeight: 600,
                ontSize: '1.1rem',
                lineHeight: '1.6rem',
              }}
              bgColor='#16181A'
              handleTabNumber={(i) => {
                setCourseType(i)
                // callMixpanel(MixpanelStrings.COURSE_TYPE_SEGEMENT_TRIGGERED, Lists.courseTypes[i])
              }}
              selected={courseType}
              ref={courseTypeRef}
            />
          </div>
          <SecondaryDropdown
            heading={Lists.sortByList[sortState]['name']}
            style={{
              background: '#16181A',
              padding: '1.4rem',
              borderRadius: '0.8rem',
              fontWeight: 600,
              fontSize: '1.1rem',
              lineHeight: '1.6rem',
              color: '#C5C7CA'
            }}
            classes={{ wrapper: 'no-padding', content: 'content-sort' }}
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
            type={listTypes.HORIZONTAL_CARDS}
            list={courses}
            onItemClick={navigateToDetailPage}
            listApiStatus={coursesApiStatus}
            handleAddItemToBookmark={(item) => handleAddItemToBookmark(item.id)}
            handleRemoveItemFromBookmark={(item) => handleRemoveItemFromBookmark(item.id)}
            handleAddItemToCompare={(item) => dispatchAddToCompare(item.id)}
            handleRemoveItemFromCompare={(item) => dispatchRemoveFromCompare(item.id)}
            setLastElement={setLastCourse}
            upvoteList={userUpvoteList}
            handleSignInClick={handleSignInClick}
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
        }
        </>
  );
};


export default CoursePage;