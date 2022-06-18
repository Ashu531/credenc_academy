import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import {changeTheme} from '../../scripts/actions/index'


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
Hello Mobile
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