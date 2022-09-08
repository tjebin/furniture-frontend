const FURNITURES_URL = `${process.env.REACT_APP_FURNITURES_URL}`;

export const findAllFurnitures = () =>
    fetch(FURNITURES_URL)
        .then(response => response.json())


export const findAllQuizzesOfFurnitures = () =>
    fetch(`${FURNITURES_URL}/quizzes`)
        .then(response => response.json())

export const deleteFurniture = (furnitureId) =>
    fetch(`${FURNITURES_URL}/${furnitureId}`, {
        method: 'DELETE'
    })
        .then(() => "Deleted")

export const findFurnitureById = (furnitureId) => {
    return fetch(`${FURNITURES_URL}/${furnitureId}`, {
        method: 'GET'
    })
        .then(response => response.json())
}

export const createFurniture = (furniture) => {

    return fetch(FURNITURES_URL, {
        method: 'POST',
        body: JSON.stringify(furniture),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}

export const updateFurniture = (furnitureId, furniture) =>
    fetch(`${FURNITURES_URL}/${furnitureId}`, {
        method: 'PUT',
        body: JSON.stringify(furniture),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export default {
    findAllFurnitures,
    deleteFurniture: deleteFurniture,
    createFurniture,
    updateFurniture: updateFurniture,
    findFurnitureById,
    findAllQuizzesOfFurnitures
}


