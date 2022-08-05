import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiStatus from '../../../values/ApiStatus';
import States from '../../../values/states'
import { getDataFromUrl } from '../../services/userService';
import List from '../elementalComponents/list/List'
import ProfileHeader from './ProfileHeader';

export default function Upvotes({ token }) {

  const upvotesApiStatus = useRef(new ApiStatus());
  const [upvotes, setUpvotes] = useState([]);

  const navigate = useNavigate();

  const navigateToDetailPage = (course, id) => {
    navigate(`/course/${course['name'].replaceAll('/', ' ')}-id-${course['id']}`, 
    { 
      state: { 
        id: course['id'], 
        name: course['name'],
      }
    });
  }

  useEffect(async () => {
    upvotesApiStatus.current.start();
    let res = await getDataFromUrl(`${API_URL}/userupvotes/`, token, upvotesApiStatus);
    setUpvotes(res);
  }, [])

  return (
    <div className='upvotes'>
      <ProfileHeader heading='My Upvotes' />
      <List
        type={ States.listTypes.MY_UPVOTE_CARDS }
        list={upvotes}
        listApiStatus={upvotesApiStatus}
        onItemClick={navigateToDetailPage}
      />
    </div>
  )
}
