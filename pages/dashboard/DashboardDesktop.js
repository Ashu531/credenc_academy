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
const compareKey = 'credenc-marketplace-compares';

const categories = [
  {title : "Hidden Gem"},
  {title : "Quickies"},
  {title : "Learn now pay later"},
  {title : "Get a job"},
]
function DashboardDesktop(props) {

  const [filterModal, setFilterModal] = useState(false);
  const [courseCardData,setCourseCardData]= useState([])
  const [compareData,setCompareData] = useState([])
  

  useEffect(()=>{
    _getCardData()
  },[])

 

  const _getCardData=async()=>{
    const response = await fetch(`${constant.API_URL.DEV}/batch/search/`)
    const data = await response.json()
    setCourseCardData(data.data)
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
      // console.log(filterModal,"filterModal+++")
      setFilterModal(true)
    } 

   
 return(
        <div className="dashboard">
        <div className="dashboard-upper-section">
        <Header toggleTheme={props.toggleTheme} />
       <Banner />
        <div className="course-navbar">
        <Navbar toggleFilterModal={openFilterModal} />
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
      
        {/* <div onClick={()=>toggleTheme()} style={{marginTop: 100,fontSize: 14, color:ProjectTheme(props.theme).bodyColor}} > 
            Change theme
        </div> */}
        
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