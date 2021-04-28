import React , {useState} from 'react'
import Classes from './Layout.css'

import Aux from '../../hoc/Aux'
import {connect} from 'react-redux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
const Layout=props=>{
  const [sideDrawerisVisible,setSidedrawerisVisible]=useState(false)
  const sideDrawerClosedHandaler=()=>{
setSidedrawerisVisible(false)
    }
  const sideDrawerToogleHandaler=()=>{
       setSidedrawerisVisible(!sideDrawerisVisible)
    }
 
        return(
            <Aux>
            <Toolbar 
            isAuth={props.isAuthenticate}
            drowerToggleclicked={sideDrawerToogleHandaler} />
            <SideDrawer 
            isAuth={props.isAuthenticate}
            open={sideDrawerisVisible}
            closed={sideDrawerClosedHandaler}/>
            <main className={Classes.Layout}>
                {props.children}
            </main>
            </Aux>
        )
    
}
 const mapStateToProps=state=>{
     return{
         isAuthenticate: state.auth.token !==null
     }
 }

export default connect(mapStateToProps)( Layout)