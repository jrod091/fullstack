const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.message
        case 'CLEAR_MESSAGE':
            return ''
        default:
            return state
    }
}

export const setMessage = (message,secs) => {
    return async dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            message
        })

        setTimeout(() => dispatch({ type: 'CLEAR_MESSAGE'}),secs*1000)
    }
}

export default notificationReducer