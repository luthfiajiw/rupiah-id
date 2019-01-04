import React, { Component } from 'react';
import Navbar from './Navbar';
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
import Clear from '@material-ui/icons/Clear';

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
      disabled: true,
      disabledBuy: true,
      message: "",
      open: false,
      openUpload: false,
      loading: true,
      dataProducts: null,
      dataSuppliers: null,
      supplier_id: "0",
      item_code: "",
      item_amount: 0,
      item_name: "",
      buy_price: "",
      total_price: "",
      created_at: "",
      buyItems: []
    };
  }

  handleSupplier = (e) => {
    const filter = this.state.dataSuppliers.filter(item => {
      return(item.supplier_id == e.target.value)
    })
    this.setState({
      supplier_id: parseInt(e.target.value),
      supplier_name : filter[0].name
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      message: "",
      buyItems: []
    })

    document.forms['form1'].reset()
  }


  handleProductCode = (e) => {
    const filter = this.state.dataProducts.filter(item => {
      return(item.product_code === e.target.value)
    })
    console.log(filter);
    this.setState({
      item_code: e.target.value,
      item_name: filter[0].product_name,
      buy_price: filter[0].buy_price
    })
  }

  handleProductAmount = (e) => {
    this.setState({
      item_amount: parseInt(e.target.value)
    })
  }

  addProductToList = (e) => {
    e.preventDefault();

    let buyItems = this.state.buyItems
    let product_code = this.state.item_code
    let product_amount = this.state.item_amount
    let product_name = this.state.item_name
    let buy_price = this.state.buy_price

    let product = {
      product_amount, product_code, product_name, buy_price
    }

    buyItems.push(product)

    this.setState({
      buyItems: buyItems,
    })
  }

  removeProductFromList = (i) => {
    let buyItems = this.state.buyItems
    buyItems.splice(i, 1)
    this.setState({
      buyItems: buyItems
    })
  }

  buyProducts = () => {
    const {baseUrl, token, buyItems } = this.state

    this.setState({
      uploadOpen: true
    })

    let product_code = new Array

      for (var i = 0; i < buyItems.length; i++) {
        product_code.push(buyItems[i].product_code)
      }

    let product_amount = new Array

    for (var i = 0; i < buyItems.length; i++) {
      product_amount.push(buyItems[i].product_amount)
    }

    axios.post(`${baseUrl}purchases?token=${token}`, {
      supplier_id: this.state.supplier_id,
      product_code: product_code,
      product_amount: product_amount
    }).then(res => {
      this.getPurchasesInvoice();
      this.setState({
        message: "Purchase succeed",
        uploadOpen: false,
        created_at: res.data.data[0].created_at
      })
    }).catch(err => {
      this.setState({
        message: "Failed",
        uploadOpen: false
      })
    })
  }

  getPurchasesInvoice = () => {
    const { baseUrl, token } = this.state

    axios.get(`${baseUrl}purchases?token=${token}`).then(res => {
      this.setState({
        total_price: res.data.data[0].total_price
      })
    })
  }

  getProduct = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}products?token=${token}`).then(
      res => {
        this.setState({
          dataProducts: res.data.data
        })
      }
    ).catch(err => console.log(err))
  }

  getSuppliers = () => {
    const { baseUrl, token } = this.state

    axios.get(`${baseUrl}suppliers?token=${token}`).then(res => {
      this.setState({
        dataSuppliers: res.data.data
      })
    }).catch(err => (err))
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

        {/* Loading while sending data */}
        <Dialog
          open={this.state.uploadOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
            {"LOADING ..."}
          </DialogTitle>

          <DialogContent>
            <div className="text-center wow bounceIn pb-5">
              <BounceLoader
                className={override}
                sizeUnit={"px"}
                size={70}
                color={'#ff9906'}
                loading={this.state.loading}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Purchase failed */}
        <Dialog
          open={this.state.message === "Failed" ? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
            {"Pembelian Gagal"}
          </DialogTitle>

          <DialogContent>
            <div className="text-center wow bounceIn">
              <Clear style={{ fontSize: "100px", color: "rgb(205, 32, 63)" }} />
            </div>
          </DialogContent>
          <DialogActions className="mx-auto">
            <Button onClick={this.handleClose} color="primary">
              OK
              </Button>
          </DialogActions>
        </Dialog>

        {/* Purchase Succeed */}
        <Dialog
          open={this.state.message === "Purchase succeed" ? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
            {"Pembelian Berhasil"}
          </DialogTitle>

          <DialogContent>
            <div>
              <div className="invoice text-center">
                <p>Tanggal : {this.state.created_at}</p>
                <p>Pemasok : {this.state.supplier_name}</p>
                <p>Keterangan :</p>
              </div>
              <div className="table-responsive text-center mb-3">
                <table className="table">
                  <thead className="thead-purchases">
                    <th>No.</th>
                    <th>Barang</th>
                    <th>Jumlah</th>
                    <th>Harga Satuan</th>
                    <th>Subtotal</th>
                  </thead>
                  <tbody>
                    {this.state.buyItems.map((item, i) => {
                      return (
                        <tr className="bounceIn">
                          <td>{i + 1}</td>
                          <td>{item.product_name}</td>
                          <td>
                            <span className="product_amount">{item.product_amount}</span>
                          </td>
                          <td>Rp. {item.buy_price}</td>
                          <td>Rp. {+item.buy_price * +item.product_amount}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="invoice ml-auto">
                <h5>Total Harga</h5>
                <p className="total_price">{this.state.total_price}</p>
              </div>
            </div>
          </DialogContent>

          <DialogActions className="mx-auto">
            <Button onClick={this.handleClose} color="primary">
              OK
              </Button>
          </DialogActions>
        </Dialog>

        <div className="container my-5">
          <div className="row">
            <div className="col-md-12">
              <div className="container">
                <h4>Beli Barang :</h4>
                <hr className="text-left w-25 ml-0 my-4"></hr>

                <div className="row">
                  <div className="col-md-6">
                    <form name="form1">
                      <div className="form-group inputPurchases mb-5">
                        <label>Nama Pemasok :</label>
                        <select onChange={this.handleSupplier} className="form-control" name="supplier">
                          <option  value="0">Pilih</option>
                          {this.state.dataSuppliers.map(data => {
                            return(
                              <option value={data.supplier_id}>{data.name}</option>
                            )
                          })}
                        </select>
                      </div>

                      <div className="form-group inputPurchases">
                        <label>Barang yang mau dibeli :</label>
                        <select className="form-control" name="items" onChange={this.handleProductCode}>
                          <option value="0" name="item_code">Pilih</option>
                          {this.state.dataProducts.map(data => {
                            return(
                              <option value={data.product_code} name={data.buy_price}>{data.product_name}</option>
                            )
                          })}
                        </select>
                      </div>

                      <div className="form-group inputPurchases">
                        <label>Jumlah :</label>
                        <input className="form-control" type="number" name="item_amount" placeholder="jumlah barang" onChange={this.handleProductAmount}/>
                      </div>
                      <button type="submit" className="btn btn-addItemPurchase my-2" onClick={this.addProductToList}>Tambah</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <div className="text-center">
                <h4>Daftar Barang Yang Akan Dibeli</h4>
                <hr className="w-50"/>
              </div>
              <div className="table-responsive text-center">
                <table className="table">
                  <thead className="thead-purchases">
                    <th>No.</th>
                    <th>Barang</th>
                    <th>Jumlah</th>
                    <th>Harga Satuan</th>
                    <th>Total Harga</th>
                    <th>Aksi</th>
                  </thead>
                  <tbody>
                      {this.state.buyItems.map((item,i) => {
                        return(
                          <tr className="bounceIn">
                            <td>{i+1}</td>
                            <td>{item.product_name}</td>
                            <td>
                              <span className="product_amount">{item.product_amount}</span>
                            </td>
                            <td>Rp. {item.buy_price}</td>
                            <td>Rp. {+item.buy_price * +item.product_amount}</td>
                            <td>
                              <button type="button" className="btn btn-deleteBuyItem" onClick={this.removeProductFromList}><li className="fas fa-trash"></li></button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
              <div className="text-right mb-5">
                <button type="button" className="btn btn-buyItems" onClick={this.buyProducts}>Beli</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Purchases;
