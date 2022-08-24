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
        {isDesktopOrLaptop && <DashboardDesktop
        // toggleTheme={toggleTheme} 
          newTheme={props?.theme}
          openFilterExpandedStage={props?.openFilterExpandedStage}
          filterExpandedStage={props?.filterExpandedStage}
          loginModal={props?.loginModal}
          closeLoginModal={()=>props?.closeLoginModal()}
          openForgotPasswordModal={()=>props?.openForgotPasswordModal()}
          forgotPasswordModal={props?.forgotPasswordModal}
          handleForgotPasswordEnd={()=>props?.handleForgotPasswordEnd()}
          token={props?.token}
          showSearchBar={props?.showSearchBar}
          _showSearchBar={props?._showSearchBar}
          hideSearchBar={props?.hideSearchBar}
          searchValue={props?.searchValue}
          handleSearch={props?.handleSearch}
          closeFilterExpandedStage={()=>props?.closeFilterExpandedStage()}
          searchData={props?.searchData}
        />}
        {isMobile && <DashboardMobile
          openFilterExpandedStage={props?.openFilterExpandedStage}
          filterExpandedStage={props?.filterExpandedStage}
          subjectDropdownMobile={props?.subjectDropdownMobile}
          loginModal={props?.loginModal}
          closeLoginModal={()=>props?.closeLoginModal()}
          openForgotPasswordModal={()=>props?.openForgotPasswordModal()}
          forgotPasswordModal={props?.forgotPasswordModal}
          handleForgotPasswordEnd={()=>props?.handleForgotPasswordEnd()}
          token={props?.token}
          selectedSubject= {(item)=>props?.selectedSubject(item)}
          toggleSubjectDropdown={()=>props?.toggleSubjectDropdown()}
          toggleFilterVisible={()=>props?.toggleFilterVisible()}
          filterModalVisible={props?.filterModalVisible}
        />}
        </>
      }
      </>
       )
}

