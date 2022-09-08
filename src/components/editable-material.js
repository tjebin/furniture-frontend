import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';

const EditableMaterial = (
    {
        to = "/somewhere/to/go",
        deleteItem,
        updateItem,
        item = { title: "Some Title", id: "ABC" },
        active
    }) => {
    const IMAGE_UPLOAD_URL = `${process.env.REACT_APP_IMAGE_UPLOAD_URL}`;
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCahedItem] = useState(item)
    const { furnitureId } = useParams();
    const [selectedFile, setSelectedFile] = useState("")

    const onFileChangeHandler = (e) => {
        e.preventDefault();
        setSelectedFile(e.target.files[0]);
    };

    const onClickHandler = () => {
        setCahedItem({
            ...cachedItem,
            imageName: selectedFile.name
        })
        const data = new FormData();
        data.append('file', selectedFile);
        data.append('id', item.id);

        axios.post(`${IMAGE_UPLOAD_URL}/material`, data, {})
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
                        <div className="col-9">
                            {item.title}
                            <img src={`${process.env.REACT_APP_IMAGE_URL}/images/material/${item.imageName}`} width="80px" height="80px" alt="" />
                        </div>
                        <div className="">
                            <span className="float-right">
                                <i onClick={() => { setEditing(true); setCahedItem(item) }} className="fas fa-edit"></i>
                            </span>
                        </div>
                    </div>
                </Link>
            }
            {
                editing &&
                <div className="row">
                    <div className="col-4">
                        <input
                            onChange={(e) =>
                                setCahedItem({
                                    ...cachedItem,
                                    title: e.target.value
                                })}
                            value={cachedItem.title} />
                    </div>
                    <div className="col-4">
                        <input type="file" name="file" onChange={onFileChangeHandler} />
                    </div>
                    <div className="col-2">
                        <button type="button" className="btn btn-success btn-sm" onClick={onClickHandler}>Upload</button>
                    </div>
                    <div className="col-*">
                        &nbsp; &nbsp; &nbsp;<br />
                        <i onClick={() => {
                            setEditing(false)
                            updateItem(cachedItem)
                        }} className="fas fa-check"></i>
                        {furnitureId !== 1 && furnitureId !== 2 &&
                            <i onClick={() => {
                                setEditing(false)
                                deleteItem(cachedItem)
                            }} className="fas fa-times"></i>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default EditableMaterial