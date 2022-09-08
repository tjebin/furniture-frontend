const initialState = {
    styles: [
    ]
}

const styleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FIND_STYLES_FOR_FURNITURE":
            return {
                ...state,
                styles: action.styles
            }
        case "CREATE_STYLE":
            const newState = {
                styles: [
                    ...state.styles,
                    action.style
                ]
            }
            return newState
        case "DELETE_STYLE":
            const newState1 = {
                styles: state.styles.filter(style => {
                    if (style.id === action.styleToDelete.id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState1
        case "UPDATE_STYLE":
            return {
                styles: state.styles.map(m => {
                    if (m.id === action.style.id) {
                        return action.style
                    } else {
                        return m
                    }
                })
            }
        default:
            return state
    }
}
export default styleReducer
