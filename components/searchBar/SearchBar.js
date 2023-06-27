import React, { useEffect, useState } from "react";
import SearchIcon from "../../assets/images/icons/search-icon-white.svg";
import Image from "next/image";
import axios from "axios";
import constant from "../../config/constant";
import queryIcon from '../../assets/images/icons/queryIcon.svg'
import { useRouter } from 'next/router';
import { padding } from "@mui/system";
const EdtechAuthKey = 'credenc-edtech-authkey';

export default function SearchBar(props) {

  const [searchQuery, setSearchQuery] = useState([])
  const [mounted, setMounted] = useState(false)
  const [token,setToken] = useState('')
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const [cursor,setCursor] = useState(false)
  let location = useRouter();
  let coursedata = {}

  const _autocompleteQuery = async (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    props?.handleSearch(query)
    if (token?.length > 0) {
      await axios.get(`${constant.API_URL.DEV}/autocompletenew/?type=${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "key": 'credenc'
        }
      })
        .then(response => response.data.data)
        .then(data => {
          _fuseData(data, query)
        })
    } else {
      await axios.get(`${constant.API_URL.DEV}/autocompletenew/?type=${query}`, {
        headers: {
          "key": 'credenc'
        }
      })
        .then(response => response.data.data)
        .then(data => {
          _fuseData(data, query)
        })
    }
    
  }

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        setSuggestionIndex(searchQuery.length);
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
      setCursor(true)
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === searchQuery.length) {
        setSuggestionIndex(0);
        return
      }
      setSuggestionIndex(suggestionIndex + 1);
      setCursor(true)
    }
    // ENTER
    else if (e.keyCode === 13) {
      if(value && value.length > 0){
        let selectedData = cursor ? searchQuery[suggestionIndex-1] : searchQuery[suggestionIndex]
        setValue(selectedData?.name);
        coursedata=selectedData;
        setSuggestionIndex(0);
        setSuggestionsActive(false);
        customSearch()
        setCursor(false)
      }
    }
  };

  useEffect(() => {
    retrieveData()
  }, [])

  useEffect(() => {
    if (!location.isReady) return;
    if (location?.query && Object.keys(location?.query).length > 0) {
      setValue(location?.query?.search)
    }
  }, [location?.query?.search])

  useEffect(() => {
    if (props?.search?.length > 0) {
      setValue(props?.search)
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

  const _fuseData = (data, e) => {
    setSearchQuery(data)
    setSuggestionsActive(true)
  }

  const handleOnSelect = (item) => {
    setValue(item?.name);
    setSuggestionsActive(false);
    coursedata=item;
    props?.handleSearch(item?.name)
    handleLocationQuery()
    
  };

  const customSearch = () => {
    if(value && value.length > 0){
      props?.handleSearch(value)
      handleLocationQuery()
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
          search: value
        }
      },
      undefined,
      {
        shallow: false
      }
      )
    }
    
  }

  const Suggestions = () => {
    return (
      <div className="suggestions">
        {searchQuery && searchQuery.map((item, index) => {
          return (
            <div style={queryContainer} key={index} className={index+1 === suggestionIndex ? "active-item" : ""} onClick={()=>handleOnSelect(item)}>
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
          );
        })}
      </div>
    );
  };

  return (
    <>
      {
        mounted &&
        <div className={window.innerWidth <= 500 && location.pathname === '/' ? `autocomplete mobilesearch` : `autocomplete`} style={suggestionsActive ? {borderRadius: 25} : {borderRadius: 40}}>
          <div className='query-bar'>
              <input
                  type="text"
                  value={value}
                  onChange={_autocompleteQuery}
                  onKeyDown={handleKeyDown}
                  style={{minHeight: 48}}
                  autoFocus
              />
              <div className='icon-content' onClick={()=>customSearch()}>
                  <Image loader={myLoader} src={SearchIcon} className="search-icon-icon" objectFit="cover" height={18} width={18} />
              </div>
          </div>
     
          {suggestionsActive && searchQuery.length > 0 && <Suggestions />}
        </div>
      }
    </>
  );
}


const queryContainer = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '6px 24px'
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