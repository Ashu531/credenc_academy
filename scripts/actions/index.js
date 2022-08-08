const authKey = 'credenc-edtech-authkey';

export const changeTheme = (theme) => {
    return {
      type: 'CHANGE_THEME',
      theme
    }
  }

  export const login = (tokens) => {
    localStorage.setItem(authKey, tokens['access']);
    return {
        type: 'LOGIN',
        tokens: {
          refreshToken: tokens['refresh'],
          accessToken: tokens['access']
        }
    }
  }

  export const logout = (token) => {
    localStorage.removeItem(authKey);
    return {
        type: 'LOGOUT',
        tokens: {
          refreshToken: null,
          accessToken: null
        }
    }
  }