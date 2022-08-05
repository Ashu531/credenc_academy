import React, { useEffect, useState } from 'react';

export default function CustomDropdownModal(props){
    return(
        <div className='custom-dropdown-modal'>
            {
                props?.subjectItems.map((item,index)=>{
                    <div className="modal-content" key={index}>
                       <span className="subject-text">
                        {item}
                       </span>
                    </div>
                })
            }
           
        </div>
    )
}