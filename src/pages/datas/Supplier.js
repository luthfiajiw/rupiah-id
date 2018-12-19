import React, { Component } from 'react';
import Navbar from '../Navbar';
import Ink from 'react-ink';
import '../css/supplier.css';
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

class Supplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      baseUrl:"https://penjualanapp-api.herokuapp.com/api/v1/supplier",
      datas: null,
      supplier_id: "",
      city_id: "",
      city_name: "",
      name: "",
      address: "",
      phone_number: "",
      disabled: false
    };
  }

  handleChange = (e) => {
    const formSupp1 = document.forms['supps1'];
    const formSupp2 = document.forms['supps2'];

    const supplier_id = formSupp1.elements['supplier_id'].value;
    const name = formSupp1.elements['name'].value;

    const phone_number = formSupp2.elements['phone_number'].value;
    const address = formSupp2.elements['address'].value;

    if (supplier_id.length !== 0) {
      if (name.length !== 0) {
        if (phone_number.length !== 0) {
          if (address.length !== 0) {
            this.setState({
              disabled: true
            })
          }
        }
      }
    }else {
      this.setState({
        disabled: false
      })
    }

    this.setState({
      [e.target.name] : e.target.value
    })
  }

  getSuppliers = () => {
    const { baseUrl, token } = this.state

    axios.get(`${baseUrl}?token=${token}`).then(res => {
      this.setState({
        datas: res.data.data
      })
    }).catch(err => console.log(err))
  }

  componentWillMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  componentDidMount() {
    this.getSuppliers();

  }

  render() {
    console.log(this.state);

    // Loading while getting data
    if (this.state.datas === null) {
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
      <div className="supplier">
        <Navbar headerApp="Pemasok" />

        <div className="container py-5">
          <div className="row">
            <div className="col-md-12 py-5 text-right">
              <button type="button" className="btn btn-addSuppliers" data-toggle="collapse" data-target="#collapseInput"
                aria-expanded="false" aria-controls="collapseInput">
                + Tambah Pemasok
              </button>

              <div className="row">
                <div className="collapse col-md-6 mt-3" id="collapseInput">
                  <form className="pt-4" name="supps1">
                    <div className="inputDataBox">
                      <label className="px-2">ID Pemasok :</label>
                      <input type="number" name="supplier_id" placeholder="ID Pemasok" onChange={this.handleChange}/>
                    </div>

                    <div className="inputDataBox">
                      <label className="px-2">Nama :</label>
                      <input type="text" name="name" placeholder="Nama Pemasok" onChange={this.handleChange}/>
                    </div>

                    <div className="inputDataBox">
                      <label className="px-2">Asal Kota:</label>
                      <select name="city_id">
                        <option value="0">Pilih</option>
                      </select>
                    </div>
                  </form>
                </div>

                <div className="col-md-6 collapse mt-3" id="collapseInput">
                  <form className="pt-md-4 pt-lg-4" name="supps2">
                    <div className="inputDataBox">
                      <label className="px-2">No. HP</label>
                      <input type="text" name="phone_number" placeholder="Nomor Handphone" onChange={this.handleChange}/>
                    </div>
                    <div className="inputDataBox">
                      <label className="px-2">Alamat</label>
                      <input type="text" name="address" placeholder="Jl. Semanggi" onChange={this.handleChange}/>
                    </div>
                  </form>

                  <button type="submit" className="btn btn-postProducts" disabled={!this.state.disabled}><i className="fas fa-plus"></i></button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-center">
              <div className="table-responsive">
                <table class="table shadow">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">ID Pemasok</th>
                      <th scope="col">Asal Kota</th>
                      <th scope="col">Nama Pemasok</th>
                      <th scope="col">Alamat Pemasok</th>
                      <th scope="col">No. HP</th>
                      <th scope="col">Ket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.datas.map((data, i) => {
                      return(
                        <tr>
                          <td>{i+1}</td>
                          <td>{data.supplier_id}</td>
                          <td>{data.city.name}</td>
                          <td>{data.name}</td>
                          <td>{data.address}</td>
                          <td>{data.phone_number}</td>
                          <td>
                            <button type="button" className="btn btn-detailSuppliers">
                              Detail
                              <Ink/>
                            </button>
                          </td>
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

export default Supplier;
