import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
      <td>{props.user.name.first} {props.user.name.last}</td>
      <td>{props.user.gender}</td>
      <td>{props.user.dob}</td>
      <td>{props.user.news}</td>
      <td>{props.user.email}</td>
      <td><img alt='Profile' src={props.user.picture.thumbnail}></img></td>
      <td>
        <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a> | <Link to={"/details/"+props.user._id}>détails</Link>
      </td>
    </tr>
  )

export default class mock extends Component{
    constructor(){
        super();
        this.state = {
            users: []
        };
        // fix the this value
        this.getRandomUsers = this.getRandomUsers.bind(this);
      }
    
      componentWillMount() {
        this.getRandomUsers();
      }
      // for test
      componentDidMount() {
        axios.get('http://localhost:5000/list/')
         .then(response => {
           this.setState({ 
               users: response.data 
            });
         })
         .catch((error) => {
            console.log(error);
         })
    }
      getRandomUsers(userCount = 100) {
        const promise = fetch(`https://randomuser.me/api/?results=${userCount}`)
          .then(response => {
            if(response.status >= 400) {
              throw `Response invalid ( ${response.status} )`;
              return;
            }
            return response.json();
          })
          .then(({results}) => {
            return results;
          })
          .catch(error => {
            console.log(error);
          });
      
        return promise;
      }

      deleteUser(id) {
        axios.delete('http://localhost:5000/'+id)
          .then(res => console.log(res.data));  this.setState({
          users: this.state.users.filter(el => el._id !== id)
        })
        }

      usersList() {
        return this.state.users.map(currentuser => {
          return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
        })
        }
        onClick(e){

        }
      render() {
        return (
        <div>     
            <h3> Users list</h3>
            <button onClick={this.onClick}>Fetch users </button>
            <p>Users number in current collection {this.state.users.length}</p>
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>username</th>
                <th>gender</th>
                <th>dob</th>
                <th>news</th>
                <th>email</th>
                <th>photo</th>
                </tr>
            </thead>
            <tbody>
                { this.usersList() }
            </tbody>
            </table>
        </div>
        );
      }
    }