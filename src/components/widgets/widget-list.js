import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import HeadingWidget from "./heading-widget";
import ListWidget from "./list-widget";
import ImageWidget from "./image-widget";
import ParagraphWidget from "./paragraph-widget";
import { useParams } from "react-router-dom";
import widgetService from '../../services/widget-service';
import axios from 'axios';

const WidgetList = (
    {
        widgets = [],
        findWidgetsForMaterial,
        createWidgetForMaterial,
        deleteWidget,
        updateWidget
    }
) => {
    const { styleId, colorId, materialId } = useParams();
    const [editingWidget, setEditingWidget] = useState({});
    const [widget, setWidget] = useState({});
    const [newText, setNewText] = useState("")
    const [newText2, setNewText2] = useState("")
    const [newSize, setNewSize] = useState()
    const [newType, setNewType] = useState()
    const [newOrder, setNewOrder] = useState(false)
    const [newWidth, setNewWidth] = useState()
    const [newHeight, setNewHeight] = useState()
    const [newUrl, setNewUrl] = useState("Image URL")
    const [selectedFile, setSelectedFile] = useState("")
    useEffect(() => {
        if (materialId) {
            findWidgetsForMaterial(materialId);
        }
    }, [styleId, colorId, materialId]) //eslint-disable-line 
    return (
        <div>
            {
                styleId && colorId && materialId &&
                <>
                    <i onClick={() => createWidgetForMaterial(materialId)} className="fas fa-plus fa-2x float-right"></i>
                    <h6 className="bg-info">
                        <span className="bg-primary text-light font-weight-bold text-lg-start">
                            Information Available
                        </span>
                    </h6>
                    {/* <!--End of creating widget for the first time --> */}
                    <ul className="list-group">
                        {
                            widgets.map(widget =>
                                <li className="list-group-item" key={widget.id}>

                                    {/* First time after a widget is created the editingObject is null */}
                                    {
                                        editingWidget.id === widget.id &&
                                        <>
                                            <i onClick={() => {
                                                if (newType === "IMAGE" && setSelectedFile !== null) {
                                                    const data = new FormData();
                                                    data.append('file', selectedFile);
                                                    axios.post(`${process.envREACT_APP_IMAGE_UPLOAD_URL}`, data, {
                                                    })
                                                        .then(res => {
                                                            alert(res.statusText);
                                                        })
                                                }
                                                // code to update widget          
                                                updateWidget({ ...editingWidget, text: newText, text2: newText2, size: newSize, type: newType, ordered: newOrder, url: newUrl, width: newWidth, height: newHeight, selectedFile: selectedFile });
                                                { setEditingWidget({}); }
                                            }} className="fas fa-2x fa-check float-right"></i>
                                            <i onClick={() => deleteWidget(widget)}
                                                className="fas fa-2x fa-trash float-right"></i>
                                        </>
                                    }
                                    {

                                        // Second time when the edit button is clicked then the properties are set like newText,url
                                        editingWidget.id !== widget.id &&
                                        <i onClick={() => {
                                            setEditingWidget(widget); setNewText(widget.text);
                                            setNewText2(widget.text2);
                                            setNewSize(widget.size); setNewType(widget.type); setNewOrder(widget.ordered); setNewUrl(widget.url); setNewWidth(widget.width);
                                            setNewHeight(widget.height);
                                            setSelectedFile(widget.selectedFile);
                                        }} className="fas fa-2x fa-edit float-right"></i>
                                    }

                                    {/* After setting passing the widget properties to widget component */}
                                    {/* passing properties and some actions */}
                                    {
                                        widget.type === "HEADING" &&
                                        <HeadingWidget
                                            newText={newText}
                                            newText2={newText2}
                                            newSize={newSize}
                                            newType={newType}
                                            editing={editingWidget.id === widget.id}
                                            updateWidget={updateWidget}
                                            deleteWidget={deleteWidget}
                                            setNewText={setNewText}
                                            setNewText2={setNewText2}
                                            setNewSize={setNewSize}
                                            setNewType={setNewType}
                                            newOrder={newOrder}
                                            setNewOrder={setNewOrder}
                                            newUrl={newUrl}
                                            newWidth={newWidth}
                                            newHeight={newHeight}
                                            setNewUrl={setNewUrl}
                                            setNewWidth={setNewWidth}
                                            setNewHeight={setNewHeight}
                                            widget={widget} // First time before editing button is clicked widget is used to populate the data
                                            selectedFile={selectedFile}
                                            setSelectedFile={setSelectedFile} />
                                    }
                                    {
                                        widget.type === "PARAGRAPH" &&
                                        <div>
                                            <ParagraphWidget
                                                newText={newText}
                                                newText2={newText2}
                                                newType={newType}
                                                newSize={newSize}
                                                editing={editingWidget.id === widget.id}
                                                setNewText={setNewText}
                                                setNewText2={setNewText2}
                                                setNewType={setNewType}
                                                setNewSize={setNewSize}
                                                newOrder={newOrder}
                                                setNewOrder={setNewOrder}
                                                newUrl={newUrl}
                                                newWidth={newWidth}
                                                newHeight={newHeight}
                                                setNewUrl={setNewUrl}
                                                setNewWidth={setNewWidth}
                                                setNewHeight={setNewHeight}
                                                widget={widget} // I am passing widget other properties are null during first render
                                                selectedFile={selectedFile}
                                                setSelectedFile={setSelectedFile}
                                            />
                                        </div>
                                    }
                                    {
                                        widget.type === "LIST" &&
                                        <ListWidget
                                            newText={newText}
                                            newText2={newText2}
                                            setNewText={setNewText}
                                            setNewText2={setNewText2}
                                            newType={newType}
                                            setNewType={setNewType}
                                            newOrder={newOrder}
                                            setNewOrder={setNewOrder}
                                            newSize={newSize}
                                            setNewSize={setNewSize}
                                            setWidget={setWidget}
                                            editing={editingWidget.id === widget.id}
                                            widget={widget}
                                            selectedFile={selectedFile}
                                            setSelectedFile={setSelectedFile} />
                                    }
                                    {
                                        widget.type === "IMAGE" &&
                                        <ImageWidget
                                            setWidget={setWidget}
                                            newUrl={newUrl}
                                            newWidth={newWidth}
                                            newHeight={newHeight}
                                            setNewUrl={setNewUrl}
                                            setNewWidth={setNewWidth}
                                            setNewHeight={setNewHeight}
                                            newText={newText}
                                            newText2={newText2}
                                            setNewText={setNewText}
                                            setNewText2={setNewText2}
                                            newOrder={newOrder}
                                            setNewOrder={setNewOrder}
                                            newType={newType}
                                            setNewType={setNewType}
                                            editing={editingWidget.id === widget.id}
                                            widget={widget}
                                            selectedFile={selectedFile}
                                            setSelectedFile={setSelectedFile} />
                                    }

                                </li>
                            )
                        }
                    </ul>
                </>
            }
        </div >
    )
}

const stpm = (state) => ({
    widgets: state.widgetReducer.widgets,
    materials: state.materialReducer.materials
})
const dtpm = (dispatch) => ({
    findWidgetsForMaterial: (materialId) => {
        widgetService.findWidgetsForMaterial(materialId)
            .then(widgets => dispatch({
                type: "FIND_WIDGETS",
                widgets
            }))
    },
    createWidgetForMaterial: (materialId) => {
        // At first a paragraph will be created
        widgetService
            .createWidgetForMaterial(materialId)
            .then(widget => dispatch({
                type: "CREATE_WIDGET",
                widget
            }))
    },
    updateWidget: (widget) =>
        widgetService.updateWidget(widget.id, widget)
            .then(status => dispatch({
                type: "UPDATE_WIDGET",
                widget
            })),
    deleteWidget: (widget) => {
        widgetService.deleteWidget(widget.id)
            .then(status => dispatch({
                type: "DELETE_WIDGET",
                widgetToDelete: widget
            }))
    },

})
export default connect(stpm, dtpm)(WidgetList);