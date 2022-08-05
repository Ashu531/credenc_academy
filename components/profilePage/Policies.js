import React from 'react'
import PrivacyPolicy from '../privacyPolicy/PrivacyPolicy'
import ProfileHeader from './ProfileHeader'

export default function Policies({changeNavbarVisibility}) {
  return (
    <div className='policy'>
      <ProfileHeader heading='Privacy Policy' />
      <PrivacyPolicy changeNavbarVisibility={changeNavbarVisibility} />
    </div>
  )
}
