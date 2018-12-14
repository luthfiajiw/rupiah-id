import React, { Component } from 'react';
import './css/profile.css';
import Navbar from './Navbar';
import axios from 'axios';
import { css } from 'react-emotion';
import {BarLoader} from 'react-spinners';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DoneAll from '@material-ui/icons/DoneAll';
import Create from '@material-ui/icons/Create';

const override = css`
    border-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, 30%);
`;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Profile extends Component {
  state = {
    token: undefined,
    data: undefined,
    avatar: "",
    loading: false,
    open: false,
    openPhoto: false,
    txtFile: "",
    username: null,
    email: "",
    fullname: "",
    address: null,
    phone_number: null,
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

  getProfile = () => {
    axios.get("https://api-penjualanapp.herokuapp.com/api/v1/account/profile?token="+this.state.token).then(res => {
      console.log(res.data);
      this.setState({
        data: res.data,
        avatar: res.data.data.photo,
        username: res.data.data.username,
        email: res.data.data.email,
        phone_number: res.data.data.phone_number,
        address: res.data.data.address
      })
    })
  }

  updateProfile = (e) => {
    e.preventDefault();

    this.setState({
      loading: true
    })

    axios.patch('https://api-penjualanapp.herokuapp.com/api/v1/account/profile/update?token='+this.state.token, {
      username: this.state.username,
      address: this.state.address,
      phone_number: this.state.phone_number,
    }).then(res => {
      this.setState({
        message: res.data.message
      })
      console.log(res.data);
    }).catch(err => console.log(err))
  }

  postPhoto = (e) => {
    e.preventDefault();

    this.setState({
      openPhoto: true
    })

    const formData = new FormData();
    formData.append('photo', this.state.avatar)
    axios.post('https://api-penjualanapp.herokuapp.com/api/v1/account/uploadphoto?token='+this.state.token,
      formData).then(res => {
      console.log(res.data);
      this.setState({
        message: res.data.message,
        openPhoto: false
      })
    }).catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  fileHandler = (e) => {
    this.setState({
      avatar: e.target.files[0]
    })
  }

  componentWillMount() {
    this.setState({
      token: localStorage.getItem("token")
    })
  }

  componentDidMount() {
    this.getProfile();

    if (this.state.message === "Profile updated successfully.") {
      return(
        this.setState({
          open: true,
          loading:false
        })
      )
    }

    const buttonEdit = this.refs.btnEdit
    const fileEdit = this.refs.fileEdit;

    buttonEdit.addEventListener("click", () => {
      fileEdit.click();
    })

    fileEdit.addEventListener("change", () => {
      if (fileEdit.value) {
        this.setState({
          txtFile: fileEdit.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]
        })
      } else {
        this.setState({
          txtFile: "Belum ada file yang dipilih"
        })
      }
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className="profile">
        <Navbar headerApp="Profil"/>

        {/* Succes update */}
        <Dialog
          open={this.state.message === "Profile updated successfully." || this.state.message === "photo uploaded" ? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
              {"Update telah berhasil"}
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

        {/* Loading data */}
        <Dialog
          open={this.state.data === undefined ? true : false}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
              {"LOADING"}
          </DialogTitle>

          <DialogContent>
            <div className="text-center wow bounceIn">
              <BarLoader
                className={override}
                sizeUnit={"px"}
                size={150}
                color={'#ff9906'}
                loading= {this.state.data === undefined ? true : false}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Loading update photo */}
        <Dialog
          open={this.state.openPhoto}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
              {"UPLOADING"}
          </DialogTitle>

          <DialogContent>
            <div className="text-center wow bounceIn">
              <BarLoader
                className={override}
                sizeUnit={"px"}
                size={150}
                color={'#ff9906'}
                loading= "true"
              />
            </div>
          </DialogContent>
        </Dialog>

        <div className="container text-center my-5">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="img-avatar">
                    <img src={this.state.avatar} className="avatar" alt=""/>
                    <button ref="btnEdit" type="button" className="my-4 btn-edit-photo">
                      <Create />
                    </button>
                  </div>
                  <br/>
                  <span className="txtFile" ref="txtFile">{this.state.txtFile}</span>
                  <input ref="fileEdit" className="edit-photo" type="file" onChange={this.fileHandler}/>
                  <br />
                  <button type="button" className="my-4 btn-postPhoto" onClick={this.postPhoto}>Ubah Foto</button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="profileInput mx-auto align-items-center">
                    <div className="inputBox">
                      <label className="d-block">Nama</label>
                      <input className="profilName" type="text" name="nama" value={this.state.fullname}/>
                    </div>
                    <div className="inputBox">
                      <label className="d-block">Nama Pengguna (Username)</label>
                      <input className="profilUsername" type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <div className="inputBox">
                      <label className="d-block">Email</label>
                      <input className="profilEmail" type="email" name="email" value={this.state.email}/>
                    </div>
                    <div className="inputBox">
                      <label className="d-block">Alamat</label>
                      <textarea rows="5" cols="20" className="profilAddress" name="address" value={this.state.address} onChange={this.handleChange}></textarea>
                    </div>
                    <div className="inputBox">
                      <label className="d-block">Nomor Telepon</label>
                      <input className="profilPhone" type="tel" name="phone_number" value={this.state.phone_number} onChange={this.handleChange}/>
                    </div>

                    <button type="submit" className="btn my-3 profileSubmit" onClick={this.updateProfile}>Ubah</button>
                  </div>

                  <div className="loading-wrapper w-100">
                    <div className='text-center'>
                    <BarLoader
                      className={override}
                      sizeUnit={"px"}
                      size={150}
                      color={'#ff9906'}
                      loading={this.state.loading}
                    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Profile;
