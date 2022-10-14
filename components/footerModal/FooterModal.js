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
import credencAcademy from '../../assets/images/icons/credencAcademy.svg'
import constant from '../../config/constant';
import mailIcon from '../../assets/images/icons/mailIcon.svg'
import mapIcon from '../../assets/images/icons/mapIcon.svg'
import callIcon from '../../assets/images/icons/callIcon.svg'

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
         All rights reserved @Credenc - 2022
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
                <Link href='/privacy' passHref={true}>
                    <a target='_blank' rel="noreferrer" style={{textDecoration:'none'}}>
                        <span className='footer-elemental-content-text'>
                        Privacy Policy
                        </span>
                    </a>
                </Link>
                {/* <span className='footer-elemental-content-text'>
                Contact
                </span>
                <span className='footer-elemental-content-text'>
                List your course
                </span> */}
            </div>
         <div onClick={()=>props.toggleFooterModal()} style={{cursor:"pointer"}}>
            <span className='footer-elemental-content-text' style={{paddingRight: 9}}>Collapse</span>
            <Image src={goUpIcon} style={{transform: "rotate(180deg)"}} />
         </div>
        </div>
        <div className='footer-modal-content'>
       <div className='footerDiv'>
                <div className='socialMediaDiv'>
                    <a href='https://www.credenc.com/' target='_blank' rel="noreferrer" style={{textDecoration:"none"}}>
                    <div style={{width: '100%',display:'flex',flexDirection: 'column',justifyContent:'flex-start',alignItems:"flex-start"}}>
                        <Image src={credencAcademy} width={150} height={50} objectFit='contain' />
                        <span className='powered-by-credenc-text'>Powered by Credenc.com</span>
                    </div>
                    </a>
                    {/* <div className='socialMediaDiv1'><button className='socialMediaDiv1Button'>A product by Credenc</button></div> */}
                    <div className='socialMediaDiv2'>
                     With Credenc Academy, you don&apos;t just compare Courses. You understand it. Narrow down choices. Avoid pitfalls and make better decisions.
                     </div>
                     <div style={{cursor:"pointer"}}>
                        <a href='https://www.facebook.com/CredencIndia/' target='_blank'  rel="noreferrer">
                            <Image src={FacebookLogo} objectFit="cover" />
                        </a>
                        <a href='https://www.instagram.com/credenc.india/' target='_blank'  rel="noreferrer">
                            <Image src={InstagramLogo} objectFit="cover" />
                        </a>
                        <a href='https://twitter.com/CredencIndia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' target='_blank'  rel="noreferrer">
                            <Image src={TwitterLogo} objectFit="cover" />
                        </a>
                        <a href='https://in.linkedin.com/company/credenc' target='_blank'  rel="noreferrer">
                            <Image src={LinkedlnLogo} objectFit="cover" />
                        </a>
                     </div>
                </div>

            <div className='programAndSubjectDiv' style={{cursor: 'pointer'}}>
                <div className='programDiv'>
                     <p className='paraHeading'>Program Type</p>
                     <a href={`${constant.BASE_URL.DEV}&course_type=Certificate`} className='removeLine'>
                    <p className='para'>Certificate</p>
                    </a>
                    <a href={`${constant.BASE_URL.DEV}&course_type=Diploma`} className='removeLine'>
                    <p className='para'>Diploma</p>
                    </a>
                    <a href={`${constant.BASE_URL.DEV}&course_type=Degree`} className='removeLine'>
                    <p className='para'>Degree</p>
                    </a>
                    <a href={`${constant.BASE_URL.DEV}&course_type=Job%20Assured`} className='removeLine'>
                    <p className='para'>Job assured</p>
                    </a>
                    {/* <a href={`${constant.BASE_URL.DEV}&course_type=Certificate`} className='removeLine'>
                    <p className='para'>Other</p>
                    </a> */}
                </div>

                <div className='subjectDiv' style={{marginRight: '16%'}}>
                    <p className='paraHeading'>Domain</p>
                        <a href={`${constant.BASE_URL.DEV}&domain=Technology`} className='removeLine'>
                             <p className='para'>Technology</p>
                        </a>
                        <a href={`${constant.BASE_URL.DEV}&domain=Marketing`} className='removeLine'>
                            <p className='para'>Marketing</p>
                        </a>
                        <a href={`${constant.BASE_URL.DEV}&domain=Design`} className='removeLine'>
                            <p className='para'>Design</p>
                        </a>
                        <a href={`${constant.BASE_URL.DEV}&domain=Business`} className='removeLine'>
                            <p className='para'>Business</p>
                        </a>
                        <a href={`${constant.BASE_URL.DEV}&domain=Others`} className='removeLine'>
                            <p className='para'>Others</p>
                        </a>
                </div>

                <div className='contactDiv'>
                    <p className='paraHeading'>Contact</p>
                    <div className='iconContent'>
                      <Image src={mailIcon} height={21} width={21} objectFit='contain' />
                      <span className='iconText' style={{marginLeft: 5}}>care@redenc.com</span>
                    </div>
                    <div className='iconContent' style={{marginTop: 10}}>
                      <Image src={callIcon} height={21} width={21} objectFit='contain' />
                      <span className='iconText' style={{marginLeft: 5}}>180 0121 0057</span>
                    </div>
                    <div className='iconContent' style={{marginTop: 10}}>
                      <Image src={mapIcon} height={21} width={21} objectFit='contain' />
                      <span className='iconText' style={{marginLeft: 5}}>3rd floor, Tower B, DLF Building No. 8, DLF Cyber City, Gurugram</span>
                    </div>
                </div>
            </div>
        </div>
                <div className='disclaimertext'>
                Disclaimer: The information provided on our site and mobile application (collectively referred to as the “Platform”) is for general informational purposes only. The Platform may contain links to other websites or content belonging to or originating from third parties. Such links are not investigated, monitored, or checked for accuracy, validity, and reliability by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through our Platform. Your use of the Platform is solely at your own risk and we under no circumstance shall have any liability whatsoever with respect to any information provided on our Platform. We strongly advise you to read all the terms and conditions and/or other related policies of the third-party websites linked through our Platform.
                </div>
            </div>
            
       
        {/* <div className='footer-modal-footer'>
            <span className='footer-rights-text'>
            Credenc©2022. All Rights Reserved.
            </span>
            <span className='footer-rights-text'>
            CIN Number: U74999DL2017PTC319926
            </span>
        </div> */}
        </div>
       </div>
    )
}