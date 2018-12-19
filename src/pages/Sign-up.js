import React, { Component } from 'react';
import './css/signin.css';
import { css } from 'react-emotion';
import Ink from 'react-ink';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import {BounceLoader} from 'react-spinners';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DoneAll from '@material-ui/icons/DoneAll';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const override = css`
    border-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 30%);
`;

class SignUp extends Component {
  state = {
    data: undefined,
    loading: true,
    open: true,
    redirect: false,
    disabled: false,
    username: "",
    email: "",
    password: ""
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  postData = (e) => {
    e.preventDefault();

    this.setState({
      data: "loading"
    })

    const formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    axios.post('https://api-penjualanapp.herokuapp.com/api/v1/register', formData).then(res => {
      console.log(res.data);
      this.setState({
        data: res.data,
        redirect: true
      })
    }).catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    })

    const emailReg = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
    const {username, email, password} = this.state

    if (username.length > 1 && username.length <= 10) {
      if (emailReg.test(email)) {
        if (password.length > 4) {
          this.setState({
            disabled: true
          })
        }else {

          this.setState({
            disabled: false
          })
        }
      }else {
        this.setState({
          disabled: false
        })
      }
    }else {
      this.setState({
        disabled: false
      })
    }
  }

  componentDidMount() {
    const labelUsr = document.getElementById('label-usr');
    const labelEmail = document.getElementById('label-email');
    const labelPass = document.getElementById('label-pass');

    const inptUsr = document.getElementById('inp-usr');
    const inptEmail = document.getElementById('inp-email');
    const inptPass = document.getElementById('inp-pass');

    labelUsr.addEventListener('click', function() {
      inptUsr.focus();
    })

    labelEmail.addEventListener('click', function() {
      inptEmail.focus();
    })

    labelPass.addEventListener('click', function() {
      inptPass.focus();
    })
  }



  render() {

    // Processing signup
    if (this.state.data === "loading") {
      return(
        <div className="loading-wrapper">
          <div className='sweet-loading text-center'>
            <img className="logo-r" src={'https://svgshare.com/i/9zU.svg'} alt="rupiah-id"/>
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
      // If success
    }else if (sessionStorage.getItem('token')) {
      return(
        <Redirect to="/dashboard/daily" />
      )
    }else if (this.state.data !== "loading" && this.state.data !== undefined) {
      return(
        <div className="loading-wrapper">
          <div className='sweet-loading text-center'>
            <img className="logo-r" src={'https://svgshare.com/i/9zU.svg'} alt="rupiah-id"/>
          <BounceLoader
            className={override}
            sizeUnit={"px"}
            size={150}
            color={'#ffffff'}
            loading={this.state.loading}
          />
        </div>
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
              {"Akun Anda Telah Terdaftar"}
          </DialogTitle>

          <DialogContent>
            <div className="text-center wow bounceIn">
              <DoneAll style={{fontSize: "100px", color: "rgb(112, 204, 74)"}}/>
            </div>
          </DialogContent>
          <DialogActions className="mx-auto">
            <Link to="/sign-in">
              <Button onClick={this.handleClose} color="primary">
                Masuk Dengan Akun Anda
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
        </div>
      )
    }
    return (
      <div className="bg-sign-in">
        <div className="sign-in text-center">
          <img className="logo-rupiah" src={require('../assets/logo-r.png')} alt="rupiah-id"/>
          <form className="form-signin">
            <div className="InputBox user">
              <li className="fas fa-user-circle"></li>
              <input id="inp-usr" type="text" name="username" value={this.state.username} onChange={this.handleChange} required='required' data-toggle="tooltip" data-placement="bottom" title="Maksimal 10 karakter"/>
              <label id="label-usr" data-toggle="tooltip" data-placement="bottom" title="Maksimal 10 karakter">Username</label>
            </div>
            <div className="InputBox email">
              <li className="fas fa-envelope"></li>
              <input id="inp-email" type="email" name="email" value={this.state.email} onChange={this.handleChange} required='required'/>
              <label id="label-email">Email</label>
            </div>
            <div className="InputBox password">
              <li className="fas fa-lock"></li>
              <input id="inp-pass" type="password" name="password" value={this.state.password} onChange={this.handleChange} required='required' data-toggle="tooltip" data-placement="bottom" title="Minimal 6 karakter"/>
              <label id="label-pass" data-toggle="tooltip" data-placement="bottom" title="Minimal 6 karakter">Password</label>
            </div>
            {/* <Link to={`/${this.state.data === null ? "sign-up" : "sign-in"}`}> */}
            <button type="button" className="btn btn-form" data-toggle="tooltip" data-placement="bottom" title="Lengkapi data di atas" onClick={this.postData} disabled={!this.state.disabled}>
              Daftar
              <Ink/>
            </button>
          {/* </Link> */}
          <br/>
          <Link to="/sign-in" className="forget-pass">Masuk Dengan Akun Anda</Link>
          </form>
        </div>
      </div>
    );
  }

}

export default SignUp;
