import React from 'react';
import { Link } from "react-router-dom";
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
import CancelPresentation from '@material-ui/icons/CancelPresentation';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import ChartModal from "../Modal/chartModal.js";
import "./drawer.css";


const drawerWidth = 260;
let headerWidth = 0;


const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        maxHeight: "40px",
        
        position: "fixed",
        left: 0,
        backgroundColor: "brown",
        borderRadius: 20,
        border: 1,
        borderStyle: "solid",
        borderColor: "orange",
        textAlign: "center",
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
        marginTop: "-6%",
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
        justifyContent: 'flex-end',
        backgroundColor: "brown"
    },
    h6: {
        marginTop: "-6%",
        whiteSpace: "initial",
        display: "inline-block",
        fontSize: "1rem",
        fontFamily: "Acme, sans-serif"
    },
    h6noBtn: {
        marginLeft: "11%",
        marginTop: "-6%",
        whiteSpace: "initial",
        fontSize: "1rem",
        fontFamily: "Acme, sans-serif"
    },
    h6noBtnLong: {
        marginLeft: "7%",
        whiteSpace: "initial",
        fontSize: "1rem"
    },
    logout: {
        marginTop: "-6%",
        marginLeft: 4
    },
    logoutBtn: {
        color: "white",
        fontSize: "1rem"
    },
    chevron: {
        color: "#fcb10d"
    },
    divider: {
        backgroundColor: "#fcb10d"
    },
    instrP: {
        backgroundColor: "brown",
        margin: 0,
        padding: "1rem 0",
        color: "#fcb10d",
        fontSize: "1.1rem"
    },
    list: {
        paddingLeft: "1.5rem",
        backgroundColor: "#fcb10d"
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
        backgroundColor: "brown",
        color: "white",
        cursor: "pointer",
        fontFamily: "Signika, sans-serif",
        fontSize: ".9rem"
    },
});

class PersistentDrawerLeft extends React.Component {
    state = {
        open: false
    };

    componentDidMount() {
        //Changes the opacity of the appbar in the top left corner if the user scrolls down
        var appbar = document.getElementById('appbar');
        window.onscroll = function (ev) {
            if (this.pageYOffset > 100) {
                appbar.style.opacity = '0.6';
            } else {
                appbar.style.opacity = '1';
            }
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    //Closes drawer when tag is searched
    handleSearchAndClose = text => {
        this.setState({ open: false });
        this.props.tagSearch(text);
    };

    //Closes drawer when chart modal is displayed
    showChart = () => {
        this.props.showChartModal();
        this.handleDrawerClose();
    }

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    id="appbar"
                    className={
                        classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}>

                    <Toolbar disableGutters={!open}>
                        {/* Displays the menu button only on the home and privateRecipes pages (where recipes are able to be searched) */}
                        {this.props.home || this.props.private ? (
                            <Tooltip title="Tag Search">
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleDrawerOpen}
                                    className={classNames(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Tooltip>
                        ) : <span>&nbsp;&nbsp;&nbsp;</span>}

                        {/* Displays a message with different margins depending on the page, i.e. if the menu button is displayed */}
                        {this.props.userName && (this.props.home || this.props.private) ? (
                            <Typography id="loggedIn" variant="h6" color="inherit" noWrap className={classes.h6}>
                                Logged in as {this.props.userName}
                            </Typography>

                        ) : this.props.userName ? (
                            <Typography id="loggedIn" variant="h6" color="inherit" noWrap className={classes.h6noBtn}>
                                Logged in as {this.props.userName}
                            </Typography>
                        ) : ""}
                        {/* If the user is logged in, a log out button is displayed */}
                        {this.props.userName ? (
                            <Tooltip title="Log Out?">
                                <IconButton
                                    color="inherit"
                                    aria-label="Log out"
                                    className={classes.logout}
                                    onClick={this.props.logout}>
                                    <Link to={"/"} className={classes.logoutBtn}>
                                        <CancelPresentation />
                                    </Link>
                                </IconButton>
                            </Tooltip>
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
                    <button className="btn openChartBtn" onClick={this.showChart}>See Graph</button>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon className={classes.chevron} /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider className={classes.divider} />
                    <p className={classes.instrP}>Click one to search by tag</p>
                    {/* Displays list of tags as chips */}
                    <List className={classes.list}>

                        {["Asian", "Appetizer", "Baked Goods", "BBQ", "Beans", "Beef", "Bread", "Breakfast", "Brunch", "Cake", "Casserole", "Cheese", "Chicken", "Chocolate", "Cookie", "Dessert", "Drinks", "Eggs", "Fish", "Fruit", "Gluten-Free", "Holiday", "Lamb", "Meat", "Mediterranean", "Mexican", "Pasta", "Pastry", "Pizza", "Pork", "Potato", "Poultry", "Rice", "Salad", "Sandwich", "Seafood", "Side Dish", "Soup", "Vegan", "Vegetarian"].map((text, index) => (
                            <Chip label={text} key={text} className={classes.chip} onClick={() => this.handleSearchAndClose(text)} />
                        ))}
                    </List>
                    <Divider />

                </Drawer>
                <ChartModal home={this.props.home} show={this.props.chartModal} closeModal={this.props.closeModal} />
            </div>
        );
    }
}

PersistentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);