import React, { useState, useEffect } from 'react';
import { User as UserAPI } from '../utils/Api/Api'

/**
 * Hook to fetch users.
 *
 * @returns {array} [users, setUsers]
 */
const useFetchUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserAPI.findAll().then((res) => {
      console.log("useFetchUsers", res);
      setUsers(res.data.content)
    });
  }, []);

  return [users, setUsers];
};

export default useFetchUsers;