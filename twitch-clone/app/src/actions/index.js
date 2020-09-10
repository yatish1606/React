export const signIn = () => {
    console.log('signin ac')
    return {
        type: 'SIGN_IN'
    }
}

export const signOut = () => {
    console.log('signout ac')
    return {
        type: 'SIGN_OUT'
    }
}