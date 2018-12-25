import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{    
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'express', displayValue: 'Express'},
                        { value: 'cheepest', displayValue: 'Cheepest'}
                    ]
                },
                validation: {},
                value: '',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        this.setState({ loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
            }).catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });
        this.props.history.push('/');
        console.log(this.props.ingredients);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid});
        console.log(event.target.value);
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

        //Rules can be extended here to apply more validation
        return isValid;
    }

    render(){
        const formElements = [];

        for(let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let contactDataForm = (
                <form onSubmit = {this.orderHandler}>
                    {formElements.map(formElement => (
                        <Input
                            key = {formElement.id} 
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            invalid = {!formElement.config.valid}
                            shouldValidate = {formElement.config.validation}
                            touched = {formElement.config.touched}
                            changed = {(event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <Button 
                        buttonType = "Success"
                        disabled = {!this.state.formIsValid} 
                        clicked = {this.orderHandler}
                    >ORDER</Button>
                </form>
        );
        if(this.state.loading){
            contactDataForm = <Spinner/>
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Enter your contact data</h4>
                {contactDataForm}
            </div>
        );
    }
}

export default ContactData;