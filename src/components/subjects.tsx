import {
	Flex,
	Container,
	Heading,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Icon
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

interface SubjectProps {
	name: string;
	startDate: string;
	endDate: string;
	label: string;
}

export const Subjects = (SubjectProps: SubjectProps) => {
	return (
		<Flex bg="studyt.bg" minH="90vh">
			<Container
				mt="10"
				maxH="md"
				maxW="container.lg"
				bg="white"
				borderRadius="md"
				py="3"
			>
				<Heading>Disciplinas</Heading>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>Disciplina</Th>
							<Th>Data de início</Th>
							<Th>Data de término</Th>
							<Th>Código</Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>Requisitos</Td>
							<Td>29 de agosto de 2001</Td>
							<Td>29 de agosto de 2018</Td>
							<Td>REQ020</Td>
							<Td>
								<Link to={`/disciplinas/${''}`}>
									<ExternalLinkIcon />
								</Link>
							</Td>
						</Tr>
					</Tbody>
				</Table>
			</Container>
		</Flex >
	);
};