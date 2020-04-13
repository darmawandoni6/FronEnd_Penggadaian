import React, { Component } from "react";
import { Container, Form, Button, Col, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";

import { FE } from "../utilities/API";
import { connect } from "react-redux";
import { signIn } from "../_action/user";
import { cekUser } from "../_action/user";

import "../css/auth.css";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
    };
  }
  componentDidMount() {
    this.props.cekUser();
  }

  login = async (e) => {
    e.preventDefault();
    const data = {
      user: this.state.user,
      pass: this.state.pass,
    };
    console.log(data);

    this.props.signIn(data);
  };
  dataLogin = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { data } = this.props.user;
    const resData = this.props.resLogin.data;

    if (data.length !== 0) {
      window.location.href = `${FE}/home/`;
    }
    let inValidUser = false;
    let inValidPass = false;
    if (resData.length !== 0) {
      if (resData.statLogin === true) {
        window.localStorage.setItem("token", resData.token);
        window.location.href = `${FE}/home/`;
        // return <Redirect to="/home" />;
      } else if (resData.statUser === false) inValidUser = true;
      else if (resData.statPass === false) inValidPass = true;
    }
    return (
      <Container fluid>
        <div className="frame">
          <Col xl={4} lg={6} md={7}>
            <div className="box">
              <Form onSubmit={this.login}>
                <h2>Login ...</h2>
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      value={this.state.user}
                      name="user"
                      onChange={this.dataLogin}
                      placeholder="Username"
                      isInvalid={inValidUser}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Username tidak ada ...!!
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
                      name="pass"
                      value={this.state.pass}
                      onChange={this.dataLogin}
                      placeholder="Password"
                      isInvalid={inValidPass}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Password Salah ...!!
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Button variant="outline-primary" type="submit">
                    Login
                  </Button>
                  &nbsp;
                  <Link to="/register">
                    <Button variant="outline-secondary" type="submit">
                      Register
                    </Button>
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
    resLogin: state.signIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cekUser: () => dispatch(cekUser()),
    signIn: (data) => dispatch(signIn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(login);
