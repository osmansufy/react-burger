import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail=(error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error,
    }
}

export const purchaseBurgerStart=()=>{
     return{
         type:actionTypes.PURCHASE_BURGER_START
     }
}
export const purchaseInit=()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}
export const purchaseBurger = (orderData,token)=>{
    return  dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth='+ token, orderData )
        .then( response => {
            console.log(response.data)
            console.log(orderData)
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        } )
        .catch( error => {
          dispatch(purchaseBurgerFail(error))
        } );
    }
}

export const fetchOrderStart=()=>{
    return{
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSucces=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders 
    }
}

export const fetchOrderFail=(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const fetchOrder=(token,userId)=>{
        return dispatch=>{
            dispatch(fetchOrderStart())
            const quaryParams= '?auth='+token+'&orderBy="userId"&equalTo="'+userId +'"'
            axios.get('/orders.json'+ quaryParams)
            .then(res=>{
                const fetchedOrder=[]
                for(let key in res.data){
                    fetchedOrder.push({
                        ...res.data[key],
                        id:key
                    })
                }
              dispatch(fetchOrderSucces(fetchedOrder))
                })
            .catch(error=>
                dispatch(fetchOrderFail(error)))
        }
}