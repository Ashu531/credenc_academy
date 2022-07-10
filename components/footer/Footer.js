import React, { useEffect, useRef, useState } from 'react';
import goUpIcon from '../../assets/images/icons/caret-up-grey.svg'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Footer(props){

    const router = useRouter();

    const _openPrivacyPolicy=()=>{
        router.push('/privacy');
    }

    return(
        <div className='footer'>
            <div style={{paddingLeft: 23}}>
            <h1 className='footer-credence-text'>
         {props.title}
          </h1>
            </div>

            <div className='footer-elemental-content'>
                <Link href="https://www.credenc.com/" >
                <a className='footer-elemental-content-text' target="_blank">
                About
                </a>
                </Link>
                {/* <span className='footer-elemental-content-text'>
                Sitemap
                </span> */}
                <span className='footer-elemental-content-text' onClick={()=>_openPrivacyPolicy()}>
                Privacy Policy
                </span>
                <span className='footer-elemental-content-text'>
                Contact
                </span>
                <span className='footer-elemental-content-text'>
                List your course
                </span>
            </div>
       
        <div className='footer-disclaimer' onClick={()=>props.toggleFooterModal()}>
        <span className='footer-disclaimer-text'>
        Disclaimer
        </span>
        <Image src={goUpIcon} objectFit="cover" alt='goUpIcon'/>
        </div>
        </div>
    )
}