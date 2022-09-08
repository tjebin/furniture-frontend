const QUIZZES_URL = `${process.env.REACT_APP_QUIZZES_URL}`;
const FURNITURES_URL = `${process.env.REACT_APP_FURNITURE_QUIZZES}`;

export const findQuizById = (quizId) =>
  fetch(`${QUIZZES_URL}/${quizId}`)
    .then(response => response.json())

export const findAllQuizzes = () =>
  fetch(`${QUIZZES_URL}`)
    .then(response => response.json())


export const findQuizByFurnitureId = async (furnitureId) => {
  const response = await fetch(`${FURNITURES_URL}/${furnitureId}/quizzes`);
  return await response.json();
}

export const submitQuiz = (quizId, questions) => {
  return fetch(`${QUIZZES_URL}/${quizId}/attempts`, {
    method: 'POST',
    body: JSON.stringify(questions),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())
}

export const createQuiz = async (furnitureId) => {
  let obj = { "_id": furnitureId, "furnitureId": furnitureId, "title": 'Furniture Quiz' };

  return fetch(`${QUIZZES_URL}`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())

}

export const deleteQuiz = (quizId) =>
  fetch(`${QUIZZES_URL}/${quizId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export const findQuizResultsById = (quizId) =>
  fetch(`${QUIZZES_URL}/${quizId}/attempts`)
    .then(response => response.json())
//.then(result => console.log(result))


export default {
  findQuizById, findAllQuizzes, submitQuiz, findQuizResultsById, findQuizByFurnitureId, createQuiz, deleteQuiz
}