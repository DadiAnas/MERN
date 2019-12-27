import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        
    }

  render() {
    return (
        <header class="masthead text-white text-center" style="background:url('../images/header/bg-masthead.jpg')no-repeat center center;background-size:cover;">
        <div class="overlay"></div>
        <div class="container">
            <div class="row">
                <div class="col-xl-9 mx-auto">
                    <h1 class="mb-5">Frontend of exam project</h1>
                </div>
                <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
                    <form onSubmit={this.onSubmit}>
                        <div class="form-row">
                            <div class="col-12 col-md-9 mb-2 mb-md-0">
                                <input class="form-control form-control-lg" type="email" placeholder="Enter your email..." />
                            </div>
                            <div class="col-12 col-md-3"><button class="btn btn-primary btn-block btn-lg" type="submit">Find</button></div>
                        </div>
                    </form>
                </div> 
            </div>
        </div>
    </header>
    );
  }
}