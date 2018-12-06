import React, { Component } from 'react';
import './App.css';
import Landing from './pages/Landing';
import SignIn from './pages/Sign-in.js';
import SignUp from './pages/Sign-up.js';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Datas from './pages/Datas';
import Category from './pages/datas/Category';
import Customer from './pages/datas/Customer';
import Stock from './pages/datas/Stock';
import Stuffs from './pages/datas/Stuffs';
import Supplier from './pages/datas/Supplier';
import Purchases from './pages/Purchases';
import Sales from './pages/Sales';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/home" component={Home}/>
            <Route path="/sign-up" component={SignUp}/>
            <Route path="/sign-in" component={SignIn}/>
            <Route path="/dashboard/daily" component={Dashboard}/>
            <Route path="/dashboard/monthly" component={Dashboard}/>
            <Route path="/datas" component={Datas}/>
            <Route path="/category" component={Category}/>
            <Route path="/customer" component={Customer}/>
            <Route path="/stock" component={Stock}/>
            <Route path="/stuffs" component={Stuffs}/>
            <Route path="/supplier" component={Supplier}/>
            <Route path="/purchases" component={Purchases}/>
            <Route path="/sales" component={Sales}/>
            <Route path="/profile" component={Profile}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
