import React, { useEffect, useRef, useState } from 'react';
import States from '../../../../values/states';
import Input from '../input/Input';
import searchIcon from '../../../../assets/search-icon-white.svg';
import { Skeleton } from '@mui/material';

export default function PrimaryDropdown({
    heading='Pick one',
    dropList=[],
    onSelect,
    onUnselect,
    dropRef,
    dropdownState,
    setDropdownState,
    isNext=false,
    dropdownType=States.dropdownTypes.PRIMARY,
    position='bottom',
    includeSearchBar=false,
    searchValue,
    handleSearch,
    disabled=false,
}) {
    const handleSelect = (item, i) => {
        if(dropdownType === States.dropdownTypes.PRIMARY){
            setPlaceholder(item.name);
            setDropdownState({...dropdownStates.CLOSED});
            setSelected({...selectedStates.SELECTED});
        }
        onSelect(item, i);
    }

    const dropdownStates = States.dropdownStates;
    const selectedStates = States.dropdownSelectedStates;

    const [selected, setSelected] = useState(selectedStates.UNSELECTED);
    const [placeholder, setPlaceholder] = useState(heading);

    const handleDropdownState = (removeSelected) => {
        if(selected.id === selectedStates.SELECTED.id){
            if(dropdownState.id === dropdownStates.OPEN.id){
                setDropdownState({...dropdownStates.CLOSED});
            } else if(dropdownState.id === dropdownStates.CLOSED.id) {
                if(removeSelected){
                    setPlaceholder(heading);
                    setSelected({...selectedStates.UNSELECTED});
                } else {
                    setDropdownState({...dropdownStates.OPEN});
                }
            }
        } else {
            if(dropdownState.id === dropdownStates.OPEN.id){
                setDropdownState({...dropdownStates.CLOSED});
            } else if(dropdownState.id === dropdownStates.CLOSED.id) {
                setDropdownState({...dropdownStates.OPEN});
            }
        }
    }

    const renderDropdownState = (stateId) => {
        return stateId === dropdownState.id;
    }

    const isTop = () => position === 'top';

    useEffect(() => {
        if(selected.id === selectedStates.UNSELECTED.id){
            onUnselect();
        }
    }, [selected]);

  return (
    <div className={`dropdown-${dropdownType} ${(isNext || dropdownState.id === dropdownStates.OPEN.id) ? 'small-wrapper-colored' : ''} ${disabled ? 'disable' : ''}`} ref={dropRef}>
        <div className="dropbtn" style={selected.style || dropdownState.style} onClick={() => handleDropdownState(false)}>
            {placeholder}
            <span className={(isNext || dropdownState.id === dropdownStates.OPEN.id) ? 'small-wrapper-colored' : ''} onClick={(e) => {e.stopPropagation(); handleDropdownState(true)}}><img src={selected.icon || dropdownState.icon} /></span>
        </div>
        {(renderDropdownState(dropdownStates.OPEN.id) && window.innerWidth > 500) && <div className={`dropdown-content ${isTop() ? 'dropdown-content-up' : ''}`}>
            {includeSearchBar && 
            <div className='search-container'>
                <Input
                    placeholder="Search"
                    trailingIcon={searchIcon}
                    type='search'
                    handleInput={handleSearch}
                    value={searchValue}
                />
            </div>}
            {dropList.map((item, i) => (
                <div className='drop-items' key={i} onClick={() => handleSelect(item, i)}>{item.course_types || item.name}</div>
            ))}
            {dropList.length === 0 && 
                Array(3).fill(null).map((it, i) => <Skeleton key={i} variant='text' width='70%' height='2.4rem' sx={{bgcolor: '#303030', margin: '0 2rem'}}/>)}
        </div>}
        {(window.innerWidth <= 500) && 
        <div 
            className={`dropdown-content-mobile`}
            style={renderDropdownState(dropdownStates.OPEN.id) ? {bottom: 0} : {bottom: '-100%'}}
        >
            {includeSearchBar && 
            <div className='search-container'>
                <Input
                    placeholder="Search"
                    trailingIcon={searchIcon}
                    type='search'
                    handleInput={handleSearch}
                    value={searchValue}
                />
            </div>}
            {dropList.map((item, i) => (
                <div className='drop-items' key={i} onClick={() => handleSelect(item, i)}>{item.course_types || item.name}</div>
            ))}
            {dropList.length === 0 && 
                Array(3).fill(null).map((it, i) => <Skeleton key={i} variant='text' width='70%' height='2.4rem' sx={{bgcolor: '#303030', margin: '0 2rem'}}/>)}
        </div>}
        {renderDropdownState(dropdownStates.OPEN.id && window.innerWidth <= 500) && <div className='background-blur' onClick={() => handleDropdownState(false)}></div>}
    </div>
  )
}
