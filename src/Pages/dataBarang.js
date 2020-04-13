import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Componen/navbar";
import Left from "../Componen/left";
import { FE } from "../utilities/API";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

import { connect } from "react-redux";
import { getBarang } from "../_action/barang";

import "../css/nasabah.css";

class dataBarang extends Component {
  componentDidMount() {
    this.props.getBarang();
  }

  render() {
    const { data } = this.props.dataBarang;

    const columns = [
      {
        Header: "No.",
        headerStyle: { textAlign: "center" },
        style: { textAlign: "right" },
        width: 50,
        Cell: (props) => {
          return props.index + 1;
        },
      },
      {
        Header: "No. Peminjaman",
        accessor: "NO_PINJAMAN",
        headerStyle: { textAlign: "left" },
        width: 150,
        sortable: true,
        filterable: true,
      },
      {
        Header: "Nasabah",
        accessor: "NASABAH.NASABAH",
        headerStyle: { textAlign: "left" },
        sortable: false,
      },
      {
        Header: "Merk",
        accessor: "barang.MERK",
        width: 120,
        sortable: false,
      },
      {
        Header: "Barang",
        accessor: "barang.BARANG",
        width: 120,
        sortable: false,
      },
      {
        Header: "Detail",
        accessor: "barang.SPESIFIKASI",
        sortable: false,
      },
      {
        Header: "Status",
        accessor: "NASABAH.STATUS",
        sortable: false,
        style: { textAlign: "center" },
        width: 100,
        Cell: (props) => {
          return (
            <div className="view">{props.row._original.NASABAH.STATUS}</div>
          );
        },
      },
      // {
      //   Header: "Status",
      //   accessor: "NASABAH.STATUS",
      //   sortable: false,
      //   style: { textAlign: "center" },
      //   width: 100,
      //   Cell: (props) => {
      //     return (
      //       <div className="view-Barang">
      //         <FontAwesomeIcon icon={faSearch} />
      //       </div>
      //     );
      //   },
      // },
    ];

    return (
      <div>
        <Navbar />
        <Container fluid>
          <Row>
            <Col xl={2} lg={3} md={4}>
              <Left url={`${FE}/barang`} dataMaster={"dataMaster"} />
            </Col>
            <Col xl={10} lg={9} md={8}>
              <Row>
                <Col>
                  <br />
                  <h2>
                    <FontAwesomeIcon icon={faBriefcase} /> Data Barang
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col></Col>
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
    dataBarang: state.getBarang,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBarang: () => dispatch(getBarang()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(dataBarang);
