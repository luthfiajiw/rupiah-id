import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 100,
  },
});


class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPass: "",
      newPass: "",
      confirmPass: '',
      showPassword: false
    };
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.handleClosePass}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"
            className="mx-auto text-center">
            {"Ganti password"}
          </DialogTitle>

          <DialogContent>
            <div className="text-center wow bounceIn">
            <TextField
              id="outlined-adornment-password"
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              type={this.state.showPassword ? 'text' : 'password'}
              label="Password Lama"
              value={this.props.oldPass}
              onChange={this.props.handleOldPass}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="outlined-adornment-password"
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              type={this.state.showPassword ? 'text' : 'password'}
              label="Password Baru"
              value={this.props.newPass}
              onChange={this.props.handleNewPass}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="outlined-adornment-password"
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              type={this.state.showPassword ? 'text' : 'password'}
              label="Konfirmasi Password Baru"
              value={this.props.confirmPass}
              onChange={this.props.handleConfirmPass}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            </div>
          </DialogContent>
          <DialogActions className="mx-auto">
            <Button onClick={this.props.changePassword} className="btn btn-success">
              Ubah
            </Button>
            <Button onClick={this.props.onClose} className="btn btn-cancel">
              Batal
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangePassword);
