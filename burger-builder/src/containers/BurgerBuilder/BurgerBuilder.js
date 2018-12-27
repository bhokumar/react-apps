import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary';
import axios from '../../axios-orders';
import Sprinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
                .map(ingredientKey => {
                    return ingredients[ingredientKey];
                }).reduce((sum, element) =>{
                    return sum+element;
                },0);
         return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Sprinner/>
        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ingredients}/>
                    <BurgerControls 
                        ingredientsAdded = {this.props.onIngredientAdded}
                        ingredientsRemoved = {this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        purchasable = {this.updatePurchaseState(this.props.ingredients)}
                        price = {this.props.price}
                        ordered = {this.purchaseHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients = {this.props.ingredients}
                puchaseCancled = {this.purchaseCancelHandler}
                price = {this.props.price}
                purchaseContinued = {this.purchaseContinueHandler}/>

            if(this.state.loading){
                orderSummary = <Sprinner />
            }
        }

        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));