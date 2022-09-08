import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import colorService from '../services/color-service';

const EditableColor = (
    {
        to = "/somewhere/to/go",
        deleteColor,
        updateColor,
        item = { title: "Some Title", id: "ABC" },
        active
    }) => {

    const IMAGE_UPLOAD_URL = `${process.env.REACT_APP_IMAGE_UPLOAD_URL}`;
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCahedItem] = useState(item)
    const { layoutId, furnitureId, styleId } = useParams();
    const [selectedFile, setSelectedFile] = useState("")

    const onFileChangeHandler = (e) => {
        e.preventDefault();
        setSelectedFile(e.target.files[0]);
    };

    const onClickHandler = () => {
        const data = new FormData();
        data.append('file', selectedFile);
        data.append('id', item.id);
        setCahedItem({
            ...cachedItem,
            imageName: selectedFile.name
        });

        axios.post(`${IMAGE_UPLOAD_URL}/color`, data, {
        })
            .then(res => {
                alert(res.statusText);
            })
    }

    return (
        <>
            {
                !editing &&
                <Link className={`nav-link  ${active}`} to={to}>
                    <div className="row">
                        <div className="col-6">
                            {item.title}
                            < img src={`${process.env.REACT_APP_IMAGE_URL}/images/color/${item.imageName}`} width="80px" height="80px" alt="" />
                        </div>
                        <div className="col-*">
                            <span className="float-right">
                                <i onClick={() => { setEditing(true); setCahedItem(item) }} className="fas fa-edit"></i>
                            </span>
                        </div>
                    </div>
                </Link>
            }
            {
                editing &&
                <div>
                    <div className="row">
                        <div className="col-6">
                            <input
                                onChange={(e) =>
                                    setCahedItem({
                                        ...cachedItem,
                                        title: e.target.value
                                    })}
                                value={cachedItem.title} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <input type="file" name="file" onChange={onFileChangeHandler} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <button type="button" className="btn btn-success   btn-sm" onClick={(e) => onClickHandler(e)}>Upload</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-*">
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            <i onClick={() => {
                                setEditing(false)
                                updateColor(cachedItem)
                            }} className="fas fa-check"></i>
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            {furnitureId !== 1 && furnitureId !== 2 &&
                                <Link to={`/furnitures/${layoutId}/editor/${furnitureId}/styles/${styleId}`}
                                    onClick={() => {
                                        setEditing(false);
                                        deleteColor(cachedItem);

                                    }} className="fas fa-times"></Link>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
const stpm = (state) => {
    return {
        colors: state.colorReducer.colors
    }
}
const dtpm = (dispatch) => {
    return {
        findColorsForStyle: (styleId) => {
            colorService.findColorsForStyle(styleId)
                .then(colors => dispatch({
                    type: "FIND_COLORS",
                    colors
                }))
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
            colorService
                .updateColor(color.id, color)
                .then(color => dispatch({
                    type: "UPDATE_COLOR",
                    color
                }))
        },
        deleteColor: (color) => {
            colorService.deleteColor(color.id)
                .then(status => dispatch({
                    type: "DELETE_COLOR",
                    colorToDelete: color
                }))
        }
    }
}

export default connect(stpm, dtpm)(EditableColor)
