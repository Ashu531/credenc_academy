import { initialState } from './index';

const theme = (state = initialState.theme, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return action
    default:
      return state
  }
}

export default theme
