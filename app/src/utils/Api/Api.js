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
   * Fetch all users with pagination
   * @returns Promise
   */
  findAllPageable: (params) => Axios.get(`/api/users/`, { params }),

  /**
   * @param id User's id
   * @returns Promise
   */
  findById: (id) => Axios.get(`/api/users/id/${id}`),

  /**
   * @param id User's id
   * @param data
   * @returns Promise
   */
  updateUser: (id, data) => Axios.put(`/api/users/${id}`, data),

};
