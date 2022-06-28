import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import {changeTheme} from '../../scripts/actions/index'
import HeaderMobile from '../../components/headerMobile/HeaderMobile'
import FooterMobile from '../../components/footerMobile/FooterMobile'
import CourseCard from '../../components/coursecard/CourseCard'
import constant from '../../config/constant.js'

function DashboardMobile(props) {
  const [filterModal, setFilterModal] = useState(false);
  const [courseCardData,setCourseCardData]= useState([])

  useEffect(()=>{
    _getCardData()
  },[])

  const _getCardData=async()=>{
    const response = await fetch(`${constant.API_URL.DEV}/batch/search/`)
    const data = await response.json()
    setCourseCardData(data.data)
  }
  
   return(
        <div className="dashboard-mobile">
         <HeaderMobile />
         <div className="course-card-list">
         {
            courseCardData?.map((item,index)=>{
              return(
                <CourseCard key={index} data={item}/>
              )
            })
          }
         </div>
         
         <FooterMobile />
        </div>
       )
}

const mapStateToProps = (state) => {
    return {
      theme: state.theme
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      dispatchThemeChange: (theme) => {
        dispatch(changeTheme(theme))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMobile);