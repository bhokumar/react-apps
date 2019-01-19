import React from 'react';
import {Switch, Route,withRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppContainer from './container/AppContainer';
import HomePage from './home/HomePage';
import About from './about/About';
import Article from './articles/Article';
import SignIn from './login/SignIn';
import Blog from './blogs/Blog';

import 'typeface-roboto';

class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <React.Fragment>
                <CssBaseline/>
                <Switch>
                    <AppContainer>
                        <Route component = {({ match }) =>
                            <div>
                                <Route exact path = '/' name = "Home" component = {HomePage} />
                                <Route exact path = '/home' name = "Home" component = {HomePage} />
                                <Route exact path = '/about' name = "About" component = {About} />
                                <Route exact path = '/article' name = "Article" component = {Article} />
                                <Route exact path = '/login' name = "SignIn" component = {SignIn} />
                                <Route exact path = '/blogs' name = "Blog" component = {Blog} />
                            </div>
                        }>
                        </Route>
                    </AppContainer>
                </Switch>
                </React.Fragment>
            </div>
        );
    }
}

export default withRouter(App);