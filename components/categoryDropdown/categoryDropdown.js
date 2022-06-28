import React, { useEffect, useRef, useState } from 'react';
// import projectorIcon from '../../assets/images/icons/projectorIcon.png';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg'
import Image from "next/image";

export default function CategoryDropdown(props){
  
    return(
        <div className='dropdown'>
            {
                props.categories.map((item,index)=>{
                    return (
                        <div className='element-content' key={index}>
                        <Image src={bookmarkIcon} objectFit="cover" />
                        <span className='title'>{item.title}</span>
                        </div>
                    )
                })
            }
       </div>
    )
}