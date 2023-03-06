import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function WebDetailSkeleton() {
  return (
    <div className='webContainer'>
       <Box sx={{ width: '95%', paddingLeft: 4,paddingRight: 4 }}>
         <Skeleton animation="wave" style={{marginTop: '10rem',width: 300}} />
         <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: "center"}}>
            <Skeleton animation="wave" style={{height: 80, width: 150}} />
            <Skeleton animation="wave" style={{height: 80, width: 300}} />
         </div>
        <Skeleton animation="wave" style={{height: 300, width: '100%'}} />
        <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: "flex-start"}}>
            <Skeleton animation="wave" style={{height: 80,width: 300,marginTop: 50}} />
            <Skeleton animation="wave" style={{height: 300, width: 400}} />
         </div>
       </Box>
    </div>
  );
}