import React, { useState, useEffect } from "react";
import Question from "./Question";
import Loading from "./Loading";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import { Tooltip } from "react-tooltip";
import { CountUp } from "count-up-es-react";
import "./Quiz.css";

export default function Quiz(props) {
	const [questions, setQuestions] = useState([]);
	const [userScore, setUserScore] = useState(0);
	const [quizScored, setQuizScored] = useState(false);
	const [shouldFetchData, setShouldFetchData] = useState(false);
	const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
	const [loading, setLoading] = useState(true);

	// useEffect with API call, runs when props.quizStarted === true
	// If response, calls processQuestionsArray to decode and add allAnswers array of answer objects
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(props.apiUrl);
				const data = await res.json();
				if (data.results) {
					setLoading(true);
					setQuestions(processQuestionsArray(data.results));
					setLoading(false);
				} else {
					console.error("Error: No results in the fetched data");
				}
			} catch (error) {
				console.error("Error:", error);
			} finally {
				setLoading(false);
			}
		};
		setShouldFetchData(false);
		fetchData();
	}, [shouldFetchData]);

	useEffect(() => {
		setAllQuestionsAnswered(
			questions.every((question) =>
				question.all_answers.some((answer) => answer.is_selected)
			)
		);
	}, [questions]);

	// Shuffles all_answers array on API call
	function shuffleAnswers(answers_array) {
		return answers_array.sort(() => Math.random() - 0.5);
	}

	// Takes in array of questions, adds id to questions,decodes questions and answers, creates nested array of all answers and adds id, isSelected, isCorrect to each answer
	function processQuestionsArray(questionsArray) {
		const processedArray = questionsArray.map((item) => {
			return {
				id: nanoid(),
				...item,
				question: decode(item.question),
				all_answers: shuffleAnswers([
					{
						answer: decode(item.correct_answer),
						is_selected: false,
						is_correct: true,
						id: nanoid(),
					},
					...item.incorrect_answers.map((option) => {
						return {
							answer: decode(option),
							is_selected: false,
							is_correct: false,
							id: nanoid(),
						};
					}),
				]),
			};
		});
		return processedArray;
	}

	// Checks if quiz has been scored to prevent changing selection once user submits answers
	// Takes in id of question for which answer is clicked and index of clicked answer in all_answers
	function selectAnswer(clickedQuestionId, clickedAnswerIndex, event) {
		event.preventDefault();
		if (!quizScored) {
			setQuestions((prevQuestions) =>
				prevQuestions.map((prevQuestion) => {
					if (clickedQuestionId === prevQuestion.id) {
						const updatedAllAnswers = prevQuestion.all_answers.map(
							(answer, index) => {
								return {
									...answer,
									is_selected:
										index === clickedAnswerIndex ? !answer.is_selected : false,
								};
							}
						);
						return {
							...prevQuestion,
							all_answers: updatedAllAnswers,
						};
					} else {
						return prevQuestion;
					}
				})
			);
		}
	}

	// Checks if allQuestionsAnswered, if so, loops through all questions, if answer is_selected and is_correct, adds 1 to userScore
	function scoreQuiz() {
		if (allQuestionsAnswered) {
			let score = 0;
			for (const question of questions) {
				for (const item of question.all_answers) {
					if (item.is_selected && item.is_correct) {
						score++;
					}
				}
			}
			setUserScore(score);
			setQuizScored(true);
		} else {
		}
	}

	// Resets state for all states in Quiz component to reset game with same api call
	function resetQuiz() {
		setLoading(true);
		setQuestions([]);
		setShouldFetchData(true);
		setQuizScored(false);
		setAllQuestionsAnswered(false);
		setUserScore(0);
	}

	// button to bring user back to landing to reselect QuizOptions
	const resetQuizButtonElements = (
		<button onClick={props.resetQuizOptions}>
			<span className="btn--text">New Quiz Options</span>
		</button>
	);

	const questionElements = questions.map((item) => {
		return (
			<>
				<Question
					key={item.id}
					questionId={item.id}
					question={item.question}
					correctAnswer={item.correct_answer}
					allAnswers={item.all_answers}
					selectAnswer={selectAnswer}
					quizScored={quizScored}
				/>
				<hr></hr>
			</>
		);
	});

	const quizElements = (
		<div className="quiz--container">
			<h1 className="app--logo">Trivia Time!</h1>
			{questionElements}
			<div className="quiz--btn--container">
				<button
					onClick={quizScored ? resetQuiz : scoreQuiz}
					data-tooltip-content="Please answer all questions!"
					data-tooltip-id="tooltip"
					data-tooltip-place="top"
					data-tooltip-offset="10"
				>
					<span className="btn--text">
						{quizScored ? "Reset" : "Score"} Quiz
					</span>
				</button>
				{!allQuestionsAnswered ? <Tooltip id="tooltip" noArrow /> : ""}

				{resetQuizButtonElements}
			</div>

			<p className="score">
				Your score:{" "}
				{quizScored ? (
					<CountUp
						start={0}
						end={userScore}
						duration={userScore * 500}
						easing={"linear"}
					/>
				) : (
					"0"
				)}
				/{questions.length}
			</p>
		</div>
	);

	return <>{loading ? <Loading /> : quizElements}</>;
}
