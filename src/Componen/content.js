import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import "../css/content.css";

import Left from "./left";
import Right from "./right";

class Content extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col xl={2} lg={3} md={4}>
            <Left />
          </Col>

          <Col xl={10} lg={9} md={8}>
            <Right />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Content;
