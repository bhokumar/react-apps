import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: {
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState);
        }
        case actionTypes.REMOVE_INGREDIENT: {
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState);
        }
        case ( actionTypes.SET_INGREDIENTS ): {
            const updatedIngredients = updateObject(state.ingredients, {
                salad: action.payload.salad,
                bacon: action.payload.bacon,
                cheese: action.payload.cheese,
                meat: action.payload.meat
            });
            const updatedState = updateObject(state, {
                ingredients: updatedIngredients,
                totalPrice: 4,
                error: false
            })
            return updateObject(state, updatedState);
        }
        case ( actionTypes.FETCH_INGREDIENTS_FAILED ): {
            return updateObject(state, {error: true});
        }
        default:
        return state;
    }
}

export default reducer;