import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { IconButton, Typography} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Devider from '@material-ui/core/Divider';
import {mailFolderListItems, otherMailFolderListItems} from '../tiles/tileData';
import List from '@material-ui/core/List';

const drawerWidth = 240;

const styles = theme => ({
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

class PersistentDrawer extends React.Component{
    constructor(props){
        super(props);
    }

    
    render(){
        const {classes,theme,anchor,open} = this.props;
        const drawer = (
            <Drawer
            variant = 'persistent'
            anchor = {anchor}
            open = {open}
            classes = {{
                paper : classes.drawerPaper,
            }}
            >
            <div className = {classes.drawerHeader}>
                <IconButton onClick = {this.props.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                </IconButton>
            </div>
            <Devider/>
            <List>{mailFolderListItems}</List>
            <Devider/>
            <List>{otherMailFolderListItems}</List>
            </Drawer>
        );

        let before = null;
        let after = null;

        if(anchor === 'left'){
            before = drawer;
        }else{
            after = drawer;
        }

        return(
            <React.Fragment>
                {before}
                <main className = {classNames(classes.content, classes[`content-${anchor}`], {
                    [classes.contentShift] : open,
                    [classes[`contentShift-${anchor}`]] : open
                })}>
                
                <div className = {classes.drawerHeader}/>
                <Typography>{this.props.children}</Typography>
                </main>
            </React.Fragment>
        );
    }
}

PersistentDrawer.propTypes = {
    classes : PropTypes.object.isRequired,
    theme : PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme : true}) (PersistentDrawer)