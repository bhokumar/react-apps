import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});


const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

export class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path = "/auth" exact component = {asyncAuth}/>
        <Route path = "/" exact component = {BurgerBuilder}/>
        <Redirect to = "/"/>
    </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
        <Route path = "/checkout" component = {asyncCheckout}/>
        <Route path = "/orders" exact component = {asyncOrders}/>
        <Route path = "/logout" exact component = {Logout}/>
        <Route path = "/" exact component = {BurgerBuilder}/>
        <Route path = "/auth" exact component = {asyncAuth}/>
        <Redirect to = "/"/>
      </Switch>
      );
    }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToprops = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToprops, mapDispatchToProps)(App));
