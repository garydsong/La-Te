const LOAD_ALL = 'lattes/LOAD_ALL'
const LOAD_CURRENT = 'lattes/LOAD_CURRENT'
const CREATE = 'lattes/CREATE'
const RESET = 'lattes/RESET'
const LOAD_ONE = 'lattes/LOAD_ONE'

const load = (lattes, userId) => ({
    type: LOAD_ALL,
    lattes,
    userId
})

const loadCurrent = (lattes) => ({
    type: LOAD_CURRENT,
    lattes
})

const create = (latte, userId) => ({
    type: CREATE,
    latte,
    userId
})

export const resetLatte = () => ({
    type: RESET
})

const loadOne = (latteId) => ({
    type: LOAD_ONE,
    latteId
})

export const getAllLattes = (userId) => async dispatch => {
    const response = await fetch(`/api/useres/${userId}/lattes`)

    if (response.ok) {
        const lattes = await response.json()
        dispatch(load(lattes, userId))
        return lattes
    }
    return
}

export const getCurrentLattes = () => async dispatch => {
    const response = await fetch('/api/lattes/current')

    if (response.ok) {
        const latte = await response.json()
        dispatch(loadCurrent(latte))
        return latte
    }
    return
}

export const createLatte = (latte, userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/lattes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(latte)
    })

    if (response.ok) {
        const userLatte = await response.json()
        dispatch(create(userLatte, userId))
        return userLatte
    }
    return
}

export const getOneLatte = (latteId) => async dispatch => {
    const response = await fetch(`/api/lattes/${latteId}`)

    if (response.ok) {
        const oneLatte = await response.json()
        dispatch(loadOne(oneLatte))
        return
    }
    return
}

const initialState = {
    user: {},
    allLattes: {}
}

const latteReducer = (state = initialState, action) => {
    const user = {};
    const allLattes = {};
    let newState
    switch (action.type) {
        case LOAD_ALL:
            action.lattes.forEach(latte => {
                user[latte.id] = latte
            })
            return {
                ...state,
                user
            }
        case LOAD_CURRENT:
            action.lattes.lattes.forEach(latte => {
                user[latte.id] = latte
            })
            return {
                ...state,
                user
            }
        case LOAD_ONE:
            newState = { ...state, user: { ...state.user } }
            newState.user[action.latteId.id] = action.latteId
            return newState
        case CREATE:
            newState = {user: { ...state.user } }
            newState.user[action.latte.id] = action.latte
            return newState
        case RESET:
            return initialState
        default:
            return state
    }
}

export default latteReducer
