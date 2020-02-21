import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter ,

} from "react-router-dom";
import BaseRouter from './components/Router'
  ;

class App extends Component {
  render() {
    return (
      <div className="App">

        <BrowserRouter>
          <BaseRouter />
        </BrowserRouter>
      </div>
    );



  }
}

export default App;