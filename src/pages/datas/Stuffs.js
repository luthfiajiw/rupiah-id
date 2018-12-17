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
    categories: null,
    product_code: "",
    name: "",
    category_id: 0,
    buy_price: "",
    sell_price: "",
    disabled: false,
    unit: "",
    token: "",
    baseUrl: "https://api-penjualanapp.herokuapp.com/api/v1/"
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })

    const { product_code, name, category_id, buy_price,
    sell_price, unit} = this.state

    if (product_code.length !== 0) {
      if (name.length !== 0) {
        if (category_id !== 0) {
          this.setState({
            disabled: true
          })
        } else {
          this.setState({
            disabled: false
          })
        }
      } else {
        this.setState({
          disabled: false
        })
      }
    } else {
      this.setState({
        disabled: false
      })
    }
  }

  handleOption = (i) => {
    this.setState({
      category_id: parseInt(i.target.value)
    })

    if (this.state.category_id === 0) {
      this.setState({
        disabled: true
      })
    } else {
      this.setState({
        disabled: false
      })
    }
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

  getCategory = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}category?token=${token}`).then(
      res => {
        this.setState({
          categories: res.data.data
        })
      }
    ).catch(err => console.log(err))
  }

  postProduct = (e) => {
    e.preventDefault();
    const {baseUrl,token} = this.state
    axios.post(`${baseUrl}product?token=${token}`, {
      product_code: this.state.product_code,
      name: this.state.name,
      category_id: this.state.category_id,
      buy_price: this.state.buy_price,
      sell_price: this.state.sell_price,
      unit: this.state.unit
    }).then(res => {
      console.log(res.data);
    })
  }

  componentWillMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  componentDidMount() {
    this.getProduct();
    this.getCategory();
  }

  render() {
    console.log(this.state);
    if (this.state.datas === null || this.state.categories === null) {
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
            <div className="col-md-12 py-5 text-right">
              <button type="button" className="btn btn-addCategory" data-toggle="collapse" data-target="#collapseInput"
                aria-expanded="false" aria-controls="collapseInput">
                + Tambah Barang
              </button>

              <div className="row">
                <div className="collapse col-md-6 mt-3" id="collapseInput">
                  <form className="pt-4">
                    <div className="inputDataBox">
                      <label className="px-2">Kode :</label>
                      <input type="number" name="product_code" placeholder="Kode Barang" onChange={this.handleChange}/>
                    </div>

                    <div className="inputDataBox">
                      <label className="px-2">Nama :</label>
                      <input type="text" name="name" placeholder="Nama Barang" onChange={this.handleChange}/>
                    </div>

                    <div className="inputDataBox">
                      <label className="px-2">Kategori :</label>
                      <select id="categories" name="categories">
                        <option value="0" onClick={this.handleOption}>Pilih</option>
                        {this.state.categories.map((category,i) => {
                          return(
                            <option value={category.category_id} onClick={this.handleOption}>{category.name}</option>
                          )
                        })}
                      </select>
                    </div>
                  </form>
                </div>

                <div className="col-md-6 collapse mt-3" id="collapseInput">
                  <form className="pt-md-4 pt-lg-4">
                    <div className="inputDataBox">
                      <label className="px-2">Harga Beli :</label>
                      <input type="number" name="buy_price" placeholder="IDR" onChange={this.handleChange}/>
                    </div>
                    <div className="inputDataBox">
                      <label className="px-2">Harga Jual</label>
                      <input type="number" name="sell_price" placeholder="IDR" onChange={this.handleChange}/>
                    </div>
                    <div className="inputDataBox">
                      <label className="px-2">Unit</label>
                      <input type="text" name="unit" placeholder="pcs, pack dll" onChange={this.handleChange}/>
                    </div>
                  </form>

                  <button type="submit" className="btn btn-postProducts" disabled={!this.state.disabled}> + </button>
                </div>
              </div>
            </div>
          </div>
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
                      <th scope="col">Harga Beli<br/>(IDR)</th>
                      <th scope="col">Harga Jual<br/>(IDR)</th>
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
