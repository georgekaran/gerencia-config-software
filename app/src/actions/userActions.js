export const userFetchSucceeded = (user = {}) => ({
  type: 'USER_FETCH_SUCCEEDED',
  user
});

export const signOutUser = (user = null) => ({
  type: 'SIGNOUT_USER',
  user
});