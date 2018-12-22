import React, { Component } from 'react';
import './css/navbar.css';
import { Link, Redirect} from 'react-router-dom';

class Navbar extends Component {

  signOut = (e) => {
    localStorage.clear();
  }

  render() {
    if (localStorage.getItem("token") === null) {
      return(
        <Redirect to="/" />
      )
    }
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
            <img className="logo d-inline-block align-top" src={'https://svgshare.com/i/9zU.svg'} alt="logo-rupoah"/>
             &nbsp; <span className="logo-text">UPIAH.ID</span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
        </nav>
      </div>
    );
  }

}

export default Navbar;
