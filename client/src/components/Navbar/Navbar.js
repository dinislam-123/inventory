import React, { Component } from 'react';
import "./Navbar.css";
import axios from 'axios';

export default class Navbar extends Component {

    state = {
        user: [],
        user_data: "",
        hours:"",
        item:[]
    }

    handleClickMenu = e => {
        // this.setState({item: e.target.value})
        if (e.target.id === "stock-inventory") {
            // alert("computer");
            window.location.assign("/Inventory")
        }
        else if (e.target.id === "new-shipment") {
            window.location.assign('/Shipment');
        }
        else if (e.target.id === "daily-shipment") {
            window.location.assign('/dailyshipment')
        }
        else if (e.target.id === "new-production") {
            window.location.assign('/Production')
        }
        else if (e.target.id === "daily-production") {
            window.location.assign('/ProHistory')
        }
        else if (e.target.id === "new-user") {
            window.location.assign('/NewUser')
        }
        else if (e.target.id === "edit-production") {
            window.location.assign('/EditProduction')
        }
        else if (e.target.id === "Logout") {

            axios.post('/products/api/Logout/')
                .then(response => {
                    // alert("logout success..") 
                })
                // window.location.assign('/')
               document.location.replace('/');     
        }
    }

    setTime =()=>{

        var d = new Date();
        var hours= d.toLocaleTimeString();
        this.setState({hours:hours});
      }
      
      componentWillMount(){
        this.setTime();
      }

    componentDidMount() {
        axios.get(`/products/api/Login_data/`)
        .then(response => {this.setState({user:response.data}) })
       
        
        this.state.user.map((item, i) => { return (this.setState({ user_data: item.user_id })) })
                

            window.setInterval(function(){
                this.setTime();
              }.bind(this), 1000);
    }


    render() {
        return (
            <div>
                <div className="navbar">
                    <div className="dropdown">
                        <button className="dropbtn">User</button>
                        <div className="dropdown-content">
                            <a id="new-user" onClick={this.handleClickMenu}>Create New User</a>
                            <a>Edit User info</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Production</button>
                        <div className="dropdown-content">
                            <a id="new-production" onClick={this.handleClickMenu}>New Production</a>
                            <a id="daily-production" onClick={this.handleClickMenu}>Daily Production</a>
                            <a id="edit-production" onClick={this.handleClickMenu}>Modify Production</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Shipment</button>
                        <div className="dropdown-content">
                            <a id="new-shipment" onClick={this.handleClickMenu}>New Shipment</a>
                            <a id="daily-shipment" onClick={this.handleClickMenu}>Daily Shipment</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Inventory</button>
                        <div className="dropdown-content">
                            <a id="stock-inventory" onClick={this.handleClickMenu}>Stock Inventory</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn" id="Logout" onClick={this.handleClickMenu}>Logout</button>
                    </div>
                    <div id="user-img" className="user-img">
                       <img id="user-icon" alt="u" src={require('./user.png')} />
                    </div>
                    <div id="userdata" className="userdata">
                       <p id="userdata-p">{this.state.user_data}</p>
                    </div>
                    <div className="middle-clock">
                        <p>{this.state.hours}</p>
                    </div>

                </div>

            </div>
        );
    }

}