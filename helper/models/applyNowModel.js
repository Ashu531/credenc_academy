import * as yup from 'yup';

let applyNowSchema = yup.object().shape({
    email: yup
    .string()
    .required('Please enter valid email')
    .min(5, 'Please enter valid email'),
    full_name: yup
    .string()
    .required('Please enter valid name')
    .min(3, 'Please enter valid name'),
    phone_number: yup
    .string()
    .required('Please enter valid 10 digit Number')
    .min(10, 'Please enter valid 10 digit Number'),

});

export default applyNowSchema;