import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import GitRepos from './GitRepos';
import GitBranch from './GitBranch';

function App() {

  return (
    <div className="App">
     
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
          {/* <GitRepos /> */}
           <GitBranch />
    </div>
  );
}

export default App;
