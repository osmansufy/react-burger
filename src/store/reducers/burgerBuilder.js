import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utiliy'

const initialState = {
    ingredients:null,
    totalPrice: 4,
    loading:false,
    error:false,
    bulding:false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngridients=(state,action)=>{
    const updatedIngridient= { [action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngridients =  updateObject(state.ingredients,updatedIngridient)
    const updatedState= {
        ingredients:updatedIngridients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        bulding:true
    }
    return updateObject(state,updatedState);
}
const removeIngridients=(state,action)=>{
    const updatedIng= { [action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngs =  updateObject(state.ingredients,updatedIng)
    const updatedS= {
        ingredients:updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        bulding:false  
    }
    return updateObject(state,updatedS);
}
const setIngridients=(state,action)=>{
    return updateObject(state, {ingredients:action.ingridients,
        error:false,
        totalPrice: 4,
        bulding:false
})
}
const fetchIngridientFail=(state,action)=>{
    return updateObject(state,{ error:true})
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:return addIngridients(state,action)
        case actionTypes.REMOVE_INGREDIENT:return removeIngridients(state,action)
        case actionTypes.SET_INGRIDIENT: return setIngridients(state,action)
        case actionTypes.FETCH_INGRIDIENT_FAILED: return fetchIngridientFail(state,action)
            
        default: return state;
    }
};

export default reducer;