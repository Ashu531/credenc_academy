import React, { useEffect, useState } from 'react';
// import { Select} from 'antd';
import whiteCaret from '../../assets/images/icons/whiteCaret.svg';
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import constant from '../../config/constant'

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    menuPaper: {
      maxHeight: '30% !important'
    }
  }));

export default function CourseTrivia(props){

    const classes = useStyles();

    const [courseType,setCourseType] = useState([
        { value: 'All', label: 'All' },
        { value: 'Certificate', label: 'Certificate' },
        { value: 'Diploma', label: 'Diploma' },
        { value: 'Degree', label: 'Degree' },
        { value: 'Job Assured', label: 'Job Assured' },
        // { value: 'disabled', label: 'Disabled', disabled: true },
    ]);
    const [subject,setSubject] = useState([]);
    const [selectedCourseType,setSelectedCourseType] = useState('')
    const [selectedSubject,setSelectedSubject] = useState('')

    useEffect(()=>{
        _getSubjectData()
      },[])

    const _getSubjectData=async()=>{
        let res = await axios.get(`${constant.API_URL.DEV}/subsubject/search/`)
        .then(res => {
            setSubject(res?.data?.data);
          res.data
        })
        .catch(err => {
            console.log(err);
        })
        return res;
    }

    const handleCourseTypeChange=(data)=>{
        let key = data.target.value
        setSelectedCourseType(key)
    }

    const handleSubjectChange=(data)=>{
        let key = data.target.value
        setSelectedSubject(key)
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
                        I&apos;m Looking for a...
                    </div>
                    <div>
                    <FormControl fullWidth style={{
                        width: 180,
                        marginLeft: 20,
                        // background: '#034FE2',
                        borderRadius: 32,
                        }}>
                        <InputLabel style={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: 12,
                            marginTop: -5,
                            // color: '#FFFFFF',
                        }}>Select a Course Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder='Subject'
                            label="Subject"
                            style={{borderRadius: 32,height: 40}}
                            onChange={handleCourseTypeChange}
                        >
                            {
                            courseType && courseType?.length > 0 && courseType.map((item,index)=>{
                                return(
                                <MenuItem value={item.value} key={index}>{item.value}</MenuItem>
                                )
                            })
                            }
                
                        </Select>
                     </FormControl>
                    </div>
                </div>
                <div className='trivia-section'>
                    <div className='trivia-label'>
                        In the field of...
                    </div>
                    <FormControl fullWidth style={{
                        width: 180,
                        marginLeft: 20,
                        // background: '#034FE2',
                        borderRadius: 32,
                        height: 40
                        }}>
                        <InputLabel style={{
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: 12,
                            marginTop: -5,
                            // color: '#FFFFFF',
                        }}>Select a Subject</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder='Subject'
                            label="Subject"
                            style={{borderRadius: 32,height: 40}}
                            onChange={handleSubjectChange}
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                            {
                            subject && subject?.length > 0 && subject.map((item,index)=>{
                                return(
                                <MenuItem value={item.value} key={index}>{item.value}</MenuItem>
                                )
                            })
                            }
                
                        </Select>
                     </FormControl>
                </div>
                <div className='trivia-button' onClick={handleSubmit}>
                    <Image src={whiteCaret} alt='whiteCaret' height={14} width={14} objectFit="contain" style={{transform: 'rotate(180deg)'}} />
                </div>
            </div>
        </div>
    )
}