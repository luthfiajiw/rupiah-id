import React, { Component } from 'react';
import Navbar from './Navbar';
import './css/datas.css';
import Ink from 'react-ink';
import { Link, Switch, Route } from 'react-router-dom';

class Datas extends Component {

  render() {
    return (
        <div className="datas-menu">
          <Navbar headerApp="Data-data"/>
          <div className="container text-center my-5 rounded">
            <div className="row ">
              <Link to="/category" className="col-md-4 datas-box datas-box-cream">
                <img className="py-3" src={require('../assets/kategori-barang.svg')} alt="kateofi-barang"/>
                <h3>Kategori Barang</h3>
                <Ink/>
              </Link>
              <div className="col-md-4 datas-box datas-box-muted"></div>
              <Link to="/stuffs" className="col-md-4 datas-box datas-box-red">
                <img className="py-3" src={require('../assets/barang.svg')} alt="barang"/>
                <h3>Barang</h3>
                <Ink/>
              </Link>
            </div>

            <div className="row">
              <div className="col-md-4 datas-box datas-box-muted"></div>
              <Link to="/stock" className="col-md-4 datas-box datas-box-cream">
                <img className="py-3" src={require('../assets/stok-barang.svg')} alt="stok-barang"/>
                <h3>Stok Barang</h3>
                <Ink/>
              </Link>
              <div className="col-md-4 datas-box datas-box-muted"></div>
            </div>

            <div className="row">
              <Link to="/customer" className="col-md-4 datas-box datas-box-red">
                <img className="py-3" src={require('../assets/pelanggan-icon.svg')} alt="pelangan-icon"/>
                <h3>Pelanggan</h3>
                <Ink/>
              </Link>
              <div className="col-md-4 datas-box datas-box-muted"></div>
              <Link to="/supplier" className="col-md-4 datas-box datas-box-cream">
                <img className="py-3" src={require('../assets/pemasok-icon.svg')} alt="pemasok-icon"/>
                <h3>Pemasok</h3>
                <Ink/>
              </Link>
            </div>
          </div>
          </div>
    );
  }

}

export default Datas;
