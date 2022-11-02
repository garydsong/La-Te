const LOAD_ALL = 'comments/LOAD_ALL'
const LOAD_ALL_COMMENTS = 'reviews/LOAD_ALL_COMMENTS'
const LOAD_CURRENT = 'comments/LOAD_CURRENT'
const CREATE = 'comments/CREATE'
const UPDATE = 'comments/UPDATE'
const REMOVE = 'comments/REMOVE'
const RESET = 'comments/RESET'
const LOAD_ONE = 'comments/LOAD_ONE'

const load = (comments, postId) => ({
    type: LOAD_ALL,
    comments,
    postId
})

const loadEveryComment = (comments) => ({
    type: LOAD_ALL_COMMENTS,
    comments
})

const loadCurrent = (comments) => ({
    type: LOAD_CURRENT,
    comments
})

const create = (comment, postId) => {
    console.log("CREATE ACTION MOFO")
    return {
        type: CREATE,
        comment,
        postId
    }
}

const update = (comment) => ({
    type: UPDATE,
    comment
})

const remove = (commentId) => ({
    type: REMOVE,
    commentId
})

export const resetComment = () => ({
    type: RESET
})

const loadOne = (commentId) => ({
    type: LOAD_ONE,
    commentId
})


export const getAllCommentsOfPost = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments`)

    if (response.ok) {
        const comments = await response.json()
        dispatch(load(comments, postId))
        return comments
    }
    return
}

export const getEveryComment = () => async (dispatch) => {
    const response = await fetch('/api/comments/')

    if (response.ok) {
        const commentData = await response.json()
        await dispatch(loadEveryComment(commentData))
        return commentData
    }
    return
};

export const getCurrentComments = () => async dispatch => {
    const response = await fetch('/api/comments/current')

    if (response.ok) {
        const comment = await response.json()
        dispatch(loadCurrent(comment))
        return comment
    }
    return
}

export const createComment = (comment, postId) => async dispatch => {
    console.log('--------create comment thunk--------')
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const postComment = await response.json()
        dispatch(create(postComment, postId))
        return postComment
    }
    return "not ok"
}

export const updateComment = (comment, commentId) => async dispatch => {
    console.log('update thunk', comment, commentId)
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const updatedComment = await response.json()
        dispatch(update(updatedComment))
        return updatedComment
    }
    return
}

export const removeComment = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(remove(commentId))
        return
    }
    return
}

export const getOneComment = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`)

    if (response.ok) {
        const oneComment = await response.json()
        dispatch(loadOne(oneComment))
        return
    }
    return
}

const initialState = {
    post: {},
    user: {},
    allComments: {}
}

const commentReducer = (state = initialState, action) => {
    console.log("I AM A FAWKING REDUCER")
    console.log("REDUCER RECEIVED: ", action)
    const post = {};
    const user = {};
    const allComments = {};
    let newState
    switch (action.type) {
        case LOAD_ALL:
            action.comments.forEach(comment => {
                post[comment.id] = comment
            })
            return {
                ...state,
                post
            }
        case LOAD_ALL_COMMENTS:
            action.comments.comments.forEach(comment => {
                allComments[comment.id] = comment
            })
        case LOAD_CURRENT:
            action.comments.comments.forEach(comment => {
                user[comment.id] = comment
            })
            return {
                ...state,
                user
            }
            
        case LOAD_ONE:
            newState = { ...state, post: { ...state.post }, user: { ...state.user } }
            newState.post[action.commentId.id] = action.commentId
            return newState

        case CREATE:
            console.log("GOT TO CREATE REDUCE STEP")
            newState = { post: { ...state.post }, user: { ...state.user } }
            newState.post[action.comment.id] = action.comment
            return newState

        case UPDATE:
            newState = { post: { ...state.post }, ...state }
            newState.post[action.comment.id] = action.comment
            return newState

        case REMOVE:
            newState = { ...state, post: { ...state.post }, user: { ...state.user } }
            delete newState.post[action.commentId]
            delete newState.user[action.commentId]
            return newState

        case RESET:
            return initialState
        default:
            return state
    }
}

export default commentReducer
