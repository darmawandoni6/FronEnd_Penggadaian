import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Link } from "react-router-dom";

import Navbar from "../Componen/navbar";
import Left from "../Componen/left";
import View from "../Componen/modal/mdlViewImg";

import { FE, view } from "../utilities/API";
import { IDRcurrency } from "../utilities/function";

import { connect } from "react-redux";
import { getPembayaran } from "../_action/pembayaran";

class pembayaranList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    this.props.getPembayaran();
  }

  dateFormat = (data) => {
    const tgl = data.replace(/T[0-9]*:[0-9]*:[0-9]*.[0-9]*Z/g, "");
    const arrTgl = tgl.split("-");
    return arrTgl[1] + "-" + arrTgl[2] + "-" + arrTgl[0];
  };

  viewList(data) {
    console.log(data);
    this.setState({
      show: true,
    });
  }
  render() {
    const { data } = this.props.resPembayaran;
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
        accessor: "pinjaman.NO_PINJAMAN",
        headerStyle: { textAlign: "left", fontWeight: "bold" },
        width: 150,
        sortable: true,
        filterable: true,
      },
      {
        Header: "Nasabah",
        accessor: "pinjaman.NASABAH.NASABAH",
        headerStyle: { textAlign: "left", fontWeight: "bold" },
        sortable: false,
      },
      {
        Header: "Bukti Transfer",
        accessor: "BUKTI_TRANS",
        headerStyle: { textAlign: "left", fontWeight: "bold" },
        sortable: false,
        width: 220,
      },
      {
        Header: "Tanggal Transfer",
        accessor: "TGL_TRANS",
        headerStyle: { textAlign: "left", fontWeight: "bold" },
        width: 150,
        sortable: false,
        Cell: (props) => {
          return this.dateFormat(props.row._original.TGL_TRANS);
        },
      },
      {
        Header: "Jumlah",
        accessor: "TOTAL",
        headerStyle: { textAlign: "right", fontWeight: "bold" },
        style: { textAlign: "right" },
        width: 200,
        sortable: false,
        Cell: (props) => {
          return IDRcurrency(props.row._original.TOTAL);
        },
      },
      {
        Header: "Action",
        headerStyle: { textAlign: "center", fontWeight: "bold" },
        style: { textAlign: "center" },
        width: 100,
        sortable: false,
        Cell: (props) => {
          return <View url={`${view}/${props.row._original.BUKTI_TRANS}`} />;
        },
      },
    ];
    return (
      <div>
        <Navbar />
        <Container fluid>
          <Row>
            <Col xl={2} lg={3} md={4}>
              <Left url={`${FE}/perpanjangan`} trans={"trans"} />
            </Col>
            <Col xl={10} lg={9} md={8}>
              <Row>
                <Col>
                  <br />
                  <h2>
                    <FontAwesomeIcon icon={faArchive} /> Pembayaran
                  </h2>
                  <Link to="/pembayaran/add-pembayaran">
                    <Button variant="primary">Add Pembyaran</Button>
                  </Link>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
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
    resPembayaran: state.getPembayaran,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPembayaran: () => dispatch(getPembayaran()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(pembayaranList);
