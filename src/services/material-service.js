const MATERIALS_URL = `${process.env.REACT_APP_MATERIALS_URL}`;
const COLORS_URL = `${process.env.REACT_APP_COLORS_URL}`;

export const createMaterialForColor = (colorId, material) =>
    fetch(`${COLORS_URL}/${colorId}/materials`, {
        method: "POST",
        body: JSON.stringify(material),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findMaterialsForColor = (colorId) =>
    fetch(`${COLORS_URL}/${colorId}/materials`)
        .then(response => response.json())


export const deleteMaterial = (materialId) =>
    fetch(`${MATERIALS_URL}/${materialId}`, {
        method: "DELETE"
    })
        .then(() => "Deleted")


export const updateMaterial = (materialId, material) => {
    return fetch(`${MATERIALS_URL}`, {
        method: "PUT",
        body: JSON.stringify(material),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => {
            return response.json()
        })
}

export default {
    findMaterialsForColor, createMaterialForColor, deleteMaterial, updateMaterial
}