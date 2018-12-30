import React, { Component } from 'react';
import './css/landing.css';
import { NavLink, Redirect} from 'react-router-dom';
import Ink from 'react-ink';

class Landing extends Component {

  componentDidMount(){
  }

  render() {
    if (localStorage.getItem('token') !== null) {
      return(
        <Redirect to="/dashboard/daily" />
      )
    } else {
    return (
        <div className="bg-landing">
          <nav className="container navbar navbar-expand-lg navbar-light">
            <NavLink className="navbar-brand my-3" to="/">
            <img className="nav-brand-landing" src={'https://svgshare.com/i/9zU.svg'} alt="logo rupiah"/>
            </NavLink>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to="/sign-in" className="nav-link link-landing">Masuk</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/sign-up" className="nav-link link-landing">Daftar</NavLink>
                </li>
              </ul>
            </div>
          </nav>

          <div className="container pt-3">
            <div className="row">
              <div className="col-md-6 my-5 py-3 text-center text-md-left text-lg-left landing-text">
                <h1 className="fadeIn">RUPIAH.ID</h1>
                <p className="fadeIn lead py-5 text-justify">Rupiah.ID adalah aplikasi yang bertujuan untuk membantu mencatat
                  transaksi penjualan dan pembelian yang terjadi pada barang daganganmu. Rupiah.ID merupakan aplikasi kasir berbasis web & mobile
                  sebagai pengganti peran aplikasi kasir di desktop. Dengan begitu kamu bisa melakukan transaksi & pembukuan melalui ponselmu
                  dimana pun kamu berada.
                </p>
              </div>

              <div className="col-md-6 text-center">
                <img className="img-fluid" src={require('.././assets/laptop-monitor.svg')} alt="rupiah-dashboard"/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
}

export default Landing;
