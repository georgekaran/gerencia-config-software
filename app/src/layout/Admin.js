import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function Admin({ children }) {
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
          {children}
        </Row>
      </Container>
    </div>
  );
}
