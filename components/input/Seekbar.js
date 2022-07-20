import React, { useEffect, useRef, useState } from 'react'

export default function Seekbar({minValue, maxValue, handleChange, updateCostSlider}) {


    const [ minVal, setMinVal ] = useState(minValue);
    const [ maxVal, setMaxVal ] = useState(maxValue);

    let inputLeftRef = useRef();
    let inputRightRef = useRef();
    let thumbLeftRef = useRef();
    let thumbRightRef = useRef();
    let rangeRef = useRef();

    const setLeftValue = () => {

        let inputLeft = inputLeftRef.current;
        let inputRight = inputRightRef.current;
        let thumbLeft = thumbLeftRef.current;
        let range = rangeRef.current;

        let _this = inputLeft,
            min = parseInt(_this.min),
            max = parseInt(_this.max);
        
        _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 5);

        let percent = ((_this.value - min) / (max - min)) * 100;
        thumbLeft.style.left = `${percent}%`;
        range.style.left = `${percent}%`;

        setMinVal(_this.value);
    }

    const setRightValue = () => {


        let inputLeft = inputLeftRef.current;
        let inputRight = inputRightRef.current;
        let thumbRight = thumbRightRef.current;
        let range = rangeRef.current;

        let _this = inputRight,
            min = parseInt(_this.min),
            max = parseInt(_this.max);
        
        _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 5);

        let percent = ((_this.value - min) / (max - min)) * 100;
        thumbRight.style.right = `${100 - percent}%`;
        range.style.right = `${100 - percent}%`;

        setMaxVal(_this.value);
    }
    // useEffect(() => {
    //     console.log(minVal, maxVal)
    // }, [minVal, maxVal]);

    useEffect(() => {
        try {
            setLeftValue();
            setRightValue();
        } catch(e) {

        }
    }, []);

    useEffect(() => {
        if (!!updateCostSlider) {
            setMinVal(minValue);
            setMaxVal(maxValue);
        }
    },[updateCostSlider])


  return (
    <div className='seekbar'>
        <input 
            type='range' 
            id='input-left' 
            min='0' 
            max='100' 
            value={minVal} 
            onInput={setLeftValue}
            onMouseUp={() => handleChange(minVal, maxVal)}
            onTouchEnd={() => handleChange(minVal, maxVal)}
            ref={inputLeftRef}
        />
        <input 
            type='range' 
            id='input-right'
            min='0' 
            max='100' 
            value={maxVal} 
            onInput={setRightValue}
            onMouseUp={() => handleChange(minVal, maxVal)}
            onTouchEnd={() => handleChange(minVal, maxVal)}
            ref={inputRightRef}
        />

        <div className='slider'>
            <div className='track'></div>
            <div className='range' style={{left: `${minVal}%`, right: `${100 - maxVal}%`}} ref={rangeRef}></div>
            <div className='thumb left' style={{left: `${minVal}%`}} ref={thumbLeftRef}></div>
            <div className='thumb right' style={{right: `${100 - maxVal}%`}} ref={thumbRightRef}></div>
        </div>
    </div>
  )
}