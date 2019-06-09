import React, { Component } from 'react';
import './Inventory.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default class Inventory extends Component {
    constructor(props) {
        super(props)

        this.state = { persons: [] };
    }

    searchHandlebar = e => {

        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ prod_date: this.state.value })
    }

    onChangeFindData = e => {

        axios.get(`/products/api/masprod/inventory/`)
            .then(response => { 
                
                // console.log(response.data)
                const persons = response.data;
                this.setState({ persons });
                console.log(persons);
            })
    }

    render() {
        var rows = [];

        return (
            <div id="inv-body">
                <div>
                    <Navbar/>
                </div>
              
                <br></br>
                <br></br>
                <div id="div-inv-look">
                    <button id="search-inv-data" onClick={this.onChangeFindData}>Current Production Balance</button>
                </div>
                <br />
                <div id="display-inv-data">
               
                    {this.state.persons.forEach(item => rows.push(
                        <tr>
                            <td>{item.prod_no}</td>
                            <td>{item.prod_qty}</td>
                        </tr>))
                    }

                    <table id="prod-inv-data">
                        <thead>
                            <tr>
                                <th>Parts No</th>
                                <th>Production</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}