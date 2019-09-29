import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



const Contrib = ({ contrib, index }) =>
 <TableRow key={contrib.login}>
  <TableCell component="th" scope="row">
    <Link target="_blank" href={contrib.html_url}>
        {contrib.login}
    </Link>
  </TableCell>
  <TableCell ><Avatar alt={contrib.login} src={contrib.avatar_url}  /></TableCell>
</TableRow>;

export default class GitUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contribs: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    let str = window.location.pathname;
    let Repository = str.substring(7);
    axios
      .get(
        window.encodeURI(
          `https://api.github.com/repos${Repository}/contributors`,
        ),
      )
      .then(response => {
        const contribs = response.data;
        this.setState({
          contribs,
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
    const { error, contribs } = this.state;

    if (error) {
      console.log(error);
      return this.renderError();
    }

    return (
      <Paper>
        <h1>Contributors</h1> 
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contribs.map((contrib, index) =>
            <Contrib contrib={contrib} index={index} key={contrib.login} />,
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
