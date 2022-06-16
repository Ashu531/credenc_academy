import React from "react"
import Header from '../header/Header'

const themeKey = "credenc-marketplace-themekey"
function DashboardMobile() {
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

export default DashboardMobile;