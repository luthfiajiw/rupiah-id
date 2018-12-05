import React, { Component } from 'react';
import './css/signin.css';
import Ink from 'react-ink';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { css } from 'react-emotion';
import {BounceLoader} from 'react-spinners';

const override = css`
    border-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 30%);
`;

class SignIn extends Component {

  state = {
    data: undefined,
    redirect: false,
    username: "",
    password: ""
  }

  signIn = (i) => {
    i.preventDefault();

    this.setState({
      data: "loading"
    })

    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    axios.post('http://10.10.10.240:8000/api/v1/login', formData).then(res => {
      console.log(res.data);
      this.setState({
        data: res.data,
        redirect: true
      })
    }).catch(error =>
      console.error('Error:', error))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  render() {
    if (this.state.data == "loading") {
      return(
        <div className="loading-wrapper">
          <div className='sweet-loading text-center'>
            <img className="logo-r" src={require('../assets/rupiah-id.svg')} alt="rupiah-id"/>
          <BounceLoader
            className={override}
            sizeUnit={"px"}
            size={150}
            color={'#ffffff'}
            loading={this.state.loading}
          />
        </div>
        </div>
      )
    }else if (this.state.data !== undefined && this.state.data !== "loading") {
      return (
        <Redirect to="/dashboard/daily" />
      );
    }
    return (
      <div className="bg-sign-in">
        <div className="sign-in text-center">
          <div>
            <img className="logo-rupiah" src={require('../assets/logo-r.png')} alt="rupiah-id"/>
          </div>
          <form className="form-signin">
            <div className="InputBox user">
              <input type="text" name="username" required='required' onChange={this.handleChange}/>
              <label>Username</label>
            </div>
            <div className="InputBox password">
              <input type="password" name="password" required='required' onChange={this.handleChange}/>
              <label>Password</label>
            </div>
            <a className="forget-pass text-left" href="">Lupa password?</a>
            <br/>
            {/* <Link to="/dashboard/daily"> */}
            <button type="submit" className="btn btn-form"  onClick={this.signIn}>
              Masuk
            </button>
          {/* </Link> */}
          </form>
        </div>
      </div>
    );
  }

}

export default SignIn;
