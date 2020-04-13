import React, { Component } from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { cekUser } from "../_action/user";

import "../css/global.css";

class NavbarComponent extends Component {
  componentDidMount() {
    this.props.cekUser();
  }
  render() {
    const { data, error } = this.props.user;
    console.log(this.props.user);

    if (error) {
      return <Redirect to="/" />;
    }
    return (
      <Navbar bg="light" variant="light" className="border">
        <Navbar.Brand href="#home">
          <div className="brand">Ok Computer</div>
        </Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Form inline>
          <div className="notif">0</div>
          <FontAwesomeIcon icon={faBell} />
          &nbsp; &nbsp; Hy, {data.user} &nbsp;
          <FontAwesomeIcon icon={faUser} />
        </Form>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.cekUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cekUser: () => dispatch(cekUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
