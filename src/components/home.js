import React from 'react'
import { Link } from "react-router-dom";

export default () =>
    <>
        <h1>Home</h1>
        <div className="list-group">
            <Link to="/furnitures/table" className="list-group-item">
                Furniture Overview
            </Link>
            <Link to="/furnitures/grid" className="list-group-item">
                Furniture Grid View
            </Link>
        </div>
    </>
