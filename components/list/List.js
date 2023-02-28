import React from 'react'
import States from '../../config/states';
import CheckBox from '../checkbox/CheckBox';
import Chip from '../chip/Chip';
// import BatchCard from '../courseCard/BatchCard';
// import CourseCardContainer from '../courseCard/CourseCardContainer';
import Filter from '../filter/Filter';
import dribbleLogo from '../../assets/images/icons/dribble-logo.svg';
import closeIcon from '../../assets/images/icons/close-icon-white.svg';
// import noResultImage from '../../../../assets/no-results.svg';
import Error from '../error/Error';
import Lists from '../../config/list';
import Button from '../button/Button';
import { Skeleton } from '@mui/material';
import CourseCard from '../coursecard/CourseCard';
const bookmarkKey = 'credenc-marketplace-bookmarks';
const UpvoteKey = 'credenc-edtech-upvote'

function List({
    list,
    type=States.listTypes.FILTERS,
    onItemClick,
    listApiStatus,
    theme,
    openDetailModal,
    openApplyNowModal,
    token,
    openLoginModal,
    setLastElement,
    removeLocalBookmarks,
    addLocalBookmarks,
    enableTrackStatus,
    applied
}) {

  const listTypes = States.listTypes;
  const renderListType = (listType) => {
    return type === listType;
  }

  if(renderListType(listTypes.FILTERS)){
    return (
      list.map((item, i) => (
        <Filter item={item} key={i}/>
      ))
    );
  }

  if(renderListType(listTypes.HORIZONTAL_CARDS)){
    if(listApiStatus.current.isPending()){
      return (
        Array(3).fill(null).map((item, i) => (
         
          <div key={i}></div>
        ))
      );
    } 
    
    else if(listApiStatus.current.hasCompleted()){
      if(list && list.length > 0){
        return (
          list.map((item, i) => {
            return i === list.length - 1 ?
            <div key={`${item.id}:${i}`} ref={setLastElement}>
              <CourseCard 
                data={item} 
                key={`${item.id}:${i}`} 
                openDetailModal={()=>openDetailModal(item)}
                openApplyNowModal={(item)=> openApplyNowModal(item)}
                token={token}
                openLoginModal={()=>openLoginModal()}
                addLocalBookmarks={(count)=>addLocalBookmarks(count)}
                removeLocalBookmarks={()=>removeLocalBookmarks()}
                enableTrackStatus={()=>enableTrackStatus()}
                applied={applied}
              />
            </div> : 
               <CourseCard 
                data={item} 
                key={`${item.id}:${i}`} 
                openDetailModal={()=>openDetailModal(item)}
                openApplyNowModal={(item)=> openApplyNowModal(item)}
                token={token}
                openLoginModal={()=>openLoginModal()}
                addLocalBookmarks={(count)=>addLocalBookmarks(count)}
                removeLocalBookmarks={()=>removeLocalBookmarks()}
                enableTrackStatus={()=>enableTrackStatus()}
                applied={applied}
               />
          })
        );
      } else {
        return <Error type={ Lists.errorTypes.EMPTY } />;
      } 
    } 
    
    else if(listApiStatus.current.hasFailed()){
      console.log("list.lenght123")
      return <Error type={ Lists.errorTypes.CRASH } />;
    } 
    
    else {
      console.log(list,"list.lenght531")
      return <Error type={ Lists.errorTypes.CRASH } />;
    }
  }

  if(renderListType(listTypes.BOOKMARK_CARDS)){

    if(listApiStatus.current.isPending()){
      return (
        Array(5).fill(null).map((item, i) => (
          <div key={i}>

          </div>
          // <CourseCardContainer item={item} key={`dummy${i}`} showActions={false}/>
        ))
      );
    } 
    
    else if(listApiStatus.current.hasCompleted()){
      if(list && list.length > 0){
        return (
          list.map((item, i) => {
            return <CourseCard 
             data={item} 
             key={`${item.id}:${i}`} 
             openDetailModal={()=>openDetailModal(item)}
             openApplyNowModal={(item)=> openApplyNowModal(item)}
             token={token}
             openLoginModal={()=>openLoginModal()}
             removeLocalBookmarks={()=>removeLocalBookmarks()}
             enableTrackStatus={()=>enableTrackStatus()}
             applied={applied}
            />
          })
        );
      }
      else {
        return <Error type={ Lists.errorTypes.EMPTY } text={'No Bookmarks'} />;
      } 
    } 
    
    else if(listApiStatus.current.hasFailed()){
      return <Error type={ Lists.errorTypes.CRASH } />
    } 
    
    else {
      return <Error type={ Lists.errorTypes.CRASH } />;
    }
  }

  if(renderListType(listTypes.CHECKBOXES)){
    return (
      list.map((item, i) => (
        <CheckBox
          label={item.name} 
          color='#7A7E85' 
          isChecked={item.isApplied} 
          setChecked={(value) => onItemClick(value, i)} 
          key={i}
          theme={theme}
        />
      ))
    );
  }

  if(renderListType(listTypes.CHIPS)){
    return (
      list.map((item, i) => (
        <Chip 
          text={item.text} 
          leadingIcon={item.leadingIcon} 
          trailingIcon={item.trailingIcon} 
          style={{border: item.border}}
          key={i}
        />
      ))
    )
  }

  if(renderListType(listTypes.BATCHES)){
    return (
      list.map((item, i) => (
        // <BatchCard item={item} handleClick={onItemClick} key={i}/>
        <div key={i}>

        </div>
      ))
    )
  }

  if(renderListType(listTypes.NOTIFICATION_CARDS)){
    return (
      list.map((item, i) => (
        <div className='card' key={i}>
          <div className='logos'>
            <div className='partner'>
              <div className='icon' style={{backgroundImage: `url(${dribbleLogo})`}}></div>
              <div>Shift Nudge</div>
            </div>
            <div className='close-icon' style={{backgroundImage: `url(${closeIcon})`}}></div>
          </div>
          <div className='title'>Some Random Title</div>
          <div className='card-subtitle'><span>Batch 1</span> starts on Jan 15, 2022</div>
        </div>
      ))
    )
  }

  if(renderListType(listTypes.MY_REVIEW_CARDS)){

    if(listApiStatus.current.isPending()){
      return (
        <div className='card'>
          <div className='header'>
            <div className='logo'></div>
            <div className='rating'><Skeleton variant='text' width={10} sx={{bgcolor: '#555555'}}/></div>
          </div>
          <div className='title'><Skeleton variant='text' width={100} sx={{bgcolor: '#555555'}}/></div>
          <div className='description'><Skeleton variant='text' width={100} height={300} sx={{bgcolor: '#555555'}}/></div>
        </div>
      )
    }

    else if(listApiStatus.current.hasCompleted()){
      if(list && list.length > 0){
        return (
          list.map((item, i) => (
            <div className='card' onClick={() => onItemClick(item, i)} key={i}>
              <div className='header'>
                <div className='logo' style={{backgroundImage: `url(${item['logo']})`}}></div>
                <div className='rating'>{!!item['ratings'] ? item['ratings'] : 0}/5</div>
              </div>
              <div className='title'>{item['name']}</div>
              <div className='description'>{item['description']}</div>
            </div>
          ))
        );
      } 
      else {
        return <Error type={ Lists.errorTypes.EMPTY } text={'No Reviews'} />;
      }
    }

    else if(listApiStatus.current.hasFailed()){
      return <Error type={ Lists.errorTypes.CRASH } />
    } 
    
    else {
      return <Error type={ Lists.errorTypes.CRASH } />;
    }
  }

  if(renderListType(listTypes.MY_UPVOTE_CARDS)){
    if(listApiStatus.current.isPending()){
      return (
        list.map((item, i) => (
          <div className='card' key={i}>
            <div className='logo'></div>
            <div className='title'><Skeleton variant='text' width={10} sx={{bgcolor: '#555555'}}/></div>
          </div>
        ))
      );
    }

    else if(listApiStatus.current.hasCompleted()){
      if(list && list.length > 0){
        return (
          list.map((item, i) => (
            <div className='card' onClick={() => onItemClick(item, i)} key={i}>
              <div className='logo' style={{backgroundImage: `url(${item['logo']})`}}></div>
              <div className='title'>{item['name']}</div>
              <Button 
                style={{ background: States.upvoteButtonState.UPVOTED.color, width: '8rem' }}
                classes='btn-primary'
                text={item['up_votes']}
                leadingIcon={States.upvoteButtonState.UPVOTED.icon}
                onClick={() => console.log('remove upvote')}
              />
            </div>
          ))
        );
      } 
      else {
        return <Error type={ Lists.errorTypes.EMPTY } text={'No Upvotes'} />;
      }
    }

    else if(listApiStatus.current.hasFailed()){
      return <Error type={ Lists.errorTypes.CRASH } />
    } 
    
    else {
      return <Error type={ Lists.errorTypes.CRASH } />;
    }
  }
  
}

export default List;