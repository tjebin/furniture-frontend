import React from 'react';
import FurnitureRow from "./furniture-row";
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

const FurnitureTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.furnitures);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('title')}
              className={getClassNamesFor('title')}
            >
              Type
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('createdBy')}
              className={getClassNamesFor('createdBy')}
            >
              Created By
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('lastModified')}
              className={getClassNamesFor('lastModified')}
            >
              Last Midified
            </button>
          </th>
          <th>
            <span className="float-right">
              <Link to="/furnitures/grid">
                <i className="fas fa-list fa-2x" href="#" id="TooltipListView" ></i>
                <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipListView" toggle={toggle}>
                  Go To Grid View !!
                </Tooltip>
              </Link>
            </span>
          </th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map((furniture) =>
            <FurnitureRow
              updateFurniture={props.updateFurniture}
              deleteFurniture={props.deleteFurniture}
              key={furniture.id}
              furniture={furniture}
              id={furniture.id}
              title={furniture.title}
              owner={furniture.owner}
              lastModified={furniture.lastModified}
            />)
        }
      </tbody>
    </table>
  );
};

export default FurnitureTable;