import React, { Component } from 'react';
import Navbar from './Navbar';
import FlipMove from 'react-flip-move';
import './css/purchases.css';
import axios from 'axios';
import { css } from 'react-emotion';
import { BounceLoader, BarLoader } from 'react-spinners';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DoneAll from '@material-ui/icons/DoneAll';

const override = css`
    border-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 30%);
`;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Purchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      baseUrl: "https://penjualanapp-api.herokuapp.com/api/v1/",
      dataProducts: null,
      dataSuppliers: null,
      supplier_id: "",
      item_code: "",
      item_amount: "",
      item_name: "",
      buyItems: []
    };
  }

handleSupplier = (e) => {
  this.setState({
    supplier_id: parseInt(e.target.value)
  })
}


  handleProductCode = (e) => {
    this.setState({
      item_code: e.target.value,
      item_name: e.target.innerHTML
    })
  }

  handleProductAmount = (e) => {
    this.setState({
      item_amount: parseInt(e.target.value)
    })
  }

  addProductToanArray = (e) => {
    e.preventDefault();

    let buyItems = this.state.buyItems
    let product_code = this.state.item_code
    let product_amount = this.state.item_amount
    let product_name = this.state.item_name

    let product = {
      product_amount, product_code, product_name
    }

    buyItems.push(product)

    this.setState({
      buyItems: buyItems
    })
  }

  getProduct = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}product?token=${token}`).then(
      res => {
        console.log(res.data);
        this.setState({
          dataProducts: res.data.data
        })
      }
    ).catch(err => console.log(err))
  }

  getSuppliers = () => {
    const { baseUrl, token } = this.state

    axios.get(`${baseUrl}supplier?token=${token}`).then(res => {
      this.setState({
        dataSuppliers: res.data.data
      })
    }).catch(err => console.log(err))
  }

  componentWillMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  componentDidMount(){
    this.getProduct();
    this.getSuppliers();
  }

  render() {
    console.log(this.state);
    // Loading while getting data
    if (this.state.dataProducts === null || this.state.dataSuppliers === null) {
      return(
        <div className="loading-wrapper">
          <div className='sweet-loading text-center'>
            <img className="logo-r" src={require('../assets/rupiah-id.svg')} alt="rupiah-id"/>
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
      <div className="purchases-menu">
        <Navbar headerApp="Pembelian"/>

        <div className="container my-5">
          <div className="row">
            <div className="col-md-12">
              <div className="container">
                <h4>Beli Barang :</h4>
                <hr className="w-25 ml-0 my-4"></hr>

                <div className="row">
                  <div className="col-md-6">
                    <div className="inputPurchases">
                      <label>Nama Pemasok :</label>
                      <select name="supplier">
                        <option value="0" onClick={this.handleSupplier}>Pilih</option>
                        {this.state.dataSuppliers.map(data => {
                          return(
                            <option value={data.supplier_id} onClick={this.handleSupplier}>{data.name}</option>
                          )
                        })}
                      </select>
                    </div>

                    <div className="inputPurchases">
                      <label>Barang yang mau dibeli :</label>
                      <select name="items">
                        <option value="0" onClick={this.handleProductCode}>Pilih</option>
                        {this.state.dataProducts.map(data => {
                          return(
                            <option value={data.product_code} onClick={this.handleProductCode}>{data.product_name}</option>
                          )
                        })}
                      </select>
                    </div>

                    <div className="inputPurchases">
                      <label>Jumlah :</label>
                      <input type="number" placeholder="jumlah barang" onChange={this.handleProductAmount}/>
                    </div>
                    <button type="submit" className="btn btn-addItemPurchase my-2" onClick={this.addProductToanArray}>Tambah</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <div className="text-center">
                <h4>List Barang Yang Akan Dibeli</h4>
                <hr className="w-50"/>
              </div>
              <div className="table-responsive text-center">
                <table className="table">
                  <thead className="thead-purchases">
                    <th>No.</th>
                    <th>Barang</th>
                    <th>Jumlah</th>
                  </thead>
                  <tbody>
                      {this.state.buyItems.map((item,i) => {
                        return(
                          <tr className="bounceIn">
                            <td>{i+1}</td>
                            <td>{item.product_name}</td>
                            <td>{item.product_amount}</td>
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

export default Purchases;
