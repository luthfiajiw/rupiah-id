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
              <Link to="/stuffs" className="col-md-6 oder-1 order-md-1 order-lg-1 datas-box datas-box-cream1">
              <img className="py-3" src={'https://svgshare.com/i/A1_.svg'} alt="stok-barang"/>
                <h3>Stok Barang</h3>
                <Ink/>
                <div className="overlay-1">
                  <div className="caption">
                    <p className="lead"> Data Stok Barang</p>
                    <hr className="w-50 hr-caption"/>
                    <div>
                      <p className="data-caption">Untuk menambah, mencatat,<br/>dan menyimpan data stok barang anda</p>
                    </div>
                  </div>
                </div>
              </Link>
            <Link to="/category" className="col-md-6 order-2 order-md-2 order-lg-2 datas-box datas-box-cream">
              <img className="py-3" src={'https://svgshare.com/i/A1D.svg'} alt="kategori-barang"/>
                <h3>Kategori Barang</h3>
                <Ink/>
              <div className="overlay-2">
                <div className="caption">
                  <p className="lead">Data Kategori Barang</p>
                  <hr className="w-50 hr-caption" />
                  <div>
                    <p className="data-caption">Untuk menambah, mengubah,<br />dan menyimpan data kategori barang anda</p>
                  </div>
                </div>
              </div>
              </Link>
            </div>

            <div className="row">
            <Link to="/supplier" className="col-md-6 order-4 order-md-3 order-lg-3 datas-box datas-box-cream">
              <img className="py-3" src={'https://svgshare.com/i/A08.svg'} alt="pemasok-icon"/>
                <h3>Pemasok</h3>
                <Ink/>
              <div className="overlay-2">
                <div className="caption">
                  <p className="lead">Data Pemasok</p>
                  <hr className="w-50 hr-caption" />
                  <div>
                  <p className="data-caption">Untuk menambah, mencatat,<br />dan menyimpan data pemasok barang anda</p>
                  </div>
                </div>
              </div>
              </Link>
            <Link to="/customer" className="col-md-6 order-3 order-md-4 order-lg-4 datas-box datas-box-cream1">
              <img className="py-3" src={'https://svgshare.com/i/9zc.svg'} alt="pelangan-icon"/>
                <h3>Pelanggan</h3>
                <Ink/>
              <div className="overlay-1">
                <div className="caption">
                  <p className="lead">Data Pelanggan</p>
                  <hr className="w-50 hr-caption" />
                  <div>
                  <p className="data-caption">Untuk menambah, mencatat,<br />dan menyimpan data pelanggan anda</p>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          </div>
          </div>
    );
  }

}

export default Datas;
