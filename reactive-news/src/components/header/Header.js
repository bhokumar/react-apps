import React from 'react';
import {Link} from 'react-router';
class Header extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                <div className="navbar-header">
                    <Link to="/"><span className="navbar-brand"></span>Reactive news portal</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="about">About</Link></li>
                    <li><Link to="article">Add Article</Link></li>
                    <li><Link to="manageArticle">Manage Article</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href=""><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                    <li><a href=""><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                </ul>
                </div>
                </nav>
        );
    }
}

export default Header;