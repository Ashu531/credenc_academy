import { initialState } from './index';

const theme = (state = initialState.theme, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return action.payload
    default:
      return state
  }
}

export default theme
