import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';



const Repo = ({ repo, index }) =>
 <TableRow key={repo.name}>
  <TableCell component="th" scope="row">{index + 1}</TableCell>
  <TableCell > 
      <Link href={repo.html_url}>
        {repo.name}
      </Link></TableCell>
  <TableCell >{repo.stargazers_count}</TableCell>
  <TableCell ><Avatar alt={repo.name} src={repo.owner.avatar_url}  /></TableCell>
</TableRow>;

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
          `https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc&type=Repositories`,
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
      <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Stars count</TableCell>
            <TableCell >Avatar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repos.map((repo, index) =>
            <Repo repo={repo} index={index} key={repo.id} />,
          )}
        </TableBody>
      </Table>
      </Paper>
    );
  }

  render() {
    return this.state.loading ? this.renderLoading() : this.renderList();
  }
}
