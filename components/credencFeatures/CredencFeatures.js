import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import bricksImage from '../../assets/images/icons/bricksImage.svg'
import paperPlaneImage from '../../assets/images/icons/paperPlaneImage.svg';
import globeImage from '../../assets/images/icons/globeImage.svg';

export default function CredencFeatures(){
  
    return(
        <div className='feature-container'>
          <div className="section-content">
                <Image src={bricksImage} alt="bricksImage" width={148} height={100} objectFit="contain" />
                <div className="text-section">
                    <h2 className='header'>
                      Product design from scratch with to mentors
                    </h2>
                    <p className='content'>
                      From online courses to digital downloads and beyond, this is where creative entrepreneurs. Use this template to describe the culture at your company, and to post open positions.
                    </p>
                </div>
          </div>
          <div className="section-content">
                <Image src={paperPlaneImage} alt="bricksImage" width={148} height={100} objectFit="contain" />
                <div className="text-section">
                    <h2 className='header'>
                      Product design from scratch with to mentors
                    </h2>
                    <p className='content'>
                      From online courses to digital downloads and beyond, this is where creative entrepreneurs. Use this template to describe the culture at your company, and to post open positions.
                    </p>
                </div>
          </div>
          <div className="section-content">
                <Image src={globeImage} alt="bricksImage" width={148} height={100} objectFit="contain" />
                <div className="text-section">
                    <h2 className='header'>
                      Product design from scratch with to mentors
                    </h2>
                    <p className='content'>
                      From online courses to digital downloads and beyond, this is where creative entrepreneurs. Use this template to describe the culture at your company, and to post open positions.
                    </p>
                </div>
          </div>
        </div>
    )
}