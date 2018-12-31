import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
        const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
        const updatedState = {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building: true
        }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        salad: action.payload.salad,
        bacon: action.payload.bacon,
        cheese: action.payload.cheese,
        meat: action.payload.meat
    });
    const updatedState = updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: 4,
        error: false,
        building: false
    })
    return updateObject(state, updatedState);
}
const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case ( actionTypes.SET_INGREDIENTS ): return setIngredients(state, action); 
        case ( actionTypes.FETCH_INGREDIENTS_FAILED ): return updateObject(state, {error: true});
        default:
        return state;
    }
}

export default reducer;