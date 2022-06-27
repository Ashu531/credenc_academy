import React from 'react';

export default function SubjectDropdown(props){
    return(
        <div className='subject-dropdown-container'>
            {props?.categories.map((item,index)=>{
                return (
                    <div className='subject-tab-element' key={index}>
                    <div className='subject-element' onClick={()=>props.selectSubject(item)}>
                    <div className='subject-element-start'>
                        {/* <Image /> */}
                        <h1 className='subject-element-title' style={props?.selectedSubject?.id === item?.id ? {color:"#5FAE3A" } : {color: "#222222"}}> {item?.name}</h1>
                    </div>
                    <div className='subject-element-count'>
                     {item?.count}
                    </div>    
                     </div>  
                     </div> 
                )
            })}
        </div>
    )
}