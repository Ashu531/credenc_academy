import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import techonolgyImage from '../../assets/images/icons/techonolgyImage.svg'
import dataScienceImage from '../../assets/images/icons/dataScienceImage.svg'
import marketingImage from '../../assets/images/icons/marketingImage.svg'
import designImage from '../../assets/images/icons/designImage.svg'

export default function BrowseCategories(props){

    const _handleCategoryData=(searchString)=>{
        let data = {
            name: searchString,
            domain: true
          }
        props?.searchItem(searchString)  
        props?.handleSearch(data)
    }
  
    return(
        <div className='category-container'> 
            <div className='category-header'>
                <h2 className='header-text'>Browse Categories</h2>
            </div>
            <div className='category-section'>
                <div className='category-data' onClick={()=>_handleCategoryData('Technology')}>
                    <Image src={techonolgyImage} alt='techonolgyImage' width={246} height={200} objectFit='contain' />
                    <div className='category-text'>
                        Technology
                    </div>
                </div>
                <div className='category-data' onClick={()=>_handleCategoryData('Marketing')}>
                    <Image src={marketingImage} alt='techonolgyImage' width={246} height={200} objectFit='contain' />
                    <div className='category-text'>
                        Marketing
                    </div>
                </div>
                <div className='category-data' onClick={()=>_handleCategoryData('Data Science')}>
                    <Image src={dataScienceImage} alt='techonolgyImage' width={246} height={200} objectFit='contain' />
                    <div className='category-text'>
                        Data Science
                    </div>
                </div>
                <div className='category-data' onClick={()=>_handleCategoryData('Design')}>
                    <Image src={designImage} alt='techonolgyImage' width={246} height={200} objectFit='contain' />
                    <div className='category-text'>
                        Design
                    </div>
                </div>
            </div>
        </div>
    )
}