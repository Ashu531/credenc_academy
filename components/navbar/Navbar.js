import React, { useEffect, useRef, useState } from 'react';
// import projectorIcon from '../../assets/images/icons/projectorIcon.png';
import dropdownIcon from '../../assets/images/icons/dropdown.svg'
import Image from "next/image";
import SubjectTab from '../../components/subjectTab/SubjectTab'
import caretRight from '../../assets/images/icons/caretRight.svg'


export default function SubjectNavbar(props){
    const ref = useRef(null);
    const [leftScrollView,setLeftScrollView] = useState(false)

    useEffect(()=>{
        manageLeftScrollView()
    },[leftScrollView])

    const manageLeftScrollView=()=>{
        if(ref.current?.scrollLeft === 0){
            setLeftScrollView(false)
          }else{
            setLeftScrollView(true)
          }
    }

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
        manageLeftScrollView()
    }
   
    return(
        <div className='subject-navbar'>
        <div className='subject-tab' onMouseEnter={()=> props.openSubjectModal()} onMouseLeave={()=>props.closeSubjectModal()}>
        <span className='all-subject-text'>All Subjects</span>
        <Image src={dropdownIcon} objectFit="cover" />
        </div>
        {
            leftScrollView === true ?  <div className="navbar-arrow-container" onClick={() => scroll(-20)}>
            <Image src={caretRight} objectFit="cover" style={{transform: "rotate(180deg)"}} height={14} width={14}/>
            </div> : null
        }
       
        <div className='tabs' ref={ref}>
        <SubjectTab title={props.golazo} selectedCategory={props.selectedCategory} setSubCategoriesData={props.setSubCategoriesData}/>
       </div>
        <div className="navbar-arrow-container" onClick={() => scroll(20)}>
        <Image src={caretRight} objectFit="cover" height={14} width={14} />
        </div>
        <div className='subject-tab' onClick={()=>props.toggleFilterModal()} >
        <span className='all-subject-text'>Filters</span>
        <Image src={dropdownIcon} objectFit="cover" />
        </div>
        </div>
    )
}