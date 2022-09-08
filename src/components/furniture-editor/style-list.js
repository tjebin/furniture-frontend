import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import EditableItem from "../editable-item";
import { useParams } from "react-router-dom";
import styleService from "../../services/style-service"

const StyleList = (
    {
        myStyles = [],
        createStyle = () => alert("Create Style 234"),
        deleteStyle = (item) => alert("delete " + item.id),
        updateStyle,
        findStylesForFurniture = (furnitureId) => console.log(furnitureId),
        resetTopic,
        resetColor
    }) => {
    const { layoutId, furnitureId, styleId } = useParams();
    useEffect(() => {
        resetColor();
        resetTopic();
        findStylesForFurniture(furnitureId);
    }, [])//eslint-disable-line 
    return (
        <div>
            <ul className="list-group">
                {
                    myStyles.map(style => {
                        const { id } = style;
                        return <li key={id} className={`list-group-item  ${style.id == styleId ? 'active' : ''}`} >
                            <EditableItem
                                to={`/furnitures/${layoutId}/editor/${furnitureId}/styles/${style.id}`}
                                updateItem={updateStyle}
                                deleteItem={deleteStyle}
                                item={style}
                                key={id} />
                        </li>
                    }
                    )
                }
                <li className="list-group-item">
                    <i onClick={() => createStyle(furnitureId)}
                        className="fas fa-plus fa-2x"></i>
                </li>
            </ul>
        </div >)
}

const stpm = (state) => {
    return {
        myStyles: state.styleReducer.styles
    }
}
const dtpm = (dispatch) => {
    return {
        resetTopic: () => {
            dispatch({
                type: "RESET_MATERIAL"
            })
        },

        resetColor: () => {
            dispatch({
                type: "RESET_COLOR"
            })
        },

        createStyle: (furnitureId) => {
            styleService.createStyleForFurniture(furnitureId, { title: "New Type" })
                .then(theActualStyle => dispatch({
                    type: "CREATE_STYLE",
                    style: theActualStyle
                }))
        },
        deleteStyle: (item) => {
            styleService.deleteStyle(item.id)
                .then(status => {
                    dispatch({
                        type: "DELETE_STYLE",
                        styleToDelete: item
                    })
                })
        },
        updateStyle: (style) =>
            styleService.updateStyle(style.id, style)
                .then(status => dispatch({
                    type: "UPDATE_STYLE",
                    style
                })),
        findStylesForFurniture: (furnitureId) => {
            styleService.findStylesForFurniture(furnitureId)
                .then(theStyles => dispatch({
                    type: "FIND_STYLES_FOR_FURNITURE",
                    styles: theStyles
                }))
        }
    }
}

export default connect(stpm, dtpm)
    (StyleList)
