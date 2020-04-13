import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { IDRcurrency } from "../../utilities/function";

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

class mdlBrowse2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      KTP: ""
    };
  }

  handleModal = () => {
    this.setState({
      show: !this.state.show
    });
  };
  getData(data) {
    let sendData = {};
    const length = data.PERPANJANGANs.length;
    if (length === 0) {
      sendData = {
        id: data.id,
        NASABAH: data.NASABAH.NASABAH,
        NO_PINJAMAN: data.NO_PINJAMAN,
        TGL_PINJAM: data.TGL_PINJAM,
        TOT_PINJAMAN: data.TOT_PINJAMAN,
        TGL_KEMBALI: data.TGL_KEMBALI
      };
    } else
      sendData = {
        id: data.id,
        NASABAH: data.NASABAH.NASABAH,
        NO_PINJAMAN: data.NO_PINJAMAN,
        TGL_PINJAM: data.TGL_PINJAM,
        TOT_PINJAMAN: data.TOT_PINJAMAN,
        TGL_KEMBALI: data.PERPANJANGANs[length - 1].TGL_KEMBALI
      };

    this.props.getData(sendData);
    this.handleModal();
  }

  dateFormat = data => {
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
  filterData(data) {
    let rt = [];

    for (let i = 0; i <= data.length - 1; i++) {
      if (data[i].NASABAH.STATUS === "AKTIF") rt.push(data[i]);
    }

    return rt;
  }

  render() {
    const data = this.filterData(this.props.data);

    const columns = [
      {
        Header: "No. Peminjaman",
        accessor: "NO_PINJAMAN",
        headerStyle: { textAlign: "left" },
        width: 150,
        sortable: true,
        filterable: true
      },
      {
        Header: "Tanggal",
        accessor: "TGL_PINJAM",
        headerStyle: { textAlign: "left" },
        width: 200,
        Cell: props => {
          return this.dateFormat(props.row._original.TGL_PINJAM);
        }
      },
      {
        Header: "Nasabah",
        accessor: "NASABAH.NASABAH",
        headerStyle: { textAlign: "left" },
        sortable: false
      },
      {
        Header: "Pinjaman",
        accessor: "TOT_PINJAMAN",
        headerStyle: { textAlign: "right" },
        style: { textAlign: "right" },
        width: 120,
        sortable: false,
        Cell: props => {
          return IDRcurrency(props.row._original.TOT_PINJAMAN);
        }
      },
      {
        Header: "Jatuh Tempo",
        accessor: "TGL_KEMBALI",
        sortable: false,
        style: { textAlign: "center" },
        width: 200,
        Cell: props => {
          return this.deadline(props.original);
        }
      },
      {
        Header: "Status",
        accessor: "NASABAH.STATUS",
        sortable: false,
        style: { textAlign: "center" },
        width: 100,
        Cell: props => {
          return (
            <div style={{ backgroundColor: "green", color: "White" }}>
              {props.row._original.NASABAH.STATUS}
            </div>
          );
        }
      },
      {
        Header: "Get",
        style: { textAlign: "center" },
        Cell: props => {
          return (
            <div>
              <Button
                size="sm"
                onClick={() => {
                  this.getData(props.row._original);
                }}
              >
                Pilih
              </Button>
            </div>
          );
        },
        sortable: false,
        width: 120
      }
    ];

    return (
      <div>
        <Button variant="secondary" size="sm" onClick={this.handleModal}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>

        <Modal
          centered
          show={this.state.show}
          onHide={this.handleModal}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Data Peminjaman</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactTable columns={columns} data={data} defaultPageSize={5} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default mdlBrowse2;
