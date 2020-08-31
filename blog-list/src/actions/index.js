import JSONPlaceholder from '../api/JSONPlaceholder'

// Async await doesnt work for action creators

export const fetchPosts = () => async dispatch => {
    const response =  await JSONPlaceholder.get('/posts')
    dispatch({type: 'FETCH_POSTS', payload : response.data})
}

export const fetchUser = id => async dispatch => {
    const response = await JSONPlaceholder.get(`/users/${id}`)
    dispatch({type: 'FETCH_USER', payload : response.data})
}
