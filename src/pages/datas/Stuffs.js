import React, { Component } from 'react';
import Navbar from '../Navbar';
import CategoryModal from '../modal/CategoryModal';
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

class Stuffs extends Component {
  state = {
    datas: null,
    pagination: "",
    dataDetail: "",
    loading: true,
    uploadOpen: false,
    open: false,
    openCategoryModal: false,
    openTooltipNext: false,
    openTooltipPrev: false,
    detailOpen: false,
    confirmDelete: false,
    message: "",
    categories: null,
    product_code: "",
    product_name: "",
    category_id: "0",
    category_name: "Pilih",
    buy_price: "",
    sell_price: "",
    first_stock: "",
    total_stock: "",
    unit: "",
    disabled: true,
    token: "",
    baseUrl: "https://penjualanapp-api.herokuapp.com/api/v1/",
    urlProduct: "https://penjualanapp-api.herokuapp.com/api/v1/products?",
  }

  handleClose = () => {
    this.setState({
      open: false,
      message: "",
      category_id: "0",
      category_name: "",
     });

     const formItems1 = document.forms['items1']
     const formItems2 = document.forms['items2']

     formItems1.reset()
     formItems2.reset()

    this.getProduct();
  };

  handleCloseCategory = () => {
    this.setState({
      openCategoryModal: false
    })
  }

  closeDetail = () => {
    this.setState({
      detailOpen: false
    })

    this.getProduct();
  }

  handleUpdate = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleChange = (e) => {
    const formItems1 = document.forms['items1']
    const formItems2 = document.forms['items2']

    const product_code = formItems1.elements['product_code'].value
    const name = formItems1.elements['product_name'].value
    const stock = formItems1.elements['first_stock'].value

    const buy_price = formItems2.elements['buy_price'].value
    const sell_price = formItems2.elements['sell_price'].value
    const unit = formItems2.elements['unit'].value


    if (product_code.length !== 0) {
      if (name.length !== 0) {
        if (this.state.category_id !== "0") {
          if (stock.length !== 0) {
            if (buy_price.length !== 0) {
              if (sell_price.length !== 0) {
                if (unit.length > 2) {
                  this.setState({
                    disabled: false
                  })
                }else {
                  this.setState({
                    disabled: true
                  })
                }
              }else {
                this.setState({
                  disabled: true
                })
              }
            }else {
              this.setState({
                disabled: true
              })
            }
          } else {
            this.setState({
              disabled: true
            })
          }
        }else {
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
    let category_id = i.target.id
    let category_name = i.target.getAttribute('name')

    this.setState({
      category_id: parseInt(category_id),
      category_name: category_name,
      openCategoryModal: false
    })
  }

  getProduct = () => {
    const { urlProduct, token } = this.state
    axios.get(`${urlProduct}token=${token}`).then(
      res => {
        this.setState({
          datas: res.data.data,
          pagination: res.data.meta.pagination,
          openTooltipPrev: false,
          openTooltipNext: false
        })
      }
    ).catch(err => console.log(err))
  }

  getCategory = () => {
    const { baseUrl, token } = this.state
    axios.get(`${baseUrl}category?token=${token}`).then(
      res => {
        this.setState({
          categories: res.data.data,
        })
      }
    ).catch(err => console.log(err))
  }

  postProduct = (e) => {
    e.preventDefault();

    this.setState({
      uploadOpen: true
    })

    const {urlProduct,token} = this.state
    axios.post(`${urlProduct}token=${token}`, {
      product_code: this.state.product_code,
      product_name: this.state.product_name,
      category_id: this.state.category_id,
      buy_price: this.state.buy_price,
      sell_price: this.state.sell_price,
      unit: this.state.unit,
      first_stock: parseInt(this.state.first_stock)
    }).then(res => {
      this.setState({
        message: res.request.statusText,
        uploadOpen: false
      })
    }).catch(err => {
      console.log(err);
      this.setState({
        message: "Failed",
        uploadOpen: false
      })
    })
  }

  detailProduct = (id) => {
    this.setState({
      detailOpen: true
    })

    const {baseUrl, token} = this.state

    axios.get(`${baseUrl}products/${id}?token=${token}`).then(res => {
      this.setState({
        product_code: res.data.data.product_code,
        product_name: res.data.data.product_name,
        category_id: res.data.data.categories.data.category_id,
        category_name: res.data.data.categories.data.category_name,
        buy_price: res.data.data.buy_price,
        sell_price: res.data.data.sell_price,
        total_stock: res.data.data.total_stock,
        unit: res.data.data.unit,
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
      axios.delete(`${baseUrl}products/${id}?token=${token}`).then(
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
    }
  }

  updateProduct = (id) => {
    const { baseUrl, token } = this.state

    this.setState({
      uploadOpen: true,
      detailOpen: false
    })

    axios.patch(`${baseUrl}products/${id}?token=${token}`, {
      product_code: this.state.product_code,
      product_name: this.state.product_name,
      category_id: this.state.category_id,
      buy_price: this.state.buy_price,
      sell_price: this.state.sell_price,
      first_stock: this.state.first_stock,
      unit: this.state.unit
    }).then(res => {
      this.setState({
        message: "Updated",
        uploadOpen: false
      })
    }).catch(err => console.log(err))
  }

  openCategoryModal = () => {
    this.setState({
      openCategoryModal: true
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

  nextPage = () => {
    this.setState({
      urlProduct: this.state.pagination.links.next + "&",
      openTooltipNext: !this.state.openTooltipNext
    })

    this.getProduct()
  }

  prevPage = () => {
    this.setState({
      urlProduct: this.state.pagination.links.previous + "&",
      openTooltipPrev: !this.state.openTooltipPrev
    })

    this.getProduct()
  }

  render() {
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
          <div className="second-header">
            <h4 className="text-center mt-5">Stok Barang</h4>
            <hr className="w-50"/>
          </div>

          {/* Open Category Modal */}
          <CategoryModal
            open={this.state.openCategoryModal}
            onClose={this.handleCloseCategory}
            selectCategory={this.handleOption}
          />

        {/* Success Add */}
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
            {"Gagal Menambah Barang"}
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

        {/* Success Update */}
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
              {"Data Barang Telah Diubah"}
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
          onClose={this.closeDetail}
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
                <div className="form-group inputUpdateBox">
                  <label className="px-2">Kode :</label>
                  <input className="form-control" type="text" name="product_code" placeholder="Kode Barang" value={this.state.product_code} disabled/>
                </div>

                <div className="form-group inputUpdateBox">
                  <label className="px-2">Nama :</label>
                  <input className="form-control" type="text" name="product_name" placeholder="Nama Barang" onChange={this.handleUpdate} value={this.state.product_name}/>
                </div>

                <div className="form-group inputUpdateBox">
                  <label className="px-2">Kategori :</label>
                  <select className="form-control" id="categories" name="categories">
                    <option id={this.state.category_id} onClick={this.handleOption}>{this.state.category_name}</option>
                    {this.state.categories.map((category,i) => {
                      return(
                        <option id={category.category_id} onClick={this.handleOption}>{category.category_name}</option>
                      )
                    })}
                  </select>
                </div>

                <div className="form-group inputUpdateBox">
                  <label className="px-2">Harga Beli :</label>
                  <input className="form-control" type="number" name="buy_price" placeholder="IDR" onChange={this.handleUpdate} value={this.state.buy_price} />
                </div>

                <div className="form-group inputUpdateBox">
                  <label className="px-2">Harga Jual</label>
                  <input className="form-control" type="number" name="sell_price" placeholder="IDR" onChange={this.handleUpdate} value={this.state.sell_price}/>
                </div>

                <div className="form-group inputUpdateBox">
                  <label className="px-2">Stok</label>
                  <input className="form-control" type="number" name="first_stock" value={this.state.total_stock} disabled/>
                </div>

                <div className="form-group inputUpdateBox">
                  <label className="px-2">Unit</label>
                  <input className="form-control" type="text" name="unit" placeholder="pcs, pack dll" onChange={this.handleUpdate} value={this.state.unit}/>
                </div>
              </form>
            </div>
          </DialogContent>
          <DialogActions className="mx-auto">
              <Button onClick={()=>{this.updateProduct(this.state.product_code)}} className="btn btn-success">
                Ubah
              </Button>
              <Button onClick={()=>{this.deleteProduct(this.state.product_code)}} className="btn btn-danger">
                <li className="fas fa-trash"></li>
              </Button>
              <Button onClick={this.closeDetail} className="btn btn-cancel">
                Kembali
              </Button>
          </DialogActions>
        </Dialog>

        <div className="container my-5">
          <div className="row">
            <div className="col-md-12 pb-5 text-right">
              <button type="button" className="btn btn-addDatas" data-toggle="collapse" data-target="#collapseInput"
                aria-expanded="false" aria-controls="collapseInput">
                + Tambah Barang
              </button>

              <div className="row">
                <div className="collapse col-md-6 mt-3" id="collapseInput">
                  <form className="pt-4" name="items1">
                    <div className="inputDataBox">
                      <label className="px-2">Kode :</label>
                      <input className="form-control" type="text" name="product_code" placeholder="Kode Barang" onChange={this.handleChange}/>
                    </div>

                    <div className="inputDataBox">
                      <label className="px-2">Nama :</label>
                      <input className="form-control" type="text" name="product_name" placeholder="Nama Barang" onChange={this.handleChange}/>
                    </div>

                    <div className="inputDataBox">
                      <label className="px-2">Kategori :</label>
                      <input type="text" disabled value={this.state.category_name}/>
                      <button type="button" className="btn btn-Category w-50" onClick={this.openCategoryModal}>Cari</button>
                    </div>

                    <div className="inputDataBox">
                      <label className="px-2">Stok :</label>
                      <input className="form-control" type="text" name="first_stock" placeholder="Stok Awal" onChange={this.handleChange}/>
                    </div>
                  </form>
                </div>

                <div className="col-md-6 collapse mt-3" id="collapseInput">
                  <form className="pt-md-4 pt-lg-4" name="items2">
                    <div className="inputDataBox">
                      <label className="px-2">Harga Beli :</label>
                      <input className="form-control" type="number" name="buy_price" placeholder="IDR" onChange={this.handleChange}/>
                    </div>
                    <div className="inputDataBox">
                      <label className="px-2">Harga Jual</label>
                      <input className="form-control" type="number" name="sell_price" placeholder="IDR" onChange={this.handleChange}/>
                    </div>
                    <div className="inputDataBox">
                      <label className="px-2">Unit</label>
                      <input className="form-control" type="text" name="unit" placeholder="pcs, pack dll" onChange={this.handleChange}/>
                    </div>
                  </form>

                  <button type="submit" className="btn btn-postProducts" disabled={this.state.disabled} onClick={this.postProduct}><i className="fas fa-plus"></i></button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="table-responsive">
                <table className="table shadow">
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
                        <tr className="bounceIn">
                          <td>{i+1}</td>
                          <td>{data.product_code}</td>
                          <td>{data.product_name}</td>
                          <td>{data.categories.data.category_name}</td>
                          <td>{data.buy_price}</td>
                          <td>{data.sell_price}</td>
                          <td>{data.unit}</td>
                          <td>{data.total_stock}</td>
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

export default Stuffs;
