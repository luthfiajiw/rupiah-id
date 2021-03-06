import React, { Component } from 'react';
import './css/navbar.css';
import { Link, Redirect} from 'react-router-dom';
import Drawer from 'react-motion-drawer';
import axios from 'axios';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: undefined,
      baseUrl: "https://penjualanapp-api.herokuapp.com/api/v1",
      profile: [],
      openRight: false,
      openLeft: false,
      drawerStyle: `
    {
      "background": "#F9F9F9",
      "boxShadow": "rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px"
    }`,
      width: 250,
      noTouchOpen: false,
      noTouchClose: true
    };
  }

  getProfile = () => {
    const { baseUrl, token } = this.state

    axios.get(`${baseUrl}/account/profile?token=${token}`).then(res => {
      this.setState({
        profile: res.data.data,
      })
    })
  }

  setWidth = e => {
    this.setState({
      width: Number(e.target.value) || e.target.value
    });
  };

  setTouch = e => {
    this.setState({
      [e.target.name]: !e.target.checked
    })
  }

  setDrawerStyle = e => {
    e.preventDefault()
    this.setState({
      drawerStyle: this.drawerStyleRef.value
    })
}

  signOut = (e) => {
    localStorage.clear();
  }

  componentWillMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  componentDidMount() {
    this.getProfile();
  }

  render() {
    if (localStorage.getItem("token") === null) {
      return(
        <Redirect to="/" />
      )
    }

    const {
      drawerStyle: stringDrawerStyle,
      openLeft,
      openRight,
      noTouchOpen,
      noTouchClose
    } = this.state;

    let drawerStyle = {}
    try {
      drawerStyle = JSON.parse(stringDrawerStyle)
    } catch (err) {
      console.error('Error parsing JSON: ', err)
    }

    const drawerProps = {
      overlayColor: "rgba(255,255,255,0.6)",
      drawerStyle
    };


    return (
      <div>
        <div className="header-app">
          <div className="container-fluid text-center">
            <div className="row">
              <div className="col-md-12">
                <h1>{this.props.headerApp}</h1>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-dashboard navbar-expand-lg">
          <a className="navbar-brand">
            <img className="logo d-inline-block align-top" src={'https://imgur.com/FhclQFr.png'} alt="logo-rupoah"/>
             &nbsp; <span className="logo-text">UPIAH.ID</span>
          </a>
          <button onClick={()=>{this.setState({ openRight: !openRight, openLeft: false})}} className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/dashboard/daily" className="nav-link"><li className="fas fa-chart-bar"></li>Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/datas" className="nav-link datas"><li className="fas fa-database"></li>Data-data</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link transaction dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <li className="fas fa-balance-scale"></li>Transaksi
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/purchases" className="nav-link purchases"><li className="fas fa-cart-plus"></li>Pembelian</Link>
                  <Link to="/sales" className="nav-link sales"><li className="fas fa-shipping-fast"></li>Penjualan</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link setting dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <li className="fas fa-cog"></li>Pengaturan
                </a>
                <div className="dropdown-menu text-left" aria-labelledby="navbarDropdown">
                  <Link to="/profile" className="dropdown-item store"><i className="far fa-user-circle px-2"></i>&nbsp;Profil</Link>
                  <Link to="/" className="dropdown-item logout" onClick={this.signOut}><i className="fas fa-sign-out-alt px-2"></i> Keluar</Link>
                </div>
              </li>
            </ul>
          </div>

          {!openLeft &&
          <Drawer
            right
            width={this.state.width}
            {...drawerProps}
            open={openRight}
            onChange={open => this.setState({ openRight: open })}
            noTouchOpen={noTouchOpen}
            noTouchClose={noTouchClose}
          >
          <div className="drawer">
            <div className="drawer-header">
              <img className="ml-auto" src={this.state.profile.photo} alt="logo-rupiah"/>
              <p>{this.state.profile.email}</p>
            </div>

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/profile" className="ml-1 nav-link"><i className="far fa-user-circle px-2"></i>&nbsp;Profil</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/daily" className="nav-link"><li className="fas fa-chart-bar"></li>Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/datas" className="nav-link datas"><li className="fas fa-database"></li>Data-data</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link transaction dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <li className="fas fa-balance-scale"></li>Transaksi
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/purchases" className="nav-link purchases"><li className="fas fa-cart-plus"></li>Pembelian</Link>
                  <Link to="/sales" className="nav-link sales"><li className="fas fa-shipping-fast"></li>Penjualan</Link>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ul-logout">
              <li className="nav-item">
                <Link to="/" className="nav-link datas" onClick={this.signOut}><i className="fas fa-sign-out-alt px-2"></i> Keluar</Link>
              </li>
            </ul>
          </div>
          </Drawer>}

        </nav>
      </div>
    );
  }

}

export default Navbar;
