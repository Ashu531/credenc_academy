import React, { useEffect, useState } from 'react'

export default function ButtonGroup({ items, getSelected }) {

    const handleSelected = (idx) => {
        if(items[idx]['isApplied']){
            getSelected(null);
        } else {
            getSelected(idx);
        }
    }

  return (
    <div className='btn-group-component'>
        {(items.map((item, i) => (
            <div key={i} className={`btn ${item.isApplied ? 'selected': ''}`} onClick={() => handleSelected(i)}>{ item.name }</div>
        )))}
    </div>
  )
}
