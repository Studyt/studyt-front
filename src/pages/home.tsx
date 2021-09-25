import { useState } from 'react';
import {
	Text,
	Image,
	Flex,
	Box,
	Input,
	FormLabel,
	FormControl,
	FormErrorMessage,
	Container,
	Heading,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	VStack
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
	label: string;
	name: string;
	startDate: Date;
	endDate: Date;
	exams: number;
};

const SubjectSchema = Yup.object().shape({
	label: Yup.string().min(4, 'O código da disciplina deve possuir pelo menos 4 caracteres').max(6, 'O código da disciplina deve possuir até 6 caracteres').required('Obrigatório'),
	name: Yup.string().max(50, 'O nome da disciplina não pode ultrapassar 50 caracteres').required('Obrigatório'),
	startDate: Yup.date().required('Obrigatório'),
	endDate: Yup.date().required('Obrigatório'),
	exams: Yup.number().min(1, 'A disciplina precisa ter pelo menos uma prova').required('Obrigatório')
});

export const Home = () => {

	const initialValues: FormValues = {
		label: '',
		name: '',
		startDate: new Date(Date.now()),
		endDate: new Date(Date.now()),
		exams: 0
	};

	const onSubmit = () => {
		alert('Teste bem sucedido');
	};

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [errorMessage, setErrorMessage] = useState('');

	return (
		<>
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
							onSubmit={onSubmit}
						>
							{(props) => (
								<Form>
									<VStack
										spacing="2"
									>
										<Field name="firstName">
											{
												({ field, form }: FieldProps) => (
													<FormControl
														isInvalid={!!(form.errors.firstName && form.touched.firstName)}
													>
														<FormLabel color="studyt.dark" htmlFor="firstName">Nome</FormLabel>
														<Input w="100%" bg="#f1f1f1" {...field} id="firstName" placeholder="Nome" />
														<FormErrorMessage color="#FF2424">{form.errors.firstName}</FormErrorMessage>
													</FormControl>
												)
											}
										</Field>
										<Field name="lastName">
											{
												({ field, form }: FieldProps) => (
													<FormControl
														isInvalid={!!(form.errors.lastName && form.touched.lastName)}
													>
														<FormLabel color="studyt.dark" htmlFor="lastName">Sobrenome</FormLabel>
														<Input w="100%" bg="#f1f1f1" {...field} id="lastName" placeholder="Sobrenome" />
														<FormErrorMessage color="#FF2424">{form.errors.lastName}</FormErrorMessage>
													</FormControl>
												)
											}
										</Field>
										<Field name="email">
											{({ field, form }: FieldProps) => (
												<FormControl isInvalid={!!(form.errors.email && form.touched.email)}>
													<FormLabel color="studyt.dark" htmlFor="email">Email</FormLabel>
													<Input w="100%" bg="#f1f1f1" {...field} id="email" placeholder="E-mail" />
													<FormErrorMessage color="#FF2424">{form.errors.email}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="password">
											{({ field, form }: FieldProps) => (
												<FormControl isInvalid={!!(form.errors.password && form.touched.password)}>
													<FormLabel color="studyt.dark" htmlFor="password">Senha</FormLabel>
													<Input w="100%" bg="#f1f1f1" type="password" {...field} id="password" placeholder="Senha" />
													<FormErrorMessage color="#FF2424">{form.errors.password}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="confirmedPassword">
											{({ field, form }: FieldProps) => (
												<FormControl isInvalid={!!(form.errors.confirmedPassword && form.touched.confirmedPassword)}>
													<FormLabel color="studyt.dark" htmlFor="confirmedPassword">Confirmar senha</FormLabel>
													<Input w="100%" bg="#f1f1f1" type="password" {...field} id="confirmedPassword" placeholder="Confirmar senha" />
													<FormErrorMessage color="#FF2424">{form.errors.confirmedPassword}</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Box h="3" />
										<Button bg="studyt.dark" color="white" w="100%" onClick={onClose}
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