import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const drawerWidth = 260;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 40,
        width: 300,
        position: "fixed",
        left: 0,
        borderRadius: 20,
        border: 1,
        borderStyle: "solid",
        borderColor: "orange",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
        marginTop: -20
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    h6: {
        marginTop: -20
    },
    h6noBtn: {
        marginTop: -20,
        marginLeft: "18%"
    },
    instrP: {
        marginTop: "1rem"
    },
    list: {
        paddingLeft: "1.5rem"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    chip: {
        margin: theme.spacing.unit,
        backgroundColor: "orange",
        border: 1,
        borderStyle: "solid",
        borderColor: "blue",
        cursor: "pointer"
    },
});

class PersistentDrawerLeft extends React.Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >

                    <Toolbar disableGutters={!open}>
                        {this.props.home || this.props.private ? (
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : <span>&nbsp;&nbsp;&nbsp;</span>}

                        {this.props.userName && (this.props.home || this.props.private) ? (
                            <Typography variant="h6" color="inherit" noWrap className={classes.h6}>
                                Logged in as {this.props.userName}
                            </Typography>
                        ) : this.props.userName ? (
                            <Typography variant="h6" color="inherit" noWrap className={classes.h6noBtn}>
                                Logged in as {this.props.userName}
                            </Typography>
                        ) : ""}
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <p className={classes.instrP}>Click one to search by tag</p>
                    <List className={classes.list}>

                        {["Asian", "Appetizer", "Baked Goods", "Beans", "Beef", "Bread", "Breakfast", "Brunch", "Cake", "Casserole", "Chicken", "Cookie", "Corn", "Dessert", "Drinks", "Eggs", "Fish", "Fruit", "Holiday", "Lamb", "Meat", "Mediterranean", "Mexican", "Pasta", "Pastry", "Pizza", "Pork", "Potato", "Poultry", "Rice", "Salad", "Sandwich", "Seafood", "Side Dish", "Soup", "Vegan", "Vegetarian"].map((text, index) => (
                            <Chip label={text} key={text} className={classes.chip} onClick={() => this.props.tagSearch(text)} />
                        ))}
                    </List>
                    <Divider />

                </Drawer>

            </div>
        );
    }
}

PersistentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);