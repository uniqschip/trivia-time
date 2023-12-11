import React from "react";
import "./QuizOptions.css";

export default function QuizOptions(props) {
	const id = React.useId();

	const amountElements = (
		<>
			<label className="option--label" htmlFor={id + "-triviaAmount"}>
				How Many Questions?
			</label>
			<input
				type="number"
				id={id + "-triviaAmount"}
				name="triviaAmount"
				value={props.quizFormData.triviaAmount}
				onChange={props.handleChange}
				min="0"
				max="50"
			/>
		</>
	);

	const categoryElements = (
		<>
			<label className="option--label" htmlFor={id + "-triviaCategory"}>
				Questions Category
			</label>
			<select
				name="triviaCategory"
				id={id + "-triviaCategory"}
				value={props.quizFormData.triviaCategory}
				onChange={props.handleChange}
			>
				<option style={{ color: "red", backgroundColor: "red" }} value="">
					Any Category
				</option>
				<option value="9">General Knowledge</option>
				<option value="10">Entertainment: Books</option>
				<option value="11">Entertainment: Film</option>
				<option value="12">Entertainment: Music</option>
				<option value="13">Entertainment: Musicals &amp; Theatres</option>
				<option value="14">Entertainment: Television</option>
				<option value="15">Entertainment: Video Games</option>
				<option value="16">Entertainment: Board Games</option>
				<option value="17">Science &amp; Nature</option>
				<option value="18">Science: Computers</option>
				<option value="19">Science: Mathematics</option>
				<option value="20">Mythology</option>
				<option value="21">Sports</option>
				<option value="22">Geography</option>
				<option value="23">History</option>
				<option value="24">Politics</option>
				<option value="25">Art</option>
				<option value="26">Celebrities</option>
				<option value="27">Animals</option>
				<option value="28">Vehicles</option>
				<option value="29">Entertainment: Comics</option>
				<option value="30">Science: Gadgets</option>
				<option value="31">Entertainment: Japanese Anime &amp; Manga</option>
				<option value="32">Entertainment: Cartoon & Animations</option>
			</select>
		</>
	);

	const difficultyElements = (
		<>
			<label className="option--label" htmlFor={id + "-triviaDifficulty"}>
				Questions Difficulty
			</label>
			<select
				name="triviaDifficulty"
				id={id + "-triviaDifficulty"}
				value={props.quizFormData.triviaDifficulty}
				onChange={props.handleChange}
			>
				<option value="">Any</option>
				<option value="easy">Easy</option>
				<option value="medium">Medium</option>
				<option value="hard">Hard</option>
			</select>
		</>
	);

	const triviaTypeElements = (
		<>
			<label className="option--label" htmlFor={id + "-triviaType"}>
				Question Type
			</label>
			<select
				name="triviaType"
				id={id + "-triviaType"}
				value={props.quizFormData.triviaType}
				onChange={props.handleChange}
			>
				<option value="">Any Type</option>
				<option value="multiple">Multiple Choice</option>
				<option value="boolean">True/False</option>
			</select>
		</>
	);

	return (
		<form className="options--form">
			{amountElements}
			{categoryElements}
			{difficultyElements}
			{triviaTypeElements}
		</form>
	);
}
