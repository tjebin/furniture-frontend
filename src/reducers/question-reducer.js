const initialState = {
    questions: []
}

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_QUESTION":
            return {
                questions: [
                    ...state.questions,
                    action.question
                ]
            }
        case "FIND_QUESTIONS":
            return {
                ...state,
                questions: action.questions
            }

        case "SET_RESULT_QUESTIONS":
            console.log(" Set_Result_Question in reducer.............");
            console.log(action.questions);

            return {
                ...state,
                questions: action.questions

            }
        case "DELETE_QUESTION":
            const newState1 = {
                questions: state.questions.filter(question => {
                    if (question._id === action.id) {
                        return false
                    } else {
                        return true
                    }
                })
            }

            return newState1

        case "UPDATE_QUESTION":
            return {
                questions: state.questions.map(m => {
                    if (m._id === action.questionToBeUpdated._id) {
                        return action.questionToBeUpdated
                    } else {
                        return m
                    }
                })
            }

        default:
            return state
    }
}

export default questionReducer