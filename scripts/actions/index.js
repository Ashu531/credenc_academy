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

  export const addBookmark = (id, bookmarks) => {
    let idArray = [];

    if (!Array.isArray(id)) {
      idArray = [id];
    } else idArray = [...id];

    let bookmarkSet = new Set([...bookmarks, ...idArray]);
    let bookmarkArray = Array.from(bookmarkSet);
    
    return {
      type: 'ADD_BOOKMARK',
      bookmarks: [...bookmarkArray]
    }
}

export const removeBookmark = (id, bookmarks) => {

  let currentBookmarks = bookmarks.filter(item => item != id.toString());

  return {
    type: 'REMOVE_BOOKMARK',
    bookmarks: currentBookmarks
  }
}