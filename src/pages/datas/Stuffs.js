import React, { Component } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import '../css/stuffs.css';
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

class Stuffs extends Component {
  state = {
    datas: null,
    dataDetail: "",
    loading: true,
    uploadOpen: false,
    open: false,
    detailOpen: false,
    confirmDelete: false,
    message: "",
    categories: null,
    product_code: "",
    name: "",
    category_id: "0",
    buy_price: "",
    sell_price: "",
    disabled: true,
    unit: "",
    token: "",
    baseUrl: "https://api-penjualanapp.herokuapp.com/api/v1/"
  }

  handleClose = () => {
    this.setState({
      open: false,
      message: ""
     });

     window.location.reload(true);

  };

  closeDetail = () => {
    this.setState({
      detailOpen: false
    })
  }

  handleChange = (e) => {
    const formItems1 = document.forms['items1']
    const formItems2 = document.forms['items2']

    const product_code = formItems1.elements['product_code'].value
    const name = formItems1.elements['name'].value

    const buy_price = formItems2.elements['buy_price'].value
    const sell_price = formItems2.elements['sell_price'].value
    const unit = formItems2.elements['unit'].value


    if (product_code.length !== 0) {
      if (name.length !== 0) {
        if (this.state.category_id !== "0") {
          if (buy_price.length !== 0) {
            if (sell_price.length !== 0) {
              if (unit.length > 2) {
                this.setState({
                  disabled: false
                })
              } else {
                this.setState({
                  disabled: true
                })
              }
            } else {
              this.setState({
                disabled: true
              })
            }
          } else {
            this.setState({
              disabled: true
            })
          }
        } else {
          this.setState({
            disabled: true
          })
        }
      } else {
        this.setState({
          disabled: true
        })
      }
    } else {
      this.setState({
        disabled: true
      })
    }

    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleOption = (i) => {
    let category = i.target.value

    this.setState({
      category_id: category
    })
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

    this.setState({
      uploadOpen: true
    })

    const {baseUrl,token} = this.state
    axios.post(`${baseUrl}product?token=${token}`, {
      product_code: this.state.product_code,
      name: this.state.name,
      category_id: this.state.category_id,
      buy_price: this.state.buy_price,
      sell_price: this.state.sell_price,
      unit: this.state.unit
    }).then(res => {
      this.setState({
        message: res.request.statusText,
        uploadOpen: false
      })
    })
  }

  detailProduct = (id) => {
    this.setState({
      detailOpen: true
    })

    const {baseUrl, token} = this.state

    axios.get(`${baseUrl}product/${id}?token=${token}`).then(res => {
      console.log('success')
      this.setState({
        dataDetail: res.data.data
      })
    })
  }

  deleteProduct = (id) => {
    const { baseUrl, token } = this.state

    const confirmDelete = window.confirm("Anda Yakin Ingin Menghapus Ini ?");
    this.setState({
      confirmDelete : confirmDelete,
      uploadOpen: true
    })

    if (confirmDelete) {
      axios.delete(`${baseUrl}product/${id}?token=${token}`).then(
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
    }

    

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

    // Loading while getting data
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
        <Navbar headerApp="Barang"/>

        {/* Success update */}
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
              {"Barang Telah Ditambahkan"}
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

        {/* Success Delete */}
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
              {"Barang Telah Dihapus"}
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
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
              {"Detail Barang"}
          </DialogTitle>

          <DialogContent>
            <div className="text-center wow bounceIn">
              <form name="updateItems" className="updateItems">
                <div className="inputUpdateBox">
                  <label className="px-2">Kode :</label>
                  <input type="number" name="product_code" placeholder="Kode Barang" onChange={this.handleChange} value={this.state.dataDetail.product_code}/>
                </div>

                <div className="inputUpdateBox">
                  <label className="px-2">Nama :</label>
                  <input type="text" name="name" placeholder="Nama Barang" onChange={this.handleChange} value={this.state.dataDetail.name}/>
                </div>

                <div className="inputUpdateBox">
                  <label className="px-2">Kategori :</label>
                  <select id="categories" name="categories">
                    <option value={this.state.dataDetail === "" ? "" : this.state.dataDetail.categories.data.category_id} onClick={this.handleOption}>{this.state.dataDetail === "" ? "" : this.state.dataDetail.categories.data.name}</option>
                    {this.state.categories.map((category,i) => {
                      return(
                        <option value={category.category_id} onClick={this.handleOption}>{category.name}</option>
                      )
                    })}
                  </select>
                </div>

                <div className="inputUpdateBox">
                  <label className="px-2">Harga Beli :</label>
                  <input type="number" name="buy_price" placeholder="IDR" onChange={this.handleChange} value={this.state.dataDetail.buy_price} />
                </div>

                <div className="inputUpdateBox">
                  <label className="px-2">Harga Jual</label>
                  <input type="number" name="sell_price" placeholder="IDR" onChange={this.handleChange} value={this.state.dataDetail.sell_price}/>
                </div>
                
                <div className="inputUpdateBox">
                  <label className="px-2">Stok</label>
                  <input type="number" name="stock" value={this.state.dataDetail.stock}/>
                </div>

                <div className="inputUpdateBox">
                  <label className="px-2">Unit</label>
                  <input type="text" name="unit" placeholder="pcs, pack dll" onChange={this.handleChange} value={this.state.dataDetail.unit}/>
                </div>
              </form>
            </div>
          </DialogContent>
          <DialogActions className="mx-auto">
              <Button onClick={this.closeDetail} className="btn btn-success">
                Ubah
              </Button>
              <Button onClick={()=>{this.deleteProduct(this.state.dataDetail.product_code)}} className="btn btn-danger">
                Hapus
              </Button>
              <Button onClick={this.closeDetail} color="primary">
                Kembali
              </Button>
          </DialogActions>
        </Dialog>

        <div className="container my-5">
          <div className="row">
            <div className="col-md-12 py-5 text-right">
              <button type="button" className="btn btn-addDatas" data-toggle="collapse" data-target="#collapseInput"
                aria-expanded="false" aria-controls="collapseInput">
                + Tambah Barang
              </button>

              <div className="row">
                <div className="collapse col-md-6 mt-3" id="collapseInput">
                  <form className="pt-4" name="items1">
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
                  <form className="pt-md-4 pt-lg-4" name="items2">
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

                  <button type="submit" className="btn btn-postProducts" disabled={this.state.disabled} onClick={this.postProduct}> + </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="table-responsive shadow">
                <table className="table border">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Kode</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Kategori</th>
                      <th scope="col">Harga Beli<br/>(IDR)</th>
                      <th scope="col">Harga Jual<br/>(IDR)</th>
                      <th scope="col">Unit</th>
                      <th scope="col">Stok</th>
                      <th scope="col">Ket</th>
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
                          <td>{data.stock}</td>
                          <td>
                            <button type="button" className="btn btn-detailProducts" onClick={()=>{this.detailProduct(data.product_code)}}>Detail</button>
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

export default Stuffs;
