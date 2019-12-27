import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class Edituser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeNews = this.onChangeNews.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      gender: '',
      dob: new Date(),
      news: false,
      email: '',
      photo: ''
    }
  }

  componentDidMount() {
    axios.put('http://localhost:5000/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          gender: response.data.gender,
          dob: new Date(response.data.dob),
          news: response.data.news,
          email: response.data.email,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/list/')
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }
  onChangeDob(e) {
    this.setState({
      dob: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      gender: this.state.gender,
      dob: this.state.dob,
      news: this.state.news,
      photo: this.state.photo,
    };

    console.log(user);

    axios.put('http://localhost:5000/users/'+this.props.match.params.id, user)
      .then(res => console.log(res.data));
    
    window.location = '/list';
  }

  render() {
    return (
      <div>
        <h3>Edit user Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>gender: </label>
            <input  type="text"
                required
                className="form-control"
                value="male"
                onChange={this.onChangegender}
                />
          </div>
          <div className="form-group">
            <label>Dob: </label>
            <DatePicker
              selected={this.state.dob}
              onChange={this.onChangeDob}
            />
          </div>
          <div className="form-group">
            <label>news: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.news}
                onChange={this.onChangeNews}
                />
          </div>
          <div className="form-group">
            <label>email: </label>
            <input 
                type="email" 
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          

          <div className="form-group">
            <input type="submit" value="Edit user Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}