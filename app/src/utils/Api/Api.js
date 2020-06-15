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

export const Item = {
  /**
   * Fetch all items with pagination
   * @returns Promise
   */
  findAllPageable: (params) => Axios.get(`/api/itens/`, { params }),

  /**
   * @param id Item's id
   * @returns Promise
   */
  findById: (id) => Axios.get(`/api/itens/${id}`),

  /**
   * @param id Item's id
   * @param data
   * @returns Promise
   */
  save: (id, data) => {
    return Axios({
      method: id ? 'PUT' : 'POST',
      url: id ? `/api/itens/${id}` : '/api/itens',
      data
    })
  },

  /**
   * Deletes a item from the database.
   *
   * @param id User's id
   * @returns Promise
   */
  delete: (id) => Axios.delete(`/api/itens/${id}`)
};

export const FormaPagamento = {
  /**
   * Fetch all methods of payment with pagination
   * @returns Promise
   */
  findAllPageable: (params) => Axios.get(`/api/formapagamento/`, { params }),

  /**
   * @param id methods of payment's id
   * @returns Promise
   */
  findById: (id) => Axios.get(`/api/formapagamento/${id}`),

  /**
   * @param id methods of payment's id
   * @param data
   * @returns Promise
   */
  save: (id, data) => {
    return Axios({
      method: id ? 'PUT' : 'POST',
      url: id ? `/api/formapagamento/${id}` : '/api/formapagamento',
      data
    })
  },

  /**
   * Deletes a method of payment from the database.
   *
   * @param id methods of payment's id
   * @returns Promise
   */
  delete: (id) => Axios.delete(`/api/formapagamento/${id}`)
};