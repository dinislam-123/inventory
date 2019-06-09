import React  from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import NewUser from './components/User/NewUser';
import Production from './components/Production/Production';
import Shipment from './components/Shipment/Shipment';
import Inventory from './components/Inventory/Inventory';
import ProHistory from './components/ProHistory/ProHistory';
import EditProduction from './components/EditProduction/EditProduction';
import DailyShipment from './components/DailyShipment/DailyShipment';

const App = () => (
  <Router>
    <div>
        <Route exact path="/" component={Login} /> 
        <Route exact path="/navbar" component={Navbar} />
        <Route exact path="/newuser" component={NewUser} />
        <Route exact path="/production" component={Production} />
        <Route exact path="/shipment" component={Shipment} />
        <Route exact path="/inventory" component={Inventory} />
        <Route exact path="/prohistory" component={ProHistory} />
        <Route exact path="/editproduction" component={EditProduction} />
        <Route exact path="/dailyshipment" component={DailyShipment} />
    </div>
  </Router>
);

export default App;

