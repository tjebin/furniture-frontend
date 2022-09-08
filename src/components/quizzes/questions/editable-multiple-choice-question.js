import React, { useState } from "react";
import './questions.css'
import { Card, Row, Col } from 'reactstrap';
import axios from 'axios';

const EditableMultipleChoiceQuestion = ({ question, deleteQuestion, editQuestion }) => {
    const [image, setImage] = useState(question.image);
    const [selectedFile, setSelectedFile] = useState();
    const [choices, setChoices] = useState(question.choices.join('\n'));
    const [title, setTitle] = useState(question.title);
    const [correct, setCorrect] = useState(question.correct);
    const [quizId] = useState(question.quizId);
    const [editedQuestion, setEditedQuestion] = useState(question.question);
    const [showEditing, setSshowEditing] = useState(false);

    const onFileChangeHandler = (e) => {
        e.preventDefault();
        setSelectedFile(e.target.files[0]);
    };

    const onClickHandler = () => {
        const data = new FormData();
        data.append('file', selectedFile);
        axios.post(`${process.env.REACT_APP_IMAGE_UPLOAD_URL}/question`, data, {
        })
            .then(res => {
                alert(res.statusText);
            })
    }

    function submitEditedQuestion() {
        var finalChoices = choices.split("\n");
        let newQuestion = {
            _id: question._id,
            quizId: quizId,
            title: question.title,
            correct: correct,
            choices: finalChoices,
            image: image,
            question: editedQuestion,
            type: "MULTIPLE_CHOICE"
        };
        setSshowEditing(false);
        editQuestion(question._id, newQuestion);
        onClickHandler();
    }
    return (
        <div className="container ">
            {showEditing &&
                <div>
                    <Row>
                        <Col sm="8">
                            <Card body>
                                Title:
                                <input value={title}
                                    onChange={(event) => { setTitle(event.target.value); }}
                                    className="form-control" />
                                Question:
                                <input value={editedQuestion}
                                    onChange={(event) => setEditedQuestion(event.target.value)}
                                    className="form-control" />
                                Correct Answer:
                                <input value={correct}
                                    onChange={(event) => setCorrect(event.target.value)}
                                    className="form-control" />
                                <br />
                                Multiple Choices:
                                <textarea
                                    placeholder="Enter one list item per line"
                                    col={5}
                                    rows={5}
                                    value={choices}
                                    onChange={(event) => { setChoices(event.target.value); }}
                                    className="form-control">
                                </textarea>
                                Image:
                                <img src={`${process.env.REACT_APP_IMAGE_URL}/images/question/${question.image}`} width="120px" height="120px" alt="question_image" />
                                <input
                                    type="file"
                                    placeholder="Image URL"
                                    name="file"
                                    onChange={(event) => {
                                        onFileChangeHandler(event);
                                        setImage(event.target.files[0].name);
                                        event.preventDefault();
                                        setSelectedFile(event.target.files[0]);
                                    }}
                                    className="form-control" />
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        onClick={(event) => { submitEditedQuestion(); }}>
                                        Submit Question
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        onClick={(event) => { setSshowEditing(!showEditing); }}>
                                        Hide Editing
                                    </button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            }
            {!showEditing &&
                <div>
                    <Row>
                        <Col sm="6">
                            <h4>{question.question}</h4>
                            &nbsp; &nbsp;
                            <img src={`${process.env.REACT_APP_IMAGE_URL}/images/question/${question.image}`} width="120px" height="120px" alt="question_image" />
                            <div className="list-group">
                                {
                                    question.choices.map((choice, index) => {
                                        return (
                                            <>
                                                <div key={index} className="list-group-item">
                                                    <label>
                                                        <input type="radio" name={question._id} readOnly />
                                                        <span className="add-padding-left">
                                                            {choice}
                                                        </span>
                                                    </label>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <button type="button" className="btn btn-secondary btn-sm" onClick={() => {
                                    deleteQuestion(question);
                                }}>Delete Question</button>
                                <button type="button" className="btn btn-secondary btn-sm" onClick={() => {
                                    setSshowEditing(!showEditing);
                                }}>Edit</button>
                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    )
}

export default EditableMultipleChoiceQuestion;
