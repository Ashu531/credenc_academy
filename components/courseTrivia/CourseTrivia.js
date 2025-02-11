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
      maxHeight: '30% !important',
      fontFamily: 'Work Sans !important',
      fontSize: 12
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
    const [specialisation,setSpecialisation] = useState([])
    const [selectedSpecialisation,setSelectedSpecialisation] = useState('')

    useEffect(()=>{
        _getSubjectData()
      },[])

    const _getSubjectData=async()=>{
        let res = await axios.get(`${constant.API_URL.DEV}/subject/search/`)
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
        // _getSpecialisation()
    }

    const handleSpecialisationChange=(data)=>{
        let key = data.target.value
        setSelectedSpecialisation(key)
    }

    const handleSubjectDropdown=(id)=>{
        _getSpecialisation(id)
    }

    const _getSpecialisation=async(id)=>{
        let res = await axios.get(`${constant.API_URL.DEV}/subsubject/search/?domain=${id}`, {
            headers: {
                'key': 'credenc'
            }
        })
        .then(res => {
            setSpecialisation(res?.data?.data);
          res.data
        })
        .catch(err => {
            console.log(err);
        })
        return res;
    }

    const handleSubmit = () =>{
        let data = {
            course_type : selectedCourseType,
            domain: selectedSubject,
            subject: selectedSpecialisation
        }
        if(selectedCourseType || selectedSubject){
            props?.handleTrivia(data);
        }
        
    }
  
    return(
        <div className='trivia-container'>
            <div className='trivia-header'>
                <div>
                    Too many options?
                </div>
                <div>
                    Let us help!
                </div>
            </div>
            <div className='trivia-content'>
                <div className='trivia-section'>
                    <div className='trivia-label'>
                        You&apos;re Looking for a...
                    </div>
                    <div>
                    <FormControl fullWidth style={{
                        width: 180,
                        marginLeft: 20,
                        // background: '#034FE2',
                        borderRadius: 32,
                        }}>
                        <InputLabel style={{
                            fontFamily: 'Work Sans',
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
                            fontFamily: 'Work Sans',
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
                                    <MenuItem value={item.name} key={index} onClick={()=>handleSubjectDropdown(item.id)}>{item.name}</MenuItem>
                                )
                            })
                            }
                
                        </Select>
                     </FormControl>
                     
                </div>
                <div className='trivia-section'>
                    <div className='trivia-label'>
                        Specialising in...
                    </div>
                    
                    <FormControl fullWidth style={{
                        width: 180,
                        marginLeft: 20,
                        // background: '#034FE2',
                        borderRadius: 32,
                        height: 40
                        }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder='Subject'
                            label="Subject"
                            style={{borderRadius: 32,height: 40}}
                            onChange={handleSpecialisationChange}
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                            {
                            specialisation && specialisation?.length > 0 && specialisation.map((item,index)=>{
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