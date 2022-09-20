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

const items = [
  {
    id: 0,
    name: "Cobol",
  },
  {
    id: 1,
    name: "JavaScript",
  },
  {
    id: 2,
    name: "Basic",
  },
  {
    id: 3,
    name: "PHP",
  },
  {
    id: 4,
    name: "Java",
  },
  {
    id: 5,
    name: "ReactJs",
  },
  {
    id: 6,
    name: "NodeJs",
  },
  {
    id: 7,
    name: "Python beginner Course",
  },
];

export default function SearchBar(props) {

  const [searchQuery,setSearchQuery] = useState([])
  const [initialQuery,setInitialQuery] = useState(false)
  let location = useRouter();

  const myLoader = ({ src, width, quality }) => {
    if(src && src.length > 0){
        return `${src}?w=${width}&q=${quality || 75}`
    }else{
        return '..'
    }
 }

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    _autocompleteQuery(string)
  };

  const _autocompleteQuery = async(e)=>{
    let res = await axios.get(`${constant.API_URL.DEV}/autocompletenew/?type=${e}`)
    .then(res => {
      // this.coursesApiStatus.current.success();
      setSearchQuery(res.data.data)
      return res.data;
    })
    .catch(err => {
      // this.coursesApiStatus.current.failed();
      console.log(err);
    });
  }

 

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    // console.log("enter detected",item);
  
    props?.handleSearch(item?.name)
    location.push({
      pathname: `/`
    })
    props?.openFilterVisible()
    setInitialQuery(true)
  };

  const handleOnFocus = (e) => {
    // console.log("Focused",e?.target?.value);
    // props?.handleOpenMobileSearch()
    // location.push('/search');
    location.push({
      pathname: `/search`
    })
  };

  const formatResult = (item) => {
    return <div style={queryContainer}>
      <span style={queryContent}>
        <Image loader={myLoader} src={item?.logo ? item.logo : queryIcon} objectFit="cover" height={20} width={20} alt='query icon' />
        <span style={queryName}>
          {item?.name}
        </span>
      </span>
      <span style={queryCategory}>
      {item?.category}
      </span>
    </div> 
    // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  };

  const _handleBack=()=>{
    location.push({
      pathname: `/`
    })
    props?.clearSearch()
    props?.toggleFilterVisible()
  }

  const _handleFreshSearch=()=>{
    props?.clearSearch()
    location.push({
      pathname: `/search`
    })
  }


  return (
  
    <div className="search-model" style={ location.pathname == '/search' ? {padding: 0} : null}
      >
      <div onClick={()=> _handleBack()} style={props?.searchValue && location.pathname == '/' ? {paddingLeft: 15,paddingTop: 3} : {display: 'none'}}>
        <Image src={caretLeftDark} className="search-icon-icon" objectFit="cover" height={20} width={20} />
      </div>
      <div className="search">
        <ReactSearchAutocomplete
          items={searchQuery}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          inputSearchString={props?.searchValue}
          autoFocus={location.pathname == '/search' ? true : false}
          showNoResults={false}
          formatResult={formatResult}
          placeholder="Search by anything!"
          styling={{
            height: '48px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '500px',
            fontSize: '16px',
            lineHeight: '21px',
            backgroundColor: "#FFFFFF",
            // borderRadius: "25px",
            // boxShadow: "none",
            clearIconMargin: "3px 124px 0 0",
            border: "none",
            hoverBackgroundColor: "#F7F7F7",
            color: "#000000",
            lineColor: "#FFFFFF",
            boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
            // width:'90%'
            // searchIconMargin: '0 0 0 0px',
            //   iconColor: "#313235"
          }}
          showIcon={false}
          showClear={false}
        />
      </div>
      <div style={props?.searchValue && location.pathname == '/' ? {padding: 24} : {display: 'none'}} onClick={()=>_handleFreshSearch()}>
        <Image src={mobileSearchIcon} className="search-icon-icon" objectFit="cover" height={40} width={40} />
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