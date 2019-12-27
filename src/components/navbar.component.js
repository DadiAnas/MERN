import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav class="navbar navbar-light navbar-expand bg-light navigation-clean">
      <div class="container">
        <Link class="navbar-brand" to="/list">Users</Link>
        <button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"></button>
        <div class="collapse navbar-collapse" id="navcol-1"><a class="btn btn-primary ml-auto" role="button" href="#">Anas DADI</a></div>
      </div>
  </nav>
    );
  }
}