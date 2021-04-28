import React,{useState, useEffect} from 'react'
import {useSelector,useDispatch } from 'react-redux';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Model/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler'


import * as actions from '../../store/actions/index'
import { useCallback } from 'react';

const BurgerBuilder  =props=> {
 const[purchasing, setPurchasing]=useState(false)


 const dispatch=useDispatch()

 const onIngredientAdded=(ingName) => dispatch(actions.addIngridient(ingName))
 const onIngredientRemoved= (ingName) => dispatch(actions.removeIngridient(ingName))
 const onSetingsidients=useCallback(()=>dispatch(actions.initFetchIngridients()),[dispatch])
 const onInitPurchase= () => dispatch(actions.purchaseInit())
 const onAuthRedirectPath=(path)=>dispatch(actions.setAuthRedirectPath(path))

 

        const ings=useSelector(state=>state.burgerBuilder.ingredients)
        const price=useSelector(state=>state.burgerBuilder.totalPrice)
        const error=useSelector(state=>state.burgerBuilder.error)
        const isAuthenticated=useSelector(state=>state.auth.token !==null)

     useEffect(()=>{

         onSetingsidients()
      
    },[onSetingsidients])
 const updtePurchaseState=(ingredients)=>{
const sum =Object.keys(ingredients)
.map(igkey=>{
    return ingredients[igkey]
})
.reduce((sum,el) =>{
    return sum + el;
},0)
return sum >0

    }
    
   

    
   const purchaseHandler = () => {
        if(isAuthenticated){
            setPurchasing(true)
        }else{
            onAuthRedirectPath("/checkout");
            props.history.push('/auth')
        }
        
    }
   const purchaseCancelHandaler = () => {
        setPurchasing(false)
    }
    
   const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }


        
        const desableInfo={
            ...ings
        }

        for( let key in desableInfo){
            desableInfo[key] = desableInfo[key]<=0
        }
       
        
        let orderSummary = null

         let burger=error ? <p>Ingredients can't be loaded</p> :<Spinner />
         if(ings){
            burger= (<Aux>
                <Burger ingredients={ings} />
       <BurgerControls
       ingredientAdded={onIngredientAdded}
       ingredientRemoved={onIngredientRemoved}
        desable={desableInfo}
        purchasable={updtePurchaseState(ings)}
        price={price}
        ordered={purchaseHandler}
        isAuth={isAuthenticated}
       />
     
            </Aux>)
               orderSummary =   <OrderSummary 
               ingredients={ings}
               cancel={purchaseCancelHandaler}
               continue={purchaseContinueHandler}
               price={price}
                />
         }
         
        return (

        
<Aux>
<Modal 
show={purchasing}
modalClosed={purchaseCancelHandaler}
>
                  {orderSummary}
                </Modal>
                {burger}
    
</Aux>
        )
    
}


export default (withErrorHandler( BurgerBuilder, axios ));