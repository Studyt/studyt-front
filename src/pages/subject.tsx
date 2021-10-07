import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	Container,
	VStack,
	Heading,
	Flex,
	IconButton,
	Center
} from '@chakra-ui/react';
import { api } from '../services/api';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

export const Subject = () => {

	const { subjectID } = useParams<{ subjectID: string }>();

	const [subjectLabel, setSubjectLabel] = useState<string>();
	const [subjectAbscences, setSubjectAbscences] = useState<number>();
	const [subjectMaxAbscences, setSubjectMaxAbscences] = useState<number>();
	const loadData = async () => {
		const res = await api.get<{ label: string, abscences: number, maxAbscences: number }>(`/subject/${subjectID}`);
		console.table(res);
		setSubjectLabel(res.data?.label);
		setSubjectAbscences(res.data?.abscences);
		setSubjectMaxAbscences(res.data?.maxAbscences);
	};
	useEffect(() => {
		loadData();
	}, []);

	const changeAbscences = (type: string) => {
		const res = api.patch(`/subject/${subjectID}`, { abscences: type === 'add' ? (subjectAbscences as number) + 1 : (subjectAbscences as number) - 1 });
		loadData();
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<Flex bg="studyt.bg" direction="column" py="5" h="90vh" justifyContent="flex-start">
				<Container
					mt="10"
					maxH="md"
					maxW="container.lg"
					bg="white"
					borderRadius="md"
					py="3"
				>
					<Heading>
						{subjectLabel}
					</Heading>
					<VStack>
					</VStack>
				</Container>
				<Container
					mt="10"
					maxH="md"
					maxW="container.sm"
					bg="white"
					borderRadius="md"
					py="3">
					<Flex
						w="100%"
						justifyContent="space-between">
						<Heading>
							Faltas
						</Heading>
						<div>
							{(subjectAbscences as number) > 0 && <IconButton icon={<MinusIcon />} aria-label="Retirar falta" mr="5" color="white" backgroundColor="studyt.dark" onClick={() => changeAbscences('sub')} />}
							<IconButton icon={<AddIcon />} aria-label="Inserir falta" color="white" backgroundColor="studyt.dark" onClick={() => changeAbscences('add')} />
						</div>
					</Flex>
					<Center>
						<Heading size="4xl" color={((subjectAbscences as number) > (subjectMaxAbscences as number) ? 'red.500' : 'black' as string)}>
							{subjectAbscences}/{subjectMaxAbscences}
						</Heading>
					</Center>
				</Container>
			</Flex>
		</motion.div>
	);
};