import { useState, useEffect } from 'react';
import {
	Text,
	Textarea,
	Box,
	Input,
	FormLabel,
	FormControl,
	FormErrorMessage,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	VStack,
	Tbody,
	Flex,
	Container,
	Heading,
	Table,
	Thead,
	Tr,
	Td,
	Th,
	Center,
	Spacer
} from '@chakra-ui/react';
import { AreaChart, XAxis,YAxis,Tooltip, Area, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { api } from '../services/api';
import { useHistory } from 'react-router-dom';
import { Subjects } from '../components/subjects';
import { Subject, Task } from '../models';
import { motion } from 'framer-motion';
import moment from 'moment';

interface FormValues {
	label: string;
	name: string;
	startDate: string;
	endDate: string;
	exams: number;
	maxAbscences: number;
}

interface FormValuesFeedback {
	NPS?: number;
	feedback?: string;
}

const FeedbackSchema = Yup.object().shape({
	NPS: Yup.number().min(0, 'A nota precisa ser pelo menos zero.').max(10, 'A nota máxima é dez.').required(),
	feedback: Yup.string().max(300, 'O feedback pode ter no máximo 300 caracteres')
});

const SubjectSchema = Yup.object().shape({
	label: Yup.string()
		.min(4, 'O código da disciplina deve possuir pelo menos 4 caracteres')
		.max(6, 'O código da disciplina deve possuir até 6 caracteres')
		.required('Obrigatório'),
	name: Yup.string()
		.max(50, 'O nome da disciplina não pode ultrapassar 50 caracteres')
		.required('Obrigatório'),
	startDate: Yup.date()
		.typeError('Insira uma data válida')
		.required('Obrigatório'),
	endDate: Yup.date()
		.typeError('Insira uma data válida')
		.required('Obrigatório'),
	exams: Yup.number()
		.typeError('Insira um número inteiro')
		.positive('A quantidade precisa ser maior que zero')
		.min(1, 'A disciplina precisa ter pelo menos uma prova')
		.required('Obrigatório'),
	maxAbscences: Yup.number()
		.typeError('Insira um número inteiro')
		.positive('A quantidade precisa ser maior que zero')
		.min(1, 'A disciplina precisa ter um máximo de faltar maior ou igual a um')
		.required('Obrigatório'),
});

export const Home = () => {
	const history = useHistory();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isOpenFeedback, onOpen: onOpenFeedback, onClose: onCloseFeedback } = useDisclosure();

	const [subjects, setSubjects] = useState<Subject[]>();
	const [chartData, setChartData] = useState <Record<string, unknown>[]>();
	const [countdownTasks, setCountdownTasks] = useState<Task[]>();
	const [chartKeys, setChartKeys] = useState<string[]>();


	const loadData = async () => {
		const res = await api.get<Subject[]>('/subject');
		
		setSubjects(res.data);

		const tasks = res.data?.map( subject => {
			return subject.tasks.filter(task=> moment(task.dueDate).isBetween(moment(),moment().add(7,'days')));
		}).flat().sort((a,b) => {
			return moment(a.dueDate).diff(moment(b.dueDate));			
		});

		setCountdownTasks(tasks);		

		const data = res.data?.map(sub => {
			return sub.grades.map( (grade, index) => ({name: moment(grade.date).locale('pt-br').format('L') , [sub.label]: grade.grade}));
		}).flat().sort((a,b) => a.name.localeCompare(b.name));
		// console.log(data);
		setChartData(data);

		setChartKeys([... new Set(data?.map( d => {
			const {name, ...pointData } = d;
			return Object.keys(pointData)[0];
		}))]);

		
	};


	useEffect(() => {
		loadData();
	}, []);

	const onSubmit = async (SubjectRegister: FormValues) => {
		await api.post('/subject', { ...SubjectRegister, abscences: 0 });
		loadData();
	};

	const onSubmitFeedback = async (FeedbackRegister: FormValuesFeedback) => {
		await api.post('/feedback', { ...FeedbackRegister, nps: FeedbackRegister.NPS });
	};

	const initialValues: FormValues = {
		label: '',
		name: '',
		startDate: '',
		endDate: '',
		exams: 0,
		maxAbscences: 0,
	};

	const initialValuesFeedback: FormValuesFeedback = {
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<Flex bg="studyt.bg" minH="90vh" flexDirection="column" alignItems="center">
				<Flex width="container.lg" justifyContent="space-between">
				
					<Container
						mt="10"						
						bg="white"
						borderRadius="md"
						py="3"
						display="flex"
						flexDirection="column"
						justifyContent="space-between"				
						maxW="47%"
						marginX="0"				
					>
						<Flex
							direction="row"
							justifyContent="space-between"
						>
							<Heading>Insights</Heading>
							<Text fontSize="1.3rem" color="studyt.dark" mb="2rem">
								Algum texto aqui
							</Text>
						</Flex>
					
					</Container>					

					<Container
						mt="10"						
						bg="white"
						borderRadius="md"
						py="3"
						display="flex"
						flexDirection="column"
						justifyContent="space-between"
						maxW="47%"
						marginX="0"				
					>
						<Flex
							direction="column"
							justifyContent="space-between"
						>
							<Heading>Countdown</Heading>				

							<Table variant="simple">
								<Thead>
									<Tr>
										<Th>Tarefa</Th>
										<Th>Data de entrega</Th>												
									</Tr>
								</Thead>
								<Tbody>
									{countdownTasks &&
									countdownTasks.map((t) => (
										<Tr key={t._id}>
											<Td>{t.description}</Td>
											<Td>{moment(t.dueDate).locale('pt-br').format('LL')}</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</Flex>
					</Container>
				</Flex>
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
							mb="1rem"
						>
							<Heading>Disciplinas</Heading>
							<Button
								bg="studyt.dark"
								color="white"
								onClick={onOpen}
							>+ Cadastrar matéria</Button>
						</Flex>
						<ResponsiveContainer width="90%" height={250}>
							<AreaChart data={chartData}>
								<defs>
									<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#C080FF" stopOpacity={0.8}/>
										<stop offset="95%" stopColor="#C080FF" stopOpacity={0}/>
									</linearGradient>								
								</defs>
								<XAxis dataKey="name" />
								<YAxis />
								<CartesianGrid strokeDasharray="3 3" />
								<Tooltip />
							
								{chartKeys?.map( (c, index) => {																
									return <Area type="monotone" dataKey={c} stroke="#3F004B" fillOpacity={1} fill="url(#colorUv)" key={index.toString()} connectNulls/>;
								})}								
							</AreaChart>
						</ResponsiveContainer>						

						<Table variant="simple" mt='1.5rem'>
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
								{subjects &&
									subjects.map((s) => (
										<Subjects
											endDate={s.endDate}
											startDate={s.startDate}
											label={s.label}
											_id={s._id}
											name={s.name}
											key={s._id}
										/>
									))}
							</Tbody>
						</Table>
					</div>
					<Center>
						<Button
							type="submit"
							bg="studyt.dark"
							color="white"
							w="20vw"
							_hover={{
								background: 'studyt.light',
							}}
							onClick={onOpenFeedback}
						>
							Enviar feedback
						</Button>
					</Center>
				</Container>
			</Flex>

			<Modal size="3xl" onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize="2rem" color="studyt.dark">
						Criar disciplina
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text fontSize="1.3rem" color="studyt.dark" mb="2rem">
							Insira os dados da disciplina que você deseja criar.
						</Text>
						<Formik
							initialValues={initialValues}
							validationSchema={SubjectSchema}
							onSubmit={(values) => {
								onSubmit(values);
								onClose();
							}}
						>
							{(props) => (
								<Form>
									<VStack spacing="2">
										<Field name="label">
											{({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={
														!!(form.errors.label && form.touched.label)
													}
												>
													<FormLabel color="studyt.dark" htmlFor="label">
														Código da disciplina
													</FormLabel>
													<Input
														w="100%"
														bg="#f1f1f1"
														{...field}
														id="label"
														placeholder="Código da disciplina"
													/>
													<FormErrorMessage color="#FF2424">
														{form.errors.label}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="name">
											{({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={!!(form.errors.name && form.touched.name)}
												>
													<FormLabel color="studyt.dark" htmlFor="name">
														Nome da disciplina
													</FormLabel>
													<Input
														w="100%"
														bg="#f1f1f1"
														{...field}
														id="name"
														placeholder="Nome da disciplina"
													/>
													<FormErrorMessage color="#FF2424">
														{form.errors.name}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="startDate">
											{({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={
														!!(form.errors.startDate && form.touched.startDate)
													}
												>
													<FormLabel color="studyt.dark" htmlFor="startDate">
														Data de início
													</FormLabel>
													<Input
														w="100%"
														type="date"
														bg="#f1f1f1"
														{...field}
														id="startDate"
														placeholder="Data de ínicio"
													/>
													<FormErrorMessage color="#FF2424">
														{form.errors.startDate}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="endDate">
											{({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={
														!!(form.errors.endDate && form.touched.endDate)
													}
												>
													<FormLabel color="studyt.dark" htmlFor="endDate">
														Data de fim
													</FormLabel>
													<Input
														w="100%"
														bg="#f1f1f1"
														type="date"
														{...field}
														id="endDate"
														placeholder="Data de fim"
													/>
													<FormErrorMessage color="#FF2424">
														{form.errors.endDate}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="exams">
											{({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={
														!!(form.errors.exams && form.touched.exams)
													}
												>
													<FormLabel color="studyt.dark" htmlFor="exams">
														Quantidade de provas
													</FormLabel>
													<Input
														w="100%"
														bg="#f1f1f1"
														type="number"
														{...field}
														id="exams"
														placeholder="Insira a quantidade de provas"
													/>
													<FormErrorMessage color="#FF2424">
														{form.errors.exams}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="maxAbscences">
											{({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={
														!!(form.errors.maxAbscences && form.touched.maxAbscences)
													}
												>
													<FormLabel color="studyt.dark" htmlFor="maxAbscences">
														Quantidade máxima de faltas
													</FormLabel>
													<Input
														w="100%"
														bg="#f1f1f1"
														type="number"
														{...field}
														id="maxAbscences"
														placeholder="Insira a quantidade máxima de faltas da disciplina"
													/>
													<FormErrorMessage color="#FF2424">
														{form.errors.maxAbscences}
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
											Cadastrar disciplina
										</Button>
									</VStack>
								</Form>
							)}
						</Formik>
					</ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>

			<Modal size="3xl" onClose={onCloseFeedback} isOpen={isOpenFeedback} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize="2rem" color="studyt.dark">
						Enviar feedback
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text fontSize="1.3rem" color="studyt.dark" mb="2rem">
							Qual sugestão de melhora você tem para o Studyt?
						</Text>
						<Formik
							initialValues={initialValuesFeedback}
							validationSchema={FeedbackSchema}
							onSubmit={(values) => {
								console.log(values);
								onSubmitFeedback(values);
								onCloseFeedback();
							}}
						>
							{(props) => (
								<Form>
									<VStack spacing="2">
										<Field name="NPS">
											{({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={
														!!(form.errors.NPS && form.touched.NPS)
													}
												>
													<FormLabel color="studyt.dark" htmlFor="NPS">
														Qual nota você dá ao Studyt de 0 a 10?
													</FormLabel>
													<Input
														type="number"
														w="100%"
														bg="#f1f1f1"
														{...field}
														id="NPS"
														placeholder="Nota"
													/>
													<FormErrorMessage color="#FF2424">
														{form.errors.NPS}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="feedback">
											{({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={!!(form.errors.feedback && form.touched.feedback)}
												>
													<FormLabel color="studyt.dark" htmlFor="feedback">
														Alguma sugestão de melhora?
													</FormLabel>
													<Textarea
														w="100%"
														bg="#f1f1f1"
														{...field}
														id="feedback"
														placeholder="Feedback para a plataforma"
													/>
													<FormErrorMessage color="#FF2424">
														{form.errors.feedback}
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
											Enviar feedback
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
