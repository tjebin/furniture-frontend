const initialState = {
    quiz: {}
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_QUIZ":
            return {
                quiz: action.quiz
            }
        case "FIND_QUIZ":
            return {
                quiz: action.quiz
            }
        case "DELETE_QUIZ":
            return {
                quiz: {}
            }
        default:
            return state
    }
}

export default quizReducer