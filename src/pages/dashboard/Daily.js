import React, { Component } from 'react';
import '../css/table.css';
import axios from 'axios';
import { css } from 'react-emotion';
import { BounceLoader, BarLoader } from 'react-spinners';

const override = css`
    border-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 30%);
`;

class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      baseUrl: "https://penjualanapp-api.herokuapp.com/api/v1",
      dates: "",
      purschaseDailyReport: null,
      salesDailyReport: [],
      stockDailyReport: [],
      mutationDailyReport: [],
      totalPurchasesItem: [],
      totalItemsPurchased: "",
      totalSalesItem: [],
      totalItemsSold: ""
    };
  }

  getPurchaseDailyReport = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}/purchasereport/daily?token=${token}`).then(res => {
      this.setState({
        purschaseDailyReport: res.data.data
      })

      for (var i = 0; i < this.state.purschaseDailyReport.length; i++) {
        this.state.totalPurchasesItem.push(this.state.purschaseDailyReport[i].product_amount)
      }


      let sum = this.state.totalPurchasesItem.reduce((a, b) => a+b, 0)
      this.setState({
        totalItemsPurchased: sum
      })

    }).catch(err => {
      localStorage.clear()
      this.forceUpdate();
    })
  }

  getSalesDailyReport = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}/salesreport/daily?token=${token}`).then(res => {
      this.setState({
        salesDailyReport: res.data.data
      })

      for (var i = 0; i < this.state.salesDailyReport.length; i++) {
        this.state.totalSalesItem.push(this.state.salesDailyReport[i].product_amount)
      }


      let sum = this.state.totalSalesItem.reduce((a, b) => a+b, 0)
      this.setState({
        totalItemsSold: sum
      })

    }).catch(err => {
      console.log(err);
    })
  }

  getStockDailyReport = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}/stockreport/daily?token=${token}`).then(res => {
      this.setState({
        stockDailyReport: res.data.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  getMutationDailyReport = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}/mutationreport/daily?token=${token}`).then(res => {
      this.setState({
        mutationDailyReport: res.data.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentWillMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  componentDidMount(){
    let date = new Date()
    let dateString = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear()

    this.setState({
      dates: dateString
    })

    this.getPurchaseDailyReport();
    this.getSalesDailyReport();
    this.getStockDailyReport();
    this.getMutationDailyReport();

  }

  render() {
    console.log(this.state);
    // Loading while getting data
    if (this.state.purschaseDailyReport === null) {
      return(
        <div className="loading-wrapper py-5">
          <div className='text-center py-5'>
            <BounceLoader
              className={override}
              sizeUnit={"px"}
              size={150}
              color={'#ff9906'}
              loading={this.state.loadingData}
            />
          </div>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-5 mb-3">
            <div class="card shadow text-center">
              <div class="card-header">
                <h3>Jumlah Transaksi</h3>
              </div>
              <div class="card-body">
                <h1>{this.state.totalPurchasesItem.length + this.state.totalSalesItem.length}</h1>
              </div>
              <div class="card-footer text-muted">
                <p>Tanggal : {this.state.dates}</p>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="row mb-2">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-header items-sold">
                    <div className="d-flex justify-content-between">
                      <h3 className="my-auto">Barang Terjual</h3>
                      <h1 className="my-auto">{this.state.totalItemsSold}</h1>
                      <p className="my-auto">Tanggal <br/> {this.state.dates}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-header items-sold">
                    <div className="d-flex justify-content-between">
                      <h3 className="my-auto">Barang Terbeli</h3>
                      <h1 className="my-auto">{this.state.totalItemsPurchased}</h1>
                      <p className="my-auto">Tanggal <br/> {this.state.dates}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row bg-white shadow mt-5 py-2 ">
          <div className="col-md-12">
            <div className="oren">
              <h1>Laporan Penjualan</h1>
              <p>Tanggal : {this.state.dates}</p>
            </div>
            <div className="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Kode Barang</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Nama Pelanggan</th>
                    <th scope="col">Jumlah Barang</th>
                    <th scope="col">Harga Satuan</th>
                    <th scope="col">Jumlah Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.salesDailyReport.map((data, i) => {
                    return(
                      <tr>
                        <td>{i+1}</td>
                        <td>{data.product_code}</td>
                        <td>{data.product_name}</td>
                        <td>{data.customer_name}</td>
                        <td>{data.product_amount}</td>
                        <td>{data.sell_price}</td>
                        <td>{data.subtotal_price}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row bg-white shadow mt-5 py-2 ">
          <div className="col-md-12">
            <div className="oren">
              <h1>Laporan Pembelian</h1>
              <p>Tanggal : {this.state.dates}</p>
            </div>
            <div className="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Kode Barang</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Nama Pemasok</th>
                    <th scope="col">Jumlah Barang</th>
                    <th scope="col">Harga Satuan</th>
                    <th scope="col">Jumlah Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.purschaseDailyReport.map((data, i) => {
                    return(
                      <tr>
                        <td>{i+1}</td>
                        <td>{data.product_code}</td>
                        <td>{data.product_name}</td>
                        <td>{data.supplier_name}</td>
                        <td>{data.product_amount}</td>
                        <td>{data.buy_price}</td>
                        <td>{data.subtotal_price}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row bg-white shadow mt-5 py-2 ">
          <div className="col-md-12">
            <div className="oren">
              <h1>Laporan Stok Barang</h1>
              <p>Tanggal : {this.state.dates}</p>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Kode Barang</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Harga Beli</th>
                    <th scope="col">Harga Jual</th>
                    <th scope="col">Jumlah Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.stockDailyReport.map((data, i) => {
                    return(
                      <tr>
                        <td>{i+1}</td>
                        <td>{data.product_code}</td>
                        <td>{data.product_name}</td>
                        <td>{data.unit}</td>
                        <td>{data.buy_price}</td>
                        <td>{data.sell_price}</td>
                        <td>{data.total_stock}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row bg-white shadow my-5 py-2 ">
          <div className="col-md-12">
            <div className="oren">
              <h1>Laporan Mutasi Barang</h1>
              <p>Tanggal : {this.state.dates}</p>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Kode Barang</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Stok Awal</th>
                    <th scope="col">Stok Masuk </th>
                    <th scope="col">Stok Keluar</th>
                    <th scope="col">Stok Akhir</th>
                    <th scope="col">Saldo Awal</th>
                    <th scope="col">Nilai Masuk</th>
                    <th scope="col">Nilai Keluar</th>
                    <th scope="col">Saldo Akhir</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.mutationDailyReport.map((data, i) => {
                    return(
                      <tr>
                        <td>{i+1}</td>
                        <td>{data.product_code}</td>
                        <td>{data.product_name}</td>
                        <td>{data.first_stock}</td>
                        <td>{data.stock_in}</td>
                        <td>{data.stock_out}</td>
                        <td>{data.total_stock}</td>
                        <td>{data.first_balance}</td>
                        <td>{data.value_in}</td>
                        <td>{data.value_out}</td>
                        <td>{data.total_balance}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Daily;
