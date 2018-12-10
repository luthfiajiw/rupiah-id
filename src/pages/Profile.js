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

class Profile extends Component {
  state = {
    token: undefined,
    data: undefined,
    avatar: "",
    loading: false,
    open: false,
    txtFile: "Belum ada file yang dipilih",
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
      message: ""
     });
  };

  getProfile = () => {
    axios.get("http://10.10.10.240:8000/api/v1/account/profile?token="+this.state.token).then(res => {
      console.log(res.data);
      this.setState({
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

    axios.patch('http://10.10.10.240:8000/api/v1/account/profile/update?token='+this.state.token, {
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

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  componentWillMount() {
    this.setState({
      token: sessionStorage.getItem("token")
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

    let btnEdit = this.refs.btnEdit;
    let fileEdit = this.refs.fileEdit;
    let txtFile = this.refs.txtFile;

    btnEdit.addEventListener("click", () => {
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
        <Dialog
          open={this.state.open}
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
                Kembali
              </Button>
          </DialogActions>
        </Dialog>
        <div className="container text-center my-5">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <img src={this.state.avatar} className="avatar" alt=""/>
                  <br/>
                  <button ref="btnEdit" type="button" className="my-4 btn-edit-photo">Ubah Foto</button>
                  <br/>
                  <span className="txtFile" ref="txtFile">{this.state.txtFile}</span>
                  <input ref="fileEdit" className="edit-photo" type="file" />
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

                  <div className="loading-wrapper">
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
