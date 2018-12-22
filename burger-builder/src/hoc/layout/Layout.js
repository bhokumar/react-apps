import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

import classes from './Layout.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class  Layout extends Component{
    state = {
        showSideDrawer: true
    }

    sideBarcloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () =>{
        this.setState((previousState) =>{
            return {showSideDrawer: !previousState.showSideDrawer}
        });
    }

    render(){
        return(
            <Aux>
                <ToolBar drawerToggleClicked = {this.sideDrawerToggleHandler}/>

                <SideDrawer 
                    open = {this.state.showSideDrawer} 
                    closed = {this.sideBarcloseHandler} />

                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

export default Layout;