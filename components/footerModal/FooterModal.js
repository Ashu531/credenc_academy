import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../components/footer/Footer'
import FacebookLogo from '../../assets/images/icons/FacebookLogo.svg';
import InstagramLogo from '../../assets/images/icons/InstagramLogo.svg';
import TwitterLogo from '../../assets/images/icons/TwitterLogo.svg';
import LinkedlnLogo from '../../assets/images/icons/LinkedinLogo.svg';
import Image from "next/image";
import goUpIcon from '../../assets/images/icons/caret-up-grey.svg'
import Link from "next/link";
import { useRouter } from 'next/router'

export default function FooterModal(props){
    const router = useRouter();

    const _openPrivacyPolicy=()=>{
        router.push('/privacy');
    }


    return(
       <div className='footer-modal'>
        <div className='footer-modal-section'>
        <div className='footer-modal-header'>
         <span className='footer-elemental-content-text'>
         SkillRush2022
         </span>
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
         <div onClick={()=>props.toggleFooterModal()} style={{cursor:"pointer"}}>
            <span className='footer-elemental-content-text' style={{paddingRight: 9}}>Collapse</span>
            <Image src={goUpIcon} style={{transform: "rotate(180deg)"}} />
         </div>
        </div>
        <div className='footer-modal-content'>
       <div className='footerDiv'>
                <div className='socialMediaDiv'>
                    <div className='socialMediaDiv1'><button className='socialMediaDiv1Button'>A product by Credenc</button></div>
                    <div className='socialMediaDiv2'>With SkillRush, you don't just compare Courses. You understand it. Narrow down choices. 
                     Avoid pitfalls and make better decisions
                     </div>
                     <div>
                        <Image src={FacebookLogo} objectFit="cover" />
                        <Image src={InstagramLogo} objectFit="cover" />
                        <Image src={TwitterLogo} objectFit="cover" />
                        <Image src={LinkedlnLogo} objectFit="cover" />
                     </div>
                </div>

            <div className='programAndSubjectDiv'>
                <div className='programDiv'>
                    <p className='paraHeading'>Program Type</p>
                    <p className='para'>Certificate</p>
                    <p className='para'>Diploma</p>
                    <p className='para'>Degree</p>
                    <p className='para'>Job assured</p>
                    <p className='para'>Other</p>
                </div>

                <div className='subjectDiv'>
                    <p className='paraHeading'>Subject</p>
                    <p className='para'>Technology</p>
                    <p className='para'>Marketing</p>
                    <p className='para'>Design</p>
                    <p className='para'>Buisness</p>
                    <p className='para'>Other</p>
                </div>
            </div>
            </div>
                <div className='disclaimertext'>
                Disclaimer : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, nulla pharetra tortor nunc. Velit et magna odio nibh eget volutpat tempus. Tincidunt interdum arcu nisi turpis. Mi, volutpat sapien mollis placerat sagittis vel nisl, amet tempus. Auctor dolor nulla bibendum massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, nulla pharetra tortor nunc. Velit et magna odio nibh eget volutpat tempus. Tincidunt interdum arcu nisi turpis. Mi, volutpat sapien mollis placerat sagittis vel nisl, amet tempus. Auctor dolor nulla bibendum massa.
                </div>
            </div>
            
       
        <div className='footer-modal-footer'>
            <span className='footer-rights-text'>
            Credenc©2022. All Rights Reserved.
            </span>
            <span className='footer-rights-text'>
            CIN Number: U74999DL2017PTC319926
            </span>
        </div>
        </div>
       </div>
    )
}