import React, { useEffect, useState } from "react"
import Header from '../../components/header/Header'
import DashboardDesktop from "../../components/DashboardDesktop/index.js";
import DashboardMobile from "../../components/DashboardMobile/index.js";
import { connect } from 'react-redux'
import {changeTheme} from '../../scripts/actions/index'
import {ProjectTheme} from '../../config/theme'
import Banner from '../../components/banner/Banner'
import CategoryDropdown from "../../components/categoryDropdown/categoryDropdown";
import CategoryHeader from '../../components/categoryHeader/CategoryHeader'
import CourseCard from '../../components/coursecard/CourseCard'
import Navbar from '../../components/navbar/Navbar'

const themeKey = "credenc-marketplace-themekey"
const categories = [
  {title : "Hidden Gem"},
  {title : "Quickies"},
  {title : "Learn now pay later"},
  {title : "Get a job"},
]
function Dashboard(props) {

  const toggleTheme=async()=> {
        let updatedTheme= props.theme;
        let newTheme = updatedTheme === "light" ? "dark" : "light";
        props.dispatchThemeChange(newTheme);
    }


   
   return(
        <div className="dashboard">
        <Header />
        <Banner />
        <div className="course-navbar">
        <Navbar />
        </div>
        <div className="course-content">
        <CategoryDropdown categories={categories}/>
        <div className="card-content">
        <CategoryHeader  />
        <div className="course-card-container">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        </div>
       
        </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);