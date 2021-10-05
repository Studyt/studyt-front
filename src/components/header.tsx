import { Flex, Image, HStack, Heading, Spacer, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import logo from '../images/logo.png';

export const Header = () => {
	return (
		<Flex
			px="1"
			bg="studyt.dark"
		>
			<Link to="/">
				<Image
					boxSize="16"
					src={logo}
					fit="contain"
					alt="Studyt"
				/>
			</Link>
			<Spacer />
			<HStack
				alignItems="center"
				spacing="10"
			>
				<Link to="/disciplinas">
					<Heading as="h3" size="md" color="white">Disciplinas</Heading>
				</Link>
				<Link to="/tarefas">
					<Heading as="h3" size="md" color="white">Tarefas</Heading>
				</Link>
				<Link to="/tarefas">
					<Heading as="h3" size="md" color="white">Tarefas</Heading>
				</Link>
				<Link to="/perfil">
					<Heading as="h3" size="md" color="white">Perfil</Heading>
				</Link>
			</HStack>
			<Spacer />
			<Box w="60%" />
		</Flex>
	);
}