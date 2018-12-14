import React, { Component } from 'react';
import './css/dashboard.css';
import Navbar from './Navbar';
import Daily from './dashboard/Daily';
import Monthly from './dashboard/Monthly';
import { Redirect } from 'react-router-dom';

import Ink from 'react-ink';
import { Route, Switch, NavLink } from 'react-router-dom';

class Dashboard extends Component {

  componentWillMount() {
    localStorage.getItem("token")
  }

  render() {
    if(localStorage.getItem('token') !== null) {
    return (
          <div className="dashboard">
            <Navbar headerApp="Dashboard"/>
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
            </Switch>
          </div>
    );
  } else {
    return(
      <Redirect to='/' />
    )}
}
}

export default Dashboard;
