import React from "react";
import { Lottie } from '@crello/react-lottie';
import loadingAnimation from '../Animations/loading.json';
import Widget from "../Widget";
import {motion} from "framer-motion";

export default function LoadingWidget() {
	return (
		<Widget>
			<Widget.Header>
				Carregando...
			</Widget.Header>

			<Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
				<Lottie
					width="200px"
					height="200px"
					className="lottie-container basic"
					config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
				/>
			</Widget.Content>
		</Widget>
	);
}