import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";

import { setAuth } from "../../actions/authActions";

import Input from "../../components/Input/Input";
import { User } from "../../utils/Api/Api";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email("Não é um email válido.")
    .required("Campo obrigatório."),
  password: Yup.string().required("Campo obrigatório.")
});

const Login = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    validationSchema: LoginSchema
  });

  const onSubmit = data => {
    User.signIn(data)
      .then(res => {
        dispatch(setAuth(res.data));
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => localStorage.removeItem("__AGI_AUTH"), []);

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-1">
            <div className="text-muted text-center mt-2 mb-3">
              <h2>AGI - PDV</h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="username"
                    placeholder="Email"
                    type="email"
                    register={register}
                    errors={errors}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="password"
                    placeholder="Senha"
                    type="password"
                    register={register}
                    errors={errors}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Entrar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
