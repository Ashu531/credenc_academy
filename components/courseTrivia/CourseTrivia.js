import React, { useEffect, useState } from 'react';
import { Select} from 'antd';
import whiteCaret from '../../assets/images/icons/whiteCaret.svg';
import Image from "next/image";

export default function CourseTrivia(props){

    const [courseType,setCourseType] = useState([]);
    const [subject,setSubject] = useState([]);
    const [selectedCourseType,setSelectedCourseType] = useState('')
    const [selectedSubject,setSelectedSubject] = useState('')

    const handleCourseTypeChange=(value)=>{
        setSelectedCourseType(value)
    }

    const handleSubjectChange=(value)=>{
        setSelectedSubject(value)
    }

    const handleSubmit = () =>{
        let data = {
            courseType : selectedCourseType,
            subject: selectedSubject
        }

        props?.handleTrivia(data);
    }
  
    return(
        <div className='trivia-container'> 
            <div className='trivia-header'>
                Too many options? Let us help!
            </div>
            <div className='trivia-content'>
                <div className='trivia-section'>
                    <div className='trivia-label'>
                        I'm Looking for a...
                    </div>
                    <div>
                    <Select
                        // value={selectedCourseType}
                        style={{ 
                            width: 240,
                            marginLeft: 10
                            // height: 47,
                            // background: '#FFFFFF',
                            // border: '1px solid #CBCBCB',
                            // borderRadius: 32,
                        }}
                        onChange={handleCourseTypeChange}
                        allowClear
                        placeholder='Select Course Type'
                        options={[
                            { value: 'All', label: 'All' },
                            { value: 'Certificate', label: 'Certificate' },
                            { value: 'Diploma', label: 'Diploma' },
                            { value: 'Degree', label: 'Degree' },
                            { value: 'Job Assured', label: 'Job Assured' },
                            // { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                    </div>
                </div>
                <div className='trivia-section'>
                    <div className='trivia-label'>
                        In the field of......
                    </div>
                    <Select
                        // value={selectedSubject}
                        style={{ 
                            width: 240,
                            marginLeft: 10
                            // height: 47,
                            // background: '#FFFFFF',
                            // border: '1px solid #CBCBCB',
                            // borderRadius: 32,
                        }}
                        onChange={handleSubjectChange}
                        allowClear
                        placeholder='Select Subject'
                        options={[
                            { value: 'Technology', label: 'Technology' },
                            { value: 'Marketing', label: 'Marketing' },
                            { value: 'Design', label: 'Design' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Others', label: 'Others' },
                            // { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                </div>
                <div className='trivia-button' onClick={handleSubmit}>
                    <Image src={whiteCaret} alt='whiteCaret' height={14} width={14} objectFit="contain" style={{transform: 'rotate(180deg)'}} />
                </div>
            </div>
        </div>
    )
}