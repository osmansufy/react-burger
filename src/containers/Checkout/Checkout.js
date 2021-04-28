import React from 'react';
import ContactData from './ContactData/ContactData'

import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


const Checkout =props => {

//     componentWillMount(){
//     const quary = new URLSearchParams (this.props.location.search)
//     const ingredients={}
//     for(let param in quary.entries()){
//         ingredients[param[0]] =  +param[1]
//     }
//     this.setState({ingredients:ingredients})
// }

   const CheckoutCancelledHandler=()=>{
        props.history.goBack()
    }
   const CheckoutContinuedHandler=()=>{
        props.history.replace('/checkout/contact-data')
    }
   

        let summary= <Redirect to="/" />
        if(props.ings){
            const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
            summary= (<div>
                {purchasedRedirect}
            <CheckoutSummary
                ingredients={props.ings}
                checkoutCancelled={CheckoutCancelledHandler}
                checkoutContinued={CheckoutContinuedHandler}
               />
               <Route path={props.match.path + '/contact-data'} 
               component={ContactData}
               />
          
        </div>)
        }
        return summary
    
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased:state.order.purchased
       
       
    };
}

export default connect(mapStateToProps) (Checkout);