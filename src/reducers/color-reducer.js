const initialState = {
    colors: []
}

const colorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_COLOR":
            return {
                colors: [
                    ...state.colors,
                    action.color
                ]
            }
        case "FIND_COLORS":
            return {
                ...state,
                colors: action.colors
            }

        case "DELETE_COLOR":
            const newState1 = {
                colors: state.colors.filter(color => {
                    if (color.id == action.colorToDelete.id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState1
        case "UPDATE_COLOR":
            return {
                colors: state.colors.map(m => {
                    if (m.id == action.color.id) {
                        return action.color
                    } else {
                        return m
                    }
                })
            }
        case "RESET_COLOR":
            const newState2 = {
                ...state,
                colors: []
            }
            return newState2
        default:
            return state
    }
}

export default colorReducer