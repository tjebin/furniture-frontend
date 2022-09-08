import React, { useEffect } from 'react'
import { connect } from "react-redux";
import EditableMaterial from "../editable-material";
import { useParams } from "react-router-dom";
import materialService from '../../services/material-service';

const MaterialPills = (
    {
        materials = [],
        findMaterialsForColor,
        createMaterialForColor,
        deleteMaterial,
        updateMaterial,
        resetMaterial
    }) => {
    const { layoutId, furnitureId, styleId, colorId, materialId } = useParams();

    useEffect(() => {
        if (styleId !== "undefined" && typeof styleId !== "undefined"
            && colorId !== "undefined" && typeof colorId !== "undefined") {
            findMaterialsForColor(colorId)
        } else {
            resetMaterial()
        }
    }, [styleId, colorId])//eslint-disable-line 
    return (
        <div className="background-color-blue" >
            {styleId && colorId &&
                <div>
                    <h6 className="bg-info">
                        <span className="bg-primary text-light font-weight-bold">
                            Materials Available
                        </span>
                    </h6>
                    <ul className="nav nav-pills">
                        {
                            materials.map(material => {
                                return <li className={'nav-item add-padding-right-25'}>
                                    <EditableMaterial
                                        active={`${material.id == materialId ? 'active' : ''}`}
                                        to={`/furnitures/${layoutId}/editor/${furnitureId}/styles/${styleId}/colors/${colorId}/materials/${material.id}`}
                                        deleteItem={deleteMaterial}
                                        updateItem={updateMaterial}
                                        key={material.id}
                                        item={material} />

                                </li>
                            }
                            )
                        }
                        <li>
                            <span className="float-right">
                                <i onClick={() => createMaterialForColor(colorId)} className="fas fa-plus"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

const stpm = (state) => ({
    materials: state.materialReducer.materials,
    colors: state.colorReducer.colors
})
const dtpm = (dispatch) => ({
    findMaterialsForColor: (colorId) => {
        materialService.findMaterialsForColor(colorId)
            .then(materials => dispatch({
                type: "FIND_MATERIALS",
                materials
            }))
    },
    createMaterialForColor: (colorId) => {
        materialService
            .createMaterialForColor(colorId, { title: "New Material" })
            .then(material => dispatch({
                type: "CREATE_MATERIAL",
                material
            }))
    },
    updateMaterial: (material) =>
        materialService.updateMaterial(material.id, material)
            .then(status => dispatch({
                type: "UPDATE_MATERIAL",
                material
            })),
    deleteMaterial: (material) => {
        materialService.deleteMaterial(material.id)
            .then(status => dispatch({
                type: "DELETE_MATERIAL",
                materialToDelete: material
            }))
    },
    resetMaterial: () => {
        dispatch({
            type: "RESET_MATERIAL"
        })
    }
})

export default connect(stpm, dtpm)(MaterialPills)