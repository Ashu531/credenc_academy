import React, { useEffect, useState } from "react"
import Header from '../../components/header/Header'
import { connect } from 'react-redux'
import {changeTheme} from '../../scripts/actions/index'
import {ProjectTheme} from '../../config/theme'
import Banner from '../../components/banner/Banner'
import CategoryDropdown from "../../components/categoryDropdown/categoryDropdown";
import CategoryHeader from '../../components/categoryHeader/CategoryHeader'
import CourseCard from '../../components/coursecard/CourseCard'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import FilterModal from "../../components/filterModal/FilterModal"
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import constant from '../../config/constant.js'
import SubjectDropdown from "../../components/subjectDropdown/SubjectDropdown"
import { useRouter } from 'next/router'
import DetailModal from '../../components/detailModal/DetailModal'
import {getCardData} from '../api/store'
import FooterModal from '../../components/footerModal/FooterModal'
import useLocalStorage from "use-local-storage"
import theme from "../../scripts/reducers/theme"
import States from '../../values/states';
const subjectKey = 'credenc-edtech-subject';
const subCategories = ["UI UX Design","Animation Design","Fashion design","Game Design","Interior Design","Motion Graphics Design"];
const compareKey = 'credenc-marketplace-compares';
const bookmarkKey = 'credenc-marketplace-bookmarks';



function DashboardDesktop(props) {

  const [filterModal, setFilterModal] = useState(false);
  const [courseCardData,setCourseCardData]= useState([])
  const [selectedCategory,setSelectedCategory] = useState(constant.COURSES.SUB_CATEGORIES[0].title);
  const [subjectData,setSubjectData] = useState([])
  const [selectedSubject,setSelectedSubject] = useState({})
  const [detailModal, setDetailModal] = useState(false);
  const [detailData,setDetailData] = useState({});
  const [compareTextVisible,setCompareTextVisible] = useState('');
  const [addToCompareButtonState, setAddToCompareButtonState] = useState({...States.addToCompareButtonState.DEFAULT});


  const router = useRouter();
  

  useEffect(()=>{
    getDataFromBaseUrl()
    getSubjectData()
  },[])

  useEffect(()=>{
    getCompareText()
  },[detailData])

  const getCompareText =()=>{
 
      let tempCompareData = JSON.parse(localStorage.getItem(compareKey));
      if(tempCompareData && tempCompareData.length > 0){
        if (tempCompareData.includes(detailData?.id)) 
        {
          setCompareTextVisible("Go to Compare")
        }
        else {
          setCompareTextVisible("Add to Compare")
        } 
      }else{
        return setCompareTextVisible("Add to Compare")
      }
    
    }
    


 const getDataFromBaseUrl=()=>{
    if(router.query.hasOwnProperty('subject') ){
     let data={
        name: router.query.subject
      }
      setSelectedCategory(router.query.sub_category)
      setSelectedSubject(data)
      getCardData(data)
    }else{
      let data={
        name: "All"
      }
      if(router.query.hasOwnProperty('sub_category')){
        setSelectedCategory(router.query.sub_category)
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
      router.push({
        pathname: "/",
        query: {
          sub_category: selectedCategory
        }
      })
    }else{
      router.push({
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

    if(selectedSubject.name === "All"){
      router.push({
        pathname: "/",
        query: {
        sub_category: item.title,
       }
     })
    }else{
      router.push({
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

  const onAddToCompare=(item)=>{
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
     if(addToCompareButtonState.id === States.addToCompareButtonState.DEFAULT.id){
       setAddToCompareButtonState({...States.addToCompareButtonState.APPLIED});
       onAddToCompare(item);
       setCompareTextVisible("Go To Compare")
   }
   else {
       setAddToCompareButtonState({...States.addToCompareButtonState.DEFAULT});
       // onRemoveFromCompare(item);
   }
   
   return;
   }


 return(
        <div className="dashboard">
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
                if (tempBookmarkData.includes(item?.id))
                bookmarkVisible = true
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
                  compareTextVisible={compareTextVisible} 
                  bookmarkVisible={bookmarkVisible}
                />
              )
            })
          }
        </div>
        </div>
        </div>
        </div>
       
        <SlidingPanel
        type={'left'}
        isOpen={filterModal}
        backdropClicked={() => setFilterModal(false)}
        size={30}
        >
            <div>
              <div>My Panel Content</div>
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
        compareTextVisible={compareTextVisible} 
        addToBookmark={()=>_addToBookmark(detailData)}
        theme={props.theme} 
        />
      </SlidingPanel>
   
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

export async function getServerSideProps(context) {

  const response = await fetch(`${constant.API_URL.DEV}/batch/search/`)
  const data = await response.json()

  // return {
  //   props: {
  //     courseCardData: data
  //   },
  // }
}