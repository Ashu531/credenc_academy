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
                                {background: "#ffffff",borderRadius: 6,color: '#b100cd',border:'1px solid #b100cd'}
                                :
                                {background: "#b100cd",borderRadius: 6,color:'#ffffff'}
                            
                        } 
                            onMouseEnter={()=>setSubjectHover(item)}
                            onMouseLeave={()=>setSubjectHover(null)}
                            onClick={()=>_subjectAction(item)}
                        >
                            <span className='subject-title-text' style={subjectHover === item || props?.selectedCategory === item.name  ? {color: '#b100cd'} : {color: '#ffffff'}}>{item.name}</span>
                        </div>
                    )
                })
            }
       </>
       
    )
}