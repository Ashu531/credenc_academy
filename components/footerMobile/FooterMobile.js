import React, { useEffect, useRef, useState } from 'react';
import projectorIcon from '../../assets/images/icons/projector.svg';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg';
import loginIcon from '../../assets/images/icons/login.svg';
import homeIcon from '../../assets/images/icons/home.svg';
import Image from "next/image";

export default function FooterMobile(){
  
    return(
        <div className='mobile-footer'>
        <div className='mobile-footer-container'>
        <div className='mobile-footer-element'>
        <Image src={homeIcon} objectFit="contain"/>
        <span className='mobile-footer-text'>
            Home
        </span>
        </div>
        <div className='mobile-footer-element'>
        <Image src={projectorIcon} objectFit="contain"/>
        <span className='mobile-footer-text'>
            Compare
        </span>
        </div>
        <div className='mobile-footer-element'>
        <Image src={bookmarkIcon} objectFit="contain"/>
        <span className='mobile-footer-text'>
            Bookmark
        </span>
        </div>
        <div className='mobile-footer-element'>
        <Image src={loginIcon} objectFit="contain"/>
        <span className='mobile-footer-text'>
            Login
        </span>
        </div>
        </div>
        </div>
    )
}