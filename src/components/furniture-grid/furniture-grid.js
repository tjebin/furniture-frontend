import React, { useState } from 'react'
import FurnitureCard from "./furniture-card";
import { Link } from "react-router-dom";
import { Tooltip } from 'reactstrap';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const FurnitureGrid = ({ furnitures, deleteFurniture, updateFurniture }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const { items, requestSort } = useSortableData(furnitures);

  return (
    <div className="container">
      <div className="row grid-header-top">
        <div className="col-12 text-center" >
          <span className="furniture-type-grid-view-header ">Furniture Type Grid View</span>
        </div>
        <div className="col-4 d-sm-none d-md-block">
          <h4>Owned By me</h4>
        </div>
        <div className="col-4 my-no-wrap">
          <span className="float-right">
            <i className="fas fa-sort fa-3x" onClick={() => requestSort('title')}></i>
            <Link to="/furnitures/table">
              <i className="fas fa-list fa-2x" href="#" id="TooltipListView" ></i>
              <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipListView" toggle={toggle}>
                Go To List View !!
              </Tooltip>
            </Link>
          </span>
        </div>
        <div className="col-4  d-sm-none d-md-block">
        </div>
      </div>
      <div className="row">
        {
          items.map(furniture =>
            <FurnitureCard furniture={furniture}
              deleteFurniture={deleteFurniture}
              updateFurniture={updateFurniture}
              title={furniture.title} />
          )
        }
      </div>
    </div>
  )
}
export default FurnitureGrid