const STYLES_URL = `${process.env.REACT_APP_STYLES_URL}`
const COLORS_URL = `${process.env.REACT_APP_COLORS_URL}`;

export const createColorForStyle = (styleId, color) =>
    fetch(`${STYLES_URL}/${styleId}/colors`, {
        method: "POST",
        body: JSON.stringify(color),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())


export const findColorsForStyle = (styleId) =>
    fetch(`${STYLES_URL}/${styleId}/colors`)
        .then(response => response.json())


export const deleteColor = (colorId) =>
    fetch(`${COLORS_URL}/${colorId}`, {
        method: "DELETE"
    })
        .then(response => response.json())

export const updateColor = (id, color) =>
    fetch(`${COLORS_URL}`, {
        method: "PUT",
        body: JSON.stringify(color),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())



export default {
    findColorsForStyle, createColorForStyle, deleteColor, updateColor
}