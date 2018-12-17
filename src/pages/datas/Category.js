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
    name:  "",
    loadingData: true,
    loadingCreate: false,
    open: false,
    message: ""
  }

  handleClose = () => {
    this.setState({
      open: false,
      message: "",
      loading: false
     });

     window.location.reload(true);

  };

  getCategory = () => {
    axios.get('https://api-penjualanapp.herokuapp.com/api/v1/category?token='+localStorage.getItem('token')).then(
      res => {
        console.log(res.data.data);
        this.setState({
          datas: res.data.data
        })
      }
    )
  }

  postCategory = () => {
    this.setState({
      loadingCreate: true
    })

    axios.post('https://api-penjualanapp.herokuapp.com/api/v1/category?token='+localStorage.getItem('token'),
    {
      name: this.state.name
    }).then(res => {
      console.log(res.data);
      this.setState({
        message: res.data.message
      })
    }).catch(err => console.log(err))
  }

  handleChange = () => {
    this.setState({
      name: this.refs.name.value
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

        <div className="container my-5">
          <div className="row my-4">
            <div className="col-md-6"></div>
            <div className="col-md-6 text-right">
              <button type="button" className="btn btn-addCategory" data-toggle="collapse" data-target="#collapseInput"
                aria-expanded="false" aria-controls="collapseInput">
                + Tambah Kategori
              </button>
              <div className="collapse mt-3" id="collapseInput">
                <div className="inputCategory align-items-center">
                  <label className="px-2">Nama Kategori :</label>
                  <input className="py-1" ref="name" type="text" placeholder="kategori barang" onChange={this.handleChange}/>
                  <button type="submit" className="btn btn-postCategory ml-2" onClick={this.postCategory}>+</button>
                </div>
                <div className="text-right pt-3">
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
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Kategori barang</th>

                    </tr>
                  </thead>
                  <tbody>
                    {this.state.datas.map(data => {
                      return(
                        <tr>
                          <td>{data.category_id}</td>
                          <td>{data.name}</td>
                        </tr>
                      )
                    })}
                  </tbody>
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
        </div>
      </div>
    );
  }

}

export default Category;
