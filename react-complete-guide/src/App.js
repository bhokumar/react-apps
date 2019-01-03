import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Users from './containers/Users/Users';
import Pizza from './containers/Pizza/Pizza';

const Users = asyncComponent(() => {
    return import('./containers/Users/Users');
});

const Pizza = asyncComponent(() => {
    return import('./containers/Pizza/Pizza');
});

class App extends Component {
    render(){
        return(
            <div>
                <div>
                    <Link to = "/">Users</Link> |
                    <Link to="/pizza">Pizza</Link>
                </div>
                <div>
                    <Route path = "/" exact component = {Users}></Route>
                    <Route path = "/pizza" component = {Pizza}></Route>
                </div>
            </div>
        );
    }
}

export default App;