const STYLES_URL = `${process.env.REACT_APP_STYLES_URL}`;

const FURNITURES_URL = `${process.env.REACT_APP_FURNITURES_URL}`;


export const createStyleForFurniture = (furnitureId, style) =>
    fetch(`${FURNITURES_URL}/${furnitureId}/styles`, {
        method: "POST",
        body: JSON.stringify(style),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const updateStyle = (styleId, style) =>
    fetch(`${STYLES_URL}/${styleId}`, {
        method: "PUT",
        body: JSON.stringify(style),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findStylesForFurniture = (furnitureId) =>
    fetch(`${FURNITURES_URL}/${furnitureId}/styles`)
        .then(response => response.json())

export const deleteStyle = (styleId) =>
    fetch(`${STYLES_URL}/${styleId}`, {
        method: "DELETE"
    })
        .then(() => "Deleted")

const api = {
    findStylesForFurniture, createStyleForFurniture,
    deleteStyle, updateStyle
};

export default api;