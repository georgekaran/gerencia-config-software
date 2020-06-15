import { useState, useEffect } from 'react';

/**
 * Hook to fetch users.
 *
 * @returns {object} user
 */
const useFetchOne = (id, Api) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (id) {
      Api.findById(id).then((res) => {
        setUser(res.data);
      });
    }
  }, [id, Api]);

  return user;
};

export default useFetchOne;