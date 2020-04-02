import React, { useState, useEffect } from 'react';
import { User as UserAPI } from '../../utils/Api/Api'

/**
 * Hook to fetch users.
 *
 * @returns {object} user
 */
const useFetchUser = (id) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (id) {
      UserAPI.findById(id).then((res) => {
        setUser(res.data);
      });
    }
  }, [id]);

  return user;
};

export default useFetchUser;