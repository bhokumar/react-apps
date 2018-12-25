import React from 'react';
import classes from './Button.css';

const Button = (props) => (
    <button
        disabled = {props.disabled} 
        onClick = {props.clicked}
        className = {[classes.Button, classes[props.buttonType]].join(' ')}>
        {props.children}
    </button>
);

export default Button;