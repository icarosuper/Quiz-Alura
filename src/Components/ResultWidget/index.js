import {useRouter} from "next/router";
import Widget from "../Widget";
import Button from "../Button";
import React from "react";
import {motion} from "framer-motion";
import QuizContainer from "../QuizContainer";

export default function ResultWidget({results, questions, theme}) {
	const router = useRouter();
	let questoes;
	return (
		<Widget
			transition={{delay: 0, duration: 0.5}}
			as={motion.section}
			variants={{
				show: {opacity: 1},
				hidden: {opacity: 0}
			}}
			initial='hidden'
			animate='show'
		>
			<Widget.Header>
				<h1>Desafio concluído {router.query.name}!<br/>Veja abaixo seus resultados:</h1>
			</Widget.Header>

			<Widget.Content>
				<h2>
					Ao todo, você acertou{' '}
					{results.filter(x => x).length}
					{` de ${questoes = questions.length}`}
					{questoes === 1 ? ' questão' : ' questões'}.
				</h2>

				<Widget.Content>
					{questions.map((el, index) => (
						<Widget.Topic
							style={results[index] ? {backgroundColor: theme.colors.success} : {backgroundColor: theme.colors.wrong}}
							key={index}
							transition={{delay: 0.1*index, duration: 0.5}}
							as={motion.section}
							variants={{
								show: {opacity: 1, y: '0'},
								hidden: {opacity: 0, y: '700%'}
							}}
							initial='hidden'
							animate='show'
						>
							<h2>{el.title}</h2><br/>
							<h3>{el.alternatives[el.answer]}.</h3>
						</Widget.Topic>
					))}
				</Widget.Content>

				<Button
					onClick={() => router.push('/')}
					style={{backgroundColor: theme.colors.primary}}
					transition={{delay: 0.1*questions.length, duration: 0.5}}
					as={motion.button}
					variants={{
						show: {opacity: 1, y: '0'},
						hidden: {opacity: 0, y: '700%'}
					}}
					initial='hidden'
					animate='show'
				>
						<p>Voltar para a página inicial</p>
				</Button>
			</Widget.Content>
		</Widget>
	);
}