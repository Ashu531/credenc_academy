import React from "react"
import { useMediaQuery } from "react-responsive";
import Header from '../../components/header/Header'
import DashboardDesktop from "../../components/DashboardDesktop/index.js";
import DashboardMobile from "../../components/DashboardMobile/index.js";


function Dashboard(props) {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const isDesktopOrLaptop = useMediaQuery({
      query: "(min-width: 1224px)",
    });
   
    return(
        <div className="dashboard">
        <Header />
       </div>
       )

   
}

export default Dashboard;