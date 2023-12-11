import React from "react";
import "./Question.css";

export default function Question(props) {
	// Checks if quiz has been scored and applies appropriate class to highlight selected, correct, and incorrect answers
	// loops through all_answers array for each question and builds answer for each
	const answerElements = props.allAnswers.map((option, index) => {
		let answerClass = "btn--text ";
		if (props.quizScored) {
			if (option.is_selected && option.is_correct) {
				answerClass += "selected--correct";
			} else if (option.is_correct) {
				answerClass += "correct";
			} else if (option.is_selected) {
				answerClass += "selected--incorrect";
			}
		} else {
			if (option.is_selected) {
				answerClass += "selected";
			}
		}

		const combinedClass = `${answerClass} answer`;

		return (
			<p
				key={option.id}
				onClick={(event) => props.selectAnswer(props.questionId, index, event)}
				className={combinedClass}
				style={props.quizScored ? { transform: "none", cursor: "auto" } : {}}
			>
				{option.answer}
			</p>
		);
	});

	// renders question and answer elements
	return (
		<div className="question--container">
			<h2>{props.question}</h2>
			<div
				className={
					props.allAnswers.length === 2
						? "answers--container boolean--answers--container"
						: "answers--container"
				}
			>
				{answerElements}
			</div>
		</div>
	);
}
