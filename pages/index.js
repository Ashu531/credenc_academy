import Dashboard from './dashboard'
import React,{useState,useEffect} from "react"
import Script from 'next/script';
import SEO from '../config/seo';
import axios from 'axios';
import constant from '../config/constant';
const EdtechToken = 'credenc-edtech-authkey';

const Home = (props) => {
  const [mounted, setMounted] = useState(false);
  const [token,setToken] = useState('')

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(()=>{
    _getAuthKey()
  },[localStorage.getItem(EdtechToken)])

  const _getAuthKey=()=>{
    let authKey = localStorage.getItem(EdtechToken);
    setToken(authKey)
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-31M56NX8K4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-31M56NX8K4');
        `}
      </Script>
      <SEO />
      <h1>
        Credenc
      </h1>
    {
    mounted &&  
    <Dashboard 
      theme={props?.theme}
      filterExpandedStage={props?.filterExpandedStage} 
      openFilterExpandedStage={()=>props?.openFilterExpandedStage()} 
      subjectDropdownMobile={props?.subjectDropdownMobile}
      loginModal={props?.loginModal}
      closeLoginModal={()=>props?.closeLoginModal()}
      openForgotPasswordModal={()=>props?.openForgotPasswordModal()}
      forgotPasswordModal={props?.forgotPasswordModal}
      handleForgotPasswordEnd={()=>props?.handleForgotPasswordEnd()}
      token={token}
      selectedSubject= {(item)=>props?.selectedSubject(item)}
      toggleSubjectDropdown={()=>props?.toggleSubjectDropdown()}
      toggleFilterVisible={()=>props?.toggleFilterVisible()}
      filterModalVisible={props?.filterModalVisible}
      showSearchBar={props?.showSearchBar}
      _showSearchBar={props?._showSearchBar}
      hideSearchBar={props?.hideSearchBar}
      searchValue={props?.searchValue}
      handleSearch={(e)=>props?.handleSearch(e)}
      closeFilterExpandedStage={()=>props?.closeFilterExpandedStage()}
      searchData={props?.searchData}
      handleLogout={()=>props?.handleLogout()}
      handleLogin={()=>props?.handleLogin()}
      openLoginModal={()=>props?.openLoginModal()}
      openFilterVisible={()=>props?.openFilterVisible()}
      handleOpenMobileSearch={()=>props?.handleOpenMobileSearch()}
      clearSearch={()=>props?.clearSearch()}
      closeFilterVisible={()=>props?.closeFilterVisible()}
      setScrollUp={()=>props?.setScrollUp()}
      setScrollDown={()=>props?.setScrollDown()}
      goingUp={props?.goingUp}
      openCoursePreviewModal={()=>props?.openCoursePreviewModal()}
      closeCoursePreviewModal={()=>props?.closeCoursePreviewModal()}
      addLocalBookmarks={(count)=>props?.addLocalBookmarks(count)}
      removeLocalBookmarks={(count)=>props?.removeLocalBookmarks(count)}
      closeForgotPasswordModal={()=>props?.closeForgotPasswordModal()}
      selectSearch={(e)=>props?.selectSearch(e)}
      subjectData={props?.subjectData}
      {...props}
    />
    }
   </>
  )
}

export const getStaticProps = async () =>{

  let trendingData = await _getTrendingData();

  return { props: { trendingData } };
}

const _getTrendingData = async () => {
  return await axios
    .get(`${constant.API_URL.DEV}/mostliked/`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((err) => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
};

export default Home;