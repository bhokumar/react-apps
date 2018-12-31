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

import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component{

    state = {
        purchasing: false
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
        if (this.props.isAuthenticated){
            this.setState({ purchasing: true }); 
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        } 
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    render(){
        const disabledInfo = {
            ...this.props.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can not be loaded</p> : <Sprinner/>
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
                        ordered = {this.purchaseHandler}
                        isAuthenticated = {this.props.isAuthenticated}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients = {this.props.ingredients}
                puchaseCancled = {this.purchaseCancelHandler}
                price = {this.props.price}
                purchaseContinued = {this.purchaseContinueHandler}/>
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
        ingredients: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));