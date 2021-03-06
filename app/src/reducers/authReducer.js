let authReducerDefaultState = {
  expires_at: null,
  type: null,
  token: null
};

const authReducer = (state = authReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, ...action.payload };
    case "REMOVE_AUTH":
      return { user: null };
    default:
      return state;
  }
};

export default authReducer;
