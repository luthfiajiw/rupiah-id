import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing';
import SignIn from './pages/Sign-in.js';
import SignUp from './pages/Sign-up.js';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Datas from './pages/Datas';
import Purchases from './pages/Purchases';
import Sales from './pages/Sales';
import Store from './pages/Store';
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
            <Route path="/purchases" component={Purchases}/>
            <Route path="/sales" component={Sales}/>
            <Route path="/store" component={Store}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
