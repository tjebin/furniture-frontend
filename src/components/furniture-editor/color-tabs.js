import React, { useEffect } from 'react'
import { connect } from "react-redux";
import EditableColor from "../editable-color";
import { useParams } from "react-router-dom";
import colorService from '../../services/color-service';

const ColorTabs = ({
    colors = [],
    findColorsForStyle,
    createColorForStyle
}) => {
    const { layoutId, furnitureId, styleId, colorId } = useParams();
    useEffect(() => {
        if (styleId !== "undefined" && typeof styleId !== "undefined") {
            findColorsForStyle(styleId);
        }

    }, [styleId])//eslint-disable-line 
    return (
        <div className="background-color-blue">
            {styleId &&
                <div>
                    <h6 className="bg-info ">
                        <span className="bg-primary text-light font-weight-bold text-lg-start">
                            Colors Available
                        </span>
                    </h6>
                    <ul className="nav nav-pills">
                        {
                            colors.map(color =>
                                <li className="nav-item add-padding-right-25" style={{ width: '30%' }} >
                                    <EditableColor
                                        to={`/furnitures/${layoutId}/editor/${furnitureId}/styles/${styleId}/colors/${color.id}`}
                                        key={color.id}
                                        item={color}
                                        active={`${color.id == colorId ? 'active' : ''}`}
                                    />
                                </li>
                            )
                        }

                        <li>
                            <span className="float-right">
                                <i onClick={() => createColorForStyle(styleId)} className="fas fa-plus"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            }
        </div >)
}

const stpm = (state) => {
    return {
        colors: state.colorReducer.colors,
        myStyles: state.styleReducer.styles
    }
}
const dtpm = (dispatch) => {
    return {
        findColorsForStyle: (styleId) => {
            colorService.findColorsForStyle(styleId)
                .then(colors => {
                    dispatch({
                        type: "FIND_COLORS",
                        colors
                    })
                })
        },
        createColorForStyle: (styleId) => {
            colorService
                .createColorForStyle(styleId, { title: "New Color" })
                .then(color => dispatch({
                    type: "CREATE_COLOR",
                    color
                }))
        },
        updateColor: (color) => {
            colorService.updateColor(color)
                .then(color => dispatch({
                    type: "UPDATE_COLOR",
                    color
                }))
        },
        deleteColor: (color) => {
            colorService.deleteColor(color.id)
                .then((status) => dispatch({
                    type: "DELETE_COLOR",
                    colorToDelete: color
                }))
        }
    }
}

export default connect(stpm, dtpm)(ColorTabs)