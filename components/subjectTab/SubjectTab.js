import React from 'react';

export default function SubjectTab(props){
    return(
        <>
            {
                props.title.map((item,index)=>{
                    return(
                        <div className='goal-tab' key={index} style={props.selectedCategory === item.title ? {background: "#F7F7F7",borderRadius: 6 }:{ background: "#FFFFFF"}} onClick={()=>props.setSubCategoriesData(item)}>
                        <span className='subject-title-text'>{item.title}</span>
                        </div>
                    )
                })
            }
       </>
       
    )
}