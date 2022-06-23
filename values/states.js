// import caretDown from '../assets/caret-down-grey.svg';
// import caretUp from '../assets/caret-up-grey.svg';
// import closeIcon from '../assets/close-icon-white.svg';
// import passNotVisibleIcon from '../assets/eye-close.svg';
// import cursorIcon from '../assets/cursor-click-icon.svg';
// import globeIcon from '../assets/globe.svg';
// import compareIcon from '../assets/compare-icon-filled.svg';
// import bookmarkIcon from '../assets/bookmark-filled-black.svg';
// import bookmarkedIcon from '../assets/bookmark-filled-green.svg';
// import bookmarkedIconWhite from '../assets/bookmark-icon-filled.svg';
// import bookmarkIconWhite from '../assets/bookmark-icon-white.svg';
// import upvoteIconWhite from '../assets/arrow-up-white.svg';
// import upvotedIconWhite from '../assets/arrow-up-white-filled.svg';

import Strings from './strings';

export default class States {
  
 static addToCompareButtonState = {
        DEFAULT: {
            id: 0,
            text: Strings.ADD_TO_COMPARE,
            // icon: compareIcon,
            color: ''
        },
        APPLIED: {
            id: 1,
            text: Strings.ADDED_TO_COMPARE,
            // icon: compareIcon,
            color: '#5FAE3A'
        },
    }


}