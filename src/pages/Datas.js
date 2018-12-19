import React, { Component } from 'react';
import Navbar from './Navbar';
import './css/datas.css';
import Ink from 'react-ink';
import { Link } from 'react-router-dom';

class Datas extends Component {

  render() {
    return (
        <div className="datas-menu">
          <Navbar headerApp="Data-data"/>
          <div className="container text-center my-5">
            <div className="row ">
              <Link to="/stuffs" className="col-md-6 datas-box datas-box-cream1">
              <img className="py-3" src={'https://svgshare.com/i/A1_.svg'} alt="stok-barang"/>
                <h3>Stok Barang</h3>
                <Ink/>
              </Link>
              <Link to="/category" className="col-md-6 datas-box datas-box-cream">
              <img className="py-3" src={'https://svgshare.com/i/A1D.svg'} alt="kategori-barang"/>
                <h3>Kategori Barang</h3>
                <Ink/>
              </Link>
            </div>

            <div className="row">
              <Link to="/supplier" className="col-md-6 datas-box datas-box-cream">
              <img className="py-3" src={'https://svgshare.com/i/A08.svg'} alt="pemasok-icon"/>
                <h3>Pemasok</h3>
                <Ink/>
              </Link>
              <Link to="/customer" className="col-md-6 datas-box datas-box-cream1">
              <img className="py-3" src={'https://svgshare.com/i/9zc.svg'} alt="pelangan-icon"/>
                <h3>Pelanggan</h3>
                <Ink/>
              </Link>
            </div>
          </div>
          </div>
    );
  }

}

export default Datas;
