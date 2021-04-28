import React from 'react';

import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props)=>{
    const ingredientSummary=Object.keys(props.ingredients)
        .map(igkey=>{
        return (<li key={igkey}><span style={{textTransform: 'capitalize'}}>{igkey}</span>:{props.ingredients[igkey]}</li>)
        })
return (
    <Aux>
        <h3>Your order summary</h3>
        <ul>
            {ingredientSummary}
        </ul>
<p><strong>Total price:{props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>

        <Button btnType='Danger' clicked={props.cancel}>Cancel</Button>
        <Button btnType='Success' clicked={props.continue}>Continue</Button>
    </Aux>
)        
}

export default orderSummary