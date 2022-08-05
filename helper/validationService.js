import Strings from '../config/strings';

const validateName = (value) => {
    let name = value.replace(/\s+/g, ' ').trim();

    if (name.length === 0) {
        return `Name ${Strings.EMPTY_FIELD_ERROR}`;
    }

    if(name.length < 3){
        return Strings.NAME_TOO_SHORT_ERROR;
    }

    let result = name.match(/^[a-zA-Z ]+$/);
    if (!result) {
        return Strings.NAME_ERROR;
    }

    return null;
}

const validateEmail = (value) => {
    let email = value.trim();

    if (email.length === 0) {
        return `Email ${Strings.EMPTY_FIELD_ERROR}`;
        return false;
    }

    let res = email
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    if (!res) {
        return Strings.EMAIL_ERROR;
    }

    return null;
};

const validatePassword = (value) => {
    let password = value.trim();

    if (password.length === 0) {
        return `Password ${Strings.EMPTY_FIELD_ERROR}`;
    }

    if (password.length < 8) {
        return Strings.PASSWORD_LENGTH_ERROR;
    }

    let res = password.match(/[a-z]/g) &&
        password.match(/[A-Z]/g) &&
        password.match(/[0-9]/g);

    if (!res) {
        return Strings.PASSWORD_CONTENT_ERROR;
    }

    return null;
};

const validateConfirmPassword = (password, confirmPassword) => {
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    if (confirmPassword.length === 0) {
        return `Password ${Strings.EMPTY_FIELD_ERROR}`;
    }

    if (confirmPassword.length < 8) {
        return Strings.PASSWORD_LENGTH_ERROR;
    }

    let res = password === confirmPassword;

    if (!res) {
        return Strings.CONFIRM_PASSWORD_ERROR;
    }

    return null;
}

const validateOtp = (otp) => {
    otp = otp.join('');
    if(otp.length === 0){
        return `OTP ${Strings.EMPTY_FIELD_ERROR}`;
    }

    else if(otp.length < 6 || isNaN(otp))
        return Strings.OTP_ERROR;

    return null;
}

export {
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateOtp,
}