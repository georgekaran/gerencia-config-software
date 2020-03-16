export const setAuth = (auth = {}) => ({
  type: 'SET_AUTH',
  auth
});

export const deleteAuth = (auth = null) => ({
  type: 'REMOVE_AUTH',
  auth
});