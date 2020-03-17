let contextReducerDefaultState = {
  user: null
};

const userReducer = (state = contextReducerDefaultState, action) => {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":
      return { ...state, user: action.user };
    case "SIGNOUT_USER":
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userReducer;
