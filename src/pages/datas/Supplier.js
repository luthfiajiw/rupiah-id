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
import Clear from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';

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
      baseUrl:"https://penjualanapp-api.herokuapp.com/api/v1/suppliers?",
      urlUpdate:"https://penjualanapp-api.herokuapp.com/api/v1/suppliers",
      pagination: "",
      datas: null,
      disabled: false,
      loading: true,
      uploadOpen: false,
      detailOpen: false,
      openTooltipNext: false,
      openTooltipPrev: false,
      message: "",
      cities: null,
      supplier_id: "",
      city_id: "",
      city_name: "",
      name: "",
      address: "",
      phone_number: ""
    };
  }

  handleOption = (e) => {
    let city = e.target.value

    this.setState({ city_id: parseInt(city) })
  }

  handleClose = () => {
    this.setState({
      open: false,
      message: ""
     });

     const formSupp1 = document.forms['supps1'];

    this.getSuppliers();

    formSupp1.reset();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  closeDetail = () => {
    this.setState({
      detailOpen: false
    })
  }

  openDetail = (id) => {
    this.setState({
      detailOpen: true
    })

    const { urlUpdate, token } = this.state

    axios.get(`${urlUpdate}/${id}?token=${token}`).then(res => {
      this.setState({
        supplier_id: res.data.data.supplier_id,
        city_id: res.data.data.cities.data.id,
        city_name: res.data.data.cities.data.name,
        name: res.data.data.name,
        address: res.data.data.address,
        phone_number: res.data.data.phone_number
      })
    }).catch(err => console.log(err))
  }

  getSuppliers = () => {
    const { baseUrl, token } = this.state

    axios.get(`${baseUrl}token=${token}`).then(res => {
      console.log(res.data);
      this.setState({
        datas: res.data.data,
        pagination: res.data.meta.pagination,
        openTooltipPrev: false,
        openTooltipNext: false
      })
    }).catch(err => console.log(err))
  }

  getCity = () => {
    const { token } = this.state

    axios.get(`https://penjualanapp-api.herokuapp.com/api/v1/cities?token=${token}`).then(res => {
        this.setState({
          cities: res.data.data
        })
      }
    ).catch(err => console.log(err))
  }

  postSupplier = (e) => {
    e.preventDefault();

    this.setState({
      uploadOpen: true
    })

    const { baseUrl, token } = this.state

    axios.post(`${baseUrl}token=${token}`, {
      city_id: this.state.city_id,
      name: this.state.name,
      address: this.state.address,
      phone_number: this.state.phone_number
    }).then(res => {
      this.setState({
        message: "Created",
        uploadOpen: false
      })
    }).catch(err => {
      console.log(err)
      this.setState({
        message: "Failed",
        uploadOpen: false
      })
  })

  }

  updateSupplier = (id) => {
    const { urlUpdate, token } = this.state

    this.setState({
      uploadOpen: true,
      detailOpen: false
    })

    axios.patch(`${urlUpdate}/${id}?token=${token}`, {
      name: this.state.name,
      address: this.state.address,
      phone_number: this.state.phone_number,
      city_id: this.state.city_id
    }).then(res => {
      this.setState({
        message: "Updated",
        uploadOpen: false
      })
    }).catch(err => console.log(err))
  }

  deleteSupplier = (id) => {
    const {urlUpdate, token} = this.state

    const confirmDelete = window.confirm('Anda Yakin Ingin Menghapus Ini ?');
    this.setState({
      uploadOpen: true
    })

    if (confirmDelete) {
      axios.delete(`${urlUpdate}/${id}?token=${token}`).then(
        res => {
          this.setState({
            message: "delete success",
            uploadOpen: false
          })
        }
      ).catch(err => console.error(err))

      this.setState({
        detailOpen: false
      })
    } else {
      alert("OK")
      this.setState({
        uploadOpen: false
      })
    }
  }

  nextPage = () => {
    this.setState({
      baseUrl: this.state.pagination.links.next + "&",
      openTooltipNext: !this.state.openTooltipNext
    })

    this.getSuppliers()
  }

  prevPage = () => {
    this.setState({
      baseUrl: this.state.pagination.links.previous + "&",
      openTooltipPrev: !this.state.openTooltipPrev
    })

    this.getSuppliers()
  }

  componentWillMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  componentDidMount() {
    this.getSuppliers();
    this.getCity();
  }

  render() {
    // Loading while getting data
    if (this.state.datas === null || this.state.cities === null) {
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
          <div className="second-header">
            <h4 className="text-center mt-5">Pemasok</h4>
            <hr className="w-50"/>
          </div>

        {/* Success Add Supplier*/}
        <Dialog
          open={this.state.message === "Created" ? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
              {"Pemasok Telah Ditambahkan"}
          </DialogTitle>

          <DialogContent>
            <div className="text-center wow bounceIn">
              <DoneAll style={{fontSize: "100px", color: "rgb(112, 204, 74)"}}/>
            </div>
          </DialogContent>
          <DialogActions className="mx-auto">
              <Button onClick={this.handleClose} color="primary">
                OK
              </Button>
          </DialogActions>
        </Dialog>

        {/* Add failed */}
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
            {"Gagal Menambah Pemasok"}
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

        {/* Success Update Supplier*/}
        <Dialog
          open={this.state.message === "Updated" ? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
              {"Data Pemasok Telah Diubah"}
          </DialogTitle>

          <DialogContent>
            <div className="text-center wow bounceIn">
              <DoneAll style={{fontSize: "100px", color: "rgb(112, 204, 74)"}}/>
            </div>
          </DialogContent>
          <DialogActions className="mx-auto">
              <Button onClick={this.handleClose} color="primary">
                OK
              </Button>
          </DialogActions>
        </Dialog>

        {/* Success Delete Supplier*/}
        <Dialog
          open={this.state.message === "delete success" ? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
              {"Pemasok Telah Dihapus"}
          </DialogTitle>

          <DialogContent>
            <div className="text-center wow bounceIn">
              <DoneAll style={{fontSize: "100px", color: "rgb(112, 204, 74)"}}/>
            </div>
          </DialogContent>
          <DialogActions className="mx-auto">
              <Button onClick={this.handleClose} color="primary">
                OK
              </Button>
          </DialogActions>
        </Dialog>

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

        {/* Update and Delete Data */}
        <Dialog
          open={this.state.detailOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.closeDetail}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
              {"Detail Pemasok"}
          </DialogTitle>

          <DialogContent>
            <div className="text-center wow bounceIn">
              <form name="updateItems" className="updateItems">
                <div className="form-group inputUpdateBox">
                  <label className="px-2">Nama :</label>
                  <input className="form-control" type="text" name="name" placeholder="Nama Pemasok" value={this.state.name} onChange={this.handleChange}/>
                </div>

                <div className="form-group inputUpdateBox">
                  <label className="px-2">Asal Kota :</label>
                  <select className="form-control" id="categories" name="categories" onChange={this.handleOption}>
                    <option value={this.state.city_id}>{this.state.city_name}</option>
                    {this.state.cities.map(city => {
                      return(
                        <option value={city.id}>{city.name}</option>
                      )
                    })}
                  </select>
                </div>

                <div className="form-group inputUpdateBox">
                  <label className="px-2">No. Hp :</label>
                  <input className="form-control" type="number" name="phone_number" placeholder="No. Handphone" value={this.state.phone_number} onChange={this.handleChange}/>
                </div>

                <div className="form-group inputUpdateBox">
                  <label className="px-2">Alamat :</label>
                  <textarea rows="4" className="w-100 address form-control" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Jl. Semanggi Raya ....">
                  </textarea>
                </div>

              </form>
            </div>
          </DialogContent>
          <DialogActions className="mx-auto">
              <Button className="btn btn-success" onClick={()=>{this.updateSupplier(this.state.supplier_id)}}>
                Ubah
              </Button>
              <Button className="btn btn-danger" onClick={()=>{this.deleteSupplier(this.state.supplier_id)}}>
                <li className="fas fa-trash"></li>
              </Button>
              <Button onClick={this.closeDetail} color="primary">
                Kembali
              </Button>
          </DialogActions>
        </Dialog>

        <div className="container py-5">
          <div className="row">
            <div className="col-md-12 pb-5 text-right">
              <button type="button" className="btn btn-addDatas" data-toggle="collapse" data-target="#collapseInput"
                aria-expanded="false" aria-controls="collapseInput">
                + Tambah Pemasok
              </button>

              <div className="row">
                <div className="col-md-12 collapse mt-3" id="collapseInput">
                  <form className="pt-md-4 pt-lg-4" name="supps1">
                    <div className="inputDataBox">
                      <div className="form-group inputDataBox">
                        <label className="px-2">Nama :</label>
                        <input className="form-control" type="text" name="name" placeholder="Nama Pemasok" onChange={this.handleChange}/>
                      </div>

                      <div className="form-group inputDataBox">
                        <label className="px-2">Asal Kota :</label>
                        <select className="form-control" name="city_id" onChange={this.handleOption}>
                          <option value="0">Pilih</option>
                          {this.state.cities.map((city,i) => {
                            return(
                              <option value={city.id}>{city.name}</option>
                            )
                          })}
                        </select>
                      </div>

                      <div className="form-group inputDataBox">
                        <label className="px-2">No. HP :</label>
                        <input className="form-control" type="tel" name="phone_number" placeholder="No. Handphone" onChange={this.handleChange}/>
                      </div>

                      <div className="form-group inputDataBox">
                        <label className="px-2">Alamat :</label>
                        <textarea rows="4" className="w-50 address form-control" name="address" onChange={this.handleChange} placeholder="Jl. Semanggi Raya ....">

                        </textarea>
                      </div>
                    </div>
                    <div className="inputDataBox">
                      <button type="submit" className="btn btn-postSuppliers" onClick={this.postSupplier}><i className="fas fa-plus"></i></button>
                    </div>
                  </form>
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
                      <th scope="col">Nama Pemasok</th>
                      <th scope="col">Asal Kota</th>
                      <th scope="col">No. HP</th>
                      <th scope="col">Alamat Pemasok</th>
                      <th scope="col">Ket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.datas.map((data, i) => {
                      return(
                        <tr className="bounceInDown">
                          <td>{i+1}</td>
                          <td>{data.name}</td>
                          <td>{data.cities.data.name}</td>
                          <td>{data.phone_number}</td>
                          <td>{data.address}</td>
                          <td>
                            <button type="button" className="btn btn-detailSuppliers" onClick={()=>{this.openDetail(data.supplier_id)}}>
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
          <div className="row">
            <div className="col-md-12 d-flex justify-content-between">
              <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={this.handleTooltipClose}
                  open={this.state.openTooltipPrev}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="Klik Sekali Lagi"
                >
                <button type="button" className="btn btn-prev" onClick={this.prevPage}>Prev</button>
              </Tooltip>

              <span className="page-info">Halaman {this.state.pagination.current_page} dari {this.state.pagination.total_pages}</span>

              <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={this.handleTooltipClose}
                  open={this.state.openTooltipNext}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="Klik Sekali Lagi"
                >
              <button type="button" className="btn btn-next" onClick={this.nextPage}>Next</button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Supplier;
