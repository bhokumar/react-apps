import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from './components/app';
import HomePage from './components/home/HomePage';
import About from './components/about/About';
import AddArticle from './components/article/AddArticle';
import ManageArticle from './components/article/ManageArticle';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="about" component={About}/>
        <Route path="article" component={AddArticle}/>
        <Route path="manageArticle" component={ManageArticle}></Route>
    </Route>
);