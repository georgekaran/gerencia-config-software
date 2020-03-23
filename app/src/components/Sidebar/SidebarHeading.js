import React from 'react';
import PropTypes from 'prop-types';

const SidebarHeading = ({ title }) => {
  return (
    <h6 className="navbar-heading text-muted">{title}</h6>
  );
};

SidebarHeading.propTypes = {
  title: PropTypes.string.isRequired
};

export default SidebarHeading;