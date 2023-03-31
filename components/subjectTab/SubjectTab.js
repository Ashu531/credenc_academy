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
                                props?.selectedCategory === item.name || subjectHover === item
                                ? 
                                {background: "#b100cd",borderRadius: 6,color:'#ffffff'}
                                :
                                {background: "#ffffff",borderRadius: 6,color: '#b100cd',border:'1px solid #b100cd'}
                            
                        } 
                            onMouseEnter={()=>setSubjectHover(item)}
                            onMouseLeave={()=>setSubjectHover(null)}
                            onClick={()=>_subjectAction(item)}
                        >
                            <span className='subject-title-text' style={subjectHover === item || props?.selectedCategory === item.name  ? {color: '#ffffff'} : {color: '#b100cd'}}>{item.name}</span>
                        </div>
                    )
                })
            }
       </>
       
    )
}