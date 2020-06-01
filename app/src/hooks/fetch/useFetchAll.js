import React, { useState, useEffect } from 'react';

/**
 * Hook to fetch users.
 *
 * @returns {array} [users, setUsers]
 */
const useFetchAll = ({ search = "", page = 0, size = 10 }, Api) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Api.findAllPageable({ search, page, size }).then((res) => {
      setData(res.data);
    });
  }, [search, page, size]);

  const triggerUpdate = async () => {
    const { data } = await Api.findAllPageable({ search, page, size });
    setData(data);
  };

  return [data, triggerUpdate];
};

export default useFetchAll;