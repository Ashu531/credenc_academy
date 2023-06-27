import Dashboard from './dashboard'
import React, { useState, useEffect } from "react"
import Script from 'next/script';
import SEO from '../config/seo';
import axios from 'axios';
import constant from '../config/constant';
const EdtechToken = 'credenc-edtech-authkey';

const Home = (props) => {

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
      <Script id='hotjar'>
      {
      `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3550428,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
      }
      </Script>
      <SEO />
      {
        <Dashboard
          filterExpandedStage={props?.filterExpandedStage}
          openFilterExpandedStage={() => props?.openFilterExpandedStage()}
          subjectDropdownMobile={props?.subjectDropdownMobile}
          loginModal={props?.loginModal}
          closeLoginModal={() => props?.closeLoginModal()}
          openForgotPasswordModal={() => props?.openForgotPasswordModal()}
          forgotPasswordModal={props?.forgotPasswordModal}
          handleForgotPasswordEnd={() => props?.handleForgotPasswordEnd()}
          selectedSubject={(item) => props?.selectedSubject(item)}
          toggleSubjectDropdown={() => props?.toggleSubjectDropdown()}
          toggleFilterVisible={() => props?.toggleFilterVisible()}
          filterModalVisible={props?.filterModalVisible}
          showSearchBar={props?.showSearchBar}
          _showSearchBar={props?._showSearchBar}
          hideSearchBar={props?.hideSearchBar}
          searchValue={props?.searchValue}
          handleSearch={(e) => props?.handleSearch(e)}
          closeFilterExpandedStage={() => props?.closeFilterExpandedStage()}
          searchData={props?.searchData}
          handleLogout={() => props?.handleLogout()}
          handleLogin={() => props?.handleLogin()}
          openLoginModal={() => props?.openLoginModal()}
          openFilterVisible={() => props?.openFilterVisible()}
          handleOpenMobileSearch={() => props?.handleOpenMobileSearch()}
          clearSearch={() => props?.clearSearch()}
          closeFilterVisible={() => props?.closeFilterVisible()}
          setScrollUp={() => props?.setScrollUp()}
          setScrollDown={() => props?.setScrollDown()}
          goingUp={props?.goingUp}
          openCoursePreviewModal={() => props?.openCoursePreviewModal()}
          closeCoursePreviewModal={() => props?.closeCoursePreviewModal()}
          addLocalBookmarks={(count) => props?.addLocalBookmarks(count)}
          removeLocalBookmarks={(count) => props?.removeLocalBookmarks(count)}
          closeForgotPasswordModal={() => props?.closeForgotPasswordModal()}
          selectSearch={(e) => props?.selectSearch(e)}
          subjectData={props?.subjectData}
          {...props}
        />
      }
    </>
  )
}
export const getStaticProps = async () => {
  let trendingData = getTrendingData();
  let subCategoryData = getSubCategoryData();
  let courseData = getCourses();
  let platformData = getPlatformData()
  let educatorData = getEducatorData()

  return {
    props: {
      trendingData: await trendingData,
      subCategoryData: await subCategoryData,
      courseData: await courseData,
      platformData: await platformData,
      educatorData: await educatorData,
    }
  };
}

const getSubCategoryData = async () => {
  const response = await fetch(`${constant.API_URL.DEV}/subsubject/search/`, {
    method: 'GET',
    headers: {
      'key': 'credenc'
    }
  })

  const data = await response.json()
  let totalSubcategoryData = data?.data;

  totalSubcategoryData?.unshift(
    {
      "value": "All",
      "seo_ranks": 0,
      "label": 0
    }
  )

  return totalSubcategoryData;
}

const getCourses = async () => {
  return await axios.get(`${constant.API_URL.DEV}/course/search`, {
    headers: {
      'key': 'credenc'
    }
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}

const getTrendingData = async () => {
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

const getPlatformData = async () => {
  return await axios
    .get(`${constant.API_URL.DEV}/platfroms/`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((err) => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
};

const getEducatorData = async () => {
  return await axios
    .get(`${constant.API_URL.DEV}/instituitions/`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((err) => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
};

export default Home
