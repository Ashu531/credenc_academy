import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import {changeTheme} from '../../scripts/actions/index'
import HeaderMobile from '../../components/headerMobile/HeaderMobile'
import FooterMobile from '../../components/footerMobile/FooterMobile'
import CourseCard from '../../components/coursecard/CourseCard'

const categories = [
  {title : "Hidden Gem"},
  {title : "Quickies"},
  {title : "Learn now pay later"},
  {title : "Get a job"},
]
function DashboardMobile(props) {

  const toggleTheme=async()=> {
        let updatedTheme= props.theme;
        let newTheme = updatedTheme === "light" ? "dark" : "light";
        props.dispatchThemeChange(newTheme);
    }


   
   return(
        <div className="dashboard-mobile">
         <HeaderMobile />
         <div className="course-card-list">
         {
             Array.from({length: 4}, (x, i) => {
                return <div style={{gap:10}}><CourseCard key={i} /></div>;
              })
         }
         </div>
         
         <FooterMobile />
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMobile);