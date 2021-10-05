import { useState } from 'react';
import {
	Text,
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
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { api } from '../services/api';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/header';
import { Subjects } from '../components/subjects';

interface FormValues {
	label: string;
	name: string;
	startDate: string;
	endDate: string;
	exams: number;
	abscences: number;
};

const SubjectSchema = Yup.object().shape({
	label: Yup.string().min(4, 'O código da disciplina deve possuir pelo menos 4 caracteres').max(6, 'O código da disciplina deve possuir até 6 caracteres').required('Obrigatório'),
	name: Yup.string().max(50, 'O nome da disciplina não pode ultrapassar 50 caracteres').required('Obrigatório'),
	startDate: Yup.date().typeError('Insira uma data válida').required('Obrigatório'),
	endDate: Yup.date().typeError('Insira uma data válida').required('Obrigatório'),
	exams: Yup.number().typeError('Insira um número inteiro').positive('A quantidade precisa ser maior que zero').min(1, 'A disciplina precisa ter pelo menos uma prova').required('Obrigatório')
});

export const Home = () => {

	const history = useHistory();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [errorMessage, setErrorMessage] = useState('');

	const result = await api.get('/users');

	const strategy = {
		200: () => {
			history.push('/login');
		},
		409: () => {
			setErrorMessage('Essa disciplina já foi criada.');
			onOpen();
		}
	};

	const onSubmit = async (SubjectRegister: FormValues) => {
		const res = await api.post('/subject', SubjectRegister);
		console.log(res);
		strategy[res.status as keyof typeof strategy];
	};

	const initialValues: FormValues = {
		label: '',
		name: '',
		startDate: '',
		endDate: '',
		exams: 0,
		abscences: 0
	};

	return (
		<>
			<Header />
			<Subjects name="oi" startDate="a" endDate="b" label="AAA" />
			<Button onClick={onOpen} bgColor="studyt.light" type="submit">Criar disciplina</Button>
			<Modal size="3xl" onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize="2rem" color="studyt.dark">Criar disciplina</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text fontSize="1.3rem" color="studyt.dark" mb="2rem">Insira os dados da disciplina que você deseja criar.</Text>
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
									<VStack
										spacing="2"
									>
										<Field name="label">
											{
												({ field, form }: FieldProps) => (
													<FormControl
														isInvalid={!!(form.errors.label && form.touched.label)}
													>
														<FormLabel color="studyt.dark" htmlFor="label">Código da disciplina</FormLabel>
														<Input w="100%" bg="#f1f1f1" {...field} id="label" placeholder="Código da disciplina" />
														<FormErrorMessage color="#FF2424">{form.errors.label}</FormErrorMessage>
													</FormControl>
												)
											}
										</Field>
										<Field name="name">
											{
												({ field, form }: FieldProps) => (
													<FormControl
														isInvalid={!!(form.errors.name && form.touched.name)}
													>
														<FormLabel color="studyt.dark" htmlFor="name">Nome da disciplina</FormLabel>
														<Input w="100%" bg="#f1f1f1" {...field} id="name" placeholder="Nome da disciplina" />
														<FormErrorMessage color="#FF2424">{form.errors.name}</FormErrorMessage>
													</FormControl>
												)
											}
										</Field>
										<Field name="startDate">
											{({ field, form }: FieldProps) => (
												<FormControl isInvalid={!!(form.errors.startDate && form.touched.startDate)}>
													<FormLabel color="studyt.dark" htmlFor="startDate">Data de início</FormLabel>
													<Input w="100%" type="date" bg="#f1f1f1" {...field} id="startDate" placeholder="Data de ínicio" />
													<FormErrorMessage color="#FF2424">{form.errors.startDate}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="endDate">
											{({ field, form }: FieldProps) => (
												<FormControl isInvalid={!!(form.errors.endDate && form.touched.endDate)}>
													<FormLabel color="studyt.dark" htmlFor="endDate">Data de fim</FormLabel>
													<Input w="100%" bg="#f1f1f1" type="date" {...field} id="endDate" placeholder="Data de fim" />
													<FormErrorMessage color="#FF2424">{form.errors.endDate}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="exams">
											{({ field, form }: FieldProps) => (
												<FormControl isInvalid={!!(form.errors.exams && form.touched.exams)}>
													<FormLabel color="studyt.dark" htmlFor="exams">Quantidade de provas</FormLabel>
													<Input w="100%" bg="#f1f1f1" type="exams" {...field} id="exams" placeholder="Insira a quantidade de provas" />
													<FormErrorMessage color="#FF2424">{form.errors.exams}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Box h="3" />
										<Button type="submit" bg="studyt.dark" color="white" w="100%"
											_hover={{
												background: 'studyt.light',
											}}
										>Cadastrar disciplina</Button>
									</VStack>
								</Form>
							)}
						</Formik>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};