export const signInUser = (user = {}) => ({
  type: 'SIGNIN_USER',
  user
});

export const signOutUser = (user = null) => ({
  type: 'SIGNOUT_USER',
  user
});