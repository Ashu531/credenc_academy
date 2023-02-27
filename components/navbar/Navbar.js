import React, { useEffect, useRef, useState } from 'react';
import filterIcon from '../../assets/images/icons/filterIcon.svg';
import filterIconDark from '../../assets/images/icons/filter-icon-dark.svg'
import dropdownIcon from '../../assets/images/icons/dropdown.svg'
import dropdownIconDark from '../../assets/images/icons/caret-down-dark.svg'
import Image from "next/image";
import SubjectTab from '../../components/subjectTab/SubjectTab'
import caretRight from '../../assets/images/icons/caretRight.svg'
import SubjectDropdown from '../subjectDropdown/SubjectDropdown';
const subjectKey = 'credenc-edtech-subject';

export default function SubjectNavbar(props){
   
    const [leftScrollView,setLeftScrollView] = useState(false)
    const [rightScrollView,setRightScrollView] = useState(false)
    
    const ref = useRef(null);


    useEffect(()=>{
        manageLeftScrollView()
        manageRightScrollView()
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

    return(
        <div className='subject-navbar'> 
        {
            leftScrollView === true ?  <div className="navbar-arrow-container" onClick={() => scroll(-800)} style={{position:'absolute',left:48,zIndex: 999,background: '#FFFFFF'}}>
            <Image src={caretRight} objectFit="cover" style={{transform: "rotate(180deg)"}} height={14} width={14} alt='caretRight' />
            </div> : null
        }
            <div className='tabs' ref={ref}>
                <SubjectTab title={props.subCategories} selectedCategory={props?.selectedCategory} setSubCategoriesData={props?.setSubCategoriesData} theme={props.theme}/>
            </div>
        {
            rightScrollView === true ? <div className="navbar-arrow-container" onClick={() => scroll(800)} style={{position:'absolute',left:'80vw',zIndex: 999,background: '#FFFFFF'}}>
                <Image src={caretRight} objectFit="cover" height={14} width={14} alt='caretRight'/>
            </div> : null
        }
        
            <div className='subject-tab' onClick={()=>props.toggleFilterModal()} >
                <span className='all-subject-text'>Filters</span>
                <Image src={props.theme === 'dark' ? filterIconDark : filterIcon} objectFit="cover" alt='filterIcon' />
                {  props?.appliedFiltersCount > 0 ? 
                    <span className='filter-container'>
                         <span className='filter-count'>{props?.appliedFiltersCount}</span>
                    </span>
                    : null
                }
            </div>
        </div>
    )
}