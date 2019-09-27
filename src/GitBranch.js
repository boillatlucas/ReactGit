import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BrowserRouter as Router, Route, Linki } from "react-router-dom";



const Branch = ({ branch, index }) =>
 <TableRow key={branch.name}>
  <TableCell component="th" scope="row">{branch.name}</TableCell>
</TableRow>;

export default class Gitbranch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      branchs: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(
        window.encodeURI(
          `https://api.github.com/repos/vuejs/vue/branches`,
        ),
      )
      .then(response => {
        const branchs = response.data;
        this.setState({
          branchs,
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
    const { error, branchs } = this.state;

    if (error) {
      console.log(error);
      return this.renderError();
    }

    return (
      <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {branchs.map((branch, index) =>
            <Branch branch={branch} index={index} key={branch.name} />,
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
