import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Route, Switch } from "react-router-dom";

import Login from "../pages/Login/Login";

export default function Auth({ path }) {

  return (
    <div className="main-content bg-gradient-info ">
      <div className="header py-lg-8">
        <Container>
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-white">Bem-vindo!</h1>
                <p className="text-lead text-light">
                  Faça seu login abaixo ou peça acesso ao administrador do
                  sistema.
                </p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--8 pb-1">
        <Row className="justify-content-center">
          <Switch>
            <Route exact path={path}>
              <Login />
            </Route>
          </Switch>
        </Row>
      </Container>
    </div>
  );
}
