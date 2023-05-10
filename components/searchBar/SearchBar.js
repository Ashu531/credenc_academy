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
const EdtechAuthKey = 'credenc-edtech-authkey';

export default function SearchBar(props) {

  const [searchQuery, setSearchQuery] = useState([])
  const [searchString, setSearchString] = useState('')
  const [mounted, setMounted] = useState(false)
  const [token,setToken] = useState('')
  let location = useRouter();
  let nextURL = location?.asPath?.substring(2, location?.asPath?.length)
  let urlService = useRef(new UrlService(nextURL));

  const query = useRef('');

  let coursedata = {}

  useEffect(() => {
    retrieveData()
  }, [])

  useEffect(() => {
    if (!location.isReady) return;
    if (location?.query && Object.keys(location?.query).length > 0) {
      setSearchString(location?.query?.search)
    }
  }, [location?.query?.search])

  useEffect(() => {
    if (props?.search?.length > 0) {
      setSearchString(props?.search)
    }
  }, [props?.showSearchBar])

  const retrieveData=()=>{
    let authToken = localStorage.getItem(EdtechAuthKey);
    setToken(authToken)
    setMounted(true)
  }

  const myLoader = ({ src, width, quality }) => {
    if (src && src.length > 0) {
      return `${src}?w=${width}&q=${quality || 75}`
    } else {
      return '..'
    }
  }

  const _autocompleteQuery = async (e, results) => {
    query.current = e;
    props?.handleSearch(e)
    if (token?.length > 0) {
      await axios.get(`${constant.API_URL.DEV}/autocompletenew/?type=${e}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "key": 'credenc'
        }
      })
        .then(response => response.data.data)
        .then(data => {
          _fuseData(data, e)
        })
    } else {
      await axios.get(`${constant.API_URL.DEV}/autocompletenew/?type=${e}`, {
        headers: {
          "key": 'credenc'
        }
      })
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
    handleLocationQuery()
    
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
    if(query.current && query.current.length > 0){
      props?.handleSearch(searchString)
      handleLocationQuery()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setTimeout(()=>customSearch(), 300)
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
      console.log(query,"query")
      location.push({
        pathname: '/search',
        query: {
          search: query.current
        }
      },
      undefined,
      {
        shallow: false
      }
      )
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