export const reducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        isLoading: false,
        userToken: action.token,
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
      };
    case 'GUEST_SIGN_IN':
      return {
        ...prevState,
        isGuest: true,
        isSignout: false,
        userToken: null,
      };
  }
};

export const initialState = {
  isGuest: false,
  isLoading: true,
  isSignout: false,
  userToken: null,
};
