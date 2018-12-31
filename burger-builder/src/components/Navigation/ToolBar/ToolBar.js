import React from 'react';

import classes from './ToolBar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const ToolBar = (props) => (
    <header className = {classes.ToolBar}>
        <DrawerToggle clicked = {props.drawerToggleClicked}/>
        <div className = {classes.Logo}>
            <Logo/>
        </div>
        <nav className = {classes.DeskTopOnly}>
            <NavigationItems isAuthenticated = {props.isAuthenticated}/>
        </nav>
    </header>
);

export default ToolBar;