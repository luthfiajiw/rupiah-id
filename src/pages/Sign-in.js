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
    username: "",
    password: "",
    error: undefined,
    open: true
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
      axios.post('http://10.10.10.240:8000/api/v1/login', formData).then(res => {
        console.log(res);
        sessionStorage.setItem('token', res.data.data.token)
        this.setState({
          token: res.data.data.token,
          user: res.data.user,
          redirect: true
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
    this.setState({
      [e.target.name] : e.target.value,
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
    // If success
    }else if (this.state.error !== undefined && this.state.token === "error") {
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
    }else if (sessionStorage.getItem('token')) {
      return(
        <Redirect to="/dashboard/daily"/>
      )
    // Abandoned entering signin page
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
            <button type="submit" className="btn btn-form" onClick={this.signIn}>
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
