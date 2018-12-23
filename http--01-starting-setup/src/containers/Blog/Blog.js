import React, { Component } from 'react';

import './Blog.css';
import Posts from '../Posts/Posts';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
//import NewPost  from '../NewPost/NewPost';
//import FullPost from '../FullPost/FullPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    return import('../NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: false
    }
    render () {
        return (
            <div>
                <header className = {"Blog"}>
                    <nav>
                        <ul>
                            <li><NavLink to = "/posts" exact>Posts</NavLink></li>
                            <li><NavLink 
                                to = {{
                                    pathname: "/new-post",
                                    hash: "#submit",
                                    search: "?quick-submit=true"
                                }} 
                                exact
                                activeClassName = "my-active"
                                activeStyle = {{
                                    color: '#fa923f',
                                    textDecoration: 'underLine'
                                }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path = "/" exact render = {() => <h1>Home</h1>}/>
                <Route path = "/" render = {() => <h1>Home 2</h1>}/>*/}
                <Switch>
                    {/* This conditional approach can act as guard in security this.state.auth ? <Route path = "/new-post" exact component = {NewPost}/> : null */} 
                    {/*<Route path = "/new-post" exact component = {NewPost}/>*/}
                    <Route path = "/new-post" exact component = {AsyncNewPost}/>
                    <Route path = "/posts" component = {Posts}/>
                    <Redirect from = "/" to = "/posts"/>
                    <Route render = {() => <h1>Page Not Found</h1>}/>
                    {/*<Route path = "/" component = {Posts}/>*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;