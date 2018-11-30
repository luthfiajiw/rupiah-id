import React, { Component } from 'react';
import './css/navbar.css';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dashboard navbar-expand-lg">
        <a className="navbar-brand logo" href="#">RUPIAH.ID</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <a className="nav-link dashboard-icon" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link datas" href="#">Data-data</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link transaction dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Transaksi
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Penjualan</a>
                <a className="dropdown-item" href="#">Pembelian</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link setting dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pengaturan
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Toko</a>
                <a className="dropdown-item" href="#">Keluar</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

}

export default Navbar;
