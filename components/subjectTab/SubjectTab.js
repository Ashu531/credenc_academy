import React from 'react';

export default function SubjectTab(props){
  
    return(
        <div className='goal-tab'>
            {
                props.title.map(item=>{
                    return(
                        <span className='subject-title-text'>{item}</span>
                    )
                })
            }
       
        </div>
    )
}