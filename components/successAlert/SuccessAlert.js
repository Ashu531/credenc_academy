import React,{useEffect, useState,useRef} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';

export default function SuccessAlert(props){

    return(
        <div className='animated fadeOut'>
            <Stack sx={{...props?.style}} spacing={2}>
                <Alert severity="success">
                    <AlertTitle sx={{...props?.titleStyle}}>
                        {props?.title}
                    </AlertTitle>
                </Alert>
            </Stack>
        </div>
    )
}