import React from 'react'
import FurnitureTable from "./furniture-table/furniture-table";
import FurnitureGrid from "./furniture-grid/furniture-grid";
import FurnitureEditor from "./furniture-editor/furniture-editor";
import { Route } from "react-router-dom";
import furnitureService, { findAllFurnitures } from "../services/furniture-service";

class FurnitureManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      furnitures: [],
      value: 'New Type'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  updateFurniture = (furniture) => {
    furnitureService.updateFurniture(furniture.id, furniture)
      .then(furniture => {
        this.setState((prevState) => ({
          ...prevState,
          furnitures: prevState.furnitures.map(
            (c) => c.id === furniture.id ? furniture : c)
        }))
      })
  }

  componentDidMount = () => {
    findAllFurnitures()
      .then(furnitures => { this.setState({ furnitures }); })
  }
  addFurniture = (temp) => {
    const newFurniture = {
      title: temp,
      owner: "me"
    }

    furnitureService.createFurniture(newFurniture)
      .then(furniture => {
        this.setState(
          (prevState) => ({
            ...prevState,
            furnitures: [
              ...prevState.furnitures,
              furniture
            ]
          }))
      })
  } // End of add furniture

  deleteFurniture = (furnitureToDelete) => {
    furnitureService.deleteFurniture(furnitureToDelete.id)
      .then(status => {
        this.setState((prevState) => ({
          ...prevState,
          furnitures: prevState.furnitures.filter
            (furniture => furniture !== furnitureToDelete)
        }))
      })
  }
  // have to think
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <Route path="/furnitures/table" exact={true}>
          <FurnitureTable
            updateFurniture={this.updateFurniture}
            deleteFurniture={this.deleteFurniture}
            furnitures={this.state.furnitures} />
          <div className="fixed-bottom">
            <i onClick={this.addFurniture.bind(this, "New Type")}
              className="fa fa-plus fa-5x color-me-tomato float-right"></i>
          </div>
        </Route>
        <Route path="/furnitures/grid" exact={true}>
          <FurnitureGrid
            updateFurniture={this.updateFurniture}
            deleteFurniture={this.deleteFurniture}
            furnitures={this.state.furnitures} />
          <div className="fixed-bottom">
            <i onClick={this.addFurniture.bind(this, this.state.value)}
              className="fa fa-plus fa-5x color-me-tomato float-right"></i>
          </div>
        </Route>
        <Route path={[
          "/furnitures/:layoutId/editor/:furnitureId",
          "/furnitures/:layoutId/editor/:furnitureId/styles/:styleId",
          "/furnitures/:layoutId/editor/:furnitureId/styles/:styleId/colors/:colorId",
          "/furnitures/:layoutId/editor/:furnitureId/styles/:styleId/colors/:colorId/materials/:materialId",
          "/furnitures/:layoutId/editor/:furnitureId/styles/:styleId/colors/:colorId/materials/:materialId/:widgetId"]}
          exact={true}
          render={(props) => <FurnitureEditor {...props} />}>
        </Route>
      </div>
    )
  }
}

export default FurnitureManager