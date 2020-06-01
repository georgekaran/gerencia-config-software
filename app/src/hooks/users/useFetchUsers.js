import React, { useState, useEffect } from 'react';
import { User as UserAPI } from '../../utils/Api/Api'

/**
 * Hook to fetch users.
 *
 * @returns {array} [users, setUsers]
 */
const useFetchUsers = ({ search = "", page = 0, size = 10 }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserAPI.findAllPageable({ search, page, size }).then((res) => {
      setUsers(res.data);
    });
  }, [search, page, size]);

  const triggerUpdate = async () => {
    const { data } = await UserAPI.findAllPageable({ search, page, size });
    setUsers(data);
  };

  return [users, triggerUpdate];
};

export default useFetchUsers;