import React, { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import ApiStatus from '../../config/apiStatus'
import States from '../../config/states'
import { getDataFromUrl } from '../../helper/userService';
import List from '../../components/list/List'
import ProfileHeader from './ProfileHeader';

export default function Reviews({token}) {

  const reviewsApiStatus = useRef(new ApiStatus());
  const [reviews, setReviews] = useState([]);

  // const navigate = useNavigate();

  const navigateToDetailPage = (course, id) => {
    // navigate(`/course/${course['name'].replaceAll('/', ' ')}-id-${course['id']}`, 
    // { 
    //   state: { 
    //     id: course['id'], 
    //     name: course['name'],
    //   }
    // });
  }

  useEffect(async () => {
    reviewsApiStatus.current.start();
    let res = await getDataFromUrl(`${API_URL}/userreviews/`, token, reviewsApiStatus);
    setReviews(res);
  }, [])

  return (
    <div className='reviews'>
      <ProfileHeader heading='My Reviews' />
      <List
        type={ States.listTypes.MY_REVIEW_CARDS }
        list={reviews}
        listApiStatus={reviewsApiStatus}
        onItemClick={navigateToDetailPage}
      />
    </div>
  )
}
