import React from 'react';

import db from '../db.json';
import Widget from '../src/Components/Widget';
import QuizLogo from '../src/Components/QuizLogo';
import QuizBackground from '../src/Components/QuizBackground';
import Button from '../src/Components/Button';
import QuizContainer from "../src/Components/QuizContainer";
import {useRouter} from "next/router";

function LoadingWidget() {
	return (
		<Widget>
			<Widget.Header>
				Carregando...
			</Widget.Header>

			<Widget.Content>
				[Carregando o desafio]
			</Widget.Content>
		</Widget>
	);
}

function ResultWidget({results}) {
	let acertos = 0;
	return (
		<Widget>
			<Widget.Header>
				<h1>Desafio concluído! Veja abaixo seus resultados:</h1>
			</Widget.Header>

			<Widget.Content>
				<h2>
					Ao todo, você acertou{' '}
					{acertos = results.filter(x => x).length}
					{acertos === 1 ? ' questão' : ' questões'}.
				</h2>

				<Widget.Content>
					{db.questions.map((el, index) => (
						<Widget.Topic
							style={results[index] ? {backgroundColor: 'green'} : {backgroundColor: 'red'}}
							key={index}>
							<h2>{el.title}</h2><br/>
							<h3>{el.alternatives[el.answer]}.</h3>
						</Widget.Topic>
					))}
				</Widget.Content>
			</Widget.Content>
		</Widget>
	);
}

function QuestionWidget({
	                        question, questionIndex, totalQuestions, onSubmit,
	                        handleSelectedQuestion, btnState, btnValidation
                        }) {
	const questionId = `question__${questionIndex}`;
	return (
		<Widget>
			<Widget.Header>
				<h3>
					{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
				</h3>
			</Widget.Header>

			<img
				alt="Descrição"
				style={{
					width: '100%',
					height: '150px',
					objectFit: 'cover',
				}}
				src={question.image}
			/>
			<Widget.Content>
				<h2>
					{question.title}
				</h2>
				<p>
					{question.description}
				</p>

				<form
					id='altForm'
					onSubmit={(event) => {
						event.preventDefault();
						onSubmit();
						if (btnState)
							document.getElementById('altForm').reset();
					}}
				>
					{question.alternatives.map((alternative, alternativeIndex) => {
						const alternativeId = `alternative__${alternativeIndex}`;
						return (
							<Widget.Topic
								as="label"
								id={alternativeIndex}
								key={alternativeId}
								htmlFor={alternativeId}
							>
								<input
									id={alternativeId}
									name={questionId}
									onChange={() => handleSelectedQuestion(alternativeIndex)}
									type="radio"
									disabled={btnState}
								/>
								{alternative}
							</Widget.Topic>
						);
					})}

					<Button type="submit" disabled={btnValidation === undefined}>
						{btnState ? 'Avançar para próxima pergunta' : 'Confirmar reposta'}
					</Button>
				</form>
			</Widget.Content>
		</Widget>
	);
}

const screenStates = {
	QUIZ: 'QUIZ',
	LOADING: 'LOADING',
	RESULT: 'RESULT',
};

export default function QuizPage() {
	const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
	const [btnState, setBtnState] = React.useState(0);
	const [screenState, setScreenState] = React.useState(screenStates.QUIZ);
	const [currentQuestion, setCurrentQuestion] = React.useState(0);
	const [results, setResults] = React.useState([]);

	const totalQuestions = db.questions.length;
	const questionIndex = currentQuestion;
	const question = db.questions[questionIndex];

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
		document.getElementById(`${db.questions[questionIndex].answer}`).style.backgroundColor = 'green';
		if (selectedAlternative !== db.questions[questionIndex].answer)
			document.getElementById(`${selectedAlternative}`).style.backgroundColor = 'red';
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

		for(let i = 0; i < 4; i++){
			document.getElementById(`${i}`).style.backgroundColor = `${db.theme.colors.primary}40`;
		}
	}

	return (
		<QuizBackground backgroundImage={db.bg[questionIndex + 1]}>
			<QuizContainer>
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

				{screenState === screenStates.RESULT && <ResultWidget results={results}/>}
			</QuizContainer>
		</QuizBackground>
	);
}