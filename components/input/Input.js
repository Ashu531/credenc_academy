import React from 'react'

export default function Input({
    placeholder='',
    value='',
    err,
    trailingIcon,
    type='text',
    handleInput,
    onTrailingIconClick,
    disabled
}) {

  const isSearchable = () => {
    return type === 'search';
  }

  return (
    <div className={`input-component ${isSearchable() ? 'small-wrapper-colored search-component' : ''}`}>
      <div className='input-container'>
        <input disabled={disabled} placeholder={placeholder} value={value} type={type} onChange={(e) => handleInput(e.currentTarget.value)}/>
        {trailingIcon && <div className='icon' onClick={onTrailingIconClick}>
          {/* <img src={trailingIcon} /> */}
        </div>}
      </div>
      {err && <div className='error'>{err}</div>}
    </div>
  )
}

