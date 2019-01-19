import React, {Component} from 'react';
import {Button} from '@material-ui/core';

class HomePage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h2>Home Page</h2>
                <Button variant = "contained" color = "primary">Hello Material UI</Button>
            </div>
        );
    }
}

export default HomePage;