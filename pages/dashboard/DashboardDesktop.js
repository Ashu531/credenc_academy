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

const categories = [
  {title : "Hidden Gem"},
  {title : "Quickies"},
  {title : "Learn now pay later"},
  {title : "Get a job"},
]
function DashboardDesktop(props) {

  const toggleTheme=async()=> {
        let updatedTheme= props.theme;
        let newTheme = updatedTheme === "light" ? "dark" : "light";
        props.dispatchThemeChange(newTheme);
    }


   
   return(
        <div className="dashboard">
        <div className="dashboard-upper-section">
        <Header />
        <Banner />
        <div className="course-navbar">
        <Navbar />
        </div>
        <div className="course-content">
        {/* <CategoryDropdown categories={categories}/> */}
        <div className="card-content">
        {/* <CategoryHeader  /> */}
        <div className="course-card-container" style={{gap: 10}}>
          {
            Array.from({length: 4}, (x, i) => {
              return <CourseCard key={i} />;
            })
          }
        </div>
       
        </div>
        </div>
        </div>
       
        <div className="dashboard-footer">
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDesktop);