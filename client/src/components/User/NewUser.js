import React, { Component } from 'react';
import './NewUser.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default class NewUser extends Component {

    state = {
        user_date: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
        user_id: "",
        user_name: "",
        user_password: "",
        user_dept: ""
    };

    handleUserInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    userSubmitHandle = e => {

        if (this.state.user_id === "") {
            alert("Please Enter user_id..");
        }
        else if (this.state.user_name === "") {
            alert("Please Enter user_name..");
        }
        else if (this.state.user_password === "") {
            alert("Please Enter user Password..");
        }
        else {

            axios.post('/products/api/user/', {
                user_date: this.state.user_date,
                user_id: this.state.user_id,
                user_name: this.state.user_name,
                user_pwd: this.state.user_password,
                user_dept: this.state.user_dept
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            alert('Data Saved.......');

            this.setState({
                user_id: "",
                user_name: "",
                user_password: "",
                user_dept: ""
            })
        }

    }

    render() {
        return (
            <div id="body">
                <div>
                    <Navbar />
                </div>
                <br></br><br></br>
                <div className="user-menu">
                    <div className="user-input-u">
                        <br></br>
                        <p>New User Information</p>

                        <div>
                            <input type="text" id="current-date" name="user_date" value={this.state.user_date} onChange={this.handleUserInput}></input>
                        </div>
                        <br></br>
                        <div>
                            <label id="label">User Id</label><br />
                            <input type="text" id="user_id" name="user_id" value={this.state.user_id} onChange={this.handleUserInput} />
                        </div>
                        <br></br>
                        <div>
                            <label id="label">User Name</label><br />
                            <input type="text" id="user_name" name="user_name" value={this.state.user_name} onChange={this.handleUserInput} />
                        </div>
                        <br></br>
                        <div>
                            <label id="label">Password</label><br />
                            <input class="pass-word" type="password" name="user_password" value={this.state.user_password} onChange={this.handleUserInput} />
                        </div>
                        <br></br>
                        <div>
                            <label id="label">Department:</label><br />
                            <select id="userdepart" name="user_dept" value={this.state.user_dept} onChange={this.handleUserInput}>
                                <option value="Paint Line">Paint Line</option>
                                <option value="Welding">Welding</option>
                                <option value="Press">Press</option>
                                <option value="Fuel Door">Fuel Door</option>
                            </select>
                        </div>
                        <br></br>
                        <div>
                            <button class="usersavebtn" onClick={this.userSubmitHandle}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}