import React from 'react';
import QuizLogo from '../../src/Components/QuizLogo';
import QuizBackground from '../../src/Components/QuizBackground';
import QuizContainer from "../../src/Components/QuizContainer";
import QuestionWidget from "../../src/Components/QuestionWidget";
import ResultWidget from "../../src/Components/ResultWidget";
import db from '../../db.json'
import GitHubCorner from "../../src/Components/GitHubCorner";
import {motion} from "framer-motion";
import LoadingWidget from "../../src/Components/LoadingScreen";

const screenStates = {
	QUIZ: 'QUIZ',
	LOADING: 'LOADING',
	RESULT: 'RESULT',
};

export default function QuizPage({questions, background, theme}) {
	if(!questions || !background || !theme){
		questions = db.questions;
		background = db.bg;
		theme = db.theme;
	}

	const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
	const [btnState, setBtnState] = React.useState(0);
	const [screenState, setScreenState] = React.useState(screenStates.LOADING);
	const [currentQuestion, setCurrentQuestion] = React.useState(0);
	const [results, setResults] = React.useState([]);
	const totalQuestions = questions.length;
	const questionIndex = currentQuestion;
	const question = questions[questionIndex];

	React.useEffect(() => {
		setTimeout(() => {
			setScreenState(screenStates.QUIZ);
		}, 1 * 2000);
	}, []);

	const addResult = result => {
		setResults([...results, result])
	}

	const handleSubmitQuiz = () => {
		if (btnState)
			return nextPage();

		questionValidation();

		setBtnState(1);
	}

	const questionValidation = () => {
		document.getElementById(`${questions[questionIndex].answer}`).style.backgroundColor = theme.colors.success;
		if (selectedAlternative !== questions[questionIndex].answer)
			document.getElementById(`${selectedAlternative}`).style.backgroundColor = theme.colors.wrong;
		else
			addResult(true);
	}

	const nextPage = () => {
		const nextQuestion = questionIndex + 1;
		if (nextQuestion < totalQuestions) {
			setCurrentQuestion(nextQuestion);
		} else {
			setScreenState(screenStates.RESULT);
		}
		setBtnState(0);
		setSelectedAlternative(undefined);

		for(let i = 0; i < questions[questionIndex].alternatives.length; i++){
			document.getElementById(`${i}`).style.backgroundColor = `${theme.colors.primary}40`;
		}
	}

	return (
		<QuizBackground backgroundImage={background}>
			<QuizContainer
				transition={{delay: 0, duration: 1}}
				as={motion.section}
				variants={{
					show: {opacity: 1, y: '0'},
					hidden: {opacity: 0, y: '700%'}
				}}
				initial='hidden'
				animate='show'
			>
				<QuizLogo/>
				{screenState === screenStates.QUIZ && (
					<QuestionWidget
						question={question}
						questionIndex={questionIndex}
						totalQuestions={totalQuestions}
						onSubmit={handleSubmitQuiz}
						handleSelectedQuestion={index => setSelectedAlternative(index)}
						btnState={btnState}
						btnValidation={selectedAlternative}
					/>
				)}

				{screenState === screenStates.LOADING && <LoadingWidget/>}

				{screenState === screenStates.RESULT && <ResultWidget results={results} questions={questions} theme={theme}/>}
			</QuizContainer>
			<GitHubCorner projectUrl="https://github.com/icarosuper/Quiz-Alura"/>
		</QuizBackground>
	);
}