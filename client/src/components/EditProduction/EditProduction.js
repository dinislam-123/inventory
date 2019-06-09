import React, { Component } from 'react';
import './EditProduction.css';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default class EditProduction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prod_date: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
            prod_data: []
        };
    }

    productionDate = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ prod_date: e.target.value })

    }

    dataHandleFunction = () => {
        axios.get(`/products/api/production/date/?prod_date=${this.state.prod_date}`)
            .then(response => {
                this.setState({ prod_data: response.data });
            })
    }

    onChangeFindData = e => {

        this.dataHandleFunction()

        // axios.get(`/products/api/production/date/?prod_date=${this.state.prod_date}`)
        //     .then(response => {
        //         this.setState({ prod_data: response.data });
        //     })
    }

    handleDelete = (e) => {

        this.setState({ id: e.target.id });
        let item_id = e.target.id;
        this.setState({ pqty: e.target.name })
        let data1 = e.target.dataset['item-1'];
        let data2 = e.target.dataset['item-2'];

        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to Delete ?...',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        // console.log("computer..."+data1+","+data2+" "+item_id);

                        axios.get(`/products/api/masprod/?prod_no=${data1}`)
                            .then(response => {
                                this.setState({ data_res: response.data })
                                if (this.state.data_res.length > 0) {

                                    var obj = this.state.data_res;
                                    var mprod_qty = (obj[0].prod_qty);

                                    mprod_qty = Number(mprod_qty) - Number(data2)
                                    // alert(mship_qty)

                                    axios.put(`/products/api/masprod/update/?prod_no=${data1}`, {
                                        prod_qty: mprod_qty
                                    }).then(response => { console.log("updated..") })

                                    axios.delete(`/products/api/production/delete/?_id=${item_id}`)
                                        .then(response => { alert('Please check daily Production ....Data deleted..') }
                                        )
                                        this.dataHandleFunction();
                                }
                            })
                        }
                },
                {
                    label: 'No',
                    onClick: () => alert('Fine')
                  }
            ]

        })
    }

    render() {

        var rows = [];

        return (
            <div id="prod-body">
                <div>
                    <Navbar />
                </div>

                <br></br>
                <br></br>
                <div id="div_look">
                    <input type="text" id="pdate" name="pdate" value={this.state.prod_date} onChange={this.productionDate}></input>
                    <button id="search_data" onClick={this.onChangeFindData}>Production</button>
                </div>
                <br />
                <div id="display_data">

                    {this.state.prod_data.forEach(proddata => rows.push(
                        <tr key={proddata._id}><td>{proddata.prod_date}</td>
                            <td>{proddata.prod_no}</td>
                            <td>{proddata.prod_qty}</td>
                            <td><button id={proddata._id} data-item-0={proddata._id} data-item-1={proddata.prod_no} data-item-2={proddata.prod_qty} value={this.state.value} className="deletebtn" onClick={this.handleDelete}>Delete<img id="delete-icon" alt="d" src={require('./delete-sign.png')} /></button></td>
                        </tr>))}

                    <table id="prod-data">
                        <thead>
                            <tr><th>Date</th>
                                <th>Parts No</th>
                                <th>Production</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}