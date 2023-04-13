import React, { useEffect, useState } from "react"
import DashboardDesktop from "./DashboardDesktop";
import DashboardMobile from "./DashboardMobile";
import { useMediaQuery } from "react-responsive";
import constant from "../../config/constant";
import { useRouter } from 'next/router'
const EdtechPartnerKey = 'credenc-edtech-partner-key';

export default function Dashboard(props) {
  const [mounted, setMounted] = useState(false);
  const [thirdPartyUser,setThirdPartyUser] = useState({})
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });

  let router = useRouter();

  useEffect(() => {
    setMounted(true);
    _retrieveData()
  }, []);

  const _retrieveData=()=>{
    let partnerKey = JSON.parse(localStorage.getItem(EdtechPartnerKey));
     if(partnerKey && partnerKey.length > 0){
      setThirdPartyUser(partnerKey)
     }
   
     if(router?.asPath.includes(constant.PARTNER_KEY.NJ)){
        router.push(`https://nj.credencacademy.com${router.asPath}`)
     }
  }

   return(
      <>
      {
        mounted && 
        <>
        {isDesktopOrLaptop && <DashboardDesktop
        // toggleTheme={toggleTheme} 
          newTheme={props?.theme}
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
          handleSearch={(e)=>props?.handleSearch(e)}
          searchData={props?.searchData}
          handleLogin={()=>props?.handleLogin()}
          openLoginModal={()=>props?.openLoginModal()}
          openCoursePreviewModal={()=>props?.openCoursePreviewModal()}
          closeCoursePreviewModal={()=>props?.closeCoursePreviewModal()}
          addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
          removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
          closeForgotPasswordModal={()=>props?.closeForgotPasswordModal()}
          selectSearch={(e)=>props?.selectSearch(e)}
          thirdPartyUser={thirdPartyUser}
        />}
        {isMobile && 
          <DashboardMobile
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
          handleLogin={()=>props?.handleLogin()}
          searchValue={props?.searchValue}
          handleSearch={(e)=>props?.handleSearch(e)}
          closeFilterExpandedStage={()=>props?.closeFilterExpandedStage()}
          openFilterVisible={()=>props?.openFilterVisible()}
          handleOpenMobileSearch={()=>props?.handleOpenMobileSearch()}
          clearSearch={()=>props?.clearSearch()}
          openLoginModal={()=>props?.openLoginModal()}
          closeFilterVisible={()=>props?.closeFilterVisible()}
          setScrollUp={()=>props?.setScrollUp()}
          setScrollDown={()=>props?.setScrollDown()}
          goingUp={props?.goingUp}
          addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
          removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
          closeForgotPasswordModal={()=>props?.closeForgotPasswordModal()}
          selectSearch={(e)=>props?.selectSearch(e)}
          thirdPartyUser={thirdPartyUser}
        />
        }
        </>
      }
      </>
       )
}

