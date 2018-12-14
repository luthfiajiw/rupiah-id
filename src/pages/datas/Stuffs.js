import React, { Component } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import '../css/stuffs.css';
import { css } from 'react-emotion';
import { BounceLoader } from 'react-spinners';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const override = css`
    border-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 30%);
`;

class Stuffs extends Component {
  state = {
    datas: null,
    token: "",
    baseUrl: "https://api-penjualanapp.herokuapp.com/api/v1/"
  }

  getProduct = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}product?token=${token}`).then(
      res => {
        console.log(res.data);
        this.setState({
          datas: res.data.data
        })
      }
    ).catch(err => console.log(err))
  }

  componentWillMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  componentDidMount() {
    this.getProduct();
  }

  render() {
    console.log(this.state.datas);
    if (this.state.datas == null) {
      return(
        <div className="loading-wrapper">
          <div className='sweet-loading text-center'>
            <img className="logo-r" src={require('../../assets/rupiah-id.svg')} alt="rupiah-id"/>
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
    }
    return (
      <div className="stuffs">
        <Navbar headerApp="Barang" />

        <div className="container my-5">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="table-responsive">
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Kode</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Kategori</th>
                      <th scope="col">Harga Beli</th>
                      <th scope="col">Harga Jual</th>
                      <th scope="col">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.datas.map((data,i) => {
                      return (
                        <tr>
                          <td>{i+1}</td>
                          <td>{data.product_code}</td>
                          <td>{data.name}</td>
                          <td>{data.categories.data.name}</td>
                          <td>{data.buy_price}</td>
                          <td>{data.sell_price}</td>
                          <td>{data.unit}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Stuffs;
