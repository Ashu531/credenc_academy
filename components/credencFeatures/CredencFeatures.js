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
                    Discover the Future of Learning
                    </h2>
                    <p className='content'>
                    Unlock the full potential of edtech with Credenc Academy&apos;s curated platform, where top resources are handpicked to accelerate your learning journey and empower your growth.
                    </p>
                </div>
          </div>
          <div className="section-content">
                <Image src={paperPlaneImage} alt="bricksImage" width={148} height={100} objectFit="contain" />
                <div className="text-section">
                    <h2 className='header'>
                    All Your Learning Needs in One Place
                    </h2>
                    <p className='content'>
                    Dive into our extensive range of online courses, innovative learning tools, expert educational services, and a rich resource library that will keep you engaged, inspired, and connected.
                    </p>
                </div>
          </div>
          <div className="section-content">
                <Image src={globeImage} alt="bricksImage" width={148} height={100} objectFit="contain" />
                <div className="text-section">
                    <h2 className='header'>
                    Experience a Personalized and Collaborative Platform
                    </h2>
                    <p className='content'>
                    Embrace the seamless Credenc Academy experience with curated content tailored to your preferences, an intuitive interface, and a vibrant community where collaboration fuels success.
                    </p>
                </div>
          </div>
        </div>
    )
}