import React from "react";
import EditableMultipleChoiceQuestion from "./editable-multiple-choice-question";

const EditableQuestion = ({ question, quizId, graded, questions, setQuestions, deleteQuestion, editQuestion, editingQuestion }) => {
    return (
        <div>
            {
                question.type === "MULTIPLE_CHOICE" &&
                <EditableMultipleChoiceQuestion
                    question={question}
                    quizId={quizId}
                    graded={graded}
                    editingQuestion={editingQuestion}
                    questions={questions}
                    setQuestions={setQuestions}
                    editQuestion={editQuestion}
                    deleteQuestion={deleteQuestion} />
            }
        </div>
    )
}

export default EditableQuestion;