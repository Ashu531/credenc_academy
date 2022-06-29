import React, { useEffect, useState } from "react"
import DashboardDesktop from "./DashboardDesktop";
import DashboardMobile from "./DashboardMobile";
import { useMediaQuery } from "react-responsive";


export default function Dashboard({toggleTheme}) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });

  useEffect(() => {
    setMounted(true);
}, []);

console.log(toggleTheme,"props++++")

   return(
      <>
      {
        mounted && 
        <>
        {isDesktopOrLaptop && <DashboardDesktop toggleTheme={toggleTheme} />}
        {isMobile && <DashboardMobile />}
        </>
      }
      </>
       )
}

