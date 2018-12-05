import React, { Component } from 'react';
import './css/signin.css';
import { css } from 'react-emotion';
import Ink from 'react-ink';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {BounceLoader} from 'react-spinners';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
    axios.post('http://10.10.10.240:8000/api/v1/register', formData).then(res => {
      console.log(res.data);
      this.setState({
        data: res.data,
        redirect: true
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    })

    const emailReg = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
    const {disabled, username, email, password} = this.state

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

  signUp = () => {
    this.setState({
      data: "loading"
    })
  }

  render() {
    console.log(this.state);

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
    } else if (this.state.data !== "loading" && this.state.data !== undefined) {
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
              <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required='required' data-toggle="tooltip" data-placement="bottom" title="Maksimal 10 karakter"/>
              <label data-toggle="tooltip" data-placement="bottom" title="Maksimal 10 karakter">Username</label>
            </div>
            <div className="InputBox email">
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required='required'/>
              <label>Email</label>
            </div>
            <div className="InputBox password">
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required='required' data-toggle="tooltip" data-placement="bottom" title="Minimal 6 karakter"/>
              <label data-toggle="tooltip" data-placement="bottom" title="Minimal 6 karakter">Password</label>
            </div>
            {/* <Link to={`/${this.state.data === null ? "sign-up" : "sign-in"}`}> */}
            <button type="button" className="btn btn-form" onClick={this.postData} disabled={!this.state.disabled}>
              Daftar
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
