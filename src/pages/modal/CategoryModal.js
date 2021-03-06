import React, { Component } from 'react';
import '../css/selectmodal.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CategoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      baseUrl: "https://penjualanapp-api.herokuapp.com/api/v1/category?",
      pagination: "",
      openTooltipNext: false,
      openTooltipPrev: false,
      token: ""
    };
  }

  getCategory = () => {
    const { baseUrl, token } = this.state

    axios.get(`${baseUrl}token=${token}`).then(
      res => {
        this.setState({
          datas: res.data.data,
          pagination: res.data.meta.pagination
        })
      }
    )
  }

  nextPage = () => {
    this.setState({
      baseUrl: this.state.pagination.links.next + "&",
      openTooltipNext: !this.state.openTooltipNext
    })

    this.getCategory()
  }

  prevPage = () => {
    this.setState({
      baseUrl: this.state.pagination.links.previous + "&",
      openTooltipPrev: !this.state.openTooltipPrev
    })

    this.getCategory()
  }

  componentWillMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  componentDidMount() {
    this.getCategory()
  }

  render() {
    console.log(this.state);
    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="categoryModal" id="alert-dialog-slide-title"
          className="mx-auto text-center">
          {"Pilih Kategori"}
        </DialogTitle>

        <DialogContent className="categoryModal">
          <div className="mx-md-5 mx-lg-5">
            <div className="table-responsive text-center">
              <table className="table px-5">
                <thead className="thead-modal">
                  <th>No.</th>
                  <th>Kategori Barang</th>
                </thead>
                <tbody>
                {this.state.datas.map((data, i) => {
                  return(
                    <tr className="bounceIn selectModal" onClick={this.props.selectCategory}>
                      <td id={data.category_id} name={data.category_name} onClick={this.props.selectCategory}>{i+1}</td>
                      <td id={data.category_id} name={data.category_name} onClick={this.props.selectCategory}>{data.category_name}</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-between">
                <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={this.handleTooltipClose}
                    open={this.state.openTooltipPrev}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Klik Sekali Lagi"
                  >
                <button type="button" className="btn btn-prev" onClick={this.prevPage}>Prev</button>
                </Tooltip>

                <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={this.handleTooltipClose}
                    open={this.state.openTooltipNext}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Klik Sekali Lagi"
                  >
                  <button type="button" className="btn btn-next" onClick={this.nextPage}>Next</button>
                  </Tooltip>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions className="mx-auto categoryModal">
          <Button onClick={this.props.onClose} color="primary">
            OK
            </Button>
        </DialogActions>
      </Dialog>
    );
  }

}

export default CategoryModal;
