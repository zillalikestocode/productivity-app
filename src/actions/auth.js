import * as api from '../api'

export const signIn = (userData, navigate)=> async(dispatch)=>{
    try {
        const {data} = await api.signIn(userData);

        dispatch({type: 'AUTH', payload: data})
        navigate('/')
    }catch(err){
        console.log(err.message)
    }
}
export const signUp = (userData, navigate)=> async(dispatch)=>{
    try {
        const {data} = await api.signUp(userData)

        dispatch({type: 'AUTH', payload: data})
        navigate('/')
    } catch (error) {
        console.log(error.message)
    }
}