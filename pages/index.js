import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from "next/router";
import {motion} from 'framer-motion';
import db from '../db.json';
import Widget from '../src/Components/Widget';
import QuizLogo from '../src/Components/QuizLogo';
import QuizBackground from '../src/Components/QuizBackground';
import Footer from '../src/Components/Footer';
import GitHubCorner from '../src/Components/GitHubCorner';
import Input from '../src/Components/Input';
import Button from '../src/Components/Button';
import Link from '../src/Components/Link';

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
			<Head title={'App dos quizes!'}>
				<link rel="preconnect" href="https://fonts.gstatic.com"/>
				<link
					href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
					rel="stylesheet"/>
			</Head>
			<QuizContainer>
				<QuizLogo/>
				<Widget
					transition={{delay: 0, duration: 0.5}}
					as={motion.section}
					variants={{
						show: {opacity: 1, y: '0'},
						hidden: {opacity: 0, y: '100%'}
					}}
					initial='hidden'
					animate='show'
				>
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
								placeholder="Dê seu nome para jogar!"
							/>
							<Button type="submit" disabled={!nome.length}>
								Jogar { nome ? `como '${nome}'` : '' }
							</Button>
						</form>
					</Widget.Content>
				</Widget>

				<Widget
					transition={{delay: 0.3, duration: 0.5}}
					as={motion.section}
					variants={{
						show: {opacity: 1, y: '0'},
						hidden: {opacity: 0, y: '100%'}
					}}
					initial='hidden'
					animate='show'
				>
					<Widget.Header>
						<h1>Quizes dos outros alunos:</h1>
					</Widget.Header>
					<Widget.Content>
						{db.external.map(el => {
							const [proj, user] = el
								.replace('https:', '')
								.replace(/\//g, '')
								.replace('.vercel.app', '')
								.split('.');

							return (
								<Widget.Topic
									as={Link}
									key={el}
									href={`/quiz/${proj}___${user}?name=${nome}`}
									onClick={e => {if(!nome.length) e.preventDefault()}}
									style={{backgroundColor: !nome.length ? '#979797' : db.theme.colors.secondary}}
								>
									{`${user}/${proj}`}
								</Widget.Topic>
							);
						})}
					</Widget.Content>
				</Widget>
				<Footer
					transition={{delay: 0.6, duration: 0.5}}
					as={motion.section}
					variants={{
						show: {opacity: 1, y: '0'},
						hidden: {opacity: 0, y: '100%'}
					}}
					initial='hidden'
					animate='show'
				/>
			</QuizContainer>
			<GitHubCorner projectUrl="https://github.com/icarosuper/Quiz-Alura"/>
		</QuizBackground>
	);
}