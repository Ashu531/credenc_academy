import React, { useEffect, useRef, useState } from 'react';
import States from '../../config/states';
import caretDownIcon from '../../assets/images/icons/caret-down-grey.svg';
import { Skeleton } from '@mui/material';
import Image from "next/image";

export default function SecondaryDropdown({
    heading='Pick one',
    dropList=[],
    onSelect,
    dropdownType=States.dropdownTypes.SECONDARY,
    style={},
    classes={wrapper: '', content: ''},
    icon,
    selected=0,
    activeState=true
}) {

    const getWrapperClasses = () => {
        return `content-wrapper ${classes.wrapper || ''}`;
    }

    const getContentClasses = () => {
        return `dropdown-content ${classes.content || ''}`;
    }

    const checkIfActive = (id1, id2) => {
        if (id1 === id2 && activeState) return true;
        return false;
    }

  return (
    <div className={`dropdown-${dropdownType}`}>
        {!icon && <div className="dropbtn" style={style}>
            {selected === 0 ? heading : (dropList[selected].label || dropList[selected].value)}
            <span><Image src={caretDownIcon} objectFit="cover" /></span>
        </div>}
        {icon && <Image src={icon}/>}
        <div className={getWrapperClasses()}>
                <div 
                className=
                {`${getContentClasses()} border-gradient`}>
                  {dropList.map((item, i) => (
                    <div key={item.id} className='drop-item' onClick={() => onSelect(item, i)}>
                        <span className={checkIfActive(dropList[selected].id, (item.id)) ? 'green-text' : ''}>{item.name || item.value} </span>
                        <div>
                            <span className={checkIfActive(dropList[selected].id, (item.id)) ? 'green-text' : ''}>{item?.count}</span>
                            <span className={`applied-container ${checkIfActive(dropList[selected].id, (item.id)) && 'applied'}`}></span>
                        </div>
                    </div>
                ))}
                {dropList.length === 0 && 
                    Array(5).fill(null).map((it, i) => <Skeleton key={`dummy${i}`} variant='text' width='70%' height='2.4rem' sx={{bgcolor: '#303030', margin: '0 2rem'}}/>)
                }
                  </div>
        </div>
    </div>
  )
}

