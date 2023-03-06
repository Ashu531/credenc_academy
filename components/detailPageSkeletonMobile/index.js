import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function MobileDetailSkeleton() {
  return (
    <div className='webContainer'>
       <Box sx={{ width: '95%', paddingLeft: 4,paddingRight: 4 }}>
         <Skeleton animation="wave" style={{marginTop: '10rem',width: 250}} />
         <Skeleton animation="wave" style={{height: 80,width: 200}} />
         <Skeleton animation="wave" style={{height: 250, width:'90%'}} />
         <Skeleton animation="wave" style={{width: 250}} />
         <Skeleton animation="wave" style={{height: 80,width: '90%'}} />
         <Skeleton animation="wave" style={{height: 80,width: '90%'}} />
         <Skeleton animation="wave" style={{marginTop: 20,width: 250}} />
         <Skeleton animation="wave" style={{height: 80,width: 200}} />
       </Box>
    </div>
  );
}