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
  saveUser: (id, data) => {
    return Axios({
      method: id ? 'PUT' : 'POST',
      url: id ? `/api/users/${id}` : '/api/users',
      data
    })
  },

  /**
   * Deletes a user from the database.
   *
   * @param id User's id
   * @returns Promise
   */
  deleteUser: (id) => Axios.delete(`/api/users/${id}`)
};
