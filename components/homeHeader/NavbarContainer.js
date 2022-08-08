import React from "react";
import { connect } from "react-redux";
import { addBookmark, changeTheme, logout } from "../../actions/index.js";
import Navbar from "./Navbar";

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    tokens: state.auth,
    bookmarks: state.bookmarks,
    compares: state.compares
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchThemeChange: (theme) => {
      dispatch(changeTheme(theme));
    },
    dispatchLogout: () => {
      dispatch(logout());
    },
    dispatchAddBookmark: (courseId, bookmarks) => {
      dispatch(addBookmark(courseId, bookmarks))
    },
  };
};
const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

export default NavbarContainer;
