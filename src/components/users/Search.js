import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  // input usually has a state attached to the input and you also must add an onchange event.
  state = {
    text: '',
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  // this onChange handler will work for all inputs because we are using e.target.name which is = to "text"
  // if there was another name for an input it would still work because of this.
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      // In this case we will be passing the state in the form of props up to the main component (App.js)
      this.props.searchUsers(this.state.text);
      //reset state to nothing after it is submitted
      this.setState({ text: '' });
    }
  };

  render() {
    return (
      <div>
        <form className='form' onSubmit={this.onSubmit}>
          <input
            type='text'
            name='text'
            placeholder='Search users ...'
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {this.props.showClear && (
          <button
            className='btn btn-light btn-block'
            onClick={this.props.clearUsers}
          >
            {' '}
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
