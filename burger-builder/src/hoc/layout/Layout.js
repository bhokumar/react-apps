import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import { connect } from 'react-redux';

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
                <ToolBar
                    isAuthenticated = {this.props.isAuthenticated} 
                    drawerToggleClicked = {this.sideDrawerToggleHandler}/>

                <SideDrawer
                    isAuthenticated = {this.props.isAuthenticated} 
                    open = {this.state.showSideDrawer} 
                    closed = {this.sideBarcloseHandler} />

                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);