import * as actionTypes from  '../actions/actionTypes'
import {updateObject} from '../../shared/utiliy'

const initialState={
    orders: [],
    loading:false,
    purchased: false
   
}

const purchasInit=(state,action)=>{
    return updateObject(state,{
                 
        purchased:false
    })
}
const purchaBurgerStart=(state,action)=>{
    return updateObject(state,{
                 
        loading:true,
    })
}
const purchaBurgerSuccess=(state,action)=>{
    const newOrder = updateObject(action.orderData,{
        id:action.orderId,
            
        })
        return updateObject(state,{
             
            loading:false,
            purchased:true,
            orders: state.orders.concat( newOrder ),
        })
}
const purchaBurgerFail=(state,action)=>{
    return updateObject(state,{
                 
        loading:false,
    })
}

const fetchOrderStart=(state,action)=>{
    return updateObject(state,{
                 
        loading:true,
    }) 
}
const fetchOrderSuccess=(state,action)=>{
    return updateObject(state,{
                 
        loading:false,
        orders: action.orders
    }) 
}
const fetchOrderFail=(state,action)=>{
    return updateObject(state,{
                 
        loading:false,
    })  
}
const orderreducer=(state=initialState,action)=>{
      switch(action.type){
          case actionTypes.PURCHASE_INIT:return purchasInit(state,action)
          case actionTypes.PURCHASE_BURGER_START:return purchaBurgerStart(state,action)
          case actionTypes.PURCHASE_BURGER_SUCCESS:return purchaBurgerSuccess(state,action)
          case actionTypes.PURCHASE_BURGER_FAIL :return purchaBurgerFail(state,action)
          case actionTypes.FETCH_ORDER_START: return fetchOrderStart(state,action)
          case actionTypes.FETCH_ORDER_SUCCESS:return fetchOrderSuccess(state,action)
          case actionTypes.FETCH_ORDER_FAIL:return fetchOrderFail(state,action)       
        default : return state          
      }
}

export default orderreducer