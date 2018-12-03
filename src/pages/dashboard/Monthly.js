import React, { Component } from 'react';

class Monthly extends Component {

  render() {
    return (
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-5 mb-3">
            <div class="card shadow text-center">
              <div class="card-header">
                <h3>Jumlah Transaksi</h3>
              </div>
              <div class="card-body">
                <h1>0</h1>
              </div>
              <div class="card-footer text-muted">
                <p>Bulan ini : November</p>
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
                      <h1 className="my-auto">0</h1>
                      <p className="my-auto">Bulan ini <br/> November</p>
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
                      <h1 className="my-auto">0</h1>
                      <p className="my-auto">Bulan ini <br/> November</p>
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
              <p>Bulan ini : November</p>
            </div>
            <div className="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Kode Barang</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Nama Pelanggan</th>
                    <th scope="col">Jumlah Barang</th>
                    <th scope="col">Harga Satuan</th>
                    <th scope="col">Jumlah Harga</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody> */}
              </table>
            </div>
          </div>
        </div>

        <div className="row bg-white mt-5 py-2 shadow">
          <div className="col-md-12">
            <div className="oren">
              <h1>Laporan Pembelian</h1>
              <p>Bulan ini : November</p>
            </div>
            <div className="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Kode Barang</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Nama Pemasok</th>
                    <th scope="col">Jumlah Barang</th>
                    <th scope="col">Harga Satuan</th>
                    <th scope="col">Jumlah Harga</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody> */}
              </table>
            </div>
          </div>
        </div>

        <div className="row bg-white mt-5 py-2 shadow">
          <div className="col-md-12">
            <div className="oren">
              <h1>Laporan Stok Barang</h1>
              <p>Bulan ini : November</p>
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
              </table>
            </div>
          </div>
        </div>

        <div className="row bg-white my-5 py-2 shadow">
          <div className="col-md-12">
            <div className="oren">
              <h1>Laporan Mutasi Barang</h1>
              <p>Bulan ini : November</p>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
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
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Monthly;
