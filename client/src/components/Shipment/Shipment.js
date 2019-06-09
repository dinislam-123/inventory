import React, { Component } from 'react';
import './Shipment.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default class Production extends Component {

  state = {
    ship_date: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
    prod_no: "",
    totalqty: "",
    tp: ""

  };

  handleShipment = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleShipmentValue = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    // alert(e.target.value)
    this.setState({ prod_no: e.target.value })
    // alert(prod_no)
    axios.get(`/products/api/masprod/totalqty/?prod_no=${e.target.value}`)
      .then(response => {
        this.setState({ totalqty: response.data })
        let obj = this.state.totalqty
        if (this.state.totalqty.length > 0)
          obj.map(item => {return this.setState({ tp: item.prod_qty }) });
        else
          this.setState({ tp: "No Data" })
      })
  }

  shipDataValue = e => {
    // alert(this.state.tp)
    if (Number(this.state.ship_qty) > Number(this.state.tp)) {
      alert("Not... Enough... Qty....")
    }
    else {
      axios.post('/products/api/shipment/', {
        ship_date: this.state.ship_date,
        prod_no: this.state.prod_no,
        ship_qty: this.state.ship_qty
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })

      var mship_qty = "";
      mship_qty = Number(this.state.tp) - Number(this.state.ship_qty)

      axios.put(`/products/api/masprod/update/?prod_no=${this.state.prod_no}`, {
        prod_qty: mship_qty
      })
        .then(response => {
          console.log("updated..")
        })

      alert("Data Saved...");
      this.setState({ ship_qty: "" });
      this.setState({ tp: "" })
    }
  }

  render() {

    return (
      <div id="body">
        <div>
          <Navbar />
        </div>
        <br></br><br></br>

        <div className="shipment-menu">
          <div className="user-input">
            <br></br>
            <p>New Shipping Information</p>

            <div>
              <input type="text" name="ship_date" value={this.state.ship_date} id="current-date" onChange={this.handleShipment}></input>
            </div>
            <br></br>
            <div>
              <label id="label">Part No:</label><br />
              <select id="selectpart" name="prod_no" value={this.state.prod_no} onChange={this.handleShipmentValue}>
                <option value="">Select Part</option>
                <option value="Toyota Rav 4">Toyota Rav 4</option>
                <option value="Toyota Corolla">Toyota Corolla</option>
                <option value="Honda CRV">Honda CRV</option>
                <option value="Honda Civic">Honda Civic</option>
                <option value="Dodge Journey">Dodge Journey</option>
                <option value="GMC Seara">GMC Seara</option>
              </select>

            </div>
            <div className="totalQty" >
              <p id="p-stock">Stock : {this.state.tp}</p>

              {/* Stock{this.state.totalqty.map(item => <p key={item.total_qty} id="stock">{item.total_qty}</p>)} */}

            </div>
            <br></br>
            <div>
              <label id="label">Quantity</label><br />
              <input type="text" id="sqty" name="ship_qty" value={this.state.ship_qty} onChange={this.handleShipment}>{}</input>
            </div>
            <br></br>
            <div>
              {
                this.state.ship_qty > 0 && <button className="shipbtn" onClick={this.shipDataValue}>Save</button>

              }
            </div>

            {/* <div>
              {
                <button className="shipbtn" onClick={this.shipDataValue}>Save</button>
              }
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}