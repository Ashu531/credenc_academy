import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import {changeTheme} from '../../scripts/actions/index'
import HeaderMobile from '../../components/headerMobile/HeaderMobile'
import FooterMobile from '../../components/footerMobile/FooterMobile'
import CourseCard from '../../components/coursecard/CourseCard'
import constant from '../../config/constant.js'
import States from '../../values/states';
import SlidingPanel from 'react-sliding-side-panel';
import DetailModal from '../../components/detailModal/DetailModal'
const compareKey = 'credenc-marketplace-compares';
const bookmarkKey = 'credenc-marketplace-bookmarks';

function DashboardMobile(props) {
  const [filterModal, setFilterModal] = useState(false);
  const [courseCardData,setCourseCardData]= useState([])
  const [detailData,setDetailData] = useState({});
  const [compareTextVisible,setCompareTextVisible] = useState('');
  const [addToCompareButtonState, setAddToCompareButtonState] = useState({...States.addToCompareButtonState.DEFAULT});
  const [detailModal,setDetailModal] = useState(false)

  useEffect(()=>{
    _getCardData()
  },[])

  useEffect(()=>{
    getCompareText()
  },[detailData])

  const getCompareText =()=>{
 
      let tempCompareData = JSON.parse(localStorage.getItem(compareKey));
      if(tempCompareData && tempCompareData.length > 0){
        if (tempCompareData.includes(detailData?.id)) 
        {
          setCompareTextVisible("Go to Compare")
        }
        else {
          setCompareTextVisible("Add to Compare")
        } 
      }else{
        return setCompareTextVisible("Add to Compare")
      }
    
    }

  const _getCardData=async()=>{
    const response = await fetch(`${constant.API_URL.DEV}/batch/search/`)
    const data = await response.json()
    setCourseCardData(data.data)
  }

  const _addToBookmark=(item)=>{
    let bookmark = JSON.parse(localStorage.getItem(bookmarkKey)) 
    let bookmarkAvailable = false;
    if(bookmark && bookmark.length > 0){
      bookmark.forEach(data=>{
        if(data === item.id){
          bookmarkAvailable= true
          return 0;
        }
     })
     if(bookmarkAvailable === true){
      _onremoveToBookmark(item);
     }else{
      _onAddToBookmark(item);
     }
     
    }
    else{
      _onAddToBookmark(item);
    }
 
  }
  
  const _onremoveToBookmark=(item)=>{
    let bookmarkArray = [];
    let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
    if(bookmarkItem && bookmarkItem.length > 0){
      bookmarkArray =  bookmarkItem.filter(data => data !== item.id )
    }
    localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
  }
  
  const _onAddToBookmark=(item)=>{
    let bookmarkArray = [];
    let bookmarkItem = JSON.parse(localStorage.getItem(bookmarkKey)) 
    if(bookmarkItem && bookmarkItem.length > 0){
      bookmarkArray.push(...bookmarkItem)
    }
    bookmarkArray.push(item.id)
    localStorage.setItem(bookmarkKey,JSON.stringify(bookmarkArray));
  }

  const _onAddToCompare=(item)=>{
    let compareArray = [];
    let compareItem = JSON.parse(localStorage.getItem(compareKey)) 
    if(compareItem && compareItem.length > 0){
        compareItem.forEach(data=>{
            if(data.id === item.id)
            return;
        })
     compareArray.push(...compareItem)
    }
    compareArray.push(item.id)
    localStorage.setItem(compareKey,JSON.stringify(compareArray));
    
   }
   
   
   const _addToCompare=(item)=>{
   let compare = JSON.parse(localStorage.getItem(compareKey)) 
   let compareAvailable = false;
   if(compare && compare.length > 0){
    compare.forEach(data=>{
       if(data === item.id){
        compareAvailable= true
         return 0;
       }
    })
    if(compareAvailable === false){
      _onAddToCompare(item);
    }
   }
   else{
    _onAddToCompare(item);
   }
}

   const _openDetailModal=(data)=>{
    setDetailModal(!detailModal)
    setDetailData(data)
   }

 const _checkBookmarks=(item)=>{
  let bookmarkVisible = false;
  let tempBookmarkData = JSON.parse(localStorage.getItem(bookmarkKey));
  if(tempBookmarkData && tempBookmarkData.length > 0){
    if (tempBookmarkData.includes(item?.id))
    bookmarkVisible = true
    else
    bookmarkVisible = false
  }
  return bookmarkVisible;
 }

 const _checkCompareText=(item)=>{
  let compareText = 'Add to Compare';
  let tempCompareData = JSON.parse(localStorage.getItem(compareKey));
  if(tempCompareData && tempCompareData.length > 0){
    if (tempCompareData.includes(item?.id))
    compareText = 'Go to Compare'
    else
    compareText = 'Add to Compare'
  }
  return compareText;
 }
  
   return(
        <div className="dashboard-mobile">
         <HeaderMobile />
         <div className="course-card-list">
         {
            courseCardData?.map((item,index)=>{
             return(
                <CourseCard 
                key={index} 
                data={item}
                openDetailModal={()=>_openDetailModal(item)}
                addToCompare={()=>_addToCompare(item)} 
                addToBookmark={()=>_addToBookmark(item)}
                bookmarkVisible={_checkBookmarks(item)}
                compareText={_checkCompareText(item)}
                />
              )
            })
          }
         </div>
         
         <FooterMobile />
         <SlidingPanel
          type={'right'}
          isOpen={detailModal}
          backdropClicked={() => setDetailModal(false)}
          size={30}
         >
           <DetailModal
           detailData={detailData} 
           addToCompare={()=>_addToCompare(detailData)} 
           bookmarkVisible={ ()=> _checkBookmarks(item)}
           compareText={()=> _checkCompareText(item)} 
           addToBookmark={()=>_addToBookmark(detailData)}
           theme={props.theme} 
           openDetailModal={()=>_openDetailModal()}
           />
         </SlidingPanel>
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