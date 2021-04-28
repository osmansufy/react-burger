import React ,{useEffect,Suspense} from 'react';

import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

import {Route , Switch, Redirect} from 'react-router-dom'


import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'

const App=props=>{

  const {onTryAutoSignup}=props
  useEffect(()=>{
    onTryAutoSignup()
  },[onTryAutoSignup])
 
    const Checkout=React.lazy(()=>{
      return import('./containers/Checkout/Checkout')
    })
    const Orders=React.lazy(()=>{
      return import('./containers/Orders/Orders')
    })
    const Auth=React.lazy(()=>{
      return import('./containers/Auth/Auth')
    })
 let routes = (
   <Switch>
     <Route path='/' exact component={BurgerBuilder} />
    <Route path='/auth' exact render={(props)=><Auth {...props}/>} />
    <Redirect to='/' />
   </Switch>
 )

 if(props.isAuthenticate){
  routes=( <Switch>
    <Route path='/checkout' render={(props)=><Checkout {...props} />}/>
  <Route path='/orders' exact render={(props)=><Orders {...props}/>} />
    <Route path='/' exact component={BurgerBuilder} />
    <Route path='/auth' exact render={(props)=><Auth {...props}/>}/>
    <Route path='/logout' exact component={Logout} />
    <Redirect to='/' />
  </Switch>)
 }
  return (
    <div >
<Layout>
 <Suspense fallback={<p>loading.....</p>}>{routes}</Suspense> 
</Layout>
    </div>
  );

}

const mapStateToProps = state =>{
  return {
    isAuthenticate:state.auth.token !==null
  }
}
const mapDispatchToProps=dispatch=>{
  return{
  onTryAutoSignup:()=>dispatch(actions.authCheckState())
}
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
