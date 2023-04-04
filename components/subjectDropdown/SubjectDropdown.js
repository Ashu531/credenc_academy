import React from 'react';

export default function SubjectDropdown(props){
    return(
        <div className='subject-dropdown-container'>
            {props?.categories.map((item,index)=>{
                return (
                    <div className='subject-tab-element' key={index}>
                        <div className='subject-tab-element-content'>

                    <div className='subject-element' onClick={()=>props.selectSubject(item)}>
                    <div className='subject-element-start'>
                        {/* <Image /> */}
                        <h1 className='subject-element-title' style={props?.selectedSubject?.value === item?.value ? {color:"#5FAE3A" } : {color: "#222222"}}> {item?.value}</h1>
                    </div>
                    {/* <div className='subject-element-count'>
                     {item?.count}
                    </div>     */}
                     </div>  
                     {
                        props?.selectedSubject?.value === item?.value ?  
                        <div className='subject-element-dot-content' > 
                        <div className='subject-element-dot' />
                        </div>
                        : <div className='subject-white-element' />
                     }
                    
                         </div>
                     </div> 
                )
            })}
        </div>
    )
}