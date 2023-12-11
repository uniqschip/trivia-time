import "./App.css";

import React, { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import LavaLamp from "./components/LavaLamp";
import Footer from "./components/Footer";

export default function App() {
	const [quizStarted, setQuizStarted] = useState(false);
	const [apiUrl, setApiurl] = useState("");
	const [darkMode, setDarkMode] = useState(true);

	// Renders lava lamp on load
	onload = () => {
		let lamp = new LavaLampBubbles("canvas", 0.5, "#CA3E8C", "#840470").start();
	};

	// Builds url from quizFormData and passes to Quiz component
	// setsQuizStarted to true to begin quiz
	function startQuiz(quizFormData) {
		setApiurl(
			`https://opentdb.com/api.php?amount=${quizFormData.triviaAmount}&category=${quizFormData.triviaCategory}&difficulty=${quizFormData.triviaDifficulty}&type=${quizFormData.triviaType}`
		);
		setQuizStarted(true);
	}

	// Passed to Quiz component to return user to landing to select new quiz options
	function resetQuizOptions() {
		setQuizStarted(false);
	}

	const quizElements = (
		<Quiz
			apiUrl={apiUrl}
			resetQuizOptions={resetQuizOptions}
			quizStarted={quizStarted}
		/>
	);

	const landingElements = <Landing startQuiz={startQuiz} />;

	return (
		<main className={darkMode ? "dark--mode" : ""}>
			<LavaLamp />
			<div className="content--wrapper">
				{quizStarted ? quizElements : landingElements}
			</div>
			<Footer />
		</main>
	);
}
