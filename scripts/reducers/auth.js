import { initialState } from './index';

const auth = (state = initialState.tokens, {type, tokens}) => {
    switch (type) {
        case 'LOGIN':
            return tokens;
        case 'LOGOUT':
            return tokens;
        default:
            return state;
    }
}
  
  export default auth