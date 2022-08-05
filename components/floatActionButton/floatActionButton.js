import React, { useState,useEffect } from 'react'
import States from '../../config/states';
import sortingIcon from '../../assets/images/icons/sorting-icon.svg';
import { Skeleton } from '@mui/material';
import Image from "next/image";

export default function FloatActionButton({
    type = 'course type',
    heading = 'Pick one',
    floatList = [],
    onSelect,
    floatType = States.floatTypes.SECONDARY,
    style = {},
    icon,
    selected = 0,
    activeState = true
}) {

    

    const [displayContent, setDisplayContent] = useState(false);

    useEffect(()=>{
      if(type === 'subject type'){
        setDisplayContent(true)
      }
    },[])

    const checkIfActive = (id1, id2) => {
        if (id1 === id2 && activeState) return true;
        return false;
    }

    const handleSelect = (item, i) => {
        onSelect(item, i);
        setDisplayContent(false);
    }

    if (type === 'course type') {
        return (
            <>
                <div className={`float-action-${floatType}`}>
                    {(!icon && !displayContent) && <div className="dropbtn" style={style} onClick={() => setDisplayContent(true)}>
                        {selected === 0 ? heading : (floatList[selected].name || floatList[selected].value)}
                        <span className='caret'>{'<'}</span>
                    </div>}
                    {icon && <Image src={icon} objectFit="cover" />}
                    {displayContent && <div className='content-wrapper'>
                        {floatList.map((item, i) => (
                            <div key={item.id} className='drop-item' onClick={() => { setDisplayContent(false); onSelect(item, i); }}>
                                <span className={checkIfActive(floatList[selected].id, (item.id)) ? 'selected-text' : 'faded-text'}>{item.name || item.value} </span>
                                {checkIfActive(floatList[selected].id, (item.id)) && <span className='check'>L</span>}
                            </div>
                        ))}
                    </div>}
                </div>
                {displayContent && <div onClick={() => setDisplayContent(false)} className='blur'></div>}
            </>
        )
    }

    if (type === 'sort type') {
        return <>
            <div className={`float-sort-action-${floatType}`}>
                <span onClick={() => setDisplayContent(true)} className='sort'><Image src={sortingIcon} alt='Sorting' objectFit='cover' /></span>
                {(window.innerWidth <= 500) &&
                    <div
                        className={`dropdown-content-mobile`}
                        style={displayContent ? { bottom: 0, } : { bottom: '-100%', }}
                    >
                        <span className='bottom-sheet-holder'><span></span></span>
                        {floatList.map((item, i) => (
                            <>
                                <div className={`drop-items ${checkIfActive(floatList[selected].id, (item.id)) ? 'green-text' : ''}`} key={i} onClick={() => handleSelect(item, i)}>
                                    {item.course_types || item.name}
                                    {checkIfActive(floatList[selected].id, (item.id)) && <span className={`applied-container ${checkIfActive(floatList[selected].id, (item.id)) && 'applied'}`}></span>}
                                </div>
                            </>
                        ))}
                        {floatList.length === 0 &&
                            Array(3).fill(null).map((it, i) => <Skeleton key={i} variant='text' width='70%' height='2.4rem' sx={{ bgcolor: '#303030', margin: '0 2rem' }} />)}
                    </div>}
            </div>
            {displayContent && <div onClick={() => setDisplayContent(false)} className='blur'></div>}
        </>
    }
    if (type === 'subject type') {
        return <>
            <div className={`float-sort-action-${floatType}`}>
                {(window.innerWidth <= 500) &&
                    <div
                        className={`dropdown-content-mobile`}
                        style={displayContent ? { bottom: 0,zIndex:9999 } : { bottom: '-100%', }}
                    >
                        <span className='bottom-sheet-holder'><span></span></span>
                        {floatList.map((item, i) => (
                            <>
                                <div className={`drop-items`} key={i} onClick={() => handleSelect(item, i)}>
                                    {item?.name}
                                </div>
                            </>
                        ))}
                        {floatList.length === 0 &&
                            Array(3).fill(null).map((it, i) => <Skeleton key={i} variant='text' width='70%' height='2.4rem' sx={{ bgcolor: '#303030', margin: '0 2rem' }} />)}
                    </div>}
            </div>
            {displayContent && <div onClick={() => setDisplayContent(false)} className='blur'></div>}
        </>
    }
}