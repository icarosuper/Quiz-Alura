import React from 'react';

import db from '../db.json';
import Widget from '../src/Components/Widget';
import QuizLogo from '../src/Components/QuizLogo';
import QuizBackground from '../src/Components/QuizBackground';
import Footer from '../src/Components/Footer';
import GitHubCorner from '../src/Components/GitHubCorner';
import Input from '../src/Components/Input';
import Button from '../src/Components/Button';
import styled from "styled-components";

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

export default function QuizPage(){
	return (
		<QuizBackground backgroundImage={db.bg}>
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
						<Widget.Header>
							<h2>Perguntas:</h2>
						</Widget.Header>
						{db.questions.map(element => (
							<QuizContainer>
								<Widget.Header>
									<h2>{element.title}</h2>
								</Widget.Header>
								<Widget.Content>
									{element.alternatives.map(element => (
										<button>{element}</button>
									))}
								</Widget.Content>
							</QuizContainer>
						))}
					</Widget.Content>
				</Widget>
			</QuizContainer>
			<GitHubCorner projectUrl="https://github.com/icarosuper/Imersao-React-Alura"/>
		</QuizBackground>
	)
}