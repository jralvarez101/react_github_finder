import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  SET_ALERT,
  CLEAR_USERS,
  GET_USERS,
  GET_REPOS,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setLoading();
    // fetch the data
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // set state to false since it already fetched the data and set users to the new data
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User

  // Get Repos

  // Clear Users

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
