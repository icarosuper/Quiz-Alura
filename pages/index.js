import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from "next/router";

import db from '../db.json';
import Widget from '../src/Components/Widget';
import QuizLogo from '../src/Components/QuizLogo';
import QuizBackground from '../src/Components/QuizBackground';
import Footer from '../src/Components/Footer';
import GitHubCorner from '../src/Components/GitHubCorner';
import Input from '../src/Components/Input';
import Button from '../src/Components/Button';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
	const router = useRouter();
	const [nome, setName] = React.useState('');

	return (
		<QuizBackground backgroundImage={db.bg}>
			<Head>
				<link rel="preconnect" href="https://fonts.gstatic.com"/>
				<link
					href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
					rel="stylesheet"/>
			</Head>
			<QuizContainer>
				<QuizLogo/>
				<Widget>
					<Widget.Header>
						<h1>{db.title}</h1>
					</Widget.Header>
					<Widget.Content>
						<p>{db.description}</p>
					</Widget.Content>

					<Widget.Content>
						<form onSubmit={ event => {
							event.preventDefault();
							router.push(`/quiz?name=${nome}`)
						}}>
							<Input
								onChange={ event => {
									setName(event.target.value);
								}}
								placeholder="Dê seu nome"
							/>
							<Button type="submit" disabled={!nome.length}>
								Jogar { nome ? `como '${nome}'` : '' }
							</Button>
						</form>
					</Widget.Content>
				</Widget>

				<Widget>
					<Widget.Header>
						<h1>Outros quizes:</h1>
					</Widget.Header>
					<Widget.Content>
						<h2>{db.title}</h2>
						<h3>{db.description}</h3>
					</Widget.Content>
				</Widget>
				<Footer/>
			</QuizContainer>
			<GitHubCorner projectUrl="https://github.com/icarosuper/Imersao-React-Alura"/>
		</QuizBackground>
	);
}