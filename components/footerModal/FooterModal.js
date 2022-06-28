import React, { useEffect, useRef, useState } from 'react';


export default function FooterModal(props){
  
    return(
       <div className='footer-modal'>
        <span style={{padding: 50,cursor:'pointer'}} onClick={()=>props.toggleFooterModal()}>Close</span>
       </div>
    )
}