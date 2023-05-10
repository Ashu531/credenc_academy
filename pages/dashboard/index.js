import React, { useEffect, useState } from "react"
import DashboardDesktop from "./DashboardDesktop";
import { useMediaQuery } from "react-responsive";
import constant from "../../config/constant";
import { useRouter } from 'next/router'
import Script from 'next/script';
const EdtechPartnerKey = 'credenc-edtech-partner-key';

const Dashboard = (props) => {
  const [mounted, setMounted] = useState(false);
  const [thirdPartyUser,setThirdPartyUser] = useState({})

  let router = useRouter();

  const _retrieveData=()=>{
    let partnerKey = JSON.parse(localStorage.getItem(EdtechPartnerKey));
     if(partnerKey && partnerKey.length > 0){
      setThirdPartyUser(partnerKey)
     }
   
     if(router?.asPath.includes(constant.PARTNER_KEY.NJ)){
        router.push(`https://nj.credencacademy.com${router.asPath}`)
     }
  }

  useEffect(() => {
    setMounted(true);
    _retrieveData()
  }, []);

   return(
     <>
          <div 
            id="magicform-root" 
            style={{
              zIndex: 9999,position: 'relative'
            }}
            ></div>
           <Script>
            {`(function (w, d, s, o, f, js, fjs) {
                w["Simple-Widget"] = o; w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
                js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
                js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
                }(window, document, "script", "w1", 'https://magicform-widget-assets.s3.us-west-2.amazonaws.com/widget.js'));
                w1("init",
                {"popUpTimer":3000,"imageUrl":null,"widgetType":"bubble","chatHeight":630,"chatWidth":370,"placeholder":"What's on your mind?","stackId":"stack_3f86d24b-e2e3-4951-ad68-f10137c9a7cb","userId":"13533a96-8929-4315-be2f-7800bc6d0cec","colors":{"main":"#D91212","userMessageBubble":"#D91212"}});
            `}
            </Script>
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
      </>  
    )
}

export default Dashboard;

