import React, { useState, useEffect } from 'react';
import { User as UserAPI } from '../utils/Api/Api'

/**
 * Hook to fetch users.
 *
 * @returns {array} [users, setUsers]
 */
const useFetchUsers = ({ search = "", page = 0, size = 10 }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserAPI.findAllPageable({ search, page, size }).then((res) => {
      console.log("useFetchUsers", res);
      setUsers(res.data);
    });
  }, [search, page, size]);

  return [users, setUsers];
};

export default useFetchUsers;