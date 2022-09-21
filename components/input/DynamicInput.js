import React, { useEffect } from 'react';

export default function DynamicInput({start, end}) {
  return (
    <div className='dynamic-input-component'>
        <div className='input' style={{border: '1px solid #EBEBEB'}}>{start}</div>
        <div>to</div>
        <div className='input' style={{border: '1px solid #EBEBEB'}}>{end}</div>
    </div>
  )
}

