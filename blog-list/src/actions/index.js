import JSONPlaceholder from '../api/JSONPlaceholder'

// Async await doesnt work for action creators

export const fetchPosts = () => async dispatch => dispatch({type: 'FETCH_POSTS', payload :  await JSONPlaceholder.get('/posts')})
