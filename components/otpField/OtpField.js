import React from 'react';

export default function OtpField({ handleChange, otp, error }) {

    const inputfocus = (e) => {
        if (e.key === "Delete" || e.key === "Backspace") {
            const next = e.target.tabIndex - 2;
            if (next > -1) {
                e.target.form.elements[next].focus()
            }
        }
        else {
            let isnum = /^[\d A-Z]+$/.test(e.target.value);
            if(isnum){
                const next = e.target.tabIndex;
                if (next < 6) {
                    e.target.form.elements[next].focus()
                }
            }
        }
      }

    return (
        <div>
            <form className='otp-container'>
                <span className='input-wrapper' style={{padding:'0.5rem'}}>
                    <input 
                        className='input-field'
                        onChange={(e) => handleChange(e.target.value, 0)}
                        maxLength={1}
                        tabIndex={1}
                        onKeyUp={e => inputfocus(e)}
                        value={otp.values[0]}
                        type='tel'
                    ></input>
                </span>
                <span className='input-wrapper' style={{padding:'0.5rem'}}>
                    <input 
                        className='input-field'
                        onChange={(e) => handleChange(e.target.value, 1)}
                        maxLength={1}
                        tabIndex={2}
                        onKeyUp={e => inputfocus(e)}
                        value={otp.values[1]}
                        type='tel'
                    ></input>
                </span>
                <span className='input-wrapper' style={{padding:'0.5rem'}}>
                    <input 
                        className='input-field'
                        onChange={(e) => handleChange(e.target.value, 2)}
                        maxLength={1}
                        tabIndex={3}
                        onKeyUp={e => inputfocus(e)}
                        value={otp.values[2]}
                        type='tel'
                    ></input>
                </span>
                <span className='input-wrapper' style={{padding:'0.5rem'}}>
                    <input 
                        className='input-field'
                        onChange={(e) => handleChange(e.target.value, 3)}
                        maxLength={1}
                        tabIndex={4}
                        onKeyUp={e => inputfocus(e)}
                        value={otp.values[3]}
                        type='tel'
                    ></input>
                </span>
                <span className='input-wrapper' style={{padding:'0.5rem'}}>
                    <input 
                        className='input-field'
                        onChange={(e) => handleChange(e.target.value, 4)}
                        maxLength={1}
                        tabIndex={5}
                        onKeyUp={e => inputfocus(e)}
                        value={otp.values[4]}
                        type='tel'
                    ></input>
                </span>
                <span className='input-wrapper' style={{padding:'0.5rem'}}>
                    <input 
                        className='input-field'
                        onChange={(e) => handleChange(e.target.value, 5)}
                        maxLength={1}
                        tabIndex={6}
                        onKeyUp={e => inputfocus(e)}
                        value={otp.values[5]}
                        type='tel'
                    ></input>
                </span>
            </form>
            {error && <div className='error'>
                {error}
            </div>}
        </div>
    )
}
