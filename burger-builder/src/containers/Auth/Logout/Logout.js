import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as authActions from '../../../store/actions/index';

class Logout extends Component{
    componentDidMount(){
        this.props.logoutHandler();
    }

    render(){
        return(
            <Redirect to = "/"/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutHandler: () => dispatch(authActions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);