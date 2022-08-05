import React from 'react';
import envelopeIcon from '../../../assets/envelope-icon-blue.svg';
import States from '../../../values/states';
import List from '../elementalComponents/list/List';

export default function Notifications() {
  return (
    <div className='notifications'>
      <div className='header'>
        <img src={envelopeIcon}/>
        <div>Course Notification</div>
      </div>
      <div className='subtitle'>You have activated notifications for the courses mentioned below.</div>
      <List
        type={ States.listTypes.NOTIFICATION_CARDS }
        list={Array(5).fill(null)}
      />
    </div>
  )
}
