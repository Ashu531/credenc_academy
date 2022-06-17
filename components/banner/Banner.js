import React, { useEffect, useRef, useState } from 'react';
// import projectorIcon from '../../assets/images/icons/projectorIcon.png';
import bookmarkIcon from '../../assets/images/icons/bookmark.svg'
import projectorIcon from '../../assets/images/icons/projector.svg';
import credencLogo from '../../assets/images/logo/credencLogo.svg'

export default function Banner(){
  
    return(
        <div className='banner'>
        <div className='text-content'>
        <h1 className='heading'>Be the next you!</h1>
        <h2 className='sub-header'>Find your course from 20,000 hand picked courses</h2>
        </div>
        </div>
    )
}