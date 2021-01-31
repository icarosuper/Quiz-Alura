import React from "react";
import QuizPage from "./index";
import {ThemeProvider} from "styled-components";

export default function OutrosQuizes({db}) {
	return (
		<ThemeProvider theme={db.theme}>
			<QuizPage questions={db.questions} background={db.bg} theme={db.theme}/>
		</ThemeProvider>
	)
}

export async function getServerSideProps(context) {
	try {
		const [proj, user] = context.query.id.split('___')

		let db = await fetch(`https://${proj}.${user}.vercel.app/api/db`);

		if (db.ok)
			db = await db.json();
		else
			throw new Error('Falha em pegar dados');

		return {
			props: {db},
		};
	} catch (err) {
		console.error(err);
	}
}