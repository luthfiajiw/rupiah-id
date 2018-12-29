import React, { Component } from 'react';
import Navbar from './Navbar';
import './css/sales.css';
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

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      baseUrl: "https://penjualanapp-api.herokuapp.com/api/v1/",
      disabled: true,
      disabledSell: true,
      message: "",
      open: false,
      openUpload: false,
      loading: true,
      dataProducts: null,
      dataCustomers: null,
      customer_id: 0,
      item_code: "",
      item_amount: 0,
      item_name: "",
      sell_price: "",
      total_price: "",
      created_at: "",
      sellItems: []
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
      message: "",
      sellItems: []
    })

    document.forms['form1'].reset()
  }

  handleProductCode = (e) => {
    this.setState({
      item_code: e.target.value,
      item_name: e.target.innerHTML,
      sell_price: e.target.getAttribute('name')
    })
  }

  handleProductAmount = (e) => {
    const form1 = document.forms['form1']
    const item_amount = form1.elements["item_amount"].value

    this.setState({
      item_amount: parseInt(e.target.value)
    })
  }

  handleCustomer = (e) => {
    this.setState({
      customer_id: parseInt(e.target.value),
      customer_name: e.target.innerHTML
    })
  }

  addProductToList = (e) => {
    e.preventDefault();

    let sellItems = this.state.sellItems
    let product_code = this.state.item_code
    let product_amount = this.state.item_amount
    let product_name = this.state.item_name
    let sell_price = this.state.sell_price

    let product = {
      product_amount, product_code, product_name, sell_price
    }

    sellItems.push(product)

    this.setState({
      sellItems: sellItems
    })
  }

  removeProductFromList = (i) => {
    let sellItems = this.state.sellItems
    sellItems.splice(i, 1)
    this.setState({
      sellItems: sellItems
    })
  }

  sellProducts = () => {
    const { baseUrl, token, sellItems } = this.state

    this.setState({
      uploadOpen: true
    })

    let product_code = new Array
    for (var i = 0; i < sellItems.length; i++) {
      product_code.push(sellItems[i].product_code)
    }

    let product_amount = new Array
    for (var i = 0; i < sellItems.length; i++) {
      product_amount.push(sellItems[i].product_amount)
    }

    axios.post(`${baseUrl}sales?token=${token}`, {
      customer_id: this.state.customer_id,
      product_code: product_code,
      product_amount: product_amount
    }).then(res => {
      this.getSalesInvoice();
      this.setState({
        message: "Sale succeed",
        uploadOpen: false,
        sales_id: res.data.data[0].sales_id,
        created_at: res.data.data[0].created_at
      })
    }).catch(err => {
      this.setState({
        message: "Failed",
        uploadOpen: false
      })
    })
  }

  getSalesInvoice = () => {
    const { baseUrl, token } = this.state

    axios.get(`${baseUrl}sales?token=${token}`).then(res => {
      this.setState({
        total_price: res.data.data[0].total_price
      })
    })
  }

  getProduct = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}products?token=${token}`).then(
      res => {
        console.log(res.data);
        this.setState({
          dataProducts: res.data.data
        })
      }
    ).catch(err => console.log(err))
  }

  getCustomers = () => {
    const { baseUrl, token } = this.state

    axios.get(`${baseUrl}customers?token=${token}`).then(res => {
      this.setState({
        dataCustomers: res.data.data
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
    this.getCustomers();
  }

  render() {
    console.log(this.state);
    // Loading while getting data
    if (this.state.dataProducts === null || this.state.dataCustomers === null) {
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
      <div className="sales-menu">
        <Navbar headerApp="Penjualan"/>

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
              {"Penjualan Gagal"}
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
            open={this.state.message === "Sale succeed" ? true : false}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title"
              className="mx-auto text-center">
              {"Penjualan Berhasil"}
            </DialogTitle>

            <DialogContent>
              <div>
                <div className="invoice text-center">
                  <p>Tanggal : {this.state.created_at}</p>
                  <p>Pelanggan : {this.state.customer_name}</p>
                  <p>Status : <span className="received">Diterima</span></p>
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
                      {this.state.sellItems.map((item, i) => {
                        return (
                          <tr className="bounceIn">
                            <td>{i + 1}</td>
                            <td>{item.product_name}</td>
                            <td>
                              <span className="product_amount">{item.product_amount}</span>
                            </td>
                            <td>Rp. {item.sell_price}</td>
                            <td>Rp. {+item.sell_price * +item.product_amount}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="invoice">
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
                  <h4>Jual Barang :</h4>
                  <hr className="text-left w-25 ml-0 my-4"></hr>

                  <div className="row">
                    <div className="col-md-6">
                      <form name="form1">
                        <div className="form-group inputSales mb-5">
                          <label>Nama Pelangan :</label>
                          <select className="form-control" name="customer">
                            <option value="0" onClick={this.handleCustomer}>Pilih</option>
                              {this.state.dataCustomers.map(data => {
                                return(
                                  <option value={data.customer_id} onClick={this.handleCustomer}>{data.name}</option>
                                )
                              })}
                          </select>
                        </div>

                        <div className="form-group inputSales">
                          <label>Barang yang mau dijual :</label>
                          <select className="form-control" name="items">
                            <option value="0" name="item_code" onClick={this.handleProductCode}>Pilih</option>
                              {this.state.dataProducts.map(data => {
                                return(
                                  <option value={data.product_code} name={data.sell_price} onClick={this.handleProductCode}>{data.product_name}</option>
                                )
                              })}
                          </select>
                        </div>

                        <div className="form-group inputSales">
                          <label>Jumlah :</label>
                          <input className="form-control" type="number" name="item_amount" placeholder="jumlah barang" onChange={this.handleProductAmount}/>
                        </div>
                        <button type="submit" className="btn btn-addItemSales my-2" onClick={this.addProductToList}>Tambah</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <div className="text-center">
                  <h4>Daftar Barang Yang Akan Dijual</h4>
                  <hr className="w-50"/>
                </div>
                <div className="table-responsive text-center">
                  <table className="table">
                    <thead className="thead-sales">
                      <th>No.</th>
                      <th>Barang</th>
                      <th>Jumlah</th>
                      <th>Harga Satuan</th>
                      <th>Total Harga</th>
                      <th>Aksi</th>
                    </thead>
                    <tbody>
                      {this.state.sellItems.map((item,i) => {
                        return(
                          <tr className="bounceIn">
                            <td>{i+1}</td>
                            <td>{item.product_name}</td>
                            <td>
                              <span className="product_amount">{item.product_amount}</span>
                            </td>
                            <td>Rp. {item.sell_price}</td>
                            <td>Rp. {+item.sell_price * +item.product_amount}</td>
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
                  <button type="button" className="btn btn-sellItems" onClick={this.sellProducts}>Beli</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }

}

export default Sales;
