import { Flex, Image, HStack, Heading, Spacer, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import logo from '../images/logo.png';

export const Header = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>

			<Flex px="1" bg="studyt.dark">
				<Link to="/">
					<Image boxSize="16" src={logo} fit="contain" alt="Studyt" />
				</Link>
				<Spacer />
				<HStack alignItems="center" spacing="10">
					<Link to="/">
						<Heading as="h3" size="md" color="white">
							Dashboard
						</Heading>
					</Link>
				</HStack>
				<Spacer />
				<Box w="60%" />
			</Flex>
		</motion.div>
	);
};
