import React from "react"
import Header from '../../components/header/Header'
import DashboardDesktop from "../../components/DashboardDesktop/index.js";
import DashboardMobile from "../../components/DashboardMobile/index.js";
import { connect } from 'react-redux'
import {changeTheme} from '../../scripts/actions/index'

const themeKey = "credenc-marketplace-themekey"
function Dashboard(props) {
    const toggleTheme=async()=> {
        let updatedTheme= localStorage.getItem(themeKey)
        let newTheme = updatedTheme === "light" ? "dark" : "light";
        await localStorage.setItem(themeKey,newTheme)
        props.dispatchThemeChange(newTheme);
  }
   return(
        <div className="dashboard">
        <Header />
        <div onClick={()=>toggleTheme()} style={{marginTop: 500,fontSize: 14}} > 
            Change theme
           </div>
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