import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import DetailPageMobile from "./mobileDetailPage";
import DetailPageWeb from "./webDetailPage";
import axios from "axios";
import constant from "../../config/constant";
import Head from "next/head";
const EdtechToken = "credenc-edtech-authkey";
const EdtechPartnerKey = "credenc-edtech-partner-key";

const DetailPage = (props) => {
  let location = useRouter();
  const [token, setToken] = useState("");
  const [thirdPartyUser, setThirdPartyUser] = useState({});
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });

  useEffect(() => {
    _retrieveData();
  }, [location.query.courseId]);

  const _retrieveData = () => {
    const localToken = localStorage.getItem(EdtechToken);
    if (localToken && localToken.length > 0) {
      setToken(localToken);
    }

    let partnerKey = JSON.parse(localStorage.getItem(EdtechPartnerKey));
    if (partnerKey && partnerKey.length > 0) {
      setThirdPartyUser(partnerKey);
    }
  };

  return (
    <>
      <Head>
        <title>{props.courseName}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {isDesktopOrLaptop && (
            <DetailPageWeb
              id={location.query.courseId}
              detailData={props.detailData}
              instructorData={props.instructors}
              similarCourses={props.similarCourses}
              priceOptions={props.priceOptions}
              toolData={props.toolData}
              reviews={props.reviews}
              rating={props.ratings}
              startingCost={props.startingCost}
              courseName={props.courseName}
              token={token}
              openLoginModal={() => props?.openLoginModal()}
              addLocalBookmarks={(count) => props?.addLocalBookmarks(count)}
              removeLocalBookmarks={(count) =>
                props?.removeLocalBookmarks(count)
              }
              handleForgotPasswordEnd={() => props?.handleForgotPasswordEnd()}
              closeLoginModal={() => props?.closeLoginModal()}
              openForgotPasswordModal={() => props?.openForgotPasswordModal()}
              forgotPasswordModal={props?.forgotPasswordModal}
              handleLogin={() => props?.handleLogin()}
              closeForgotPasswordModal={() => props?.closeForgotPasswordModal()}
              loginModal={props?.loginModal}
              thirdPartyUser={thirdPartyUser}
              subjectData={props?.subjectData}
              openFilterExpandedStage={() => props?.openFilterExpandedStage()}
            />
          )}
          {isMobile && (
            <DetailPageMobile
              id={location.query.courseId}
              detailData={props.detailData}
              instructorData={props.instructors}
              similarCourses={props.similarCourses}
              priceOptions={props.priceOptions}
              toolData={props.toolData}
              reviews={props.reviews}
              rating={props.ratings}
              startingCost={props.startingCost}
              addLocalBookmarks={(count) => props?.addLocalBookmarks(count)}
              removeLocalBookmarks={(count) =>
                props?.removeLocalBookmarks(count)
              }
              token={token}
              openLoginModal={() => props?.openLoginModal()}
              thirdPartyUser={thirdPartyUser}
            />
          )}
        </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({ params }) => {
  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=59"
  // );

  let data = {}

  let { courseId } = params;

  if(courseId){

    let detailData = _getDetailData(courseId);
    let instructors = _getInstructorData(courseId);
    let reviews = _getReviews(courseId);
    let ratings = _getRating(courseId);
    let priceOptions = _getpaymentDetails(courseId);
    let toolData = _getToolData(courseId);
    let similarCourses = _getCardData(courseId);
    let startingCost = _getStartingCost(courseId);

    data = {
      detailData: await detailData,
      instructors: await instructors,
      reviews: await reviews,
      ratings: await ratings,
      priceOptions: await priceOptions,
      toolData: await toolData,
      similarCourses: await similarCourses,
      startingCost: await startingCost,
    };

    data["courseName"] = _getCourseName(data?.detailData?.course_name);
  }

  return { props: { ...data } };
};

const _getDetailData = async (id, localToken) => {
  return await axios
    .get(`${constant.API_URL.DEV}/course/detail_one/${id}/`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((err) => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
};

const _getInstructorData = async (id) => {
  return await axios
    .get(`${constant.API_URL.DEV}/course/instructor/${id}/`)
    .then((res) => {
      // this.coursesApiStatus.current.success();
      // setMounted(true);
      return res?.data?.data;
    })
    .catch((err) => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
};
const _getReviews = async (id) => {
  return await axios
    .get(`${constant.API_URL.DEV}/course/reviews/${id}/`)
    .then((res) => {
      // this.coursesApiStatus.current.success();
      // setMounted(true);
      console.log('response', res?.data)
      return res?.data;
    })
    .catch((err) => {
      // this.coursesApiStatus.current.failed();
      console.log('error', err)
      console.log(err);
    });
};
const _getRating = async (id) => {
  return await axios
    .get(`${constant.API_URL.DEV}/course/ratingsavg/${id}/`)
    .then((res) => {
      // this.coursesApiStatus.current.success();
      // setMounted(true);
      return res?.data;
    })
    .catch((err) => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
};
const _getpaymentDetails = async (id) => {
  return await axios
    .get(`${constant.API_URL.DEV}/course/price_options/${id}/`, {
      headers: {
        key: "credenc",
      },
    })
    .then((res) => {
      // this.coursesApiStatus.current.success();
      // setMounted(true);
      return res?.data?.data;
    })
    .catch((err) => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
};
const _getToolData = async (id) => {
  return await axios
    .get(`${constant.API_URL.DEV}/course/detail_two/${id}/`)
    .then((res) => {
      // this.coursesApiStatus.current.success();
      // setMounted(true);
      return res?.data?.data;
    })
    .catch((err) => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
};
const _getCardData = async (id, localToken) => {
  return await axios
    .get(`${constant.API_URL.DEV}/course/similar/${id}/`, {
      headers: {
        key: "credenc",
      },
    })
    .then((res) => {
      // this.coursesApiStatus.current.success();
      // setMounted(true);
      return res?.data?.data;
    })
    .catch((err) => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
};
const _getStartingCost = async (id) => {
  return await axios
    .get(`${constant.API_URL.DEV}/course/starting_cost/${id}/`, {
      headers: {
        key: "credenc",
      },
    })
    .then((res) => {
      // this.coursesApiStatus.current.success();
      // setMounted(true);
      return res.data.data;
    })
    .catch((err) => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
};

const _getCourseName = (course_name) => {
  let str = course_name.replace(/\p{L}+/gu, function (txt) {
    if (course_name.indexOf(txt) !== 0) {
      return txt.toLowerCase();
    }
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  return str;
};

export default DetailPage;
