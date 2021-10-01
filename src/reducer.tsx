export const reducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        isLoading: false,
        userToken: action.token,
      };
    case 'RESTORE_IS_GUEST':
      return {
        ...prevState,
        isLoading: false,
        isGuest: action.isGuest,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        isGuest: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        isGuest: false,
        userId: null,
        isSignoutGuest: false,
      };
    case 'SIGN_OUT_GUEST':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        isGuest: false,
        userId: null,
        isSignoutGuest: true,
      };
    case 'GUEST_SIGN_IN':
      return {
        ...prevState,
        isGuest: true,
        isSignout: false,
        userToken: action.token,
      };
    case 'SET_USER_ID':
      return {
        ...prevState,
        userId: action.userId,
      };
  }
};

export const initialState = {
  isGuest: false,
  isLoading: true,
  isSignout: false,
  userToken: null,
  userId: null,
  isSignoutGuest: false,
};
