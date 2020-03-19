export const setAuth = (auth = {}) => {
  localStorage.setItem("__AGI_AUTH", JSON.stringify(auth));
  return {
    type: 'SET_AUTH',
    payload: auth
  }
};

export const deleteAuth = (auth = {}) => ({
  type: 'REMOVE_AUTH',
  payload: auth
});