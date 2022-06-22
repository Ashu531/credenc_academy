import React, { useEffect, useRef, useState } from 'react';
// import projectorIcon from '../../assets/images/icons/projectorIcon.png';
import dropdownIcon from '../../assets/images/icons/dropdown.svg'
import Image from "next/image";
import SubjectTab from '../../components/subjectTab/SubjectTab'

const golazo = ["UI UX Design","Animation Design","Fashion design","Game Design","Interior Design","Motion Graphics Design"];

export default function SubjectNavbar(props){
  console.log(props,"subject props+++")
    return(
        <div className='subject-navbar'>
        <div className='subject-tab'>
        <span className='all-subject-text'>All Subjects</span>
        <Image src={dropdownIcon} objectFit="cover" />
        </div>
        <div className='tabs'>
        <SubjectTab title={golazo} />
        </div>
        <div className='subject-tab' onClick={()=>props.toggleFilterModal()} >
        <span className='all-subject-text'>Filters</span>
        <Image src={dropdownIcon} objectFit="cover" />
        </div>
        </div>
    )
}