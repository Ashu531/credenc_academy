import React from 'react';

export default function SubjectTab(props){
    return(
        <>
            {
                props.title.map(item=>{
                    return(
                        <div className='goal-tab' style={props.selectedCategory === item ? {background: "#F7F7F7",borderRadius: 6 }:{ background: "#FFFFFF"}} onClick={()=>props.setSubCategoriesData(item)}>
                        <span className='subject-title-text'>{item}</span>
                        </div>
                    )
                })
            }
       </>
       
    )
}