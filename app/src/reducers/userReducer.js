let contextReducerDefaultState = {
  user: null
};

const userReducer = (state = contextReducerDefaultState, action) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return { user: action.user };
    case "GET_USER":
      return { state };
    case "SIGNOUT_USER":
      return { user: null };
    default:
      return state;
  }
};

export default userReducer;
