import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAM, FETCH_STREAMS, EDIT_STREAM, DELETE_STREAM } from './types'
import API from '../apis/streams'

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

export const createStream = formValues => async (dispatch, getState) => {
    const { userID } = getState().auth
    const response = await API.post('/streams', {...formValues, userID})
    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    })
}

export const fetchStreams = () => async dispatch => {
    const response = await API.get('/streams')
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    })
}

export const fetchStream = id => async dispatch => {
    const response = await API.get(`/streams/${id}`)
    dispatch({
        type: FETCH_STREAM,
        payload: response.data
    })
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await API.put(`/streams/${id}`, formValues)
    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    })
}

export const deleteStream = id => async dispatch => {
    await API.delete(`/streams/${id}`)
    dispatch({
        type: DELETE_STREAM,
        payload: id
    })
}