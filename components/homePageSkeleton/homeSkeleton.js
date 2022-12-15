import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function HomeSkeleton() {
  return (
    <div className='cardContainerWeb'>
       <div className='cardContentWeb'>
           <div className='headerContainer'>
                <Skeleton variant="rounded" width={36} height={36} />
                <div style={{display:'flex',flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-end'}}>
                    <div style={{marginRight: 20}}>
                        <Skeleton variant="rounded" width={36} height={36} />
                    </div>
                    <Skeleton variant="rounded" width={60} height={36} />
                
                </div>
           </div>
         <div className='platformIcon'>
            <Skeleton variant="circular" width={80} height={80} />
            {/* <Skeleton variant="text" sx={{ fontSize: '2rem',width: 150 }} /> */}
         </div>
         <div className='courseContent'>
             <div style={{marginTop:10}}>
                <Skeleton variant="text" sx={{ fontSize: '2rem',width: '100%' }} />
             </div>
          <div>
            <Skeleton variant="text" sx={{ fontSize: '1rem',width: '40%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem',width: '40%' }} />
          </div>
         </div>
         <div className='priceContent'>
            <Skeleton variant="text" sx={{ fontSize: '1rem',width: '20%' }} />
            <Skeleton variant="text" sx={{ fontSize: '3rem',width: '40%' }} />
         </div>
       </div>
    </div>
  );
}