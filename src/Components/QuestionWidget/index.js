import Widget from "../Widget";
import Button from "../Button";
import React from "react";
import BackLinkArrow from "../BackArrow";
import {motion} from "framer-motion";

export default function QuestionWidget({
	                        question, questionIndex, totalQuestions, onSubmit,
	                        handleSelectedQuestion, btnState, btnValidation
                        }) {
	const questionId = `question__${questionIndex}`;
	return (
		<Widget>
			<Widget.Header>
				<BackLinkArrow href={'/'}/>
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
								as={motion.label}
								id={alternativeIndex}
								key={alternativeId}
								htmlFor={alternativeId}
								transition={{delay: 0.1*alternativeIndex, duration: 0.5}}
								variants={{
									show: {y: '0'},
									hidden: {y: '700%'}
								}}
								initial='hidden'
								animate='show'

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

						<Button type="submit" disabled={btnValidation === undefined}
					        transition={{delay: 0.1*question.alternatives.length, duration: 0.5}}
					        as={motion.button}
					        variants={{
						        show: {y: '0'},
						        hidden: {y: '700%'}
					        }}
					        initial='hidden'
					        animate='show'
					>
						{btnState ? 'Avançar para próxima pergunta' : 'Confirmar reposta'}
					</Button>
				</form>
			</Widget.Content>
		</Widget>
	);
}