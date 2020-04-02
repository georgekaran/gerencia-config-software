import React from "react";
import PropTypes from "prop-types";
import { Input as InputStrap } from "reactstrap";

import './Input.scss';

function Input({ name, type, placeholder, errors, register, className = '', ...props }) {
  return (
    <>
      <InputStrap
        className={`${className} ${!!errors[name] && 'is-invalid'}`}
        name={name}
        placeholder={placeholder}
        type={type}
        innerRef={register}
        {...props}
      />
      <p className="ml-md-1 text-danger h4 font-weight-300">
        {!!errors[name] && errors[name].message}
      </p>
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.object,
  register: PropTypes.element.isRequired
};

export default Input;
