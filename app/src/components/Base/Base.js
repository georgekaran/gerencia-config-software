import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Row } from "reactstrap";

const Base = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            {children}
          </Card>
        </div>
      </Row>
    </Container>
  );
};

Base.propTypes = {
  children: PropTypes.node.isRequired
};

export default Base;