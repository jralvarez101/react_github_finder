import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";

const Search = ({ setAlert }) => {
  // initialize Github context
  const githubContext = useContext(GithubContext);

  // input usually has a state attached to the input and you also must add an onchange event.
  const [text, setText] = useState("");

  // this onChange handler will work for all inputs because we are using e.target.name which is = to "text"
  // if there was another name for an input it would still work because of this.
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      // In this case we will be passing the state in the form of props up to the main component (App.js)
      githubContext.searchUsers(text);
      //reset state to nothing after it is submitted
      setText("");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search users ..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          {" "}
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default Search;
