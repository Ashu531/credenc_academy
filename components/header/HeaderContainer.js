import React from "react";
import { connect } from "react-redux";
import { changeTheme, login } from "../../scripts/actions/index";
import Header from "./Header";

const mapStateToProps = (state) => {
  return {
    // theme: state.theme,
    tokens: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatchThemeChange: (theme) => {
    //   dispatch(changeTheme(theme));
    // },
    dispatchLogin: (tokens) => {
      dispatch(login(tokens));
    },
  };
};
const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
