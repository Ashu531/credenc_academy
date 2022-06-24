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
const compareKey = 'credenc-edtech-compares';
const subjectKey = 'credenc-edtech-subject';
const subCategories = ["UI UX Design","Animation Design","Fashion design","Game Design","Interior Design","Motion Graphics Design"];


function DashboardDesktop(props) {

  const [filterModal, setFilterModal] = useState(false);
  const [courseCardData,setCourseCardData]= useState([])
  const [selectedCategory,setSelectedCategory] = useState(subCategories[0]);
  const [subjectData,setSubjectData] = useState([])

  useEffect(()=>{
    getCardData()
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
  }

  const getCardData=async()=>{
    const response = await fetch(`${constant.API_URL.DEV}/batch/search/`)
    const data = await response.json()
    setCourseCardData(data?.data)
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
      setSelectedCategory(item)
    }

  
 return(
        <div className="dashboard">
        <div className="dashboard-upper-section">
        <Header toggleTheme={props.toggleTheme} />
        <Banner />
        <div className="course-navbar">
        <Navbar 
        toggleFilterModal={openFilterModal} 
        openSubjectModal={openSubjectModal} 
        closeSubjectModal={closeSubjectModal} 
        golazo={subCategories} 
        selectedCategory={selectedCategory} 
        setSubCategoriesData={setSubCategoriesData} 
        subjectData={subjectData}
        />
        </div>
        {/* <FilterModal filterModal={filterModal} toggleFilterModal={closeFilterModal}/> */}
        <div className="course-content">
        {/* <CategoryDropdown categories={categories}/> */}
        <div className="card-content">
        {/* <CategoryHeader  /> */}
        <div className="course-card-container" style={{gap: 10}}>
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
       
        <div className="dashboard-footer">
        <Footer />
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

// export async function getServerSideProps(context) {

//   const response = await fetch(`${constant.API_URL.DEV}/batch/search/`)
//   const data = await response.json()
//   console.log("getServerSideProps coming++++")

//   return {
//     props: {
//       courseCardData: data
//     },
//   }
// }