import { SET_POSTS, ADD_COMMENT, POST_CREATED, CREATING_POST } from "./actionTypes";
import { setMessage } from "./message";
import axios from 'axios'

export const addPost = (post) => {
    return (dispatch, getState) => {
        dispatch(creatingPost())
        axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
            .catch(err => dispatch(setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado',
            })))
            .then(res => {
                dispatch(fetchPosts())
                dispatch(postCreated())
                dispatch(setMessage({
                    title: 'Successo',
                    text: 'Post criado com sucesso',
                }))
            })
    }
}

export const addComment = payload => {
    return (dispatch, getState) => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => dispatch(setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado',
            })))
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
                    .catch(err => { 
                        dispatch(setMessage({
                            title: 'Erro',
                            text: 'Ocorreu um erro inesperado',
                        }))
                    })
                    .then(res => {
                        dispatch(fetchPosts())
                    })
            })
    }
}

export const setPosts = (posts) => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const fetchPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => dispatch(setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado',
            })))
            .then(res => {
                const rawPosts = res.data
                const posts = []
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key
                    })
                }
                dispatch(setPosts(posts.reverse()))
            }).catch(err => dispatch(setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado',
            })))
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}