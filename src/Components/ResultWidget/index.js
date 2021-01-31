import {useRouter} from "next/router";
import Widget from "../Widget";
import Button from "../Button";
import React from "react";

export default function ResultWidget({results, questions, theme}) {
	const router = useRouter();
	let questoes;
	return (
		<Widget>
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
							key={index}>
							<h2>{el.title}</h2><br/>
							<h3>{el.alternatives[el.answer]}.</h3>
						</Widget.Topic>
					))}
				</Widget.Content>

				<Button
					onClick={() => router.push('/')}
					style={{backgroundColor: theme.colors.primary}}>
					<p>Voltar para a página inicial</p>
				</Button>
			</Widget.Content>
		</Widget>
	);
}