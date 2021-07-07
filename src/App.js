import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/Users';
import Search from './components/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  //This function was called inside the Search component and then passed up here as a prop where it
  // takes the "text" state
  searchUsers = async (text) => {
    this.setState({ loading: true });
    // fetch the data
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // set state to false since it already fetched the data and set users to the new data
    this.setState({ users: res.data.items, loading: false });
  };

  // clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // sets alert if nothing is entered in the search input field
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading } = this.state;
    return (
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github' />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
