import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_id: "",
            user_pwd: "",
            data_response: []
        };
    }


    userHandlebar = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    gotoNavbar = (e) => {
        e.preventDefault();

        axios.get(`/products/api/look/user/?user_id=${this.state.user_id}&user_pwd=${this.state.user_pwd}`)
            .then(response => {
                this.setState({ data_response: response })

                if (this.state.data_response.data.length > 0) {

                    axios.post(`/products/api/Login/`, { user_id: this.state.user_id })
                        .then(response)

                    // this.props.history.push({pathname:'/Navbar',
                    //                          state:{detail:"computer Data"}  })

                    this.props.history.push('/Navbar');
                }
                else
                    alert("Enter Correct User Id and Password ...");
            })
    }

    setTime =()=>{

        var d = new Date();
        var hours = d.toLocaleTimeString();
       
          this.setState({hours:hours
          });
      }
      
      componentWillMount(){
        this.setTime();
      }

      componentDidMount(){
         window.setInterval(function(){
          this.setTime();
        }.bind(this), 1000);
      }

    render() {

        return (
            <div id="login-body">
                <div className="space-1">
                </div>

                <div className="head-1">
                    <h4>Express</h4>
                </div>
                <div className="third-row">
                    <div id="login-part">
                        <form>
                            <div>
                                <input type="text"
                                    name="user_id" id="user-id-login" value={this.state.user_id} onChange={this.userHandlebar} placeholder="User Id"></input>
                            </div>
                            <br />
                            <div>
                                <input type="password"
                                    name="user_pwd" id="user-pwd-login" value={this.state.user_pwd} onChange={this.userHandlebar} placeholder="Password"></input>
                            </div>
                            <br />
                            <div className="btndiv">
                                <button id="user-loginbtn" onClick={this.gotoNavbar}>Login</button>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>

                <div className="title">
                    <p id="mclock">{this.state.hours}</p>
                    <h3>Inventory Management System</h3>
                    <p className="title-p">UofTBootCamp Full Stack web Development Final Project(individual)</p>
                    <p className="title-p">Created By: Md Din Islam</p>
                </div>
            </div>
        )
    }
}
