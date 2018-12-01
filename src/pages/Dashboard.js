import React, { Component } from 'react';
import './css/dashboard.css';
import Navbar from './Navbar';
import Daily from './dashboard/Daily';
import Monthly from './dashboard/Monthly';
import Datas from './Datas';
import Purchases from './Purchases';
import Sales from './Sales';
import Store from './Store';
import Ink from 'react-ink';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

class Dashboard extends Component {

  componentDidMount() {
    let oren = document.getElementsByClassName('btn-daily');

  }

  render() {
    return (
          <div className="dashboard">
            <Navbar/>
            <div className="container py-5 my-5">
              <div className="row py-3">
                <div className="col-md-9"></div>
                <div className="col-md-3 text-center">
                  <div className="btn-switch py-1 shadow">
                    <NavLink to="/dashboard/daily" activeClassName="oren--Active" className="btn btn-daily btn-day">
                      Harian
                      <Ink/>
                  </NavLink>
                    <NavLink to="/dashboard/monthly" activeClassName="oren--Active" className="btn btn-daily btn-month">
                      Bulanan
                      <Ink/>
                  </NavLink>
                  </div>

                </div>
              </div>
            </div>
            <Switch>
              <Route path="/dashboard/daily" component={Daily}/>
              <Route path="/dashboard/monthly" component={Monthly}/>
              <Route path="/datas" component={Datas}/>
              <Route path="/purchases" component={Purchases}/>
              <Route path="/sales" component={Sales}/>
              <Route path="/store" component={Store}/>
            </Switch>
          </div>
    );
  }

}

export default Dashboard;
