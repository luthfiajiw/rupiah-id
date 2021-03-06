import React, { Component } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import '../css/category.css';
import { css } from 'react-emotion';
import { BounceLoader, BarLoader } from 'react-spinners';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DoneAll from '@material-ui/icons/DoneAll';
import Tooltip from '@material-ui/core/Tooltip';

const override = css`
    border-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 30%);
`;

const createCategory = css`
    border-color: red;
    margin-left: auto;
`;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class Category extends Component {

  state = {
    datas: null,
    pagination: "",
    category_name:  "",
    loadingData: true,
    loadingCreate: false,
    open: false,
    openTooltipNext: false,
    openTooltipPrev: false,
    uploadOpen: false,
    message: "",
    consfirmDelete: false,
    nextUrl: "",
    baseUrl: "https://penjualanapp-api.herokuapp.com/api/v1/category?",
    token: ""
  }

  handleClose = () => {
    this.setState({
      open: false,
      message: "",
      loading: false
     });

     document.forms['form1'].reset();

     this.getCategory();
  };

  getCategory = () => {
    const { baseUrl, token } = this.state

    axios.get(`${baseUrl}token=${token}`).then(
      res => {
        this.setState({
          datas: res.data.data,
          pagination: res.data.meta.pagination,
          openTooltipPrev: false,
          openTooltipNext: false
        })
      }
    )
  }

  postCategory = (e) => {
    e.preventDefault();

    const { baseUrl, token } = this.state

    this.setState({
      loadingCreate: true
    })

    axios.post(`${baseUrl}token=${token}`,
    {
      category_name: this.state.category_name
    }).then(res => {
      this.setState({
        message: res.data.message,
        loadingCreate: false
      })
    }).catch(err => console.log(err))
  }

  deleteCategory = (id) => {
    const { token } = this.state

    const confirmDelete = window.confirm('Anda Yakin Ingin Mengapus Ini?')
    this.setState({
      confirmDelete: confirmDelete,
       uploadOpen: true
    })

    if (confirmDelete) {
      axios.delete(`https://penjualanapp-api.herokuapp.com/api/v1/category/${id}?token=${token}`).then(res => {
        this.setState({
          message: "delete success",
          uploadOpen: false
        })
      }).catch(err => console.log(err))
    } else {
      alert('OK')
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

    this.getCategory()
  }

  prevPage = () => {
    this.setState({
      baseUrl: this.state.pagination.links.previous + "&",
      openTooltipPrev: !this.state.openTooltipPrev
    })

    this.getCategory()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentWillMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  componentDidMount() {
    this.getCategory();
  }

  render() {
    console.log(this.state);
    if (this.state.datas == null) {
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
      <div className="category">
        <Navbar headerApp="Kategori Barang" />
          <div className="second-header">
            <h4 className="text-center mt-5">Kategori Barang</h4>
            <hr className="w-50"/>
          </div>

        {/* Success update */}
        <Dialog
          open={this.state.message === "The resource is created successfully" ? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
              {"Kategori Telah Ditambahkan"}
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
                loading={this.state.loadingData}
              />
            </div>
          </DialogContent>
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

        <div className="container my-5">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 pb-2 text-right">
              <button type="button" className="btn btn-addDatas" data-toggle="collapse" data-target="#collapseInput"
                aria-expanded="false" aria-controls="collapseInput">
                + Tambah Kategori
              </button>
              <div className="collapse mt-3" id="collapseInput">
                <form name="form1">
                  <div className="form-group inputCategory align-items-center">
                    <label className="px-2">Nama Kategori :</label>
                    <input className="form-control py-1" name="category_name" type="text" placeholder="kategori barang" onChange={this.handleChange}/>
                    <button type="submit" className="btn btn-postCategory ml-2" onClick={this.postCategory}><i className="fas fa-plus"></i></button>
                  </div>
                </form>
                <div className="text-right pb-3">
                  <div className="ml-auto">
                    <BarLoader
                      className={createCategory}
                      sizeUnit={"px"}
                      size={150}
                      color={'#ff9906'}
                      loading={this.state.loadingCreate}
                    />
                  </div>
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
                      <th scope="col">Kategori barang</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.datas.map((data, i) => {
                      return(
                        <tr className="bounceIn">
                          <td>{i+1}</td>
                          <td>{data.category_name}</td>
                          <td>
                            <button type="button" className="btn btn-danger" onClick={()=>{this.deleteCategory(data.category_id)}}>
                              <li className="fas fa-trash"></li>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                <p className="category-warning">* Kategori yang dihapus akan menyebabkan data pada stok barang
                dengan kategori yang sama akan ikut terhapus.
                </p>
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

export default Category;
