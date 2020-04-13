import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

import Navbar from "../Componen/navbar";
import Left from "../Componen/left";
import AddNasabah from "../Componen/modal/mdlAddNasabah";
import { FE } from "../utilities/API";

import { connect } from "react-redux";
import { getNasabah } from "../_action/nasabah";
import View from "../Componen/modal/mdlAction";

import "../css/nasabah.css";

class DataUser extends Component {
  componentDidMount() {
    this.props.getNasabah();
  }

  render() {
    const { data } = this.props.nasabah;
    const columns = [
      {
        Header: "No. ",
        headerStyle: { textAlign: "right", fontWeight: "bold" },
        style: { textAlign: "right" },
        width: 50,
        sortable: true,

        Cell: (props) => {
          return props.index + 1;
        },
      },
      {
        Header: "No. KTP",
        accessor: "KTP",
        headerStyle: { textAlign: "left", fontWeight: "bold" },
        width: 150,
        sortable: true,
        filterable: true,
      },
      {
        Header: "Nasabah",
        accessor: "NASABAH",
        headerStyle: { textAlign: "left", fontWeight: "bold" },
        width: 200,
        filterable: true,
      },
      {
        Header: "Alamat",
        accessor: "ALAMAT",
        headerStyle: { textAlign: "left", fontWeight: "bold" },
        sortable: false,
      },
      {
        Header: "Telepon",
        accessor: "NO_TELP",
        headerStyle: { textAlign: "left", fontWeight: "bold" },
        width: 120,
        sortable: false,
      },
      {
        Header: "Status",
        accessor: "STATUS",
        headerStyle: { fontWeight: "bold" },
        style: { textAlign: "center" },
        width: 100,
      },
      {
        Header: "Action",
        headerStyle: { fontWeight: "bold" },
        style: { textAlign: "center" },
        Cell: (props) => {
          return (
            <div>
              <View data={props.row._original} />
            </div>
          );
        },
        sortable: false,
        width: 120,
      },
    ];

    return (
      <div>
        <Navbar />
        <Container fluid>
          <Row>
            <Col xl={2} lg={3} md={4}>
              <Left url={`${FE}/nasabah`} dataMaster={"dataMaster"} />
            </Col>
            <Col xl={10} lg={9} md={8}>
              <Row>
                <Col>
                  <br />
                  <h2>
                    <FontAwesomeIcon icon={faBriefcase} /> Data Nasabah
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <AddNasabah />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <br />
                  <div className="dt-table">
                    <ReactTable
                      columns={columns}
                      data={data}
                      defaultPageSize={10}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nasabah: state.getNasabah,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getNasabah: () => dispatch(getNasabah()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataUser);
