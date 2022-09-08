import React, { useState } from "react";
import './questions.css'

const MultipleChoiceQuestion = ({ question, graded, questions, setQuestions }) => {
    const [selectedAnswer, setSelectedAnswer] = useState();
    const changeAnswer = (myAnswer) => {
        setQuestions(
            questions.map(item => {
                if (item._id === question._id) {
                    return { ...item, answer: myAnswer }
                } else {
                    return item
                }
            }
            ))
    }

    return (
        <div>
            <div className="container row">
                <h4>{question.question}</h4>
                <h4>{question.answer}</h4>
                &nbsp; &nbsp;<img src={`${process.env.REACT_APP_IMAGE_URL}/images/question/${question.image}`} width="120px" height="120px" alt="question_image" />
                {graded && selectedAnswer !== question.correct &&
                    <span className="add-padding-left-top">
                        <i className="fas fa-times color-red"></i>
                    </span>
                }

                {graded && selectedAnswer === question.correct &&
                    <span className="add-padding-left-top">
                        <i className="fas fa-check color-green"></i>
                    </span>
                }
            </div>
            <div className="list-group">
                {
                    question.choices.map((choice, index) => {
                        return (
                            <>
                                {graded && question.correct === choice &&
                                    <div key={index} className="list-group-item background-correct">
                                        <label>
                                            {selectedAnswer === choice &&
                                                <input type="radio" name={question._id} checked={true} />
                                            }
                                            {selectedAnswer !== choice &&
                                                <input type="radio" name={question._id} checked={false} />
                                            }
                                            <span className="add-padding-left">
                                                {choice}
                                            </span>
                                            <span className="add-padding-left-tick">
                                                <i className="fas fa-check"></i>
                                            </span>
                                        </label>
                                    </div>
                                }

                                {graded && question.correct !== choice && selectedAnswer === choice &&
                                    <div key={index} className="list-group-item background-wrong">
                                        <label>
                                            <input type="radio" name={question._id} checked={true} />
                                            <span className="add-padding-left">
                                                {choice}
                                            </span>
                                            <span className="add-padding-left-tick">
                                                <i className="fas fa-times"></i>
                                            </span>
                                        </label>
                                    </div>
                                }

                                {graded && question.correct !== choice && selectedAnswer !== choice &&
                                    <div key={index} className="list-group-item">
                                        <label>
                                            <input type="radio" name={question._id} checked={false} />
                                            <span className="add-padding-left">
                                                {choice}
                                            </span>
                                        </label>
                                    </div>
                                }
                                {!graded &&
                                    <div key={index} className="list-group-item">
                                        <label>
                                            <input type="radio" name={question._id} onChange={(event) => {
                                                setSelectedAnswer(choice);
                                                changeAnswer(choice);
                                            }} />

                                            <span className="add-padding-left">
                                                {choice}
                                            </span>
                                        </label>
                                    </div>

                                }
                            </>
                        )
                    })
                }
                <div>
                    Your Answer: {selectedAnswer}
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default MultipleChoiceQuestion;
