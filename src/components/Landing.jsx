import React, { useState, useEffect } from "react";
import QuizOptions from "./QuizOptions";
import "./Landing.css";

export default function Landing(props) {
	const [triviaOptions, setTriviaOptions] = useState([]);
	const [quizFormData, setQuizFormData] = useState({
		triviaAmount: "10",
		triviaCategory: "",
		triviaDifficulty: "",
		triviaType: "",
	});

	// Listens for any change to quizFormData, updates object values to be rendered in QuizOptions component
	function handleChange(event) {
		const { name, value } = event.target;
		setQuizFormData((prevQuizFormData) => {
			return {
				...prevQuizFormData,
				[name]: value,
			};
		});
	}

	return (
		<div className="landing--container">
			<h1 className="app--logo">Trivia Time!</h1>
			<QuizOptions quizFormData={quizFormData} handleChange={handleChange} />
			<button
				className="start--quiz--btn"
				onClick={() => props.startQuiz(quizFormData)}
			>
				<span className="btn--text">Start Quiz</span>
			</button>
		</div>
	);
}
