import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./components/navbar.component"
import mock from "./components/mock.component"
import HeaderComponent from "./components/header.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <mock />
        <Route path="/users/list" component={mock} />
      </div>
    </Router>
  );
}

export default App;