import React from 'react';

export default function SubjectDropdown(props){
  
    return(
        <div className='subject-dropdown-container'>
            {props.categories.map(item=>{
                return (
                    <div className='subject-element'>
                    <div className='subject-element-start'>
                        {/* <Image /> */}
                        <h1 className='subject-element-title'> {item.title}</h1>
                    </div>
                    <div className='subject-element-count'>
                     {item.count}
                    </div>    
                     </div>   
                )
            })}
        </div>
    )
}