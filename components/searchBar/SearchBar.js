import React, { useEffect, useState, useRef } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchIcon from "../../assets/images/icons/search-icon-white.svg";
import Image from "next/image";
import axios from "axios";
import constant from "../../config/constant";
import queryIcon from '../../assets/images/icons/queryIcon.svg'
import searchImage from '../../assets/images/icons/searchIcon.svg';
import { useRouter } from 'next/router';
import UrlService from "../../helper/urlService";

export default function SearchBar(props) {

  const [searchQuery, setSearchQuery] = useState([])
  const [searchString, setSearchString] = useState('')
  const [mounted, setMounted] = useState(false)
  let location = useRouter();
  let nextURL = location?.asPath?.substring(2, location?.asPath?.length)
  let urlService = useRef(new UrlService(nextURL));

  let coursedata = {}

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!location.isReady) return;
    if (location?.query && Object.keys(location?.query).length > 0) {
      setSearchString(location?.query?.search)
    }
  }, [location.isReady])

  useEffect(() => {
    if (props?.search?.length > 0) {
      setSearchString(props?.search)
    }
  }, [props?.showSearchBar])

  const myLoader = ({ src, width, quality }) => {
    if (src && src.length > 0) {
      return `${src}?w=${width}&q=${quality || 75}`
    } else {
      return '..'
    }
  }

  const _autocompleteQuery = async (e, results) => {

    props?.handleSearch(e)
    if (props?.token && props?.token.length > 0) {
      await axios.get(`${constant.API_URL.DEV}/autocompletenew/?type=${e}`, {
        headers: {
          'Authorization': `Bearer ${props?.token}`
        }
      })
        .then(response => response.data.data)
        .then(data => {
          _fuseData(data, e)
        })
    } else {
      await axios.get(`${constant.API_URL.DEV}/autocompletenew/?type=${e}`)
        .then(response => response.data.data)
        .then(data => {
          _fuseData(data, e)
        })
    }
    setSearchString(e)
  }

  const _fuseData = (data, e) => {
    setSearchQuery(data)
  }

  const handleOnSelect = (item) => {
    // the item selected
    // console.log("enter detected",item);
    coursedata=item;
    props?.handleSearch(item?.name)
    if(item?.course_id){
      location.push({
        pathname: '/details',
        query: {
          course_id: item?.course_id
        }
      })
    }else{
      location.push({
        pathname: '/search',
        query: {
          search: item?.name
        }
      },
        undefined,
        {
          shallow: true
        })
    }
   
    
  };

  const formatResult = (item) => {
    return <div style={queryContainer}>
      <span style={queryContent}>
        <Image loader={myLoader} src={item.logo ? item.logo : queryIcon} objectFit="contain" height={20} width={20} alt='query icon' />
        <span style={queryName}>
          {item?.name.length > 20 ? item?.name.substring(0, 20) + '...' : item?.name}
        </span>
      </span>
      <span style={queryCategory}>
        {item?.category}
      </span>
    </div>
    // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  };

  const customSearch = () => {
    props?.handleSearch(searchString)
    handleLocationQuery()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      customSearch()
    }
  }

  const handleLocationQuery = () => {
    if(coursedata?.course_id){
      location.push({
        pathname: '/details',
        query: {
          course_id: coursedata?.course_id
        }
      })
    }else{
      location.push({
        pathname: '/search',
        query: {
          search: searchString
        }
      },
        undefined,
        {
          shallow: true
        })
    }
    
  }

  return (
    <>
      {
        mounted &&
        <div className="search-model">
          <div
            className="search"
            onKeyDown={handleKeyDown}
          >
            <ReactSearchAutocomplete
              items={searchQuery}
              onSearch={_autocompleteQuery}
              onSelect={handleOnSelect}
              inputDebounce={500}
              fuseOptions={{ threshold: 1, shouldSort: false }}
              inputSearchString={searchString}
              autoFocus
              showNoResults={false}
              formatResult={formatResult}
              placeholder="Search here!"
              styling={window.innerWidth <= 500 && location.pathname === '/search' ? {
                height: '46px',
                fontFamily: 'Work Sans',
                fontStyle: 'normal',
                fontWeight: '500px',
                fontSize: '14px',
                lineHeight: '21px',
                backgroundColor: "#FFFFFF",
                // boxShadow: "none",
                clearIconMargin: "3px 124px 0 0",
                hoverBackgroundColor: "#F7F7F7",
                color: "#000000",
                lineColor: "#FFFFFF",
                width: '100%',
                searchIconMargin: '0 0 0 0px',
                borderRadius: 0,
                //   iconColor: "#313235"
              } : {
                height: '46px',
                fontFamily: 'Work Sans',
                fontStyle: 'normal',
                fontWeight: '500px',
                fontSize: '14px',
                lineHeight: '21px',
                backgroundColor: "#FFFFFF",
                borderRadius: "25px",
                // boxShadow: "none",
                clearIconMargin: "3px 124px 0 0",
                border: '1px solid #034FE2',
                hoverBackgroundColor: "#F7F7F7",
                color: "#000000",
                lineColor: "#FFFFFF",
                width: '90%',
                searchIconMargin: '0 0 0 0px',
                //   iconColor: "#313235"
              }}
              showIcon={false}
              showClear={false}
            />
          </div>
          <div
            className="search-icon-web-1"
            style={props.showSearchBar ? { right: 8, top: 12 } : null}
            onClick={() => customSearch()}
          >
            <Image loader={myLoader} src={SearchIcon} className="search-icon-icon" objectFit="cover" height={18} width={18} />
          </div>
        </div>
      }
    </>
  );
}


const queryContainer = {
  width: '98%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer'
}

const queryName = {
  fontFamily: 'Work Sans',
  fontStyle: 'normal',
  fontWeight: '500px',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#717171',
  marginLeft: '16px'
}

const queryCategory = {
  fontFamily: 'Work Sans',
  fontStyle: 'normal',
  fontWeight: '400px',
  fontSize: '12px',
  lineHeight: '18px',
  color: '#000000',
  textTransform: 'uppercase'
}

const queryContent = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
}