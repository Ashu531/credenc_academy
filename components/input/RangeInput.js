import React, { useEffect, useRef, useState } from 'react';
import Lists from '../../config/list';
import DynamicInput from './DynamicInput';
import Seekbar from './Seekbar';

// import MixpanelStrings from '../../../../values/mixpanelStrings';
// import { Mixpanel } from '../../../services/Mixpanel';
 

function RangeInput({
    handleChange,
    minValue,
    maxValue,
    type,
    updateCostSlider,
    setIsAppliedCostSlider,
}) {

    let scale = useRef(1);

    const calculateValue = (value, max=false) => {
        return value * scale.current + (max ? 0 : minValue);
    }

    const getValue = (value, type, max=false) => {
        const newValue = calculateValue(value, max);

        if(type === Lists.filters.COST){
            return `INR ${Math.round(newValue)}`;
        }

        if(type === Lists.filters.COURSE_PACE){
            return `${newValue} hrs`;
        }
    }

    const [startValue, setStartValue] = useState(getValue(minValue, type));
    const [endValue, setEndValue] = useState(getValue(maxValue, type, true));

    const getSeekbarValues = ( minValue, maxValue) => {
        console.log("SEEKBAR VALUES  -->", getValue(minValue, type));  // --------------------------------------------------
        setIsAppliedCostSlider(true);
        setStartValue(getValue(minValue, type));
        setEndValue(getValue(maxValue, type, true));
        handleChange(calculateValue(minValue), calculateValue(maxValue, true));

        // Mixpanel.track(MixpanelStrings.COST_SLIDER_TRIGGERED, {
        //     "filterType": 'Cost',
        //     "filterValue": "Cost Slider",
        //     "isApplied": true,
        //     "name": "Cost Slider",
        //     "minValue": calculateValue(minValue),
        //     "maxValue": calculateValue(maxValue),
        // })
    }

    useEffect(() => {
        scale.current = 100 > maxValue? 100 / maxValue : maxValue / 100;
    }, []);

    

    useEffect(() => {

        setStartValue(`INR ${minValue}`);
        setEndValue(`INR ${maxValue}`);

    },[updateCostSlider])

  return (
    <div className='range-input-component'>
        <DynamicInput start={startValue} end={endValue}/>
        <div className='seekbar-container'>
            <Seekbar minValue={0} maxValue={100} handleChange={getSeekbarValues} updateCostSlider={updateCostSlider}/>
        </div>
    </div>
  )
}

export default RangeInput
