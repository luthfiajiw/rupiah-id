import React, { Component } from 'react';
import './css/landing.css';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Ink from 'react-ink';
import WOW from 'wowjs';

class Landing extends Component {

  componentDidMount(){
    new WOW.WOW().init();
  }

  render() {
    return (
        <div className="bg-landing">
          <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand nav-brand-landing ml-auto" href="#">LOGO</a>
          </nav>

          <div className="container pt-5">
            <div className="row">
              <div className="col-md-6 text-center text-md-left text-lg-left landing-text">
                <h1 className="wow bounceIn" data-wow-delay="1s" data-wow-duration="2s">RUPIAH.ID</h1>
                  <p className="lead py-5 text-justify">Rupiah.ID adalah aplikasi yang bertujuan untuk membantu mencatat
                    transaksi penjualan dan pembelian yang terjadi pada barang daganganmu. Rupiah merupakan aplikasi kasir berbasis web & mobile
                    sebagai pengganti peran aplikasi kasir di desktop. Dengan begitu kamu bisa melakukan transaksi & pembukuan melalui ponselmu
                    dimana pun kamu berada.
                  </p>
                  {/* <!-- Button trigger modal --> */}
                  <div className="row">
                    <div className="col-md-6">
                      <NavLink to="/sign-in" className="wow bounceIn" data-wow-delay="1s" data-wow-duration="2s">
                        <button type="button" class="btn btn-masuk">
                          Masuk
                          <Ink />
                        </button>
                      </NavLink>
                    </div>
                    <div className="col-md-6">
                      <NavLink to="/sign-up">
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

export default Landing;
