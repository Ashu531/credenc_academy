import React, { useEffect, useState } from "react"
import DashboardDesktop from "./DashboardDesktop";
import { useMediaQuery } from "react-responsive";
import constant from "../../config/constant";
import { useRouter } from 'next/router'
const EdtechPartnerKey = 'credenc-edtech-partner-key';

const Dashboard = (props) => {
  const [mounted, setMounted] = useState(false);
  const [thirdPartyUser,setThirdPartyUser] = useState({})

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
      <DashboardDesktop
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
          { ...props }
        />
       )
}

export default Dashboard;

