import React, { Component } from "react";
import { Container, Form, Button, Col, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signUP, cekUser } from "../_action/user";

import { FE } from "../utilities/API";

import "../css/auth.css";

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      pass2: "",
      errPass: false,
    };
  }

  componentDidMount() {
    this.props.cekUser();
  }

  validation() {
    let rt = false;
    const pass1 = this.state.pass;
    const pass2 = this.state.pass2;
    if (pass1 === pass2) {
      rt = true;
    }
    this.setState({
      errPass: !rt,
    });

    return rt;
  }
  Register = (e) => {
    e.preventDefault();
    console.log(this.validation());

    if (this.validation()) {
      const data = {
        user: this.state.user,
        pass: this.state.pass,
      };
      this.props.signUP(data);
    }
  };

  dataRegis = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { data } = this.props.user;
    const data1 = this.props.resRegister.data;
    const { isLoading, error } = this.props.resRegister;

    if (data.length !== 0) {
      window.location.href = `${FE}/home`;
    }
    let errUser = false;
    if (data1.length !== 0) {
      if (data1.status === false) {
        errUser = true;
      } else if (data1.status === true) {
        window.localStorage.setItem("token", data1.token);
        window.location.href = `${FE}/home`;
      }
    }

    return (
      <Container fluid>
        <div className="frame">
          <Col xl={4} lg={6} md={7}>
            <div className="box">
              <Form onSubmit={this.Register}>
                <h2>Register ...</h2>
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>

                    <Form.Control
                      type="text"
                      value={this.state.user}
                      name="user"
                      onChange={this.dataRegis}
                      maxLength={10}
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      required
                      autoFocus
                      isInvalid={errUser}
                    />

                    <Form.Control.Feedback type="invalid">
                      {data1.msg}
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
                      value={this.state.pass}
                      name="pass"
                      onChange={this.dataRegis}
                      maxLength={10}
                      placeholder="Password"
                      isInvalid={this.state.errPass}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Password harus sama ...!!
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
                      value={this.state.pass2}
                      name="pass2"
                      onChange={this.dataRegis}
                      maxLength={10}
                      placeholder="Ketik ulang Password"
                      required
                      isInvalid={this.state.errPass}
                    />
                    <Form.Control.Feedback type="invalid">
                      Password harus sama ...!!
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Button variant="outline-primary" type="submit">
                    Register
                  </Button>
                  &nbsp;
                  <Link to="/">
                    <Button variant="outline-secondary">Login</Button>
                  </Link>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.cekUser,
    resRegister: state.signUP,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cekUser: () => dispatch(cekUser()),
    signUP: (data) => dispatch(signUP(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(register);
