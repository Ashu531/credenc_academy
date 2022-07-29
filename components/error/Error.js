import React from 'react';
import noResultImage from '../../assets/images/icons/no-results.svg';
import crashImage from '../../assets/images/icons/crash.svg';
import Lists from '../../config/list';
import Image from "next/image";

export default function Error({type, text}) {

    const getImage = () => {
        if(type === Lists.errorTypes.EMPTY){
            return noResultImage;
        }

        if(type === Lists.errorTypes.CRASH){
            return crashImage;
        }
    }

    const getErrorText = () => {
        if(type === Lists.errorTypes.EMPTY){
            return text ? text : 'No Results Found!';
        }

        if(type === Lists.errorTypes.CRASH){
            return 'Something went wrong!';
        }
    }

  return (
    <div className='error-component'>
          <Image className='error-img' src={getImage()} objectFit='cover'/>
          <div className='error-mssg'>{getErrorText()}</div>
    </div>
  )
}
