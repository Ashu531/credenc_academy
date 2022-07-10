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
import {getCardData} from '../api/store'
import FooterModal from '../../components/footerModal/FooterModal'
const compareKey = 'credenc-edtech-compares';
const subjectKey = 'credenc-edtech-subject';
const subCategories = ["UI UX Design","Animation Design","Fashion design","Game Design","Interior Design","Motion Graphics Design"];


function DashboardDesktop(props) {

  const [filterModal, setFilterModal] = useState(false);
  const [courseCardData,setCourseCardData]= useState([])
  const [selectedCategory,setSelectedCategory] = useState(constant.COURSES.SUB_CATEGORIES[0].title);
  const [subjectData,setSubjectData] = useState([])
  const [selectedSubject,setSelectedSubject] = useState({})
  // const [footerModal,setFooterModal] = useState(false)

  const router = useRouter();
  

  useEffect(()=>{
    // getDataFromBaseUrl()
    // getSubjectData()
  },[])

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

  const toggleTheme=async()=> {
        let updatedTheme= props.theme;
        let newTheme = updatedTheme === "light" ? "dark" : "light";
        props.dispatchThemeChange(newTheme);
  }

    const closeFilterModal = ()=>{
      setFilterModal(false)
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
     
      // localStorage.setItem(subjectKey,JSON.stringify(item))
      setSelectedSubject(item)
      _getSubjectDetails(item)
  }

  const toggleFooterModal = ()=>{
    setFooterModal(!footerModal)
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
              return(
                <CourseCard key={index} data={item}/>
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
  console.log("getServerSideProps coming++++",data)

  // return {
  //   props: {
  //     courseCardData: data
  //   },
  // }
}