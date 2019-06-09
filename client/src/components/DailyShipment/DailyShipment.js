import React, { Component } from 'react';
import './DailyShipment.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default class DailyShipment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ship_date: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
            ship_data: []

        };
    }

    shipmentDate = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ ship_date: e.target.value })

    }

    onChangeFindData = e => {

        axios.get(`/products/api/shipment/date/?ship_date=${this.state.ship_date}`)
            .then(response => {
                this.setState({ ship_data: response.data });
            })
    }

    render() {

        var rows = [];
        return (
            <div id="ship-body">
                <div>
                    <Navbar />
                </div>

                <br></br>
                <br></br>
                <div id="div_look">
                    <input type="text" id="pdate" name="pdate" value={this.state.ship_date} onChange={this.shipmentDate}></input>
                    <button id="search_data" onClick={this.onChangeFindData}>Shipment</button>
                </div>
                <br />
                <div id="display-data-ship">

                    {this.state.ship_data.forEach(shipdata => rows.push(
                        <tr key={shipdata + shipdata._id}><td>{shipdata.ship_date}</td>
                            <td>{shipdata.prod_no}</td>
                            <td>{shipdata.ship_qty}</td>
                            {/* <td><button id={proddata._id} value={this.state.value} className="deletebtn" onClick={this.handleDelete}>Delete</button></td> */}
                        </tr>))}

                    <table id="ship-data">
                        <thead>
                            <tr><th>Date</th>
                                <th>Parts No</th>
                                <th>Shipment</th>
                                {/* <th>Manipulate</th> */}
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}