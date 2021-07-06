import React, { Component } from "react";

class Search extends Component {
    // input usually has a state attached to the input and you also must add an onchange event.
    state = {
        text:''
    }

    // this onChange handler will work for all inputs because we are using e.target.name which is = to "text"
    // if there was another name for an input it would still work because of this.
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        // In this case we will be passing the state in the form of props up to the main component (App.js)
        this.props.searchUsers(this.state.text);
        //reset state to nothing after it is submitted
        this.setState({text: ''});
    }


  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <input type="text" 
        name="text" 
        placeholder="Search users ..."  
        value={this.state.text}
        onChange={this.onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
    );
  }
}

export default Search;
