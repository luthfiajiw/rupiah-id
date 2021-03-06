import React, { Component } from 'react';
import './css/signin.css';
import Ink from 'react-ink';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { css } from 'react-emotion';
import { BounceLoader } from 'react-spinners';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Clear from '@material-ui/icons/Clear';

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

class SignIn extends Component {

  state = {
    token: undefined,
    user: undefined,
    redirect: false,
    disabled: false,
    username: "",
    password: "",
    error: undefined,
    open: true,
    baseUrl: "https://penjualanapp-api.herokuapp.com/api/v1"
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  signIn = (i) => {
    i.preventDefault();

    this.setState({
      token: "loading"
    })

    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);

    if (this.state.username && this.state.password) {
      axios.post(`${this.state.baseUrl}/auth/login`, formData).then(res => {
        localStorage.setItem('token', res.data.data.token)
        this.setState({
          token: res.data.data.token,
          user: res.data.user,
          redirect: true,
          disabled: false
        })
      }).catch(err => {
        console.error(err);
        this.setState({
          error: err,
          token: "error"
        })
      })
  }
  }

  handleChange = (e) => {
    const username = document.forms['form-signin'].elements['username'].value
    const password = document.forms['form-signin'].elements['password'].value

    if (username.length > 0 && username.length < 10) {
      if (password.length > 4) {
        this.setState({
          disabled: true
        })
      } else {
        this.setState({
          disabled: false
        })
      }
    } else {
      this.setState({
        disabled: false
      })
    }

    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  componentDidMount() {
    const labelUsr = document.getElementById('label-usr');
    const labelPass = document.getElementById('label-pass');

    const inptUsr = document.getElementById('inp-usr');
    const inptPass = document.getElementById('inp-pass');

    labelUsr.addEventListener('click', function () {
      inptUsr.focus();
    })

    labelPass.addEventListener('click', function () {
      inptPass.focus();
    })
  }

  render() {

    // Processing signin
    if (this.state.token === "loading") {
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
    // If failed
    }else if (this.state.error !== undefined && this.state.token === "error") {
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
              {"Gagal Masuk"}
          </DialogTitle>

          <DialogContent>
            <div className="text-center">
              <Clear style={{fontSize: "100px", color: "rgb(205, 32, 63)"}}/>
            </div>
          </DialogContent>
          <DialogActions className="mx-auto">
            <Link to="/">
              <Button onClick={this.handleClose} color="primary">
                KEMBALI
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
        </div>
      )
    // If success
  }else if (localStorage.getItem('token') !== null) {
      return(
        <Redirect to="/dashboard/daily"/>
      )
    // Abandoned to entering signin page
    }else if (this.state.token !== undefined && this.state.token !== "loading") {
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
          <form className="form-signin" name="form-signin">
            <div className="InputBox user">
              <li className="fas fa-user-circle"></li>
              <input id="inp-usr" type="text" name="username" required='required' onChange={this.handleChange}/>
              <label id="label-usr">Username</label>
            </div>
            <div className="InputBox password">
              <li className="fas fa-lock"></li>
              <input id="inp-pass" type="password" name="password" required='required' onChange={this.handleChange}/>
              <label id="label-pass">Password</label>
            </div>
            <button type="submit" className="btn btn-form" onClick={this.signIn} disabled={!this.state.disabled}>
              Masuk
              <Ink/>
            </button>
          {/* </Link> */}
          </form>
        </div>
      </div>
    );
  }

}

export default SignIn;
