import React, { useEffect, useState,useRef } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchIcon from "../../assets/images/icons/search-icon-white.svg";
import Image from "next/image";
import axios from "axios";
import constant from "../../config/constant";
import queryIcon from '../../assets/images/icons/queryIcon.svg';
import Autocomplete from 'react-autocomplete'
import { minWidth } from "@mui/system";

export default function SearchBar(props) {

  const [searchQuery,setSearchQuery] = useState([]);
  const [searchValue,setSearchValue] = useState('');

  const myLoader = ({ src, width, quality }) => {
    if(src && src.length > 0){
        return `${src}?w=${width}&q=${quality || 75}`
    }else{
        return '..'
    }
 }

  const _autocompleteQuery=async(e)=>{
    setSearchValue(e);
    if(searchValue && searchValue.length > 0){
      await axios.get(`${constant.API_URL.DEV}/autocompletenew/?type=${e}`)
      .then(response => response.data.data)
      .then(data => setSearchQuery(data))
    }
  }

  const handleOnSelect = (item) => {
    // the item selected
    // console.log("enter detected",item);
    props?.handleSearch(item)
  };

  return (
  
    <div className="search-model">
      <div className="search">
        {/* <ReactSearchAutocomplete
          items={searchQuery}
          onSearch={_autocompleteQuery}
          onSelect={handleOnSelect}
          inputDebounce={500}
          inputSearchString={props?.search}
          autoFocus
          showNoResults={false}
          formatResult={formatResult}
          placeholder="Search by anything!"
          styling={{
            height: '46px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '500px',
            fontSize: '14px',
            lineHeight: '21px',
            backgroundColor: "#FFFFFF",
            borderRadius: "25px",
            // boxShadow: "none",
            clearIconMargin: "3px 124px 0 0",
            border: "none",
            hoverBackgroundColor: "#F7F7F7",
            color: "#000000",
            lineColor: "#FFFFFF",
            width:'90%',
            searchIconMargin: '0 0 0 0px',
            //   iconColor: "#313235"
          }}
          showIcon={false}
          showClear={false}
        /> */}
        <Autocomplete
          getItemValue={(item) => item.name}
          items={searchQuery}
          renderItem={(item, isHighlighted) =>
            <div style={{ 
              background: isHighlighted ? 'lightgray' : 'white',
              width: '100%',
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              cursor: 'pointer',
              // background: '#ffffff',
              padding: '5px 24px',
               }}>
              <span style={queryContent}>
                <Image loader={myLoader} src={item.logo ? item.logo : queryIcon} objectFit="contain" height={20} width={20} alt='query icon' />
                  <span style={queryName}>
                    {item?.name.length > 20 ? item?.name.substring(0,20) + '...' : item?.name}
                  </span>
                </span>
                <span style={queryCategory}>
                    {item?.category}
                </span>
            </div>
          }
          value={props.showSearchBar ? props?.search.length > 30 ? props?.search.substring(0,30) + '...' : props?.search : searchValue}
          onChange={ (e) =>_autocompleteQuery(e.target.value)}
          onSelect={(val) => handleOnSelect(val)}
          open={searchValue && searchValue.length > 0 ? true : false}
          wrapperProps={{ style: { 
            position: 'absolute',
            top: 0,
            width:'100%',
           } 
          }}
          inputProps={ 
            props.showSearchBar ?
            props.search && props.search.length > 0 ?  
          {
             style : {
              width: '25%',
              height: 48,
              borderRadius: 30,
              position:'fixed',
              /* border-color: white; */
              border: '0px solid #ffffff',
              /* left: 30px; */
              paddingLeft: 30,
              marginTop: 12
            }
          }:
          {
            style : {
             width: '25%',
             height: 48,
             borderTopRightRadius: 30,
             borderTopLeftRadius: 30,
             position:'fixed',
             /* border-color: white; */
             border: '0px solid #ffffff',
             /* left: 30px; */
             paddingLeft: 30,
             marginTop: 12
           }
         } :
         searchQuery && searchQuery.length > 0 ?  
            {
             style : {
              width: '96.6%',
              height: 48,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              position:'fixed',
              /* border-color: white; */
              border: '0px solid #ffffff',
              /* left: 30px; */
              paddingLeft: 30,
          }
          }:
          {
            style : {
             width: '96.6%',
             height: 48,
             borderRadius: 30,
             position:'fixed',
             /* border-color: white; */
             border: '0px solid white',
             /* left: 30px; */
             paddingLeft: 30
         }
         }
        }
          menuStyle={props.showSearchBar ? {
            // position:'fixed',
            // left: 4,
            // right: 0,
            // top: 48,
            width:'100%',
            border: '1px solid #ffffff',
            background: '#ffffff',
            minWidth: 'unset',
            marginTop: 48,
          }:{
            width:'100%',
            border: '1px solid #ffffff',
            background: '#ffffff',
            minWidth: 'unset',
            marginTop: 48,
          }}
        />
      </div>
      <div className="search-icon-web-1" style={ props.showSearchBar ? {right: -45,top: 15} : null}>
        <Image loader={myLoader} src={SearchIcon} className="search-icon-icon" objectFit="cover" height={18} width={18} />
      </div>
    </div>
  );
}


const queryContainer = {
  width: '92%',
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  cursor: 'pointer',
  background: '#ffffff',
  // padding: '5px 24px',
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
  alignItems:'center',
}