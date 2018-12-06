import React, { Component } from 'react';
import './css/profile.css';
import Navbar from './Navbar';
import axios from 'axios';

class Profile extends Component {
  state = {
    token: undefined,
    data: undefined,
    avatar: "",
    txtFile: "Belum ada file yang dipilih",
    username: "",
    email: "",
    fullname: "",
    address: "",
    phone: "",
  }

  getProfile = () => {
    axios.get("http://10.10.10.240:8000/api/v1/account/profile?token="+this.state.token).then(res => {
      console.log(res.data);
      this.setState({
        avatar: res.data.data.photo,
        username: res.data.data.username,
        email: res.data.data.email,
        phone: res.data.data.phone_number,
        address: res.data.data.address
      })
    })
  }

  componentWillMount() {
    this.setState({
      token: sessionStorage.getItem("token")
    })
  }

  componentDidUpdate() {
    this.getProfile();
  }

  componentDidMount() {
    this.getProfile();

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
    console.log(this.state.data);
    console.log(this.state.token);
    return (
      <div className="profile">
        <Navbar headerApp="Profil"/>
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
                      <input className="profilUsername" type="text" name="username" value={this.state.username}/>
                    </div>
                    <div className="inputBox">
                      <label className="d-block">Email</label>
                      <input className="profilEmail" type="email" name="email" value={this.state.email}/>
                    </div>
                    <div className="inputBox">
                      <label className="d-block">Alamat</label>
                      <textarea rows="5" cols="20" className="profilAddress" value={this.state.address}></textarea>
                    </div>
                    <div className="inputBox">
                      <label className="d-block">Nomor Telepon</label>
                      <input className="profilPhone" type="tel" name="telephone" value={this.state.phone}/>
                    </div>

                    <button type="submit" className="btn my-3 profileSubmit">Ubah</button>
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
