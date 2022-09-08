require('dotenv').config()
const MATERIALS_URL = process.env.REACT_APP_WIDGET_MATERIALS_URL;
const WIDGETS_URL = process.env.REACT_APP_WIDGET_URL;

export const createWidgetForMaterial = (materialId) => {
    return fetch(`${MATERIALS_URL}/${materialId}/widgets`, {
        method: "POST",
        body: JSON.stringify({ type: "PARAGRAPH", size: 1, text: "A new paragraph " }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}

export const findWidgetsForMaterial = async (materialId) => {
    const response = await fetch(`${MATERIALS_URL}/${materialId}/widgets`);
    return await response.json();
}

export const deleteWidget = (widgetId) =>
    fetch(`${WIDGETS_URL}/${widgetId}`, {
        method: "DELETE"
    })
        .then(response => response.json())

export const updateWidget = (wid, widget) =>
    fetch(`${WIDGETS_URL}/${wid}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export default {
    findWidgetsForMaterial, createWidgetForMaterial, deleteWidget, updateWidget
}