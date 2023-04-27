import React, { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive";
import constant from "../../config/constant";
import { useRouter } from 'next/router'
import SearchPage from "./SearchDesktop";
const EdtechPartnerKey = 'credenc-edtech-partner-key';

export default function Dashboard(props) {
  const [thirdPartyUser,setThirdPartyUser] = useState({})

  let router = useRouter();

  useEffect(() => {
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
         <SearchPage
        // toggleTheme={toggleTheme} 
          newTheme={props?.theme}
          loginModal={props?.loginModal}
          closeLoginModal={()=>props?.closeLoginModal()}
          openForgotPasswordModal={()=>props?.openForgotPasswordModal()}
          forgotPasswordModal={props?.forgotPasswordModal}
          handleForgotPasswordEnd={()=>props?.handleForgotPasswordEnd()}
          token={props?.token}
          searchData={props?.searchData}
          handleLogin={()=>props?.handleLogin()}
          openLoginModal={()=>props?.openLoginModal()}
          openCoursePreviewModal={()=>props?.openCoursePreviewModal()}
          closeCoursePreviewModal={()=>props?.closeCoursePreviewModal()}
          addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
          removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
          closeForgotPasswordModal={()=>props?.closeForgotPasswordModal()}
          thirdPartyUser={thirdPartyUser}
          subjectData={props?.subjectData}
          handleSearch={(e)=>props?.handleSearch(e)}
          { ...props }
        />
      </>
       )
}

