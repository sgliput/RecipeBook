import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Person from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SignInHome from "../SignInHome";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: "1.5rem"
  },
  arrow: {
    textAlign: "right"
  },
  heading: {
    fontSize: "1.3rem",
    fontFamily: "Acme, sans-serif",
    fontWeight: theme.typography.fontWeightRegular,
    margin: "0 auto"
  },
  userIcon: {
    marginBottom: -5,
    marginRight: "1rem"
  },
  dropdown: {
    borderTop: "2px solid orange"
  }

});

class SimpleExpansionPanel extends React.Component {
  
  state = {
      
  }

  render(){
    const { classes } = this.props;
  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={this.props.openCollapse} className={classes.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.arrow} onClick={this.props.changePanel} />}>
          <Typography className={classes.heading}>
            <Person className={classes.userIcon} />
            Want to sign in?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.dropdown}>
          <SignInHome showSignInModal={this.props.showSignInModal} showLogInModal={this.props.showLogInModal} signInModal={this.props.signInModal} logInModal={this.props.logInModal} closeModal={this.props.closeModal} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);