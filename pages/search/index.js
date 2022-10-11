import React from 'react';
import Image from "next/image";
import SearchMobile from '../../components/searchBarMobile/SearchBar'

export default function SearchPageMobile(props){

  const _handleSearch=(e)=>{
    props?.handleSearch(e)
  }

    return(
        <div className='search-container'>
           <div className='search-bar-content'>
             <SearchMobile 
                handleOpenMobileSearch={()=>props?.handleOpenMobileSearch()} 
                search={props.searchValue} 
                handleSearch={(e)=>_handleSearch(e)} 
                toggleFilterVisible={()=>props?.toggleFilterVisible()}
                openFilterVisible={()=>props?.openFilterVisible()}
                clearSearch={()=>props?.clearSearch()}
             />
           </div> 
        </div>
    )
}