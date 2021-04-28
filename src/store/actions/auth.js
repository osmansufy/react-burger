import * as actionTypes from './actionTypes'
import axios from 'axios'


export const authStart=()=>{
    return{
       type:actionTypes.AUTH_START
    }
}
export const authSuccess=(token,userId)=>{
    return{
       type:actionTypes.AUTH_SUCCESS,
       idToken:token,
       userId:userId
    }
}
export const authFail=(error)=>{
    return{
       type:actionTypes.AUTH_FAIL,
       error:error
    }
}
export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('espeiresTimeout')
    localStorage.removeItem('userId')
    return{
        
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeLogOut=(experationTime)=>{
     return dispatch=>{
             setTimeout(()=>{
                 dispatch(logout())
             },experationTime * 10000)
         }
}

export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJ3kVz5EYkW4g-KPTBdlshSAZ5uPIabBg'
        if(isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJ3kVz5EYkW4g-KPTBdlshSAZ5uPIabBg'
        }
        axios.post(url,authData)
        .then(response=>{
            const experationDate=new Date(new Date().getTime()+response.data.expiresIn*1000)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('espeiresTimeout',experationDate)
            localStorage.setItem('userId',response.data.localId)
            console.log(response)
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(checkAuthTimeLogOut(response.data.expiresIn))
        })
        .catch(error=>{
            console.log(error);
            dispatch(authFail(error.response.data.error))
        })
    }
}

export const setAuthRedirectPath = (path)=>{
    return {
    type:actionTypes.SET_AUTH_REDIRECT_PATH,
    path :path
    }
}

export const authCheckState = ()=>{
    return dispatch=>{
        const token=localStorage.getItem('token')

        if(!token){
         
            dispatch(logout())

        }else{
            const experationDate= new Date(localStorage.getItem('espeiresTimeout'))
            if(experationDate <= new Date()){
                dispatch(logout())
            }else{
                const userId=localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeLogOut((experationDate.getTime()-new Date().getTime())/1000))
            }
        }
        
    }
}