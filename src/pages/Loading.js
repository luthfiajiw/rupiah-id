import React, { Component } from 'react';
import {BounceLoader} from 'react-spinners';

const override = css`
    border-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 30%);
`;

class Loading extends Component {

  render() {
    return (
      <div className="loadingPage">
        <div className="loading-wrapper">
          <div className='text-center'>
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
      </div>
    );
  }

}

export default Loading;
