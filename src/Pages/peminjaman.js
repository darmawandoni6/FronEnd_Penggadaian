import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../Componen/navbar";
import Left from "../Componen/left";
import { FE } from "../utilities/API";
import { IDRcurrency } from "../utilities/function";

import { connect } from "react-redux";
import { getPinjaman } from "../_action/pinjaman";

import "../css/nasabah.css";

class peminjaman extends Component {
  componentDidMount() {
    this.props.getPinjaman();
  }
  dateFormat = (data) => {
    const tgl = data.replace(/T[0-9]*:[0-9]*:[0-9]*.[0-9]*Z/g, "");
    const arrTgl = tgl.split("-");
    return arrTgl[1] + "-" + arrTgl[2] + "-" + arrTgl[0];
  };

  deadline(data) {
    let rt = "";
    const length = data.PERPANJANGANs.length;
    if (length === 0) rt = data.TGL_KEMBALI;
    else rt = data.PERPANJANGANs[length - 1].TGL_KEMBALI;
    return this.dateFormat(rt);
  }

  render() {
    const { data } = this.props.dataPinjaman;
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
        Header: "No. Peminjaman",
        accessor: "NO_PINJAMAN",
        headerStyle: { textAlign: "left", fontWeight: "bold" },
        width: 150,
        sortable: true,
        filterable: true,
      },
      {
        Header: "Tanggal",
        accessor: "TGL_PINJAM",
        headerStyle: { textAlign: "left", fontWeight: "bold" },
        width: 200,
        Cell: (props) => {
          return this.dateFormat(props.row._original.TGL_PINJAM);
        },
      },
      {
        Header: "Nasabah",
        accessor: "NASABAH.NASABAH",
        headerStyle: { textAlign: "left", fontWeight: "bold" },
        sortable: false,
      },
      {
        Header: "Pinjaman",
        accessor: "TOT_PINJAMAN",
        headerStyle: { textAlign: "right", fontWeight: "bold" },
        style: { textAlign: "right" },
        width: 120,
        sortable: false,
        Cell: (props) => {
          return IDRcurrency(props.row._original.TOT_PINJAMAN);
        },
      },
      {
        Header: "Jatuh Tempo",
        accessor: "TGL_KEMBALI",
        sortable: false,
        headerStyle: { fontWeight: "bold" },
        style: { textAlign: "center" },
        width: 200,
        Cell: (props) => {
          return this.deadline(props.original);
        },
      },
      {
        Header: "Status",
        accessor: "NASABAH.STATUS",
        sortable: false,
        headerStyle: { fontWeight: "bold" },
        style: { textAlign: "center" },
        width: 100,
        Cell: (props) => {
          return (
            <div style={{ backgroundColor: "green", color: "White" }}>
              {props.row._original.NASABAH.STATUS}
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <Navbar />
        <Container fluid>
          <Row>
            <Col xl={2} lg={3} md={4}>
              <Left url={`${FE}/peminjaman`} trans={"trans"} />
            </Col>
            <Col xl={10} lg={9} md={8}>
              <Row>
                <Col>
                  <br />
                  <h2>
                    <FontAwesomeIcon icon={faArchive} /> Peminjaman
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link to="peminjaman/add-peminjaman">
                    <Button variant="primary">Add Peminjaman</Button>
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col>
                  <br />
                  <ReactTable
                    columns={columns}
                    data={data}
                    defaultPageSize={10}
                  />
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
    dataPinjaman: state.getPinjaman,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPinjaman: () => dispatch(getPinjaman()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(peminjaman);
