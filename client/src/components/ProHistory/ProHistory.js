import React, { Component } from 'react';
import './ProHistory.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default class ProHistory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prod_date: new Date().getDate() + '/' + (new Date().getMonth()+1)+ '/' + new Date().getFullYear(),
            prod_data: []
            
        };
    }

    productionDate = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({prod_date:e.target.value})

    }

    onChangeFindData = e => {

        axios.get(`/products/api/production/date/?prod_date=${this.state.prod_date}`)
            .then(response => {this.setState({ prod_data: response.data });
            })
    }

    // handleDelete = e =>{
    //     // this.setState({datadelete:e.target.id})
    //     alert(e.target.id)
    // }

    render() {
        
        var rows = [];
        return (
            <div id="prod-body">
                <div>
                    <Navbar/>
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
                        <tr><td>{proddata.prod_date}</td>
                            <td>{proddata.prod_no}</td>
                            <td>{proddata.prod_qty}</td>
                            {/* <td><button id={proddata._id} value={this.state.value} className="deletebtn" onClick={this.handleDelete}>Delete</button></td> */}
                        </tr>))}

                    <table id="prod-data">
                        <thead>
                            <tr><th>Date</th>
                                <th>Parts No</th>
                                <th>Production</th>
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