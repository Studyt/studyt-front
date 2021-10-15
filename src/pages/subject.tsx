import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	Container,
	Text,
	VStack,
	Heading,
	Flex,
	IconButton,
	Center,
	Button,
	Table,
	Tbody,
	Th,
	Thead,
	Tr,
	useDisclosure,
	Box,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { api } from '../services/api';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Tasks } from '../components/tasks';
import { Grade, Task } from '../models';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Grades } from '../components/grades';

interface FormValues {
	description: string;
	dueDate: string;
	status: string;
}

const TaskSchema = Yup.object().shape({
	description: Yup.string()
		.max(40, 'A descrição da tarefa não pode ultrapassar 40 caracteres')
		.required('Obrigatório'),
	dueDate: Yup.date()
		.typeError('Insira uma data válida')
		.required('Obrigatório'),
});

export const Subject = () => {

	const { subjectID } = useParams<{ subjectID: string }>();

	const onSubmitTask = async (TaskRegister: FormValues) => {
		await api.post('/task', { ...TaskRegister, subject: subjectID });
		loadData();
	};

	const [tasks, setTasks] = useState<Task[]>();
	const [grades, setGrades] = useState<Grade[]>();
	const [subjectLabel, setSubjectLabel] = useState<string>();
	const [subjectAbscences, setSubjectAbscences] = useState<number>();
	const [subjectMaxAbscences, setSubjectMaxAbscences] = useState<number>();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const loadData = async () => {
		const res = await api.get<{ label: string, abscences: number, maxAbscences: number, tasks: Task[], grades: Grade[] }>(`/subject/${subjectID}`);
		console.table(res);
		setTasks(res.data?.tasks);
		setGrades(res.data?.grades);
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

	const initialValues: FormValues = {
		description: '',
		dueDate: '',
		status: 'não feito'
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<Flex bg="studyt.bg" direction="column" py="5" justifyContent="flex-start">

				<Container
					mt="10"
					maxW="container.lg"
					bg="white"
					borderRadius="md"
					py="3">
					<Heading>
						{subjectLabel}
					</Heading>
				</Container>
				<Container
					display="flex"
					justifyContent="space-evenly"
					maxW="container.lg"
					borderRadius="md"
					py="3">
					<Container
						mt="10"
						mr="5"
						maxW="container.sm"
						bg="white"
						borderRadius="md"
						py="3">
						<Flex
							w="100%"
							justifyContent="space-between">
							<Heading>
								Notas
							</Heading>
							<Button
								bg="studyt.dark"
								color="white"
								onClick={onOpen}
							>+ Inserir nota</Button>

						</Flex>
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th>Nota</Th>
									<Th>Peso</Th>
								</Tr>
							</Thead>
							<Tbody>
								{grades &&
									grades.map((g) => (
										<Grades
											grade={g.grade}
											weight={g.weight}
											_id={g._id}
											key={g._id}
										/>
									))}
							</Tbody>
						</Table>

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
				</Container>
				<VStack>
				</VStack>
				<Container
					mt="10"
					maxW="container.lg"
					bg="white"
					borderRadius="md"
					py="3"
					display="flex"
					flexDirection="column"
					justifyContent="space-between"
				>
					<div>
						<Flex
							direction="row"
							justifyContent="space-between"
						>
							<Heading>Tarefas</Heading>
							<Button
								bg="studyt.dark"
								color="white"
								onClick={onOpen}
							>+ Criar tarefa</Button>
						</Flex>
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th>Descrição</Th>
									<Th>Prazo</Th>
									<Th>Status</Th>
								</Tr>
							</Thead>
							<Tbody>
								{tasks &&
									tasks.map((t) => (
										<Tasks
											description={t.description}
											dueDate={t.dueDate}
											status={t.status}
											_id={t._id}
											key={t._id}
										/>
									))}
							</Tbody>
						</Table>
					</div>
				</Container>

			</Flex>

			<Modal size="3xl" onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize="2rem" color="studyt.dark">
						Criar nova tarefa
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text fontSize="1.3rem" color="studyt.dark" mb="2rem">
							Crie uma tarefa para organizar as atividades da sua disciplina.
						</Text>
						<Formik
							initialValues={initialValues}
							validationSchema={TaskSchema}
							onSubmit={(values) => {
								console.log(values);
								onSubmitTask(values);
								onClose();
							}}
						>
							{(props) => (
								<Form>
									<VStack spacing="2">
										<Field name="description">
											{({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={!!(form.errors.description && form.touched.description)}
												>
													<FormLabel color="studyt.dark" htmlFor="description">
														Descreva a tarefa a ser feita
													</FormLabel>
													<Input
														w="100%"
														bg="#f1f1f1"
														{...field}
														id="description"
														placeholder="Descrição da tarefa"
													/>
													<FormErrorMessage color="#FF2424">
														{form.errors.description}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="dueDate">
											{({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={
														!!(form.errors.dueDate && form.touched.dueDate)
													}
												>
													<FormLabel color="studyt.dark" htmlFor="dueDate">
														Data de entrega da tarefa
													</FormLabel>
													<Input
														w="100%"
														bg="#f1f1f1"
														type="date"
														{...field}
														id="dueDate"
														placeholder="Prazo final"
													/>
													<FormErrorMessage color="#FF2424">
														{form.errors.dueDate}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>

										<Box h="3" />
										<Button
											type="submit"
											bg="studyt.dark"
											color="white"
											w="100%"
											_hover={{
												background: 'studyt.light',
											}}
										>
											Criar tarefa
										</Button>
									</VStack>
								</Form>
							)}
						</Formik>
					</ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</motion.div>
	);
};