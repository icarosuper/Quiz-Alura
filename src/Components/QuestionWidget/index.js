import Widget from "../Widget";
import Button from "../Button";
import React from "react";

export default function QuestionWidget({
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
									onClick={() => handleSelectedQuestion(alternativeIndex)}
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