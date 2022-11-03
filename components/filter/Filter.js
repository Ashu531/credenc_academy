import React, { useEffect, useState } from 'react';
import caretDown from '../../assets/images/icons/caret-down-grey.svg';
import caretUp from '../../assets/images/icons/caret-up-grey.svg';
import Lists from '../../config/list';
import States from '../../config/states';
import ButtonGroup from '../button/ButtonGroup';
import RangeInput from '../input/RangeInput';
import List from '../list/List'; 
import Image from "next/image";

export default function Filter({ item, filterState, updateFilterState, min, max, getRange, updateCostSlider, setIsAppliedCostSlider,theme,isAppliedCostSlider }) {

  const myLoader = ({ src, width, quality }) => {
    if(src && src.length > 0){
      return `${src}?w=${width}&q=${quality || 75}`
    }else{
        return '..'
    }
  }

    const [expanded, setExpanded] = useState(false);
    
    const selectedItems = (list) => {
      return list?.filter((item) => item['isApplied'] === true).length > 0;
    }

    const renderFilter = (filterType) => {
      if(filterType === Lists.filters.CLASS_MODE){
        return (
          <List 
            type={States.listTypes.CHECKBOXES} 
            list={filterState} 
            onItemClick={(value, i) => {
              updateFilterState(filterType, value, i)
            }}
          />
        );
      }

      // const [selectedPace, setSelectedPace] = useState(null);
      if(filterType === Lists.filters.COURSE_PACE){
        return (
          <div className='course-pace-container'>
            <ButtonGroup items={filterState} getSelected={(i) => updateFilterState(filterType, i, i)}/>
             {/* {selectedItems(filterState) && <div className='hrs'>HOURS OF CONTENT</div>}
             {selectedItems(filterState) && <RangeInput 
              minValue={1} 
              maxValue={100}
              type={Lists.filters.COURSE_PACE}
            />} */}
          </div>
        );
      }

      if(filterType === Lists.filters.COST){
        return (
          <div className='cost-container'>
            <RangeInput
              key={max}
              minValue={min} 
              maxValue={max}
              type={Lists.filters.COST}
              handleChange={(min, max) => getRange(min, max)}
              updateCostSlider={updateCostSlider}
              setIsAppliedCostSlider={setIsAppliedCostSlider}
            />
            {/* <List 
              type={States.listTypes.CHECKBOXES} 
              list={filterState} 
              onItemClick={(value, i) => updateFilterState(filterType, value, i)}
              theme={theme}
            /> */}
          </div>
        );
      }

      if(filterType === Lists.filters.DIFFICULTY_LEVEL){
        return <List 
                  type={States.listTypes.CHECKBOXES} 
                  list={filterState}
                  onItemClick={(value, i) => updateFilterState(filterType, value, i)}
                  theme={theme}
                />
      }

      if(filterType === Lists.filters.WORK_EXPERIENCE){
        return <List 
                  type={States.listTypes.CHECKBOXES} 
                  list={filterState}
                  onItemClick={(value, i) => updateFilterState(filterType, value, i)}
                  theme={theme}
                />
      }

      if(filterType === Lists.filters.FINANCE_OPTIONS){
        return <List 
                  type={States.listTypes.CHECKBOXES} 
                  list={filterState}
                  onItemClick={(value, i) => updateFilterState(filterType, value, i)}
                  theme={theme}
                />
      }

      if(filterType === Lists.filters.COURSE_LANGUAGE){
        return <List 
                  type={States.listTypes.CHECKBOXES} 
                  list={filterState}
                  onItemClick={(value, i) => updateFilterState(filterType, value, i)}
                  theme={theme}
                />
      }

      if(filterType === Lists.filters.PLATFORM){
        return <List 
                  type={States.listTypes.CHECKBOXES} 
                  list={filterState}
                  onItemClick={(value, i) => updateFilterState(filterType, value, i)}
                  theme={theme}
                />
      }

      if(filterType === Lists.filters.EDUCATOR){
        return <List 
                  type={States.listTypes.CHECKBOXES} 
                  list={filterState}
                  onItemClick={(value, i) => updateFilterState(filterType, value, i)}
                  theme={theme}
                />
      }
    }

  return (
    <div className='filter-component' style={{background: expanded ? theme === 'dark' ? '#222222' : '#FFFFFF' : ''}}>
        <div className={`filter-button`} onClick={() => setExpanded(!expanded)}>
            <div>{item.name}</div>
            {(selectedItems(filterState) || isAppliedCostSlider) && <div className='applied'></div>}
            <Image src={expanded ? caretUp : caretDown} objectFit="cover"/>
        </div>
        {/* {
          icon && icon.length > 0 && <div>
            <Image loader={myLoader} src={icon} height={20} width={20} objectFit='contain' />
            </div>
        } */}
        <div className={`filters ${expanded ? '' : 'hide'}`}>
            {renderFilter(item.type)}
        </div>
    </div>
  )
}
