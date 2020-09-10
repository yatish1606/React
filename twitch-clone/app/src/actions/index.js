import { SIGN_IN, SIGN_OUT } from './types'

export const signIn = userID => {
    console.log('signin ac')
    return {
        type: SIGN_IN,
        payload: userID
    }
}

export const signOut = () => {
    console.log('signout ac')
    return {
        type: SIGN_OUT
    }
}