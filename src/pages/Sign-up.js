import React, { Component } from 'react';
import './css/signin.css';
import Ink from 'react-ink';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  state = {
    data: undefined,
    username: "",
    email: "",
    password: ""
  }

  postData = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    axios.post('http://10.10.10.240:8000/api/v1/register', formData).then(res => {
      this.setState({
        data: res.data
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  signUp = () => {
    this.setState({
      data: "loading"
    })
  }

  componentDidUpdate() {
    this.setState({
      data: res.data
    })
  }


  render() {

    if (this.state.data == "loading") {
      return(
        <h1>LOADING</h1>
      )
    }
    console.log(this.state.data);
    return (
      <div className="bg-sign-in">
        <div className="sign-in text-center">
          <h1 className="title-form">Rupiah.ID</h1>
          <form className="form-signin">
            <div className="InputBox user">
              <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required='required'/>
              <label>Username</label>
            </div>
            <div className="InputBox email">
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required='required'/>
              <label>Email</label>
            </div>
            <div className="InputBox password">
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required='required'/>
              <label>Password</label>
            </div>
            {/* <Link to={`/${this.state.data === null ? "sign-up" : "sign-in"}`}> */}
            <button type="button" className="btn btn-form" onClick={this.signUp}>
              Daftar
            </button>
          {/* </Link> */}
          <br/>
          <Link to="/sign-in" className="forget-pass" onClick={this.signUp}>Masuk Dengan Akun Anda</Link>

          </form>
        </div>
      </div>
    );
  }

}

export default SignUp;
