import qs from 'qs';

import Axios from "./BaseAxios";

export const User = {
  /**
   * @param data Objeto contendo username e password
   * @returns Promise
   */
  signIn: (data) => Axios.post('login', qs.stringify(data)),

  /**
   * @param email User's email
   * @returns Promise
   */
  findByEmail: (email) => Axios.get(`/api/users/${email}`),

  /**
   * Fetch all users
   * @returns Promise
   */
  findAll: () => Axios.get(`/api/users`),
};
