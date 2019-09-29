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
import Detail from './Detail'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



const Repo = ({ repo, index }) =>
 <TableRow key={repo.name}>
  <TableCell > 
      <Link to={`/Detail/${repo.full_name}`}>
        {repo.name}
      </Link>
  </TableCell>
  <TableCell >{repo.description}</TableCell>
  <TableCell >{repo.stargazers_count}</TableCell>
  <TableCell ><Avatar alt={repo.owner.login} src={repo.owner.avatar_url}  /> <Link target="_blank" href={repo.owner.html_url}>{repo.owner.login}</Link></TableCell>
</TableRow>
;

export default class GitRepos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      repos: [],
      loading: true,
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event){
    this.setState({value: event.target.value});
  
  }

  componentDidMount() {
    axios
    .get(
      window.encodeURI(
        'https://api.github.com/search/repositories?q=name:&sort=stars&order=desc&type=Repositories',
      ),
    )
    .then(response => {
      const repos = response.data.items;
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
    
  

  /* componentDidUpdate() {
    console.log(this.state.value);
    
    axios
      .get(
        window.encodeURI(
          'https://api.github.com/search/repositories?q=name:&sort=stars&order=desc&type=Repositories',
        ),
      )
      .then(response => {
        const repos = response.data.items;
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
  } */

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
        value={this.state.value} 
        onChange={this.handleChange} 
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
            <TableCell >Name</TableCell>
            <TableCell>Description</TableCell>
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

          
      <Route path="/Detail/:repoId" component={Detail} />

      </Router>        
    );
  }

  render() {
    
    return this.state.loading ? this.renderLoading() : this.renderList();

    
  }
}
