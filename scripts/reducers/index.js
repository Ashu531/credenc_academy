import { combineReducers } from 'redux';
import theme from './theme'


export const initialState = {
    theme: 'light',
};

const rootReducer = combineReducers({
    theme
})

export default rootReducer
