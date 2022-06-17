import React, { useEffect } from "react"
import Header from '../../components/header/Header'
import DashboardDesktop from "../../components/DashboardDesktop/index.js";
import DashboardMobile from "../../components/DashboardMobile/index.js";
import { connect } from 'react-redux'
import {changeTheme} from '../../scripts/actions/index'
import {ProjectTheme} from '../../config/theme'

const themeKey = "credenc-marketplace-themekey"
function Dashboard(props) {
    // const [color,setColor] = React.useState({})
    // useEffect(()=>{
    //     setColor(ProjectTheme())
    // },[color])

    const toggleTheme=async()=> {
        let updatedTheme= localStorage.getItem(themeKey)
        let newTheme = updatedTheme === "light" ? "dark" : "light";
        await localStorage.setItem(themeKey,newTheme)
        props.dispatchThemeChange(newTheme);
        console.log(ProjectTheme().bodyColor,"props+++")
    }
   return(
        <div className="dashboard">
        <Header />
        <div onClick={()=>toggleTheme()} style={{marginTop: 100,fontSize: 14, color:ProjectTheme().bodyColor   }} > 
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