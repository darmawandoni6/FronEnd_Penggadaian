import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faFile,
  faMoneyCheck,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

import { Capitalize } from "../utilities/function";
import { connect } from "react-redux";

class Content2 extends Component {
  render() {
    const { data } = this.props.user;

    return (
      <Container fluid>
        <div className="header-text">
          <h1>
            Selamat Datang <br />
            {Capitalize(data.user)}
          </h1>
          <br />
        </div>
        <Row>
          <Col xl={4} lg={12}>
            <Link
              style={{ textDecoration: "none", color: "rgb(33, 37, 41)" }}
              to="/nasabah"
            >
              <div className="col-content">
                <div className="icon-box">
                  <h2>
                    <FontAwesomeIcon icon={faUsers} />
                    &nbsp;Nasabah
                  </h2>
                </div>
              </div>
            </Link>
          </Col>
          <Col xl={4} lg={12}>
            <Link
              style={{ textDecoration: "none", color: "rgb(33, 37, 41)" }}
              to="/peminjaman"
            >
              <div className="col-content2">
                <div className="icon-box">
                  <h2>
                    <FontAwesomeIcon icon={faFile} />
                    &nbsp;Peminjaman
                  </h2>
                </div>
              </div>
            </Link>
          </Col>
          <Col xl={4} lg={12}>
            <Link
              style={{ textDecoration: "none", color: "rgb(33, 37, 41)" }}
              to="/pembayaran"
            >
              <div className="col-content3">
                <div className="icon-box">
                  <h2>
                    <FontAwesomeIcon icon={faMoneyCheck} />
                    &nbsp;Pembayaran
                  </h2>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xl={4} lg={12}>
            <Link
              style={{ textDecoration: "none", color: "rgb(33, 37, 41)" }}
              to="/perpanjangan"
            >
              <div className="col-content2">
                <div className="icon-box">
                  <h2>
                    <FontAwesomeIcon icon={faFile} />
                    &nbsp;Perpanjangan
                  </h2>
                </div>
              </div>
            </Link>
          </Col>
          <Col xl={4} lg={12}>
            <div className="col-content4">
              <div className="icon-box">
                <h2>
                  <FontAwesomeIcon icon={faBook} />
                  &nbsp;Laporan
                </h2>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.cekUser,
  };
};

export default connect(mapStateToProps)(Content2);
