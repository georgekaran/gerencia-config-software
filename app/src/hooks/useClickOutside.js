import React, { useEffect, useRef } from 'react';

// Generic hook to perform action on click outside element
const useClickOutside = (fn = () => undefined, shouldTrigger = true) => {
  const clickOutsideRef = useRef();

  const onClick = e => {
    const current = clickOutsideRef.current;
    if (current && !current.contains(e.target)) {
      fn();
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  });

  return [clickOutsideRef]
};

export default useClickOutside;