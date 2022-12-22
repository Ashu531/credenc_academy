import React from "react";
import { connect } from "react-redux";
import { changeTheme, login } from "../../scripts/actions/index";
import SignInModal from "./ForgotPasswordModal";

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    tokens: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchThemeChange: (theme) => {
      dispatch(changeTheme(theme));
    },
    dispatchLogin: (tokens) => {
      dispatch(login(tokens));
    },
  };
};
const SigninModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInModal);

export default SigninModalContainer;
