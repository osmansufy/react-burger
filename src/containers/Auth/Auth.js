import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utiliy';
const Auth = props=> {
    const [authForm,setAuthForm]=useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
           
        })

        const [isSignup,setIsSignup]=useState(true);
        
    

  

   const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm,{
            [controlName]:updateObject(authForm[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        })
        setAuthForm(updatedControls)
        
    }

   const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value,isSignup);
    }
 const  switchAuthModelHandler=()=>{
    
    setIsSignup(!isSignup)
}
       const{onsetRedirectPath,buildingBurger,authRedirectPath}=props
    useEffect(()=>{
        if(!buildingBurger && authRedirectPath !=='/'){
            onsetRedirectPath()
        }
    },[authRedirectPath,buildingBurger,onsetRedirectPath])
   
  
        const formElementsArray = [];
        for ( let key in authForm ) {
            formElementsArray.push( {
                id: key,
                config: authForm[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) );
if(props.loading){
    form=<Spinner />
}
let errorMessage= null
if(props.error){
    errorMessage=(
    <p>{props.error.message}</p>
    )
}
let authRedirect=null
if(props.isAuthenticate){
    authRedirect= <Redirect to={props.authRedirectPath} />
}
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
        clicked={switchAuthModelHandler}
        btnType="Danger">Switch to {isSignup? "Signup" : "Signin" }</Button>
            </div>
        );
    }

const mapStateToProps=state=>{
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticate:state.auth.token !==null,
        buildingBurger:state.burgerBuilder.bulding,
        authRedirectPath:state.auth.authRedirectPath
}
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password,isSignup) => dispatch(actions.auth(email, password,isSignup)),
        onsetRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);