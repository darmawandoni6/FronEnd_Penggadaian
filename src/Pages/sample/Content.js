import React, { Component } from "react";
import Select from "react-select";
import Axios from "axios";

import "./sample.css";

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      toJson: [],
      country: "",
      disabled: false,
      scaryAnimals: [
        { label: "Alligators", value: 1 },
        { label: "Crocodiles", value: 2 },
        { label: "Sharks", value: 3 },
        { label: "Small crocodiles", value: 4 },
        { label: "Smallest crocodiles", value: 5 },
        { label: "Snakes", value: 6 }
      ]
    };
  }

  componentDidMount() {
    Axios({
      method: "GET",
      url: "http://dev.farizdotid.com/api/daerahindonesia/provinsi"
    })
      .then(data => {
        data.data.semuaprovinsi.map((add, i) =>
          this.setState({
            data: [...this.state.data, { label: add.nama, value: add.id }]
          })
        );
      })
      .catch(err => console.log(err.message));
  }

  render() {
    console.log("====================================");
    // console.log(this.state.data);
    console.log(this.state.data);
    console.log(this.state.toJson);
    console.log("====================================");
    return (
      <div style={{ width: 450 }}>
        <Select
          options={this.state.data}
          onChange={opt => console.log(opt.label, opt.value)}
        />
        {/* {this.state.data.map(data => (
          <p key={data.value}>{data.label}</p>
        ))} */}
      </div>
      // </div>
    );
  }
}
