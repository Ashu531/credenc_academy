import React, { useEffect, useRef, useState } from 'react';
// import projectorIcon from '../../assets/images/icons/projectorIcon.png';
import dropdownIcon from '../../assets/images/icons/dropdown.svg'
import Image from "next/image";
import SubjectTab from '../../components/subjectTab/SubjectTab'
import caretRight from '../../assets/images/icons/caretRight.svg'
import SubjectDropdown from '../subjectDropdown/SubjectDropdown';
const subjectKey = 'credenc-edtech-subject';

export default function SubjectNavbar(props){
   
    const [leftScrollView,setLeftScrollView] = useState(false)
    const [rightScrollView,setRightScrollView] = useState(false)
    const [subjectModalVisible,setSubjectModalVisible] = useState(false)
    
    const ref = useRef(null);


    useEffect(()=>{
        manageLeftScrollView()
        manageRightScrollView
    },[leftScrollView,rightScrollView])

    const manageLeftScrollView=()=>{
        if(ref.current?.scrollLeft === 0){
            setLeftScrollView(false)
          }else{
            setLeftScrollView(true)
          }
    }

    const manageRightScrollView=()=>{
        if(ref.current?.scrollRight === 0){
            setRightScrollView(false)
          }else{
            setRightScrollView(true)
          }
    }

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
        manageLeftScrollView()
    }


   console.log(props?.selectedSubject,"props?.selectedSubject=++")
    return(
        <div className='subject-navbar'> 
        <div className='subject-tab' onMouseEnter={()=> setSubjectModalVisible(true)} onMouseLeave={()=> setSubjectModalVisible(false)}>
        <span className='all-subject-text'> {props?.selectedSubject.name && props?.selectedSubject.name !== "All" ? props?.selectedSubject.name : "All Subjects"}</span>
         <Image src={dropdownIcon} objectFit="cover" />

         {
            subjectModalVisible ? 
             <div className="dashboard-subject-modal" >
            <SubjectDropdown  
            categories={props?.subjectData} 
            selectedSubject={props?.selectedSubject} 
            selectSubject={props?.selectSubject}
            />
            </div> : null
         }
        </div>
        {
            leftScrollView === true ?  <div className="navbar-arrow-container" onClick={() => scroll(-20)}>
            <Image src={caretRight} objectFit="cover" style={{transform: "rotate(180deg)"}} height={14} width={14}/>
            </div> : null
        }
       
        <div className='tabs' ref={ref}>
        <SubjectTab title={props.subCategories} selectedCategory={props.selectedCategory} setSubCategoriesData={props.setSubCategoriesData}/>
       </div>
       {
        rightScrollView === true ? <div className="navbar-arrow-container" onClick={() => scroll(20)}>
        <Image src={caretRight} objectFit="cover" height={14} width={14} />
        </div> : null
       }
        
        <div className='subject-tab' onClick={()=>props.toggleFilterModal()} >
        <span className='all-subject-text'>Filters</span>
        <Image src={dropdownIcon} objectFit="cover" />
        </div>
        </div>
    )
}