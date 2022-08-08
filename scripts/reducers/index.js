import { combineReducers } from 'redux';
import theme from './theme'
import auth from './auth';
const EdtechToken = 'credenc-edtech-authkey';

export const initialState = {
    tokens: {
        accessToken: typeof window !== "undefined" ?  localStorage.getItem(EdtechToken) || null : null,
        refreshToken: null
      },
    theme: 'light',
};

const rootReducer = combineReducers({
    theme,
    auth,
})

export default rootReducer
