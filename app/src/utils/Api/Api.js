import qs from 'qs';

import Axios from "./BaseAxios";

export const User = {
  /**
   * @param data Objeto contendo username e password
   * @returns Promise
   */
  signIn: (data) => Axios.post('login', qs.stringify(data))
};
