let userDefaultState = {
};

const userReducer = (state = userDefaultState, action) => {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":
      return { ...action.user };
    case "SIGNOUT_USER":
      return { };
    default:
      return state;
  }
};

export default userReducer;
