import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients
        };

        const sum = Object.keys(ingredients)
                .map(ingredientKey => {
                    return ingredients[ingredientKey];
                }).reduce((sum, element) =>{
                    return sum+element;
                },0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       const updatedCount = oldCount + 1;
       const updatedingredients = {
           ...this.state.ingredients
       };

       updatedingredients[type] = updatedCount;

       const priceAddition = INGREDIENT_PRICES[type];
       const oldPrice = this.state.totalPrice;
       const newprice = oldPrice + priceAddition; 
       this.setState({
           totalPrice: newprice,
           ingredients : updatedingredients
       });
       this.updatePurchaseState(updatedingredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
       let updatedCount = oldCount - 1;
       if(updatedCount === -1){
           updatedCount = 0;
       }
       const updatedingredients = {
           ...this.state.ingredients
       };

       updatedingredients[type] = updatedCount;

       const priceDeduction = INGREDIENT_PRICES[type];
       const oldPrice = this.state.totalPrice;
       const newprice = oldPrice - priceDeduction; 
       this.setState({
           totalPrice: newprice,
           ingredients : updatedingredients
       });
       this.updatePurchaseState(updatedingredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false});
    }

    purchaseContinueHandler = () =>{
        alert('Thanks you for placing an order! Enjoy!!!');
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients = {this.state.ingredients}
                    puchaseCancled = {this.purchaseCancelHandler}
                    price = {this.state.totalPrice}
                    purchaseContinued = {this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BurgerControls 
                    ingredientsAdded = {this.addIngredientHandler}
                    ingredientsRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;