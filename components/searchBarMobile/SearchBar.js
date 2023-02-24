import React, { useEffect, useState,useRef } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchIcon from "../../assets/images/icons/search-icon-white.svg";
import Image from "next/image";
import axios from "axios";
import constant from "../../config/constant";
import queryIcon from '../../assets/images/icons/queryIcon.svg'
import { useRouter } from 'next/router'
import mobileSearchIcon from '../../assets/images/icons/mobileSearchIcon.svg'
import caretLeftDark from '../../assets/images/icons/caretLeftDark.svg'
import searchImage from '../../assets/images/icons/searchIcon.svg';

export default function SearchBar(props) {

  const [searchQuery,setSearchQuery] = useState([])
  const [searchString,setSearchString] = useState('')
 
  let location = useRouter();

  useEffect(()=>{
    if(props?.searchValue && props?.searchValue.length > 0){
     setSearchString(props?.searchValue)
    }
  },[])

  const myLoader = ({ src, width, quality }) => {
    if(src && src.length > 0){
        return `${src}?w=${width}&q=${quality || 75}`
    }else{
        return '..'
    }
 }

  const _autocompleteQuery = async(e,results)=>{
    let res = await axios.get(`${constant.API_URL.DEV}/autocompletenew/?type=${e}`)
    .then(res => {
      // this.coursesApiStatus.current.success();
      _fuseData(res.data.data,e)
      return res.data;
    })
    .catch(err => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
  }

  const _fuseData=(data,e)=>{
    let intialQuery = {
      id: 0,
      logo : searchImage,
      name: e,
    }
    let autocompleteArray = data ? data : [];
    autocompleteArray.unshift(intialQuery)
    setSearchQuery(data)
    setSearchString(e)
  }

  const handleOnSelect = (item) => {
    // the item selected
    // console.log("enter detected",item);
  
    
    location.push({
      pathname: `/`
    })
    if(!item?.course_id){
     props?.handleSearch(item?.name)
     props?.openFilterVisible()
    }else {
      location.push({
        pathname: '/details',
        query: { course_id: item?.course_id },
      })
    }
    

  };

  const formatResult = (item) => {
    return <div style={queryContainer}>
      <span style={queryContent}>
        <Image loader={myLoader} src={item?.logo ? item.logo : queryIcon} objectFit="cover" height={20} width={20} alt='query icon' />
        <span style={queryName}>
        {item?.name.length > 26 ? item?.name.substring(0,26) + '...' : item?.name}
        </span>
      </span>
      <span style={queryCategory}>
      {item?.category}
      </span>
    </div> 
    // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  };
  

  const _handleBack=()=>{
    location.push('/')
    props?.clearSearch()
    setSearchString('')
    props?.closeFilterVisible()
  }

  const _handleFreshSearch=()=>{
    // props?.clearSearch()
    setSearchString('')
    location.push({
      pathname: `/search`
    })
  }

  const handleOnFocus = (e) => {
    // console.log("Focused",e?.target?.value);
    // props?.handleOpenMobileSearch()
    // location.push('/search');
    location.push({
      pathname: `/search`
    })
  };



  

  return (
  
    <div className="search-model-mobile" style={ location.pathname == '/search' ? {padding: 0} : null}
      >
      <div onClick={()=> _handleBack()} style={props?.searchValue && location.pathname == '/' ? {paddingLeft: 15,paddingTop: 3} : {display: 'none'}}>
        <Image src={caretLeftDark} className="search-icon-icon" objectFit="cover" height={20} width={20} />
      </div>
      <div className="search-bar-mobile">
      <ReactSearchAutocomplete
          items={searchQuery}
          onSearch={_autocompleteQuery}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          inputDebounce={500}
          inputSearchString={searchString}
          autoFocus={location.pathname == '/search' ? true : false}
          showNoResults={false}
          formatResult={formatResult}
          placeholder="Search for Courses"
          styling={{
            height: '48px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '500px',
            fontSize: '14px',
            lineHeight: '21px',
            backgroundColor: "#FFFFFF",
            // borderRadius: "25px",
            // boxShadow: "none",
            clearIconMargin: "3px 124px 0 0",
            border: "none",
            hoverBackgroundColor: "#F7F7F7",
            color: "#000000",
            // lineColor: "#FFFFFF",
            width:'100%'
            // searchIconMargin: '0 0 0 0px',
            //   iconColor: "#313235"
          }}
          showIcon={false}
          showClear={false}
        />
      </div>
      <div 
      // style={props?.searchValue && location.pathname == '/' ? {padding: 24} : {display: 'none'}} 
      className='mobile-search-bar'
      onClick={()=>_handleFreshSearch()}
      >
        <Image src={mobileSearchIcon} className="search-icon-icon" objectFit="cover" height={30} width={30} />
      </div>
    </div>
  );
}


const queryContainer = {
  width: '98%',
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'
}

const queryName = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500px',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#717171',
  marginLeft: '16px'
}

const queryCategory = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '400px',
  fontSize: '12px',
  lineHeight: '18px',
  color: '#000000',
  textTransform: 'uppercase'
}

const queryContent= {
  display:'flex',
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'center'
}