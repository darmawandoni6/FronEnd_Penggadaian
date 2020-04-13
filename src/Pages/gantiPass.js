import React, { Component } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../Componen/navbar";
import Left from "../Componen/left";
import MdlAlert from "../Componen/modal/mdlAlert";
import { FE } from "../utilities/API";

import { connect } from "react-redux";
import { updatePassword } from "../_action/user";

import "../css/nasabah.css";

class gantiPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passLama: "",
      passBaru1: "",
      passBaru2: "",

      // validasi
      errPassBaru: false,
    };
  }

  valuePass = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validasi() {
    let rt = true;
    let pb1 = this.state.passBaru1;
    let pb2 = this.state.passBaru2;
    if (pb1 !== pb2) rt = false;
    this.setState({
      errPassBaru: !rt,
    });

    return rt;
  }
  savePassword = (e) => {
    e.preventDefault();
    if (this.validasi()) {
      const data = {
        user: this.props.user.user.user,
        passLama: this.state.passLama,
        passBaru: this.state.passBaru1,
      };
      this.props.updatePassword(data);
    }
  };
  render() {
    console.log("password", this.props.pass);

    const { data } = this.props.pass;

    let inValid = false;
    let open = false;
    if (data.status === false) {
      inValid = true;
    } else if (data.status === true) {
      open = true;
    }
    return (
      <div>
        <MdlAlert show={open} link="ganti-pass" />
        <Navbar />
        <Container fluid>
          <Row>
            <Col xl={2} lg={3} md={4}>
              <Left url={`${FE}/ganti-pass`} gantiPass={"gantiPass"} />
            </Col>
            <Col xl={10} lg={9} md={8}>
              <div className="conten-center">
                <Col xl={5} lg={6}>
                  <h3>
                    <FontAwesomeIcon icon={faLock} /> Ganti Password
                  </h3>
                  <Form onSubmit={this.savePassword}>
                    <Form.Group>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faLock} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="password"
                          name="passLama"
                          value={this.state.passLama}
                          onChange={this.valuePass}
                          placeholder="Password Lama"
                          required
                          isInvalid={inValid}
                        />
                        <Form.Control.Feedback type="invalid">
                          Password Salah
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faLock} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="password"
                          name="passBaru1"
                          value={this.state.passBaru1}
                          onChange={this.valuePass}
                          placeholder="Password Baru"
                          required
                          isInvalid={this.state.errPassBaru}
                        />
                        <Form.Control.Feedback type="invalid">
                          Password harus sama
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faLock} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="password"
                          name="passBaru2"
                          value={this.state.passBaru2}
                          onChange={this.valuePass}
                          placeholder="ketik Ulang Password Baru"
                          required
                          isInvalid={this.state.errPassBaru}
                        />
                        <Form.Control.Feedback type="invalid">
                          Password harus sama
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ width: "100%" }}
                    >
                      Save
                    </Button>
                  </Form>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pass: state.updatePass,
    user: state.cekUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (data) => dispatch(updatePassword(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(gantiPass);
