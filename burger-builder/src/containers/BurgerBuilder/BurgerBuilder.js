import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary';
import axios from '../../axios-orders';
import Sprinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('/ingredients.json').then(response =>{
            this.setState({ ingredients: response.data});
        }).catch(error =>{
            this.setState({ error: true});
            console.log(error);
        });
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
        this.setState({ loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                this.setState({ loading: false, purchasing: false});
            }).catch(error => {
                this.setState({ loading: false, purchasing: false});
                console.log(error);
            });
        //alert('Thanks you for placing an order! Enjoy!!!');
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Sprinner/>
        if(this.state.ingredients){
            burger = (
                <Aux>
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

            orderSummary = <OrderSummary 
                ingredients = {this.state.ingredients}
                puchaseCancled = {this.purchaseCancelHandler}
                price = {this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);