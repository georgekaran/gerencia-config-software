import './MethodPaymentForm.scss';
import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {CardBody, Col, Form, FormGroup, Row} from "reactstrap";

import { FormaPagamento as FormaPagamentoAPI } from "../../utils/Api/Api";
import Base from "../../components/Base/Base";
import BaseHeader from "../../components/Base/BaseHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastError from "../../components/Toast/ToastError";
import FetchFactory from "../../hooks/FetchFactory";

const FormaPagamentoFormSchema = Yup.object().shape({
  nome: Yup.string().required("Campo obrigatório."),
  valorUnitario: Yup.number().positive('Valor unitário deve ser positivo.').required('Campo obrigatório.')
});

const MethodPaymentForm = () => {
  const { id = null } = useParams();
  const history = useHistory();
  const formaPagamento = FetchFactory.fetchFormaPagamento(id);
  const { register, handleSubmit, errors, reset } = useForm({ validationSchema: FormaPagamentoFormSchema });

  const handleFormSubmit = (data) => {
    FormaPagamentoAPI.save(id, data).then(res => {
      history.push('/forma-pagamento');
      ToastSuccess("Forma pagamento criada/editada com sucesso!");
    }).catch(err => {
      console.log(err);
      ToastError("Erro ao salvar informações!");
    })
  };

  const handleListFormaPagamento = () => {
    history.push(`/forma-pagamento/`);
  };

  useEffect(() => {
    if (formaPagamento) {
      reset({ nome: formaPagamento.nome, valorUnitario: formaPagamento.valorUnitario });
    }
  }, [formaPagamento]);

  return (
    <Base>
      <Row className="Row__Header">
        <Button className="icon icon-shape bg-default text-white rounded-circle my-lg-auto"
                onClick={handleListFormaPagamento}>
          <i className="fas fa-arrow-left" />
        </Button>
        <BaseHeader title={!!id ? "Editar Forma Pagamento" : "Criar Forma Pagamento"}/>
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
                    htmlFor="input-valorUnitario"
                  >
                    Valor Unitário
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-valorUnitario"
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
            >
              Salvar
            </Button>
          </div>
        </Form>
      </CardBody>
    </Base>
  );
};

export default MethodPaymentForm;