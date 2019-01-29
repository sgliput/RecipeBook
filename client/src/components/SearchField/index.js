import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 250
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

function CustomizedInputBase(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      {/* Displays a different search field depending on whether it is on the home or the privateRecipes page */}
      {props.private ?
        <InputBase className={classes.input} placeholder="Search Your Recipes" value={props.privateSearchTerms} onChange={props.handlePrivateSearchChange} /> :
        <InputBase className={classes.input} placeholder="Search Recipes" value={props.searchTerms} onChange={props.handleSearchChange} />}

        {/* This statement displays a disabled button if there are no search terms entered, broken up depending on whether it is on the home or the privateRecipes page */}
      {props.private && props.privateSearchTerms ? (
        <IconButton className={classes.iconButton} aria-label="Search" onClick={props.onPrivateSearch}>
          <SearchIcon />
        </IconButton>
      ) : props.private ? (
        <IconButton className={classes.iconButton} aria-label="Search" onClick={props.onPrivateSearch} disabled>
        <SearchIcon />
      </IconButton>
      ) : props.searchTerms ? (
        <IconButton className={classes.iconButton} aria-label="Search" onClick={props.onSearch}> 
            <SearchIcon />
          </IconButton>
      ) : (
        <IconButton className={classes.iconButton} aria-label="Search" onClick={props.onSearch} disabled> 
        <SearchIcon />
      </IconButton>
      )}
        {/* If the user has searched, the ALL button allows them to retrieve all the recipes again */}
        {props.searched ? (
          <IconButton className={classes.iconButton} aria-label="Get All Recipes" onClick={props.getAllRecipes}>
          All
          </IconButton>
        ) : ""}
    </Paper>
  );
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputBase);
