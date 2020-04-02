import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonStrap } from "reactstrap";
import uniqid from 'uniqid';

const Button = ({ id = null, children, onClick = () => undefined, tooltip, ...props }) => {

  const btnId = useMemo(() => {
    return id ? id : uniqid('button');
  }, [id]);

  return (
    <>
      <ButtonStrap {...props} id={btnId} onClick={onClick}>
        {children}
      </ButtonStrap>
    </>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  tooltip: PropTypes.string
};

export default React.memo(Button);