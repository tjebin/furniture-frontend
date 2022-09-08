import React, { useState } from 'react'
import { Link } from "react-router-dom";

const FurnitureCard = ({ furniture, deleteFurniture, updateFurniture, title }) => {
  const [editing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)

  const saveTitle = () => {
    setEditing(false);
    const newFurniture = {
      ...furniture,
      title: newTitle
    }
    updateFurniture(newFurniture);
  }

  const deleteTitle = () => {
    setEditing(false);
    deleteFurniture(furniture);
  }

  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 add-padding-top">
      <div className="card ">
        <div className="card-body furniture-grid">
          {
            !editing &&
            <h5 className="card-title  furniture-grid-title">{title}</h5>
          }
          {
            editing &&
            <input
              onChange={(event) => setNewTitle(event.target.value)}
              value={newTitle}
              className="form-control" />
          }
          {
            <Link to={`/furnitures/grid/editor/${furniture.id}`} className="btn btn-primary">
              {furniture.title}
            </Link>
          }
          <span className="float-right">
            {editing && <i onClick={() => deleteTitle()} className="fas fa-2x fa-trash my-controls-at-top-right"></i>}
            &nbsp;&nbsp;&nbsp;
            {!editing && <i onClick={() => setEditing(true)} className="fas fa-2x fa-edit"></i>}
            &nbsp;&nbsp;&nbsp;
            {editing && <i onClick={() => saveTitle()} className="fas fa-2x fa-check my-controls-at-top-right2"></i>}
          </span>
        </div>
      </div>
    </div >)
}
export default FurnitureCard