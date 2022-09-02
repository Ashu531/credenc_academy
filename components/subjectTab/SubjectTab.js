import React from 'react';

export default function SubjectTab(props){
    return(
        <>
            {
                props.title.map((item,index)=>{
                    return(
                        <div className='goal-tab' 
                        key={index} 
                        style={
                            props.theme === 'light' ? 
                            props.selectedCategory.name === item.name 
                            ? 
                            {background: "#F7F7F7",borderRadius: 6 }
                            :
                            { background: "#FFFFFF",borderRadius: 6}
                            :
                            props.selectedCategory === item.name 
                            ? 
                            {background: "#141414",borderRadius: 6 }
                            :
                            { background: "#0A0A0A",borderRadius: 6}
                        } 

                        onClick={()=>props.setSubCategoriesData(item)}
                        >
                        <span className='subject-title-text'>{item.name}</span>
                        </div>
                    )
                })
            }
       </>
       
    )
}