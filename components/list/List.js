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

function List({
    list,
    type=States.listTypes.FILTERS,
    onItemClick,
    listApiStatus,
    setLastElement,
    theme,
    openDetailModal,
    addToCompare,
    addToBookmark,
    compareText,
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
         
          <div></div>
          // <CourseCard 
          // item={item} 
          // key={i}
          // />
        ))
      );
    } 
    
    else if(listApiStatus.current.hasCompleted()){
      if(list && list.length > 0){
        return (
          list.map((item, i) => {
            let bookmarkVisible = false;
            let tempBookmarkData = JSON.parse(localStorage.getItem(bookmarkKey));
            if(tempBookmarkData && tempBookmarkData.length > 0){
              if (tempBookmarkData.includes(item?.id))
              bookmarkVisible = true
              else
              bookmarkVisible = false
            }
             return i === list.length - 1 ? 
            <div key={`${item.id}:${i}`} ref={setLastElement}>
              {/* <CourseCardContainer 
                item={item}
                handleClick={onItemClick}
                onAddToBookmark={handleAddItemToBookmark}
                onRemoveFromBookmark={handleRemoveItemFromBookmark}
                onAddToCompare={handleAddItemToCompare}
                onRemoveFromCompare={handleRemoveItemFromCompare}
                upvoteList={upvoteList}
                handleSignInClick={handleSignInClick}
              /> */}
            </div>
            : 

            <CourseCard 
             data={item} 
             key={`${item.id}:${i}`} 
             openDetailModal={()=>openDetailModal(item)}
             addToCompare={()=>addToCompare(item)} 
             addToBookmark={()=>addToBookmark(item)}
             compareText={compareText(item)}
             bookmarkVisible={bookmarkVisible}
            />
            null
          })
        );
      } else {
        return <Error type={ Lists.errorTypes.EMPTY } />;
      } 
    } 
    
    else if(listApiStatus.current.hasFailed()){
      return <Error type={ Lists.errorTypes.CRASH } />;
    } 
    
    else {
      return <Error type={ Lists.errorTypes.CRASH } />;
    }
  }

  if(renderListType(listTypes.BOOKMARK_CARDS)){

    if(listApiStatus.current.isPending()){
      return (
        Array(5).fill(null).map((item, i) => (
          <div>

          </div>
          // <CourseCardContainer item={item} key={`dummy${i}`} showActions={false}/>
        ))
      );
    } 
    
    else if(listApiStatus.current.hasCompleted()){
      if(list && list.length > 0){
        return (
          list.map((item, i) => (
            <div>

            </div>
            // <CourseCardContainer 
            //   item={item} 
            //   key={`${item.id}:${i}`} 
            //   handleClick={onItemClick}
            //   onAddToBookmark={handleAddItemToBookmark}
            //   onRemoveFromBookmark={handleRemoveItemFromBookmark}
            //   onAddToCompare={handleAddItemToCompare}
            //   onRemoveFromCompare={handleRemoveItemFromCompare}
            //   handleSignInClick={handleSignInClick}
            // />
          ))
        );
      } else {
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
          setChecked={(value) => onItemClick(value, i)} key={i}
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
        <div>

        </div>
      ))
    )
  }

  if(renderListType(listTypes.NOTIFICATION_CARDS)){
    return (
      list.map((item, i) => (
        <div className='card'>
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
            <div className='card' onClick={() => onItemClick(item, i)}>
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
          <div className='card'>
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
            <div className='card' onClick={() => onItemClick(item, i)}>
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