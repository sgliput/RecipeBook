import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
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
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    margin: "0 auto"
  },
  
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.arrow} />}>
          <Typography className={classes.heading}>Want to sign in?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <SignInHome showSignInModal={props.showSignInModal} showLogInModal={props.showLogInModal} signInModal={props.signInModal} logInModal={props.logInModal} closeModal={props.closeModal} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);