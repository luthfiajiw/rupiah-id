import React, { Component } from 'react';
import './css/signin.css';
import Ink from 'react-ink';
import { Link, Redirect } from 'react-router-dom';

class SignIn extends Component {

  render() {
    return (
      <div className="bg-sign-in">
        <div className="sign-in text-center">
          <div>
            <img className="logo-rupiah" src={require('../assets/logo-r.png')} alt="rupiah-id"/>
          </div>
          <form className="form-signin">
            <div className="InputBox user">
              <input type="text" name="username" required='required'/>
              <label>Username</label>
            </div>
            <div className="InputBox password">
              <input type="password" name="password" required='required'/>
              <label>Password</label>
            </div>
            <a className="forget-pass text-left" href="">Lupa password?</a>
            <br/>
            <Link to="/dashboard/daily">
            <button type="button" className="btn btn-form" data-dismiss="modal">
              Masuk
            </button>
          </Link>
          </form>
        </div>
      </div>
    );
  }

}

export default SignIn;
