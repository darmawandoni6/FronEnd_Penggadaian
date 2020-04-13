import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faArchive,
  faImage,
  faLock,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import { activeCSS } from "../utilities/function";
import { FE, view } from "../utilities/API";

import { connect } from "react-redux";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMaster: false,
      dataTrans: false,
    };
  }

  stleClick1() {
    let stat = "header-menu1";
    if (this.state.dataMaster) {
      stat = "header-menu2";
    }
    return stat;
  }
  stleClick2() {
    let stat = "header-menu1";
    if (this.state.dataTrans) {
      stat = "header-menu2";
    }
    return stat;
  }

  status(data) {
    if (data === "data")
      this.setState({
        dataMaster: !this.state.dataMaster,
        dataTrans: false,
      });
    else
      this.setState({
        dataMaster: false,
        dataTrans: !this.state.dataTrans,
      });
  }

  display1 = () => {
    this.status("data");
  };

  display2 = () => {
    this.status("trans");
  };

  Logout = () => {
    localStorage.removeItem("token");
    window.location.href = `${FE}/login`;
  };

  render() {
    const { data } = this.props.user;
    console.log(data);

    return (
      <div>
        <Row className="line1">
          <Col>
            <div className="poto-profil">
              {data.foto === null ? (
                <img src={require("../image/avataaars.svg")} alt="img" />
              ) : (
                <img src={`${view}/${data.foto}`} alt="img" />
              )}
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Row className="space">
              <Col>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "rgb(33, 37, 41)",
                  }}
                  to="/home"
                >
                  <div
                    className={`btn-menu ${activeCSS(
                      window.location.href,
                      "home"
                    )}`}
                  >
                    <FontAwesomeIcon icon={faHome} />
                    &nbsp; Home
                  </div>
                </Link>
              </Col>
            </Row>
            <Row className="space">
              <Col>
                <div
                  className={`btn-subMenu ${activeCSS(
                    this.props.url,
                    this.props.dataMaster
                  )}`}
                  onClick={this.display1}
                >
                  <FontAwesomeIcon icon={faBriefcase} />
                  &nbsp; Data Master
                  <div className={this.stleClick1()}>
                    <Link to="/nasabah" style={{ color: "rgb(33, 37, 41)" }}>
                      <div>&nbsp;Data Nasabah</div>
                    </Link>
                    <Link to="/barang" style={{ color: "rgb(33, 37, 41)" }}>
                      <div>&nbsp;Data barang</div>
                    </Link>
                    <Link to="/bunga" style={{ color: "rgb(33, 37, 41)" }}>
                      <div>&nbsp;Bunga</div>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="space">
              <Col>
                <div
                  className={`btn-subMenu ${activeCSS(
                    this.props.url,
                    this.props.trans
                  )}`}
                  onClick={this.display2}
                >
                  <FontAwesomeIcon icon={faArchive} />
                  &nbsp; Transaksi
                  <div className={this.stleClick2()}>
                    <Link to="/peminjaman" style={{ color: "rgb(33, 37, 41)" }}>
                      <div>&nbsp;Peminjaman</div>
                    </Link>
                    <Link
                      to="/perpanjangan"
                      style={{ color: "rgb(33, 37, 41)" }}
                    >
                      <div>&nbsp;Perpanjangan</div>
                    </Link>
                    <Link to="/pembayaran" style={{ color: "rgb(33, 37, 41)" }}>
                      <div>&nbsp;Pembayaran</div>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="space">
              <Col>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "rgb(33, 37, 41)",
                  }}
                  to="ganti-foto"
                >
                  <div
                    className={`btn-menu ${activeCSS(
                      this.props.url,
                      this.props.gantiFoto
                    )}`}
                  >
                    <FontAwesomeIcon icon={faImage} />
                    &nbsp; Ganti Foto
                  </div>
                </Link>
              </Col>
            </Row>
            <Row className="space">
              <Col>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "rgb(33, 37, 41)",
                  }}
                  to="ganti-pass"
                >
                  <div
                    className={`btn-menu ${activeCSS(
                      this.props.url,
                      this.props.gantiPass
                    )}`}
                  >
                    <FontAwesomeIcon icon={faLock} />
                    &nbsp; Ganti Password
                  </div>
                </Link>
              </Col>
            </Row>
            <Row className="space">
              <Col>
                <div className="btn-menu" onClick={this.Logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  &nbsp; Log Out
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.cekUser,
  };
};

export default connect(mapStateToProps)(Content);
