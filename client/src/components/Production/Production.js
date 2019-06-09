import React, { Component } from 'react';
import './Production.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


export default class Production extends Component {
  constructor(props)
  {
    super(props)

  this.state = {
    prod_date: new Date().getFullYear()+'/'+new Date().getDate() + '/' + (new Date().getMonth()+1),
    prod_no: "",
    prod_qty: "",
    prod_dept: "",
    data_res: [],
    mship_qty: ""

  };
};

  handleChangeInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  showValue = e => {

    axios.get(`/products/api/masprod/?prod_no=${this.state.prod_no}`)
      .then(response => {
        this.setState({ data_res: response.data })
        if (this.state.data_res.length > 0) {

          var obj = this.state.data_res;
          var mprod_qty = (obj[0].prod_qty);

          mprod_qty = Number(mprod_qty) + Number(this.state.prod_qty)
          // alert(mship_qty)

          axios.put(`/products/api/masprod/update/?prod_no=${this.state.prod_no}`, {
            prod_qty: mprod_qty
          })
            .then(response => {
              console.log("updated..")
            })
        }
        else {
          axios.post(`/products/api/masprod/post/`, {
            prod_no: this.state.prod_no,
            prod_qty: this.state.prod_qty
          })
            .then(response => {
              console.log("data posted.. ")
            })

        }
        axios.post('/products/api/production/', {
          prod_date: this.state.prod_date,
          prod_no: this.state.prod_no,
          prod_qty: this.state.prod_qty,
          prod_dept: this.state.prod_dept
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        alert('Data Saved.......');
        this.setState({
          prod_no: "",
          prod_qty: "",
          prod_dept: ""
        })
      })

  }

  componentDidMount(){

    this.setState({prod_date: new Date().getDate() + '/' + (new Date().getMonth()+1)+'/'+new Date().getFullYear()})
  }

  render() {

    // var prod_date = new Date().getFullYear()+'/'+new Date().getDate() + '/' + (new Date().getMonth()+1)
    // prod_date = " ";
    return (
      <div id="body">
        <div>
          <Navbar/>
        </div>
        <br></br><br></br>
        <div className="production-menu">
          <div className="user-input-p">
            <br></br>
            <p>New Production Information</p>

            <div>
              <input id="current-date" type="text" name="prod_date" value={this.state.prod_date} onChange={this.handleChangeInput}></input>
            </div>
            <br></br>
            <div>
              <label id="label">Part No:</label><br />
              <select id="selectpart" name="prod_no" value={this.state.prod_no} onChange={this.handleChangeInput}>
                <option value="">Select Part</option>
                <option value="Toyota Rav 4">Toyota Rav 4</option>
                <option value="Toyota Corolla">Toyota Corolla</option>
                <option value="Honda CRV">Honda CRV</option>
                <option value="Honda Civic">Honda Civic</option>
                <option value="Dodge Journey">Dodge Journey</option>
                <option value="GMC Seara">GMC Seara</option>
              </select>
            </div>
            <br></br>
            <div>
              <label id="label">Quantity</label><br />
              <input type="text" name="prod_qty" id="pqty" value={this.state.prod_qty} onChange={this.handleChangeInput} required/>
            </div>
            <br></br>
            <div>
              <label id="label">Department:</label><br />
              <select id="department" name="prod_dept" value={this.state.prod_dept} onChange={this.handleChangeInput}>
                <option value="Paint Line">Paint Line</option>
                <option value="Welding">Welding</option>
                <option value="Press">Press</option>
                <option value="Fuel Door">Fuel Door</option>
              </select>
            </div>
            <br></br>
            <div>
              {
                this.state.prod_qty > 0 && <button className="productionbtn" onClick={this.showValue}>Save</button>

              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

