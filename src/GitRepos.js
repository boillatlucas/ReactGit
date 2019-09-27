import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import GitBranch from './GitBranch';

import { BrowserRouter as Router, Route, Linki } from "react-router-dom";


const Repo = ({ repo, index }) =>
 <TableRow key={repo.name}>
  <TableCell component="th" scope="row">{index + 1}</TableCell>
  <TableCell > 
      <Link to={repo.name}>
        {repo.name}
      </Link>
  </TableCell>
  <TableCell >{repo.stargazers_count}</TableCell>
  <TableCell ><Avatar alt={repo.owner.login} src={repo.owner.avatar_url}  />{repo.owner.login}</TableCell>
</TableRow>
;

export default class GitRepos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(
        window.encodeURI(
          `https://api.github.com/search/repositories?q=name:&sort=stars&order=desc&type=Repositories`,
        ),
      )
      .then(response => {
        const repos = response.data.items;
        console.log(repos);
        this.setState({
          repos,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false,
        });
      });
  }

  renderLoading() {
    return (
      <div>
        Loading...
      </div>
    );
  }

  renderError() {
    return (
      <div>
        <div>
          Sorry, an error ocurred: {this.state.error.response.data.message}
        </div>
      </div>
    );
  }

  renderList() {
    const { error, repos } = this.state;

    if (error) {
      console.log(error);
      return this.renderError();
    }

    return (
      <Router>
              <h1>Repository</h1> 
        <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        className="TextField"
        margin="normal"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        />
      <Paper>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Stars count</TableCell>
            <TableCell >Autor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repos.map((repo, index) =>
            <Repo repo={repo} index={index} key={repo.id} />,
          )}
        </TableBody>
      </Table>
      </Paper>

          
      <Route path="/:id" component={GitBranch} />

      </Router>        
    );
  }

  render() {
    return this.state.loading ? this.renderLoading() : this.renderList();
  }
}
