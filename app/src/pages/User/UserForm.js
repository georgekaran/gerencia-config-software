import './UserForm.scss';
import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";

import { User as UserAPI } from "../../utils/Api/Api";
import Base from "../../components/Base/Base";
import BaseHeader from "../../components/Base/BaseHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastError from "../../components/Toast/ToastError";
import FetchFactory from "../../hooks/FetchFactory";

const UserFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Não é um email válido.")
    .required("Campo obrigatório."),
  nome: Yup.string().required("Campo obrigatório.")
});

const UserForm = () => {
  const { id = null } = useParams();
  const history = useHistory();
  const user = FetchFactory.fetchUser(id);
  const { register, handleSubmit, errors, reset } = useForm({ validationSchema: UserFormSchema });

  const handleFormSubmit = (data) => {
    UserAPI.saveUser(id, data).then(res => {
      history.push('/users');
      ToastSuccess("Usuário criado/editado com sucesso!");
    }).catch(err => {
      console.log(err);
      ToastError("Erro ao salvar informações!");
    })
  };

  const handleListUser = () => {
    history.push(`/users/`);
  };

  useEffect(() => {
    if (user) {
      reset({ email: user.email, nome: user.nome });
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Base>
      <Row className="Row__Header">
        <Button className="icon icon-shape bg-default text-white rounded-circle my-lg-auto"
                onClick={handleListUser}>
          <i className="fas fa-arrow-left" />
        </Button>
        <BaseHeader title={!!id ? "Editar usuário" : "Criar usuário"}/>
      </Row>
      <CardBody>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="pl-lg-4">
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-nome"
                  >
                    Nome
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
                    Email
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-email"
                    placeholder="seuemail@email.com"
                    type="email"
                    name="email"
                    register={register}
                    errors={errors}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              color="info"
            >
              Salvar
            </Button>
          </div>
        </Form>
      </CardBody>
    </Base>
  );
};

export default UserForm;