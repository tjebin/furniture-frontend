import React, { useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import furnitureService from "../../services/furniture-service";
import styleReducer from "../../reducers/style-reducer";
import colorReducer from "../../reducers/color-reducer";
import materialReducer from "../../reducers/material-reducer";
import widgetReducer from "../../reducers/widget-reducer";
import quizReducer from "../../reducers/quiz-reducer";
import questionReducer from "../../reducers/question-reducer";
import StyleList from "./style-list";
import ColorTabs from "./color-tabs";
import MaterialPills from "./material-pills";
import WidgetList from "../widgets/widget-list";
import QuizzesList from "../quizzes/quizzes-list";

const reducer = combineReducers({
    styleReducer: styleReducer,
    colorReducer: colorReducer,
    materialReducer: materialReducer,
    widgetReducer: widgetReducer,
    quizReducer: quizReducer,
    questionReducer: questionReducer
})

const store = createStore(
    reducer,/* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());

const FurnitureEditor = () => {
    const { layoutId, furnitureId } = useParams();
    const [furnitureName, setFurnitureName] = useState("");
    furnitureService.findFurnitureById(furnitureId)
        .then(furniture => {
            setFurnitureName(furniture.title);
        })
    return (
        <Provider store={store}>
            <div>
                <h2>
                    <Link to={`/furnitures/${layoutId}`}>
                        <i className="fas fa-times float-left"></i>
                    </Link>
                    <span className="color-pink">
                        {furnitureName}
                    </span>
                </h2>
                <div className="row">
                    <div className="col-4">
                        <StyleList />
                    </div>
                    <div className="col-8">
                        <div>
                            <QuizzesList />
                        </div>
                        <div>
                            <ColorTabs />
                        </div>
                        <br />
                        <MaterialPills />
                        <br />
                        <WidgetList />
                    </div>
                </div>
            </div>
        </Provider>)
}
export default FurnitureEditor