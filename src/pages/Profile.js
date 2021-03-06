import React, { Component } from 'react';
import './css/profile.css';
import Navbar from './Navbar';
import ChangePassword from './modal/ChangePassword';
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
import Clear from '@material-ui/icons/Clear';
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
    baseUrl: "https://penjualanapp-api.herokuapp.com/api/v1",
    data: undefined,
    avatar: "",
    loading: false,
    open: false,
    openPhoto: false,
    openPass: false,
    oldPass: "",
    newPass: "",
    confirmPass: '',
    txtFile: "",
    username: null,
    email: "",
    fullname: "",
    address: null,
    phone_number: null,
    message: ""
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

  handleClose = () => {
    this.setState({
      open: false,
      message: "",
      loading: false
     });

     this.getProfile();
  };

  handleClosePass = () => {
    this.setState({
      openPass: false
     });

  };

  openPass = () => {
    this.setState({
      openPass: true
    })
  }

  handleOldPass = event => {
    this.setState({ oldPass: event.target.value });
  };

  handleNewPass = event => {
    this.setState({ newPass: event.target.value });
  };

  handleConfirmPass = event => {
    this.setState({ confirmPass: event.target.value });
  };

  getProfile = () => {
    const { baseUrl, token } = this.state

    axios.get(`${baseUrl}/account/profile?token=${token}`).then(res => {
      this.setState({
        data: res.data,
        avatar: res.data.data.photo,
        username: res.data.data.username,
        fullname: res.data.data.name,
        email: res.data.data.email,
        phone_number: res.data.data.phone_number,
        address: res.data.data.address
      })
    })
  }

  updateProfile = (e) => {
    e.preventDefault();

    const { baseUrl, token } = this.state

    this.setState({
      loading: true
    })

    axios.patch(`${baseUrl}/account/profile?token=${token}`, {
      username: this.state.username,
      address: this.state.address,
      phone_number: this.state.phone_number,
      name: this.state.fullname
    }).then(res => {
      this.setState({
        message: res.data.message,
        loading: false
      })
      console.log(res.data);
    }).catch(err => {
      this.setState({
        message: "Failed",
        loading: false
      })
    })
  }

  postPhoto = (e) => {
    e.preventDefault();

    const { baseUrl, token } = this.state

    this.setState({
      openPhoto: true
    })

    const formData = new FormData();
    formData.append('photo', this.state.avatar)
    axios.post(`${baseUrl}/account/uploadphoto?token=${token}`,
      formData).then(res => {
      this.setState({
        message: "Succeed",
        openPhoto: false
      })
    }).catch(err => {
      this.setState({
        message: "Failed",
        openPhoto: false
      })
    })
  }

  changePassword = (e) => {
    e.preventDefault();
    const { baseUrl, token, oldPass, newPass, confirmPass } = this.state

    this.setState({
      openPhoto: true,
      openPass: false
    })

    axios.patch(`${baseUrl}/account/updatepassword?token=${token}`, {
      old_password: oldPass,
      password: newPass,
      confirm_password: confirmPass
    }).then(res => {
      this.setState({
        message: "Succeed",
        openPhoto: false
      })
    }).catch(err => {
      this.setState({
        message: "Failed",
        openPhoto: false
      })
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
    return (
      <div className="profile">
        <Navbar headerApp="Profil"/>

        {/* Succes update */}
        <Dialog
          open={this.state.message === "Profile updated successfully." || this.state.message === "Succeed" ? true : false}
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

        {/* Update failed */}
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
            {"Update Profil Gagal"}
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
                  <div className="profileInput mx-auto align-items-center shadow">
                    <div className="inputBox">
                      <label className="d-block">Nama</label>
                      <input className="profilName" type="text" name="fullname" value={this.state.fullname} onChange={this.handleChange} />
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
                    <div className="inputBox d-flex text-left">
                      <p className="pr-2">Ingin mengganti password ?</p><a onClick={this.openPass}>Klik Disini</a>
                    </div>

                    <ChangePassword
                      open={this.state.openPass}
                      onClose={this.handleClosePass}
                      handleOldPass={this.handleOldPass}
                      oldPass={this.state.oldPass}
                      handleNewPass={this.handleNewPass}
                      newPass={this.state.newPass}
                      handleConfirmPass={this.handleConfirmPass}
                      confirmPass={this.state.confirmPass}
                      changePassword={this.changePassword}
                      />

                    <button type="submit" className="btn my-3 profileSubmit" onClick={this.updateProfile}>Ubah</button>

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
      </div>
    );
  }

}

export default Profile;
