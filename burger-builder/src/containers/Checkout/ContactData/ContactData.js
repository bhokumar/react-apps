import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Bhoopendra',
                address: {
                    street: 'Test Street1',
                    zipCode: '201301',
                    country: 'India'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
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

    render(){
        let contactDataForm = (
                <form>
                    <input className = {classes.Input} type = "text" name = "name" placeholder = "Your Name"/>
                    <input className = {classes.Input} type = "email" name = "email" placeholder = "Your Email"/>
                    <input className = {classes.Input} type = "text" name = "street" placeholder = "Street"/>
                    <input className = {classes.Input} type = "text" name = "postal" placeholder = "Postal Code"/>
                    <Button 
                        buttonType = "Success" 
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