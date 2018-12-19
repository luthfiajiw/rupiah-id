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
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand ml-auto" href="#">
            <img className="nav-brand-landing" src={'https://svgshare.com/i/9zU.svg'} alt="logo rupiah"/>
            </a>
          </nav>

          <div className="container pt-5">
            <div className="row">
              <div className="col-md-6 text-center text-md-left text-lg-left landing-text">
                <h1 className="fadeIn">RUPIAH.ID</h1>
                  <p className="fadeIn lead py-5 text-justify">Rupiah.ID adalah aplikasi yang bertujuan untuk membantu mencatat
                    transaksi penjualan dan pembelian yang terjadi pada barang daganganmu. Rupiah.ID merupakan aplikasi kasir berbasis web & mobile
                    sebagai pengganti peran aplikasi kasir di desktop. Dengan begitu kamu bisa melakukan transaksi & pembukuan melalui ponselmu
                    dimana pun kamu berada.
                  </p>
                  {/* <!-- Button trigger modal --> */}
                  <div className="row">
                    <div className="col-md-6">
                      <NavLink to="/sign-in" className="jackInTheBox">
                        <button type="button" class="btn btn-masuk">
                          Masuk
                          <Ink />
                        </button>
                      </NavLink>
                    </div>
                    <div className="col-md-6">
                      <NavLink to="/sign-up" className="jackInTheBox">
                        <button type="button" class="btn btn-daftar">
                          Gabung
                          <Ink />
                        </button>
                      </NavLink>
                    </div>
                  </div>
              </div>

              <div className="col-md-6 text-center">

              </div>
            </div>
          </div>
        </div>
    );
  }
}
}

export default Landing;
