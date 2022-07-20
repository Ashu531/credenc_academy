import React from 'react';

export default function DynamicInput({start, end}) {
  return (
    <div className='dynamic-input-component'>
        <div className='input'>{start}</div>
        <div>to</div>
        <div className='input'>{end}</div>
    </div>
  )
}

