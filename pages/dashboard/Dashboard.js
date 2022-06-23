import React, { useEffect, useState } from "react"
import DashboardDesktop from "./DashboardDesktop";
import DashboardMobile from "./DashboardMobile";
import { useMediaQuery } from "react-responsive";


export default function Dashboard(props) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });

  useEffect(() => {
    setMounted(true);
}, []);

 
   return(
      <>
      {
        mounted && 
        <>
        {isDesktopOrLaptop && <DashboardDesktop toggleTheme={props.toggleTheme} />}
        {isMobile && <DashboardMobile />}
        </>
      }
      </>
       )
}

