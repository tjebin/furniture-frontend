import React, { useEffect, useState } from "react";
import './quizzes-list.css'
import quizService from '../../services/quiz-service';
import questionService from '../../services/questions-service';
import { connect } from "react-redux";
import Quiz from "../quizzes/quiz";
import { useParams } from "react-router-dom";

const QuizzesList = ({
    quiz,
    questions,
    findQuizByFurnitureId,
    setQuestions,
    createQuestion,
    deleteQuestion,
    editingQuestion,
    editQuestion
}) => {
    const { furnitureId } = useParams();

    useEffect(() => {
        if (furnitureId !== "undefined" && typeof furnitureId !== "undefined") {
            findQuizByFurnitureId(furnitureId);
        }
    }, [furnitureId])//eslint-disable-line

    return (
        <div className="container">
            <div className="list-group">
                <div className="">
                    <div className="row list-group-item">
                        <Quiz furnitureId={furnitureId}
                            quizId={quiz._id}
                            questions={questions}
                            setQuestions={setQuestions}
                            createQuestion={createQuestion}
                            deleteQuestion={deleteQuestion}
                            editingQuestion={editingQuestion}
                            editQuestion={editQuestion} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const stpm = (state) => ({
    quiz: state.quizReducer.quiz,
    questions: state.questionReducer.questions
})
const dtpm = (dispatch) => ({
    createQuestion: (question) => {
        if (question.question !== undefined) {
            // don't create if already exists
            quizService
                .createQuiz(question.quizId)
                .then(quiz => {
                    dispatch({
                        type: "CREATE_QUIZ",
                        quiz
                    })
                })
            questionService
                .createQuestion(question)
                .then((question) => {
                    dispatch({
                        type: "CREATE_QUESTION",
                        question
                    })
                })
        }
    },

    findQuizByFurnitureId: (furnitureId) => {
        quizService.findQuizByFurnitureId(furnitureId)
            .then((quiz) => {
                dispatch({
                    type: "FIND_QUIZ",
                    quiz
                })
                questionService.findQuestionsForQuiz(quiz._id)
                    .then(questions => {
                        dispatch({
                            type: "FIND_QUESTIONS",
                            questions
                        })
                    })
            })
    },
    setQuestions: (questions) => {
        dispatch({
            type: "SET_RESULT_QUESTIONS",
            questions
        })
    },

    deleteQuestion: (question1) => {
        let id = question1._id;
        questionService
            .deleteQuestion(question1._id)
            .then(question => {
                dispatch({
                    type: "DELETE_QUESTION",
                    id
                })
            })
        // quizService
        //     .deleteQuiz(question.quizId)

        //     .then(question => {
        //         dispatch({
        //             type: "DELETE_QUIZ",
        //             question
        //         })
        //     })
    },

    editQuestion: (id, questionToBeUpdated) => {
        questionService
            .updateQuestion(id, questionToBeUpdated)
            .then(question => {
                dispatch({
                    type: "UPDATE_QUESTION",
                    questionToBeUpdated
                })
            })
    }

})

export default connect(stpm, dtpm)(QuizzesList);
