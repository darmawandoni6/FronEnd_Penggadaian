import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

class mdlBrowse extends Component {
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
  getKtp(data) {
    this.props.getKTP(data);
    this.handleModal();
  }
  render() {
    const data = this.props.data;
    const columns = [
      {
        Header: "No. KTP",
        accessor: "KTP",
        headerStyle: { textAlign: "left" },
        width: 150,
        sortable: true,
        filterable: true
      },
      {
        Header: "Nasabah",
        accessor: "NASABAH",
        headerStyle: { textAlign: "left" },
        width: 200,
        filterable: true
      },
      {
        Header: "Alamat",
        accessor: "ALAMAT",
        headerStyle: { textAlign: "left" },
        sortable: false
      },
      {
        Header: "Telepon",
        accessor: "NO_TELP",
        headerStyle: { textAlign: "left" },
        width: 120,
        sortable: false
      },
      {
        Header: "Get",
        style: { textAlign: "center" },
        Cell: props => {
          return (
            <div>
              <Button
                onClick={() => {
                  this.getKtp(props.row._original);
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
            <Modal.Title>Data Nasabah</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactTable columns={columns} data={data} defaultPageSize={5} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default mdlBrowse;
