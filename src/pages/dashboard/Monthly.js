import React, { Component } from 'react';
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

class Monthly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      baseUrl: "https://penjualanapp-api.herokuapp.com/api/v1",
      month: "",
      purschaseMonthlyReport: null,
      salesMonthlyReport: [],
      stockMonthlyReport: [],
      mutationMonthlyReport: [],
      totalPurchasesItem: [],
      totalItemsPurchased: "",
      totalSalesItem: [],
      totalItemsSold: ""
    };
  }

  getPurchaseMonthlyReport = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}/purchasereport/monthly?token=${token}`).then(res => {
      this.setState({
        purschaseMonthlyReport: res.data.data
      })

      for (var i = 0; i < this.state.purschaseMonthlyReport.length; i++) {
        this.state.totalPurchasesItem.push(this.state.purschaseMonthlyReport[i].product_amount)
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

  getSalesMonthlyReport = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}/salesreport/monthly?token=${token}`).then(res => {
      this.setState({
        salesMonthlyReport: res.data.data
      })

      for (var i = 0; i < this.state.salesMonthlyReport.length; i++) {
        this.state.totalSalesItem.push(this.state.salesMonthlyReport[i].product_amount)
      }


      let sum = this.state.totalSalesItem.reduce((a, b) => a+b, 0)
      this.setState({
        totalItemsSold: sum
      })

    }).catch(err => {
      console.log(err);
    })
  }

  getStockMonthlyReport = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}/stockreport/monthly?token=${token}`).then(res => {
      this.setState({
        stockMonthlyReport: res.data.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  getMutationMonthlyReport = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}/mutationreport/monthly?token=${token}`).then(res => {
      this.setState({
        mutationMonthlyReport: res.data.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentWillMount(){
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  componentDidMount() {
    const months = ["Januari", "Februari", "Maret", "April", "Maret",
                    "Mei", "Juni", "Juli", "Agustus", "September", "Oktober",
                    "November", "Desember"]
    const date = new Date();
    const month = months[date.getMonth()+1] + " " + date.getFullYear()

    this.setState({
      month: month
    })

    this.getPurchaseMonthlyReport();
    this.getSalesMonthlyReport();
    this.getStockMonthlyReport();
    this.getMutationMonthlyReport();
  }

  render() {
    console.log(this.state);
    if (this.state.purschaseMonthlyReport === null) {
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
                <p>Bulan ini : {this.state.month}</p>
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
                      <p className="my-auto">Bulan ini <br/> {this.state.month}</p>
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
                      <p className="my-auto">Bulan ini <br/> {this.state.month}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row bg-white mt-5 py-2 shadow">
          <div className="col-md-12">
            <div className="oren">
              <h1>Laporan Penjualan</h1>
              <p>Bulan ini : {this.state.month}</p>
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
                {this.state.salesMonthlyReport.map((data, i) => {
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
              </table>
            </div>
          </div>
        </div>

        <div className="row bg-white mt-5 py-2 shadow">
          <div className="col-md-12">
            <div className="oren">
              <h1>Laporan Pembelian</h1>
              <p>Bulan ini : {this.state.month}</p>
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
                {this.state.purschaseMonthlyReport.map((data, i) => {
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
              </table>
            </div>
          </div>
        </div>

        <div className="row bg-white mt-5 py-2 shadow">
          <div className="col-md-12">
            <div className="oren">
              <h1>Laporan Stok Barang</h1>
              <p>Bulan ini : {this.state.month}</p>
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
                    <th scope="col">Stok Tersedia</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.stockMonthlyReport.map((data, i) => {
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

        <div className="row bg-white my-5 py-2 shadow">
          <div className="col-md-12">
            <div className="oren">
              <h1>Laporan Mutasi Barang</h1>
              <p>Bulan ini : {this.state.month}</p>
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
                  {this.state.mutationMonthlyReport.map((data, i) => {
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

export default Monthly;
