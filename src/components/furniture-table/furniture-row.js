import React, { useState } from 'react'
import Moment from 'react-moment';
import 'moment-timezone';

const FurnitureRow = (
    {
        deleteFurniture,
        updateFurniture,
        furniture,
        lastModified,
        title,
        owner
    }) => {

    const [editing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const saveTitle = () => {
        setEditing(false)
        const newFurniture = {
            ...furniture,
            title: newTitle
        }
        updateFurniture(newFurniture);
    }

    const deleteTitle = () => {
        setEditing(false)
        deleteFurniture(furniture)
    }
    return (
        <tr>
            <td>
                {
                    !editing && <>
                        <a href={`/furnitures/table/editor/${furniture.id}`} style={{ color: "blue" }}> {title}</a>
                    </>
                }
                {
                    editing &&
                    <input
                        onChange={(event) => { setNewTitle(event.target.value) }}
                        value={newTitle}
                        className="form-control" />
                }
            </td>

            <td className="d-none d-sm-table-cell">
                {owner}
            </td>
            <td className="d-none d-sm-table-cell">
                <Moment format="YYYY/MM/DD hh:mm:ss a">{lastModified}</Moment>
            </td>
            <td>
                <span className="float-right">
                    {editing && <i onClick={() => saveTitle()} className="fas fa-check"></i>}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {editing && furniture.id !== 1 && furniture.id !== 2 && <i onClick={() => deleteTitle()} className="fas fa-trash"></i>}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {!editing && <i onClick={() => setEditing(true)} className="fas fa-edit"></i>}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
            </td>
        </tr >
    )
}
export default FurnitureRow
