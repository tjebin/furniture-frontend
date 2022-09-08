const QUIZZES_URL = `${process.env.REACT_APP_QUIZZES_URL}`;
const QUESTIONS_URL = `${process.env.REACT_APP_QUESTIONS_URL}`;


//REACT_APP_QUIZZES_URL = http://localhost:2000/api/quizzes


export const findQuestionsForQuiz = (qzid) =>
    fetch(`${QUIZZES_URL}/${qzid}/questions`)
        .then(response => response.json())

export const deleteQuestion = (questionId) =>
    fetch(`${QUESTIONS_URL}/${questionId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const createQuestion = (question) => {
    return fetch(`${QUESTIONS_URL}`, {
        method: 'POST',
        body: JSON.stringify(question),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}



export const updateQuestion = (questionId, question) =>
    fetch(`${QUESTIONS_URL}/${questionId}`, {
        method: 'PUT',
        body: JSON.stringify(question),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export default {
    findQuestionsForQuiz, createQuestion, deleteQuestion, updateQuestion
}