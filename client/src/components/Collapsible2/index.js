import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Help from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./collapsible2.css";


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
    borderTop: "2px solid orange",
    display: "block",
    backgroundColor: "brown"
  }
});

function SimpleExpansionPanel2(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.arrow} />}>
          <Typography className={classes.heading}>
            <Help className={classes.userIcon} />
            Helpful Tips</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.dropdown}>
          <h3 className="tipH">Posting</h3>
          <p className="tipP">When you post a recipe, you can mark it as either public or private. If you mark it as public, it will be added to the recipes here on the home page, as well as in your personal Recipe Book. If you mark it private, it will be added only to your personal Recipe Book.</p>
          <p className="tipP">Importing a recipe from another site will add it solely to your private Recipe Book and will not be posted on the home page.</p>
          <h3 className="tipH">Deleting</h3>
          <p className="tipP">If you delete a recipe from your personal Recipe Book, it will not delete it on the home page. As the original poster, if you want to delete a recipe entirely, remove it from the home page first, then from your Recipe Book.</p>
          <h3 className="tipH">Editing</h3>
          <p className="tipP">When you edit a recipe in your Recipe Book, it creates a record separate from the public version. Doing so will ensure that recipe can't be removed by the original poster.</p>
          <p className="tipP">If you are the original poster and want to edit the recipe you originally posted, edit the public version rather than the one in your Recipe Book.</p>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel2);