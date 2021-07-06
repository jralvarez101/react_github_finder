import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/Users";
import Search from './components/Search'
import axios from "axios";
import PropTypes from 'prop-types'


class App extends Component {
  state = {
    users:[],
    loading: false
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  }

  //This function was called inside the Search component and then passed up here as a prop where it 
  // takes the "text" state
  searchUsers = async text => {
    this.setState({loading: true})
    // fetch the data
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // set state to false since it already fetched the data and set users to the new data
    this.setState({users: res.data.items, loading: false})
  }
  

  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Search searchUsers={this.searchUsers}/>
          <Users  loading={this.state.loading} users={this.state.users}/>
        </div>
      </div>
    );
  }
}

export default App;
