import './ItemForm.scss';
import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";

import { Item as ItemAPI } from "../../utils/Api/Api";
import Base from "../../components/Base/Base";
import BaseHeader from "../../components/Base/BaseHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastError from "../../components/Toast/ToastError";
import FetchFactory from "../../hooks/FetchFactory";

const ItemFormSchema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório."),
  valorUnitario: Yup.number().typeError("Deve ser um número").positive('Valor unitário deve ser positivo.').required('Campo obrigatório.')
});

const ItemForm = () => {
  const { id = null } = useParams();
  const history = useHistory();
  const item = FetchFactory.fetchItem(id);
  const { register, handleSubmit, errors, reset } = useForm({ validationSchema: ItemFormSchema });

  const handleFormSubmit = (data) => {
    ItemAPI.save(id, data).then(res => {
      history.push('/items');
      ToastSuccess("Item criado/editado com sucesso!");
    }).catch(err => {
      console.log(err);
      ToastError("Erro ao salvar informações!");
    })
  };

  const handleListUser = () => {
    history.push(`/items/`);
  };

  useEffect(() => {
    if (item) {
      reset({ nome: item.nome, valorUnitario: item.valorUnitario });
    }
  }, [item]);

  return (
    <Base>
      <Row className="Row__Header">
        <Button className="icon icon-shape bg-default text-white rounded-circle my-lg-auto"
                onClick={handleListUser}>
          <i className="fas fa-arrow-left" />
        </Button>
        <BaseHeader title={!!id ? "Editar Item" : "Criar Item"}/>
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
                    data-testid="input-nome"
                    register={register}
                    errors={errors}
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-valorUnitario"
                  >
                    Valor Unitário
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-valorUnitario"
                    data-testid="input-valorUnitario"
                    type="valorUnitario"
                    name="valorUnitario"
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
              data-testid="button-submit"
            >
              Salvar
            </Button>
          </div>
        </Form>
      </CardBody>
    </Base>
  );
};

export default ItemForm;