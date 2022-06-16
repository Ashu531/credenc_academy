import React from "react"
import { render } from "react-dom";
import {themeDecider} from '../../config/theme'
import Header from '../../components/header/Header'

const themeKey = "credenc-marketplace-themekey"
function Dashboard(props) {
 const toggleTheme=()=> {
        let theme1 = localStorage.getItem(themeKey)
        const newTheme = theme1 === "light" ? "dark" : "light";
        console.log(newTheme,"newTheme+++")
        // props.dispatchThemeChange(newTheme);
      }
   
    return(
        <div className="dashboard">
           <Header />
       </div>
       )

   
}

export default Dashboard;