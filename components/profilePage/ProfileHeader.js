import React from 'react'
import { useNavigate } from 'react-router';
import MixpanelStrings from '../../../values/mixpanelStrings';
import { Mixpanel } from '../../services/Mixpanel';

export default function ProfileHeader({ heading }) {

    const navigate = useNavigate();

    const handleBack = () => {
        Mixpanel.track(MixpanelStrings.BACK_BUTTON_CLICK)
        navigate(-1)
    };

    return (
        <div className='profile-header'>
            <span onClick={handleBack} className='back-icon'>{'<'}</span>
            <span className='heading'>{heading}</span>
        </div>
    )
}
