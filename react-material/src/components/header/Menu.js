import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
    menuItem : {
        '&:focus' : {
            backgroundColor : theme.palette.primary.main,
            '& $primary, &$icon' : {
                color : theme.palette.common.white
            },
        },
    },
    primary : {},
    icon : {}
});

const Menu = (props) => {
    const {classes} = props;

    return(
        <Paper>
            <MenuList>
                <MenuItem className = {classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                        <SendIcon/>
                    </ListItemIcon>
                    <ListItemText classes = {{primary : classes.primary}} inset primary = "Sent Mail"/>
                </MenuItem>
                <MenuItem className = {classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                        <DraftsIcon/>
                    </ListItemIcon>
                    <ListItemText classes = {{primary : classes.primary}} inset primary = "Drafts"/>
                </MenuItem>
                <MenuItem className = {classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText classes = {{primary : classes.primary}} inset primary = "Inbox"/>
                </MenuItem>
            </MenuList>
        </Paper>
    );
};

Header.propTypes = {
    classes : PropTypes.object.isRequired
} 

export default withStyles(styles)(Menu);