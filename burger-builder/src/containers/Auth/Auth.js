import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import classes from './Auth.css';
import * as authActions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,

                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true
    }

    componentDidMount(){
        if(!this.props.burgerBuilding && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath('/');
        }
    }

    switchAuthModeHandler = ()  => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    } 

    inputChangedHandler = (event, controlName) => {
      const updatedControls = {
          ...this.state.controls,
          [controlName]: {
              ...this.state.controls[controlName],
              value: event.target.value,
              valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
              touched: true
          }
      } 
      this.setState({controls: updatedControls}); 
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        
        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;;
        }

        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if(rules.numeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        //Rules can be extended here to apply more validation
        return isValid;
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }
    
    render() {
        const formElements = [];

        for(let key in this.state.controls){
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form  = formElements.map(formElement => (
            <Input
                key = {formElement.id} 
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
                changed = {(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));
        
        if (this.props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }
        
        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to = {this.props.authRedirectPath}/>
        }

        return(
            <div className = {classes.Auth}>
                    {authRedirect}
                    {errorMessage}
                <form onSubmit = {this.onSubmitHandler}>
                    Sign {this.state.isSignUp ? 'Up' : 'In'}
                    {form}
                    <Button buttonType = "Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked = {this.switchAuthModeHandler} 
                    buttonType = "Danger"
                >
                    Switch to { this.state.isSignUp ? 'SignIn' : 'SignUp'} 
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        burgerBuilding: state.burger.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(authActions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);