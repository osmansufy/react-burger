import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const addIngridient=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}
export const removeIngridient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

const setIngridients=(ingridients)=>{
    return{
        type:actionTypes.SET_INGRIDIENT,
        ingridients:ingridients
    }

}
const fetchIngridientsFailed=()=>{
    return{
        type:actionTypes.FETCH_INGRIDIENT_FAILED
    }
}
export const initFetchIngridients = ()=>{
    return dispatch =>{
           axios.get('https://burger-builder-20178.firebaseio.com/ingredients.json')
        .then(response=>{
            dispatch(setIngridients(response.data))
        })
        .catch(error=>{
            dispatch(fetchIngridientsFailed())
        })
    }
}