import React, { useEffect, useRef, useState } from 'react';
import goUpIcon from '../../assets/images/icons/caret-up-grey.svg'
import Image from "next/image";

export default function FooterMobile(){
  
    return(
        <div className='footer'>
            <div style={{paddingLeft: 23}}>
            <h1 className='footer-credence-text'>
         ©Credenc2022
          </h1>
            </div>

            <div className='footer-elemental-content'>
                <span className='footer-elemental-content-text'>
                About
                </span>
                <span className='footer-elemental-content-text'>
                Sitemap
                </span>
                <span className='footer-elemental-content-text'>
                Privacy Policy
                </span>
                <span className='footer-elemental-content-text'>
                Contact
                </span>
                <span className='footer-elemental-content-text'>
                List your course
                </span>
            </div>
       
        <div className='footer-disclaimer'>
        <span className='footer-disclaimer-text'>
        Disclaimer
        </span>
        <Image src={goUpIcon} objectFit="cover" />
        </div>
        </div>
    )
}