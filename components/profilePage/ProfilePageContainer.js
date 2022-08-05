import { connect } from 'react-redux'
import { changeTheme, addBookmark, removeBookmark, addToCompare, removeFromCompare, logout } from '../../actions'
import ProfilePage from './ProfilePage'

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    bookmarks: state.bookmarks,
    compares: state.compares,
    token: state.auth.accessToken,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchThemeChange: (theme) => {
      dispatch(changeTheme(theme))
    },

    dispatchAddBookmark: (courseId) => {
      dispatch(addBookmark(courseId))
    },

    dispatchRemoveBookmark: (courseId) => {
      dispatch(removeBookmark(courseId))
    },

    dispatchAddToCompare: (courseId) => {
      dispatch(addToCompare(courseId))
    },

    dispatchRemoveFromCompare: (courseId) => {
      dispatch(removeFromCompare(courseId))
    },

    dispatchLogout: () => {
      dispatch(logout());
    },
  }
}

const ProfilePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage)

export default ProfilePageContainer;
