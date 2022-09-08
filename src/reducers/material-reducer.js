const initialState = {
    materials: []
}

const materialReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_MATERIAL":
            return {
                ...state,
                materials: [
                    ...state.materials,
                    action.material
                ]
            }
        case "FIND_MATERIALS":
            return {
                ...state,
                materials: action.materials
            }

        case "DELETE_MATERIAL":
            const newState1 = {
                materials: state.materials.filter(material => {
                    if (material.id == action.materialToDelete.id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState1
        case "UPDATE_MATERIAL":
            return {
                materials: state.materials.map(m => {
                    if (m.id == action.material.id) {
                        return action.material
                    } else {
                        return m
                    }
                })
            }
        case "RESET_MATERIAL":
            const newState2 = {
                ...state,
                materials: []
            }
            return newState2

        default:
            return state
    }
}

export default materialReducer