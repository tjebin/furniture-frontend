import React, { useState } from "react";
import Question from "./questions/question";
import EditableQuestion from "./questions/editableQuestion";
import quizService from '../../services/quiz-service';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
import './quizzes-list.css';

const Quiz = ({
    furnitureId,
    quizId,
    questions,
    setQuestions,
    createQuestion,
    response,
    deleteQuestion,
    editingQuestion,
    editQuestion
}) => {
    const [graded, setGraded] = useState(false);
    const [quizResult, setQuizResult] = useState();
    const [allAttempts, setAllAttempts] = useState([]);
    const [activeTab, setActiveTab] = useState('4');
    const [image, setImage] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [choices, setChoices] = useState();
    const [title, setTitle] = useState();
    const [correct, setCorrect] = useState();
    const [question, setQuestion] = useState();

    // shared property for create questions
    var _id = furnitureId;

    function submitQuiz() {
        var finalChoices = choices.split("\n");
        let newQuestion = {
            quizId: _id,
            title: title,
            correct: correct,
            choices: finalChoices,
            image: image,
            question: question,
            type: "MULTIPLE_CHOICE"
        };
        createQuestion(newQuestion);
        onClickHandler();
    }

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
        setGraded(false);
    }

    const getResult = () => {
        quizService.submitQuiz(quizId, questions)
            .then(result => setQuizResult(result.score))
    }

    const getPrevAttempts = () => {
        setAllAttempts([])
        quizService.findQuizResultsById(quizId)
            .then(attempts => attempts.map(eachAttempt => setAllAttempts(allAttempts => [...allAttempts, eachAttempt.score])))
    }

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
                console.log(res.data);
            })
    }

    return (
        <div>
            <div>
                <Nav tabs>
                    {questions.length !== 0 && <>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                {questions.length !== 0 && <>Take The Quiz</>}
                            </NavLink>
                        </NavItem>
                    </>}
                    {questions.length === 0 && <>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                Create  Quiz
                            </NavLink>
                        </NavItem>
                    </>}
                    {questions.length !== 0 && <>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                Create  More Questions
                            </NavLink>
                        </NavItem>
                    </>}
                    {questions.length !== 0 && <>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}
                            >
                                {questions.length !== 0 && <>Manage Quiz</>}
                            </NavLink>
                        </NavItem>
                    </>}
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            Close Tabs
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <Card body>
                                    <h2 className="">Quiz</h2>
                                    <ul>
                                        {questions.length !== 0 &&
                                            questions.map(question =>
                                                <>
                                                    <li>
                                                        <Question key={question._id} question={question} quizId={quizId} graded={graded} questions={questions} setQuestions={setQuestions} />
                                                    </li>
                                                    <br />
                                                </>
                                            )
                                        }
                                        {
                                            questions.length !== 0 &&
                                            <>
                                                <div>
                                                    Score: {quizResult}
                                                </div>
                                                <div className="add-padding-left-question">
                                                    <i type="button" className="btn btn-success" onClick={() => {
                                                        setGraded(true); console.log(questions); getResult();
                                                    }}>
                                                        Grade
                                                    </i>
                                                </div>
                                                <br />
                                                <br />
                                                <br />
                                                <div >
                                                    All Attempts:
                                                    <ol>
                                                        {allAttempts.map((eachScore, index) => <li key={index}>{eachScore}</li>)}
                                                    </ol>
                                                </div>
                                                <div className="add-padding-left-question">
                                                    <i type="button" className="btn btn-success" onClick={() => {
                                                        getPrevAttempts();
                                                    }}>
                                                        All Scores
                                                    </i>

                                                    <i type="button" className="btn btn-info" onClick={() => {
                                                        setGraded(false);
                                                    }}>
                                                        Start Again
                                                    </i>
                                                </div>
                                                <br />
                                            </>
                                        }
                                    </ul>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <h2>Create <br /></h2>
                                    Title:
                                    <input value={title} onChange={(event) => setTitle(event.target.value)}
                                        className="form-control" />
                                    Question:
                                    <input value={question} onChange={(event) => setQuestion(event.target.value)}
                                        className="form-control" />
                                    Correct Answer:
                                    <input value={correct} onChange={(event) => setCorrect(event.target.value)}
                                        className="form-control" />
                                    <br />
                                    Multiple Choices:
                                    <textarea
                                        placeholder="Enter one list item per line"
                                        col={4}
                                        rows={4}
                                        value={choices}
                                        onChange={(event) => { event.preventDefault(); setChoices(event.target.value); }}
                                        className="form-control">
                                    </textarea>
                                    Image:
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
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={(event) => {
                                        submitQuiz();
                                    }}>Submit Question</button>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        {questions.length !== 0 && quizId &&
                            <Row>
                                <Col sm="12">
                                    <Card body>
                                        <h2 className="">Manage Quiz</h2>
                                        <ul>
                                            {questions.length !== 0 &&
                                                questions.map(question =>
                                                    <>
                                                        <li>
                                                            <EditableQuestion
                                                                key={question._id}
                                                                question={question}
                                                                quizId={quizId}
                                                                deleteQuestion={deleteQuestion}
                                                                editingQuestion={editingQuestion}
                                                                editQuestion={editQuestion} />
                                                        </li>
                                                        <br />
                                                    </>
                                                )
                                            }
                                        </ul>
                                    </Card>
                                </Col>
                            </Row>
                        }
                    </TabPane>
                    <TabPane tabId="4">
                    </TabPane>
                </TabContent>
            </div>
            <div>{response}</div>
        </div>
    );
}

export default Quiz;