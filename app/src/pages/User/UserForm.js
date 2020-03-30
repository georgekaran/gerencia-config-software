import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";

import Base from "../../components/Base/Base";
import BaseHeader from "../../components/Base/BaseHeader";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";
import Input from "../../components/Input/Input";

const UserForm = props => {
  const { register, handleSubmit, errors } = useForm();

  const handleFormSubmit = (data) => {
    console.log("Data", data);
  };

  return (
    <Base>
      <BaseHeader title="Criar usuário"/>
      <CardBody>
        <Form handleSubmit={handleSubmit(handleFormSubmit)}>
          <h6 className="heading-small text-muted mb-4">
            User information
          </h6>
          <div className="pl-lg-4">
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Username
                  </label>
                  <Input
                    className="form-control-alternative"
                    name="nome"
                    placeholder="Nome"
                    type="text"
                    id="input-nome"
                    register={register}
                    errors={errors}
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Email address
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-email"
                    placeholder="jesse@example.com"
                    type="email"
                    name="email"
                    register={register}
                    errors={errors}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Form>
      </CardBody>
    </Base>
  );
};

UserForm.propTypes = {

};

export default UserForm;