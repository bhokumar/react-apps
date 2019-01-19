import React from 'react';
//import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import ArticleList from './articles/ArticleList';
import HomePage from './home/HomePage';
import {Route, Switch, withRouter} from 'react-router-dom';
import AppContainer from './AppContainer';


class App extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <React.Fragment>
        <CssBaseline/>
        <div>
          <Switch>
            <AppContainer>
              <Route component = {({ match }) =>
                <div>
                  <Route exact path = "/" name = "Home" component = {HomePage}/>
                  <Route exact path = "/home" name = "Home" component = {HomePage}/>
                  <Route exact path = "/modules" name = "Home" component = {HomePage}/>
                  <Route exact path = "/modules/article" name = "Article" component = {ArticleList}/>
                </div>}>

              </Route>
            </AppContainer>
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
