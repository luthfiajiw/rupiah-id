import React, { Component } from 'react';
import './css/dashboard.css';
import './css/table.css';
import Navbar from './Navbar';
import Daily from './dashboard/Daily';
import Monthly from './dashboard/Monthly';
import axios from 'axios';
import Ink from 'react-ink';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: null,
      token: "",
      baseUrl: "https://penjualanapp-api.herokuapp.com/api/v1"
    };
  }

  getPurchaseDailyReport = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}/purchasereport/daily?token=${token}`).then(res => {
      this.setState({
        datas: res.data.data
      })
    }).catch(err => {
      console.log(err);
      localStorage.clear()
      this.forceUpdate()
    })
  }

  componentWillMount() {
    this.setState({
      token: localStorage.getItem("token")
    })
  }

  render() {
    if(localStorage.getItem('token') !== null) {
    return (
          <div className="dashboard">
            <Navbar headerApp="Dashboard"/>
            <div className="container py-5">
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
