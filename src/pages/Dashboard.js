import React, { Component } from 'react';
import './css/dashboard.css';
import './css/table.css';
import Navbar from './Navbar';
import Daily from './dashboard/Daily';
import Monthly from './dashboard/Monthly';
import axios from 'axios';
import { css } from 'react-emotion';
import { BounceLoader, BarLoader } from 'react-spinners';
import Ink from 'react-ink';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';

const override = css`
    border-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 30%);
`;

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
    axios.get(`${baseUrl}/purchasereport/daily?token=${localStorage.getItem("token")}`).then(res => {
      this.setState({
        datas: res.data
      })
    }).catch(err => {
      console.log(err);
      this.setState({
        datas: "Failed"
      })
      localStorage.clear()
    })
  }

  componentWillMount() {
    this.getPurchaseDailyReport();
  }

  componentDidMount() {
  }

  render() {
    if (this.state.datas == null) {
      return(
        <div className="loading-wrapper">
          <div className='sweet-loading text-center'>
            <img className="logo-r" src={require('../assets/rupiah-id.svg')} alt="rupiah-id"/>
            <BounceLoader
              className={override}
              sizeUnit={"px"}
              size={150}
              color={'#ffffff'}
              loading={this.state.loadingData}
            />
          </div>
        </div>
      )
    } else if(this.state.datas !== null || this.state.datas !== "Failed") {
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
  } else if (this.state.datas === "Failed") {
    return(
      <Redirect to='/' />
    )}
  }

}

export default Dashboard;
