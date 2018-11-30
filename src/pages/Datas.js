import React, { Component } from 'react';
import Category from './datas/Category';
import Customer from './datas/Customer';
import Stock from './datas/Stock';
import Stuffs from './datas/Stuffs';
import Supplier from './datas/Supplier';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Datas extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <h1 className="">Datas</h1>
          <Switch>
            <Route exact path="/datas/category" component={Category}/>
            <Route path="/datas/customer" component={Customer}/>
            <Route path="/datas/stock" component={Stock}/>
            <Route path="/datas/stuffs" component={Stuffs}/>
            <Route path="/datas/supplier" component={Supplier}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default Datas;
