import React,{useState} from 'react';
import constant from '../../config/constant';

export default function SubjectTab(props){

    const [subjectHover,setSubjectHover] = useState(null)

    const _subjectAction=(item)=>{
        props.setSubCategoriesData(item)
    }

    return(
        <>
            {
                props?.title?.map((item,index)=>{
                    return(
                        <div className='goal-tab' 
                            key={index} 
                            style={
                                props?.selectedCategory === item.value || subjectHover === item
                                ? 
                                {background: "#F7F7F7",borderRadius: 6,color:'#000000'}
                                :
                                {background: "#ffffff",borderRadius: 6,color: '#717171'}
                            
                        } 
                            onMouseEnter={()=>setSubjectHover(item)}
                            onMouseLeave={()=>setSubjectHover(null)}
                            onClick={()=>_subjectAction(item)}
                        >
                            <span className='subject-title-text' style={subjectHover === item || props?.selectedCategory === item.value  ? {color: '#000000'} : {color: '#717171'}}>{item.value}</span>
                        </div>
                    )
                })
            }
       </>
       
    )
}