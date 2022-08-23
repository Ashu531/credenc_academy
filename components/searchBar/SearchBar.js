import React from "react";
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchIcon from "../../assets/images/icons/search-icon-white.svg";
import Image from "next/image";

export default function SearchBar(props) {
  return (
    <div className="search-model" >
      <input className='search-input' style={ props.showSearchBar ? {height: 40} : null} type='text' placeholder='Search by anything ;)' value={props.search} onChange={(e)=>props.handleSearch(e.target.value)} />
      <div className="search-icon-1" style={ props.showSearchBar ? {right: 8,top: 5} : null}>
        <Image src={SearchIcon} className="search-icon-icon" objectFit="cover" height={18} width={18} />
      </div>
    </div>
  );
}
