import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PersistentDrawer from '../drawers/PersistentDrawer';

const drawerWidth = 240;

const styles = theme => ({
    root : {
        flexGrow : 1,
    },
    flex : {
        flexGrow : 1
    },
    appFrame : {
        height : 430,
        zIndex : 1, 
        overflow : 'hidden',
        position : 'relative',
        display : 'flex',
        width : '100%'
    },
    appBar : {
        position : 'absolute',
        transition : theme.transitions.create(['margin','width'],{
            easing : theme.transitions.easing.sharp,
            duration : theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift : {
        width : 'calc(100% - ${drawerWidth}px)',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
    },
    'appBarShift-left' : {
        marginLeft : drawerWidth,
    },
    'appBarShift-right' : {
        marginRight : drawerWidth,
    },
    menuButton : {
        marginLeft : 2,
        marginRight : 20,
    },
    hide : {
        display : 'none',
    },
    drawerPaper : {
        position : 'relative',
        width : drawerWidth,
    },
    drawerHeader : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'flex-end',
        padding : '0 8px',
        ...theme.mixins.toolbar,
    },
    content : {
        flexGrow : 1,
        backgroundColor : theme.palette.background.default,
        padding : theme.spacing.unit*3,
        transition : theme.transitions.create(['margin'],{
            easing : theme.transitions.easing.sharp,
            duration : theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left' : {
        marginLeft : -drawerWidth,
    },
    'content-right' : {
        marginRight : -drawerWidth
    },
    contentShift : {
        transition : theme.transitions.create(['margin'],{
            easing : theme.transitions.easing.easeOut,
            duration : theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left' : {
        marginLeft : 0,
    },
    'contentShift-right' : {
        marginRight : 0,
    },
});

class Header extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        //methods related to drawer
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose  = this.handleDrawerClose.bind(this);
        this.handleChangeAnchor = this.handleChangeAnchor.bind(this);

        this.state = {
            auth : true,
            anchorE1 : null,
            open : false,
            anchor : 'left'
        }
    }

    handleDrawerOpen(){
        let newState = !this.state.open;
        this.setState({open : newState});
    }

    handleDrawerClose(){
        this.setState({open : false});
    }

    handleChangeAnchor(event){
        this.setState({anchor : event.target.value});
    }

    handleChange(event){
        this.setState({ auth : event.target.checked });
    }

    handleMenu(event){
        this.setState({anchorE1 : event.currentTarget});
    }

    handleClose(){
        this.setState({anchorE1 : null});
    }
    
    render(){
        const {classes} = this.props;
        const {auth, anchorE1,anchor, open} = this.state;
        const user = Boolean(anchorE1);

        return(
    <div className={classes.root}>
        <div className={classes.appFrame}>
        <AppBar  className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}>
          <Toolbar>
            <IconButton 
            className={classNames(classes.menuButton, open && classes.hide)}
            color="inherit" 
            aria-label="Menu"
            onClick={this.handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Photos
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={user ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorE1}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={user}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <PersistentDrawer 
        handleDrawerClose = {this.handleDrawerClose}
        open = {this.state.open}
        anchor = {this.state.anchor}
        >
        <div>
            <h2>Hello world Component</h2>
        </div>
        </PersistentDrawer>
        </div>
    </div>);
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header);