import React from 'react'
import { Link } from "react-router-dom";

const FurnitureHeader = () =>
    <div className="row">
        <div className="col-1">
            <i className="fa fa-bars fa-2x pull-right"></i>
        </div>
        <div className="col-3 d-none d-sm-block">
            <h4>Furniture Manager</h4>
        </div>
        <div className="col-7">
            <input className="form-control bg-muted" type="text" value={this.state.value}
                onChange={this.handleChange} placeholder="New Furniture Title" />
        </div>
        <div className="col-1">
            <i onClick={this.addFurniture.bind(this, this.state.value)}
                className="fa fa-plus fa-2x color-me-tomato"></i>
        </div>
    </div>

export default FurnitureHeader