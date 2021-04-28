import React from 'react'

import classes from './Order.css'

const order=(props)=>{
const ingredients = []
for(let IngredientsName in props.ingredients){
    ingredients.push({name:IngredientsName, amount:props.ingredients[IngredientsName]})
}

const ingredientsOutput= ingredients.map(igKey=>{
return <span
style={{
    textTransform:'capitalize',
    display:'inline-block',
    margin:'0 8px',
    padding:'5px',
    border: '1px solid'
}}
key={igKey.name}>{igKey.name} {igKey.amount}</span>
})
    return(
    <div className={classes.Order}>
<p>Price:{Number.parseFloat( props.price).toFixed(2)}</p>
{ingredientsOutput}
{/* <p>ingredients:{props.ingredients}</p> */}
    </div>
    )
}

export default order