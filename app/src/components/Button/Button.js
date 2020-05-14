import './Button.scss';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonStrap } from "reactstrap";
import uniqid from 'uniqid';

const Button = ({ id = null,
                  children,
                  onClick = () => undefined,
                  tooltip,
                  className,
                  ...props }) => {

  const btnId = useMemo(() => {
    return id ? id : uniqid('button');
  }, [id]);

  return (
    <>
      <ButtonStrap id={btnId}
                   onClick={onClick}
                   className={`Button ${className}`}
                   {...props}>
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