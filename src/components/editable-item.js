import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';

const EditableItem = (
    {
        to = "/somewhere/to/go",
        deleteItem,
        updateItem,
        item = { title: "Some Title", id: "ABC" }
    }) => {

    const IMAGE_UPLOAD_URL = `${process.env.REACT_APP_IMAGE_UPLOAD_URL}`;
    const [editing, setEditing] = useState(false);
    const [cachedItem, setCahedItem] = useState(item);
    const { layoutId, furnitureId } = useParams();
    const [selectedFile, setSelectedFile] = useState("");

    const onFileChangeHandler = (e) => {
        e.preventDefault();
        setSelectedFile(e.target.files[0]);
    };

    const onClickHandler = (e) => {
        const data = new FormData();
        data.append('file', selectedFile);
        data.append('id', item.id);
        setCahedItem({
            ...cachedItem,
            imageName: selectedFile.name
        });

        axios.post(`${IMAGE_UPLOAD_URL}/style`, data, {})
            .then(res => {
                alert(res.statusText);
            })
    }
    return (
        <>
            {
                !editing &&
                <Link to={to}>
                    <div className="row">
                        <div className="col-9">
                            {item.title}
                        </div>
                        <div className="">
                            <span className="float-right">
                                <i onClick={() => { setEditing(true); setCahedItem(item) }} className="fas fa-edit"></i>
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <img src={`${process.env.REACT_APP_IMAGE_URL}/images/style/${item.imageName}`} width="80px" height="80px" alt="" />
                        </div>
                    </div>
                </Link>
            }
            {
                editing &&
                <div className="row">
                    <div className="">
                        <input
                            onChange={(e) =>
                                setCahedItem({
                                    ...cachedItem,
                                    title: e.target.value
                                })}
                            value={cachedItem.title} />
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <input type="file" name="file" onChange={(e) => onFileChangeHandler(e)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <button type="button" className="btn btn-success btn-sm" onClick={onClickHandler}>Upload</button>
                        </div>
                    </div>
                    <div className="">
                        <span className="add-padding-left">
                            <i onClick={() => {
                                setEditing(false)
                                updateItem(cachedItem)
                            }} className="fas fa-check"></i>
                            {furnitureId !== 1 && furnitureId !== 2 &&
                                <Link to={`/furnitures/${layoutId}/editor/${furnitureId}`}
                                    className="fas fa-times add-padding-left"
                                    onClick={() => {
                                        setEditing(false)
                                        deleteItem(cachedItem)
                                    }}>
                                </Link>
                            }
                        </span>
                    </div>
                </div>
            }
        </>
    )
}

export default EditableItem