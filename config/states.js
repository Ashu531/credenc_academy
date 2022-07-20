import caretDown from '../assets/images/icons/caret-down-grey.svg';
import caretUp from '../assets/images/icons/caret-up-grey.svg';
import closeIcon from '../assets/images/icons/close-icon-white.svg';
import passNotVisibleIcon from '../assets/images/icons/eye-close.svg';
import cursorIcon from '../assets/images/icons/cursor-click-icon.svg';
import globeIcon from '../assets/images/icons/globe.svg';
import compareIcon from '../assets/images/icons/compare-icon-filled.svg';
import bookmarkIcon from '../assets/images/icons/bookmark.svg';
import bookmarkedIcon from '../assets/images/icons/bookmark.svg';
import bookmarkedIconWhite from '../assets/images/icons/bookmark.svg';
import bookmarkIconWhite from '../assets/images/icons/bookmark.svg';
// import upvoteIconWhite from '../assets/images/icons/arrow-up-white.svg';
import upvotedIconWhite from '../assets/images/icons/upvote.svg';

import Strings from './strings';

export default class States {
    static pageStates = {
        LANDING: 0,
        LOGIN: 1,
        FORGOT_PASSWORD: 2,
        COURSE: 3,
    };

    static loginModalStates = {
        LOGIN: 0,
        SIGNUP: 1
    };

    static loginButtonStates = {
        LOGIN: {
            text: Strings.SIGN_IN,
            divider: Strings.OR_SIGN_IN,
        },

        SIGNUP: {
            text: Strings.SIGN_UP,
            divider: Strings.OR_SIGN_UP,
        }
    }

    static dropdownTypes = {
        PRIMARY: 'primary',
        SECONDARY: 'secondary',
    }

    static floatTypes = {
        PRIMARY: 'primary',
        SECONDARY: 'secondary',
    }

    static dropdownStates = {
        OPEN: {
            id: 0,
            icon: caretUp,
            style: {
                color: '#3D3D3D',
            },
        },
        CLOSED: {
            id: 1,
            icon: caretDown,
            style: {
                color: '#3D3D3D',
            },
        },
    }

    static dropdownSelectedStates = {
        SELECTED: {
            id: 0,
            icon: closeIcon,
            style: {
                color: '#5FAE3A',
                fontWeight: 700,
            },
        },
        UNSELECTED: {
            id: 1,
            icon: null,
            style: null,
        }
    }

    static forgotPasswordModalStates = {
        ENTER_EMAIL: 0,
        ENTER_OTP: 1,
        NEW_PASSWORD: 2
    }

    static passwordInputInitialState = {
        value: '',
        hide: true,
        trailingIcon: passNotVisibleIcon,
        type: 'password'
    }

    static listTypes = {
        FILTERS: 0,
        HORIZONTAL_CARDS: 1,
        CHECKBOXES: 2,
        CHIPS: 3,
        BATCHES: 4,
        BOOKMARK_CARDS: 5,
        NOTIFICATION_CARDS: 6,
        MY_REVIEW_CARDS: 7,
        MY_UPVOTE_CARDS: 8,
    }

    static applyButtonState = {
        DEFAULT: {
            id: 0,
            text: Strings.APPLY_NOW,
            icon: cursorIcon,
            color: ''
        },
        APPLIED: {
            id: 1,
            text: Strings.APPLIED,
            icon: cursorIcon,
            color: '#5FAE3A'
        },
    }

    static addToCompareButtonState = {
        DEFAULT: {
            id: 0,
            text: Strings.ADD_TO_COMPARE,
            icon: compareIcon,
            color: ''
        },
        APPLIED: {
            id: 1,
            text: Strings.ADDED_TO_COMPARE,
            icon: compareIcon,
            color: '#5FAE3A'
        },
    }

    static goToWebsiteButtonState = {
        DEFAULT: {
            id: 0,
            text: Strings.GO_TO_WEBSITE,
            icon: globeIcon,
            color: ''
        },
        WEBSITE: {
            id: 1,
            text: Strings.GO_TO_WEBSITE,
            icon: globeIcon,
            color: '#5FAE3A'
        },
    }

    static notifyMeButtonState = {
        DEFAULT: {
            id: 0,
            text: Strings.NOTIFY_ME,
            icon: '',
            color: ''
        },
        NOTIFIED: {
            id: 1,
            text: Strings.NOTIFIED,
            icon: '',
            color: '#5FAE3A'
        },
    }

    static secondaryBookmarkButtonState = {
        DEFAULT: {
            id: 0,
            text: Strings.BOOKMARK,
            icon: bookmarkIcon,
            color: ''
        },
        BOOKMARKED: {
            id: 1,
            text: Strings.BOOKMARKED,
            icon: bookmarkedIcon,
            color: '#5FAE3A'
        },
    }

    static bookmarkButtonState = {
        DEFAULT: {
            id: 0,
            text: Strings.BOOKMARK,
            icon: bookmarkIconWhite,
            color: ''
        },
        BOOKMARKED: {
            id: 1,
            text: Strings.BOOKMARKED,
            icon: bookmarkedIconWhite,
            color: '#5FAE3A'
        },
    }

    static upvoteButtonState = {
        DEFAULT: {
            id: 0,
            text: Strings.UPVOTE,
            // icon: upvoteIconWhite,
            color: ''
        },
        UPVOTED: {
            id: 1,
            text: Strings.UPVOTED,
            // icon: upvotedIconWhite,
            color: '#5FAE3A'
        },
    }

    static postButtonState = {
        DEFAULT: {
            id: 0,
            text: Strings.POST,
            // icon: upvoteIconWhite,
            color: ''
        },
        POSTED: {
            id: 1,
            text: Strings.POSTED,
            // icon: upvotedIconWhite,
            color: '#5FAE3A'
        },
    }

    static resetPasswordButtonState = {
        DEFAULT: {
            id: 0,
            text: Strings.RESET_PASSWORD,
            // icon: upvoteIconWhite,
            color: ''
        },
        UPDATED: {
            id: 1,
            text: Strings.PASSWORD_UPDATED,
            // icon: upvotedIconWhite,
            color: '#5FAE3A'
        },
    }
}