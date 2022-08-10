import React from 'react'
import { useRouter } from 'next/router'
// import MixpanelStrings from '../../../values/mixpanelStrings';
// import { Mixpanel } from '../../services/Mixpanel';

export default function ProfileHeader({ heading,setMobileLoginNavigation }) {

    let location = useRouter();

    const handleBack = () => {
        // Mixpanel.track(MixpanelStrings.BACK_BUTTON_CLICK)
        setMobileLoginNavigation()
    };

    return (
        <div className='profile-header'>
            <span onClick={handleBack} className='back-icon'>{'<'}</span>
            <span className='heading'>{heading}</span>
        </div>
    )
}
