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
        <div className='footer' style={props.filterExpandedStage ? {position: 'absolute',bottom: '-5.8rem'} : null}>
            <div style={{paddingLeft: 23}}>
            <h1 className='footer-credence-text'>
                {props.title}
            </h1>
            </div>

            <div className='footer-elemental-content'>
                <a href="https://www.credenc.com/" className='footer-elemental-content-text' target="_blank" rel="noreferrer">
                About
                </a>
                {/* <span className='footer-elemental-content-text'>
                Sitemap
                </span> */}
                <Link href='/privacy' passHref={true}>
                <a target='_blank' rel="noreferrer" style={{textDecoration:'none'}}>
                <span className='footer-elemental-content-text'>
                Privacy Policy
                </span>
                </a>
                </Link>
                <span className='footer-elemental-content-text'>
                Contact
                </span>
                <span className='footer-elemental-content-text'>
                List your course
                </span>
            </div>
       
        <div className='footer-disclaimer' onClick={()=>props.toggleFooterModal()}>
            <span className='footer-disclaimer-text'>
                Expand
            </span>
            <Image src={goUpIcon} objectFit="cover" alt='goUpIcon'/>
        </div>
        </div>
    )
}