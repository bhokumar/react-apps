import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class  OrderSummary extends Component{
    //This could be a functional component
    
    render(){
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(ingredientKey => {
            return <li key = {ingredientKey}>
                    <span style = {{textTransform: 'capitalize'}}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}
                </li>
        });

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients : </p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}$</strong></p>
                <p>Continue to checkout?</p>
                <Button buttonType = "Danger" clicked = {this.props.puchaseCancled}>CANCEL</Button>
                <Button buttonType = "Success" clicked = {this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;